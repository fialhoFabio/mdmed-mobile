import {fetchGet} from '../fetchHelper';
import {
  routeFetchSetAbortState,
  routeFetchSetCompleteState,
  routeFetchSetErrorState,
  routeFetchSetStartState,
} from './app/actionCreators';
import {formigoInjectState} from './formigo/actionCreators';
import {frozenInjectState} from './frozen/actionCreators';
import {indexDataInjectState} from './indexData/actionCreators';
import {schedulerInjectState} from './scheduler/actionCreators';
import {screenInjectState} from './screen/actionCreators';
import {userPreferencesInjectState} from './userPreferences/actionCreators';

const errorFlag = '[redux/routeFetch]';

function isInvalidState (routeData) {
  const resolvedAction = routeData.actionId === 'login' ? '' : routeData.actionId;
  const resolvedControllerPath = routeData.controllerPath.indexOf('/external') === -1
    ? routeData.controllerPath.replace('/site', '') + '/' + resolvedAction
    : routeData.controllerPath.replace('/external', ''); // Nos externals a action é oculta
  return window.location.pathname.indexOf(resolvedControllerPath) === -1;
}

function runRedirect (redirect) {
  // a sessão expirou e foi clicado em alguma navegação
  // api retornou uma solicitação de redirect
  // Não foi possível usar o browserHistory, a mudança de rota ocorre ok, o getDerived é acionado,
  // mas ao chamar a nova rota, esbarra no shouldRouteFetch que está rodando a rota que chamou o redirect
  window.location = redirect.url || redirect.pathname + (redirect.search || '');
}

/**
 * @param {Promise} fetchPromise
 *
 * @returns {Promise}
 */
function prepare (fetchPromise) {
  return (dispatch) => {
    dispatch(routeFetchSetStartState());
    return fetchPromise
      .then((response) => response.text())
      .then((responseText) => {
        try {
          return Promise.resolve(JSON.parse(responseText));
        } catch (e) {
          dispatch(routeFetchSetErrorState({message: responseText || 'No content', type: 'error'}));
          return Promise.reject(new Error(errorFlag + ' Invalid JSON, handled by application'));
        }
      })
      .then((responseData) => {
        const isIncomplete = !responseData.yiiEnv;
        if (!isIncomplete) return Promise.resolve(responseData);
        if (responseData.feedback && responseData.feedback.redirect) {
          dispatch(routeFetchSetErrorState()); // Pra não ficar indicando loading, a mensagem não é relevante por causa do redirect
          runRedirect(responseData.feedback.redirect);
          return Promise.reject(new Error(errorFlag + ' Redirect, handled by application'));
        } else {
          dispatch(routeFetchSetErrorState(responseData.feedback));
          return Promise.reject(new Error(errorFlag + ' Invalid response, handled by application'));
        }
      })
      .then((responseData) => {
        window.language = responseData.language;
        window.loginUrl = responseData.routeData.moduleParams.loginUrl;
        if (responseData.scenario === 'login'
          && !(window.location.pathname === window.loginUrl || window.location.pathname === '/support-login')
        ) {
          window.location = window.loginUrl; // Se retornar o model do login e não for esta a intenção ocorre o redirecionamento pra tela de login
        } else {
          const {formState} = responseData;
          dispatch(formigoInjectState({
            ...formState,
            attr: formState.values,
            backFormId: null,
            clientErrors: {},
            frontFormHasChanged: {},
            frontFormId: null,
            serverErrors: {},
            submitErrors: {},
          }));

          // Valores inicias congelados, não há actions para mudar este reducer
          dispatch(frozenInjectState({
            actionId: responseData.routeData.actionId,
            backData: responseData.backData,
            childOfPath: responseData.routeData.childOfPath,
            controllerPath: responseData.routeData.controllerPath,
            modelLabels: responseData.modelLabels,
            modelNames: responseData.formState.names,
            modelSchema: responseData.modelSchema,
            modelValues: responseData.modelValues,
            moduleParams: responseData.routeData.moduleParams,
            operation: responseData.operation,
            own: responseData.own,
            sessionData: responseData.sessionData,
            socketConfig: responseData.socketConfig,
            staticOptions: responseData.staticOptions,
            userIdentity: responseData.userIdentity,
            yiiEnv: responseData.yiiEnv,
          }));

          if (responseData.indexData) {
            dispatch(indexDataInjectState(responseData.indexData));
          }

          dispatch(userPreferencesInjectState(responseData.userPreferences));

          if (responseData.screen) {
            dispatch(screenInjectState(responseData.screen));
          }

          if (responseData.routeData.controllerPath === '/main/scheduler' && responseData.routeData.actionId === 'index') {
            dispatch(schedulerInjectState({
              indexData: responseData.indexData,
              sessionData: responseData.sessionData,
              userPreferences: responseData.userPreferences,
            }));
          }

          const successData = {
            hasPreventToModal: false,
            isCompleteState: true,
            isInvalidState: isInvalidState(responseData.routeData),
            isRouteFetching: false,
            preventTo: null,
          };
          if (responseData.feedback) {
            // Para feedbacks que vem junto ao model
            // Não da pra enviar null, senão sobrepõe o feedback do postData
            successData.feedback = responseData.feedback;
          }
          dispatch(routeFetchSetCompleteState(successData));
        }
        return Promise.resolve(responseData);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          dispatch(routeFetchSetAbortState());
        } else if (error.message && error.message.indexOf(errorFlag) === -1) {
          dispatch(routeFetchSetErrorState());
        }
        // É necessário lançar um reject aqui pro then chain travar em caso de erro em algum dos anteriores
        // Caso contrário o then do responseData, na aplicacação sempre vai ser acionado
        // Reject string pra não lançar erro da promise em tela, o erro já é tratado no client
        // Pro uso na aplicação deve-se tratar esse erro com catch, caso queira que não apareça no console log
        return Promise.reject(error.message);
      });
  };
}

function shouldRouteFetch (state) {
  return !state.app.getIn(['isRouteFetching']);
}

// eslint-disable-next-line import/prefer-default-export
export function routeFetchGet (url, abortSignal) {
  return (dispatch, getState) => {
    if (shouldRouteFetch(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(prepare(fetchGet(url, abortSignal)));
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}

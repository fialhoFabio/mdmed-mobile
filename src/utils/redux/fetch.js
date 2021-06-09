import {fetchDelete, fetchPost, fetchSubmit} from '../fetchHelper';
import {
  fetchSetAbortState,
  fetchSetCompleteState,
  fetchSetErrorState,
  fetchSetStartState,
} from './app/actionCreators';
import {formigoInputSetServerErrors} from './formigo/actionCreators';

const errorFlag = '[redux/fetch]';

function runRedirect (redirect) {
  // a sessão expirou e um suggest de combo é acionado
  // a sessão expirou e roda um autosave
  // a sessão expirou e um form foi submetido
  // browserHistory.replace(redirect.url || redirect.pathname + (redirect.search || ''));
  // TODO login screen
}

/**
 * @param {Promise} fetchPromise
 * @param {{isFetching: Boolean, isHiddenFetching: Boolean, urlFetching: String}} start params
 *
 * @returns {Promise}
 */
function prepare (fetchPromise, {isFetching, isHiddenFetching, urlFetching}) {
  return (dispatch) => {
    dispatch(fetchSetStartState({isFetching, isHiddenFetching, urlFetching}));
    return fetchPromise
      .then((response) => response.text())
      .then((responseText) => {
        try {
          return Promise.resolve(JSON.parse(responseText));
        } catch (e) {
          if (!responseText) {
            fetchPost('/settings/version-log', {url: urlFetching}); // FIXME: fritar na próxima versão
          }
          dispatch(fetchSetErrorState({message: responseText || 'No content', type: 'error'}));
          return Promise.reject(new Error(errorFlag + ' Invalid JSON, handled by application'));
        }
      })
      .then((responseData) => {
        const hasFeedbackForbidden = responseData.feedback && responseData.feedback.type === 'forbidden';
        if (!hasFeedbackForbidden) return Promise.resolve(responseData);
        dispatch(fetchSetErrorState()); // Pra não ficar indicando loading, a mensagem não é relevante por causa do redirect
        runRedirect(responseData.feedback.redirect);
        return Promise.reject(new Error(errorFlag + ' Server feedback forbidden, handled by application'));
      })
      .then((responseData) => {
        const hasFeedbackError = responseData.feedback && responseData.feedback.type === 'error';
        if (!hasFeedbackError) return Promise.resolve(responseData);
        dispatch(fetchSetErrorState(responseData.feedback));
        if (responseData.feedback.modelErrors) {
          const {modelErrors} = responseData.feedback;
          dispatch(formigoInputSetServerErrors(modelErrors.errors, modelErrors.modelName)); // server errors do form
        }
        return Promise.reject(new Error(errorFlag + ' Server feedback error, handled by application'));
      })
      .then((responseData) => {
        dispatch(fetchSetCompleteState(responseData.feedback));
        return Promise.resolve(responseData);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          dispatch(fetchSetAbortState());
        } else if (error.message && error.message.indexOf(errorFlag) === -1) {
          dispatch(fetchSetErrorState());
        }
        // É necessário lançar um reject aqui pro then chain travar em caso de erro em algum dos anteriores
        // Caso contrário o then do responseData, na aplicacação sempre vai ser acionado
        // Reject string pra não lançar erro da promise em tela, o erro já é tratado no client
        // Pro uso na aplicação deve-se tratar esse erro com catch, caso queira que não apareça no console log
        return Promise.reject(error.message);
      });
  };
}

function getOverlapMessage (preventOverlap, state, currentUrl, currentFnName) {
  let overlapMessage = errorFlag + ' ';
  overlapMessage += currentFnName + ' is trying to request ' + currentUrl + ', ';
  overlapMessage += 'while ' + state.app.urlFetching + ' still running';
  return preventOverlap && state.app.isFetching ? overlapMessage : null;
}

/**
 * @param {String} url
 * @param {Object} bodyParams
 * @param {AbortSignal} abortSignal
 * @returns {Promise}
 */
export function fetchDeleteRecord (url, bodyParams, abortSignal = null) {
  return (dispatch) => {
    return dispatch(prepare(
      fetchDelete(url, bodyParams, abortSignal),
      {isFetching: true, isHiddenFetching: false, urlFetching: url},
    ));
  };
}

/**
 * Requisições de apis externas, sem nenhum settings default
 *
 * @param {String} url
 * @param {Object} settings
 * @returns {Promise}
 */
export function fetchExternal (url, settings) {
  return (dispatch) => {
    return dispatch(prepare(
      fetch(url, settings),
      {isFetching: true, isHiddenFetching: false, urlFetching: url},
    ));
  };
}

/**
 * Não aciona o isFetching, usa indicador de carregamento próprio
 *
 * @param {String} url
 * @param {Object} bodyParams
 * @param {AbortSignal} abortSignal
 * @returns {Promise}
 */
export function fetchHidden (url, bodyParams = null, abortSignal = null) {
  return (dispatch) => {
    return dispatch(prepare(
      fetchPost(url, bodyParams, abortSignal),
      {isFetching: false, isHiddenFetching: true, urlFetching: url},
    ));
  };
}

/**
 * @param {String} url
 * @param {Object} bodyParams
 * @param {AbortSignal} abortSignal
 * @param {Boolean} preventOverlap
 * @returns {Promise}
 */
export function fetchRequest (url, bodyParams = null, abortSignal = null, preventOverlap = false) {
  return (dispatch, getState) => {
    const overlapMessage = getOverlapMessage(preventOverlap, getState(), url, 'fetchRequest');
    if (overlapMessage) return Promise.reject(overlapMessage); // Não roda a requisição se já tiver algo rodando
    return dispatch(prepare(
      fetchPost(url, bodyParams, abortSignal),
      {isFetching: true, isHiddenFetching: false, urlFetching: url},
    ));
  };
}

/**
 * @param {String} url
 * @param {FormData} formData
 * @param {AbortSignal} abortSignal
 * @param {Boolean} preventOverlap
 * @returns {Promise}
 */
export function fetchSubmitData (url, formData, abortSignal = null, preventOverlap = true) {
  return (dispatch, getState) => {
    const overlapMessage = getOverlapMessage(preventOverlap, getState(), url, 'fetchSubmitData');
    if (overlapMessage) return Promise.reject(overlapMessage); // Não roda a requisição se já tiver algo rodando
    return dispatch(prepare(
      fetchSubmit(url, formData, abortSignal),
      {isFetching: true, isHiddenFetching: false, urlFetching: url},
    ));
  };
}

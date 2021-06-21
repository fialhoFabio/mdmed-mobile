import React, {createContext, useContext} from 'react';
import {
  useDispatchFetchSubmitData,
  useDispatchFormigoSetAttrErrors,
  useDispatchFormigoSetAttrValue,
} from '../utils/context/formigo/hooks';
import useFormContextReducer from '../utils/context/formigo/reducers';

const FormContextState = createContext();
const FormContextHooks = createContext();

export function useGetFormigoState () {
  return useContext(FormContextState);
}

export function useFormigoHooks () {
  return useContext(FormContextHooks);
}

export function FormContextProvider ({action, children}) {
  const [state, dispatch] = useFormContextReducer();
  console.log('state:', state);

  const FormContextHooksFns = {
    fetchSubmitData: useDispatchFetchSubmitData(dispatch, action),
    setFormigoAttrError: useDispatchFormigoSetAttrErrors(dispatch),
    setFormigoAttrValue: useDispatchFormigoSetAttrValue(dispatch),
  };

  return (
    <FormContextState.Provider value = {state}>
      <FormContextHooks.Provider value = {FormContextHooksFns}>
        {children}
      </FormContextHooks.Provider>
    </FormContextState.Provider>
  );
}

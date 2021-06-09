import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchDeleteRecord,
  fetchExternal,
  fetchHidden,
  fetchRequest,
} from '../fetch';
import {routeFetchGet} from '../routeFetch';
import {
  appResetState,
  appSetValue,
} from './actionCreators';

/**
 */

export const useDispatchAppResetState = () => {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(appResetState()),
    [dispatch],
  );
};

/**
 */

export const useDispatchAppSetValue = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (value) => dispatch(appSetValue(keyPath, value)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export function useSelectorAppValue (keyPath) {
  return useSelector((state) => state.app.getIn(keyPath));
}

/** *************************************************
 ********************* FETCH ************************
 ************************************************** */

export const useDispatchFetchDeleteRecord = () => {
  const dispatch = useDispatch();
  return useCallback(
    (url, bodyParams, abortSignal) => dispatch(fetchDeleteRecord(url, bodyParams, abortSignal)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFetchExternal = () => {
  const dispatch = useDispatch();
  return useCallback(
    (url, settings) => dispatch(fetchExternal(url, settings)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFetchHidden = () => {
  const dispatch = useDispatch();
  return useCallback(
    (url, bodyParams, abortSignal) => dispatch(fetchHidden(url, bodyParams, abortSignal)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFetchRequest = () => {
  const dispatch = useDispatch();
  return useCallback(
    (url, bodyParams, abortSignal, preventOverlap) => dispatch(fetchRequest(url, bodyParams, abortSignal, preventOverlap)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchRouteFetchGet = () => {
  const dispatch = useDispatch();
  return useCallback(
    (url, abortSignal) => dispatch(routeFetchGet(url, abortSignal)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

import {useCallback, useRef} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {
  userPreferencesMergeObject,
  userPreferencesSetValue,
} from './actionCreators';

/**
 */

export const useDispatchUserPreferencesSetValue = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (newValue) => dispatch(userPreferencesSetValue(keyPath, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export const useDispatchUserPreferencesMergeObject = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (mergeableData) => dispatch(userPreferencesMergeObject(keyPath, mergeableData)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export function useSelectorUserPreferencesValue (keyPath) {
  return useSelector((state) => state.userPreferences.getIn(keyPath));
}

export function useInitUserPreferencesValue (keyPath) {
  const {current: state} = useRef(useStore().getState());
  return state.userPreferences.getIn(keyPath);
}

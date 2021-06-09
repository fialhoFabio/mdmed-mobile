import {useCallback, useRef} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';

import {
  fileSetValue,
} from './actionCreators';

/**
 */

export const useDispatchFileSetValue = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (newValue) => dispatch(fileSetValue(keyPath, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export function useSelectorFileValue (keyPath) {
  return useSelector((state) => state.file.getIn(keyPath));
}

export function useInitFileValue (keyPath) {
  const {current: state} = useRef(useStore().getState());
  return state.file.getIn(keyPath);
}

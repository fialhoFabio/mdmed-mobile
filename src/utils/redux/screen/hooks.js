import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  screenMergeObject,
  screenSetValue,
} from './actionCreators';

/**
 */

export const useDispatchScreenSetValue = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (newValue) => dispatch(screenSetValue(keyPath, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export const useDispatchScreenMergeObject = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (mergeableData) => dispatch(screenMergeObject(keyPath, mergeableData)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export function useSelectorScreenValue (keyPath) {
  return useSelector((state) => state.screen.getIn(keyPath));
}

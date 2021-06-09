import {useCallback, useRef} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';

import {
  indexDataAddArrayItemAtBeginning,
  indexDataMergeArray,
  indexDataRemoveArrayItem,
  indexDataSetValue,
} from './actionCreators';

/**
 */

export const useDispatchIndexDataSetValue = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (newValue) => dispatch(indexDataSetValue(keyPath, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchIndexDataSetKeyPathValue = () => {
  const dispatch = useDispatch();
  return useCallback(
    (keyPath, newValue) => dispatch(indexDataSetValue(keyPath, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export const useDispatchIndexDataMergeArray = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (moreRows) => dispatch(indexDataMergeArray(keyPath, moreRows)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export const useDispatchIndexDataAddKeyPathArrayItemAtBeginning = () => {
  const dispatch = useDispatch();
  return useCallback(
    (keyPath, newValue) => dispatch(indexDataAddArrayItemAtBeginning(keyPath, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchIndexDataRemoveKeyPathArrayItem = () => {
  const dispatch = useDispatch();
  return useCallback(
    (keyPath, newValue) => dispatch(indexDataRemoveArrayItem(keyPath, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export function useInitIndexDataValue (keyPath) {
  const {current: state} = useRef(useStore().getState());
  return state.indexData.getIn(keyPath);
}

export function useSelectorIndexDataValue (keyPath) {
  return useSelector((state) => state.indexData.getIn(keyPath));
}

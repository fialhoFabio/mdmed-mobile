import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getArrayLength, getObjectLength} from '../selectors';

import {
  chatAddObjectItem,
  chatMergeArray,
  chatSetValue,
} from './actionCreators';

/**
 */

export const useDispatchChatSetValue = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (newValue) => dispatch(chatSetValue(keyPath, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchChatSetKeyPathValue = () => {
  const dispatch = useDispatch();
  return useCallback(
    (keyPath, newValue) => dispatch(chatSetValue(keyPath, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export const useDispatchChatMergeArray = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (moreRows) => dispatch(chatMergeArray(keyPath, moreRows)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchChatMergeKeyPathArray = () => {
  const dispatch = useDispatch();
  return useCallback(
    (keyPath, moreRows) => {
      return dispatch(chatMergeArray(keyPath, moreRows));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export const useDispatchChatAddObjectItem = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (itemKey, itemValue) => dispatch(chatAddObjectItem(keyPath, itemKey, itemValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export function useSelectorChatValue (keyPath) {
  return useSelector((state) => state.chat.getIn(keyPath));
}

/**
 */

export function useSelectorChatArrayLength (keyPath) {
  return useSelector((state) => {
    return getArrayLength(state.chat, keyPath);
  });
}

export function useSelectorChatObjectLength (keyPath) {
  return useSelector((state) => {
    // console.log('a', keyPath, state.chat.getIn(keyPath));
    // return 0;
    return getObjectLength(state.chat, keyPath);
  });
}

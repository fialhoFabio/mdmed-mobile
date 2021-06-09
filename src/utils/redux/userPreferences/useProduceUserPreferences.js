import {useRef, useState} from 'react';
import immerProduce from 'immer';
import {useDispatchFetchHidden} from '../app/hooks';
import {useDidUpdateEffect, useValueDebounce} from '../../hooks';
import {useDispatchUserPreferencesMergeObject} from './hooks';

function useProduceUserPreferences (params) {
  const {current: initBodyParams} = useRef((params && params.initBodyParams) || {});
  const [bodyParams, setBodyParams] = useState(initBodyParams);

  const preventSave = params && params.preventSave;

  const fetchHidden = useDispatchFetchHidden();
  const mergeUserPreferences = useDispatchUserPreferencesMergeObject([]);

  const debouncedBodyParams = useValueDebounce(bodyParams, params && params.saveDelay);

  useDidUpdateEffect(() => {
    if (!preventSave) {
      // console.log('user preferences modify', debouncedBodyParams);
      fetchHidden('/profile/self/preferences-modify', debouncedBodyParams);
    }
  }, [debouncedBodyParams, fetchHidden, preventSave]);

  useDidUpdateEffect(() => {
    // console.log('user preferences merge state', bodyParams);
    mergeUserPreferences(bodyParams);
  }, [bodyParams, mergeUserPreferences]);

  return (cb) => {
    setBodyParams(immerProduce(bodyParams, cb));
  };
}

export default useProduceUserPreferences;

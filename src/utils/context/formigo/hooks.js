import {useCallback} from 'react';
import {
  formigoSetAttrErrors,
  formigoSetAttrValue,
} from './actionCreators';
import {fetchSubmitData} from '../fetch';

export function useDispatchFormigoSetAttrValue (dispatch) {
  return useCallback(
    (attribute, value) => dispatch(formigoSetAttrValue(attribute, value)),
    [dispatch],
  );
}

export function useDispatchFormigoSetAttrErrors (dispatch) {
  return useCallback(
    (attribute, value) => dispatch(formigoSetAttrErrors(attribute, value)),
    [dispatch],
  );
}

export const useDispatchFetchSubmitData = (dispatch, action) => {
  return useCallback(
    (bodyParams, abortSignal, preventOverlap) => dispatch(fetchSubmitData(action, bodyParams, abortSignal, preventOverlap)),
    [dispatch],
  );
};

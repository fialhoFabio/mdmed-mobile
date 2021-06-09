import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  attendanceAddArrayItemAtEnd,
  attendanceMergeObject,
  attendanceSetValue,
} from './actionCreators';

/**
 */

export const useDispatchAttendanceSetValue = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (newValue) => dispatch(attendanceSetValue(keyPath, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export const useDispatchAttendanceMergeKeyPathObject = () => {
  const dispatch = useDispatch();
  return useCallback(
    (keyPath, mergeableData) => dispatch(attendanceMergeObject(keyPath, mergeableData)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export const useDispatchAttendanceAddArrayItemAtEnd = (keyPath) => {
  const dispatch = useDispatch();
  return useCallback(
    (itemValue) => dispatch(attendanceAddArrayItemAtEnd(keyPath, itemValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 */

export function useSelectorAttendanceValue (keyPath) {
  return useSelector((state) => state.attendance.getIn(keyPath));
}

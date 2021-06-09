import {useRef} from 'react';
import {useSelector, useStore} from 'react-redux';

export function useSelectorFrozenishValue (itemKey) {
  // É necessário obter o valor vivo em alguns poucos casos
  return useSelector((state) => state.frozen[itemKey]);
}

export function useFrozenState () {
  const {current: state} = useRef(useStore().getState());
  return state.frozen;
}

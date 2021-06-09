import {useCallback, useRef} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {getArrayLength} from '../selectors';
import {
  formigoAttrAddArrayItem,
  formigoAttrMergeObject,
  formigoAttrRemoveArrayItem,
  formigoAttrSetValue,
  formigoHandFillSetValue,
  formigoInputMask,
  formigoInputPrepare,
  formigoInputAddValidator,
  formigoInputResetErrors,
  formigoInputResetValidators,
  formigoInputValidate,
  formigoLoadingSetValue,
  formigoManualAddValidator,
  formigoManualResetValidators,
  formigoManualValidate,
  formigoProduceState,
  formigoSetAuxValue,
} from './actionCreators';

/**
 */

export const useDispatchFormigoInputMask = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    (mask) => dispatch(formigoInputMask(attribute, mask)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoInputPrepare = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    (initValue, mask) => {
      dispatch(formigoInputPrepare(attribute, initValue, mask));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 * Validators
 */

export const useDispatchFormigoInputAddValidator = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    (itemValue) => dispatch(formigoInputAddValidator(attribute, itemValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoInputResetErrors = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(formigoInputResetErrors(attribute)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoInputResetKeyPathErrors = () => {
  const dispatch = useDispatch();
  return useCallback(
    (attribute) => dispatch(formigoInputResetErrors(attribute)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoInputResetValidators = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(formigoInputResetValidators(attribute)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoInputValidate = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(formigoInputValidate(attribute)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoManualAddValidator = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    (flag, validator) => dispatch(formigoManualAddValidator(attribute, flag, validator)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoManualResetValidators = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(formigoManualResetValidators(attribute)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoManualValidate = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    (flag, value, resolve) => dispatch(formigoManualValidate(attribute, flag, value, resolve)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 * Setters
 */

export const useDispatchFormigoAttrAddArrayItem = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    /**
     * @param {*} itemValue
     * @param {{preventHasChanged: Boolean}} p
     * @returns {*}
     */
    (itemValue, p = undefined) => dispatch(formigoAttrAddArrayItem(attribute, itemValue, p)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoAttrMergeObject = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    /**
     * @param {Object} mergeableData
     * @param {{preventHasChanged: Boolean}} p
     * @returns {*}
     */
    (mergeableData, p = undefined) => dispatch(formigoAttrMergeObject(attribute, mergeableData, p)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoProduceState = () => {
  const dispatch = useDispatch();
  return useCallback(
    /**
     * @param {function(Proxy)} callback
     * @param {{preventHasChanged: Boolean}} p
     * @returns {*}
     */
    (callback, p = undefined) => dispatch(formigoProduceState(callback, p)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoAttrRemoveArrayItem = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    /**
     * @param {Number} index
     * @param {{preventHasChanged: Boolean}} p
     * @returns {*}
     */
    (index, p = undefined) => dispatch(formigoAttrRemoveArrayItem(attribute, index, p)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoAttrSetValue = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    /**
     * @param {*} newValue
     * @param {{preventHasChanged: Boolean}} p
     * @returns {*}
     */
    (newValue, p = undefined) => dispatch(formigoAttrSetValue(attribute, newValue, p)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoAttrSetKeyPathValue = () => {
  const dispatch = useDispatch();
  return useCallback(
    /**
     * @param {Array.<String>} attribute
     * @param {*} newValue
     * @param {{preventHasChanged: Boolean}} p
     * @returns {*}
     */
    (attribute, newValue, p = undefined) => dispatch(formigoAttrSetValue(attribute, newValue, p)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 * Aux
 */

export const useDispatchFormigoFrontFormHasChangedReset = () => {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(formigoSetAuxValue(['frontFormHasChanged'], {})),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoHandFillSetValue = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    (newValue) => dispatch(formigoHandFillSetValue(attribute, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

export const useDispatchFormigoLoadingSetValue = (attribute) => {
  const dispatch = useDispatch();
  return useCallback(
    (newValue) => dispatch(formigoLoadingSetValue(attribute, newValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
};

/**
 * Getters
 */

export function useInitFormigoAttrValue (attribute) {
  const {current: state} = useRef(useStore().getState());
  return state.formigo.getIn(['attr'].concat(attribute));
}

export function useSelectorFormigoValue (keyPath) {
  return useSelector((state) => {
    return state.formigo.getIn(keyPath);
  });
}

export function useSelectorFormigoAttrValue (attribute) {
  return useSelectorFormigoValue(['attr'].concat(attribute));
}

/**
 */

export function useSelectorFormigoInputDraftJsEditorState (attribute) {
  const attributeKey = attribute.join('.');
  return useSelector((state) => {
    return state.formigo.getIn(['draftJsEditorState', attributeKey]);
  });
}

export function useSelectorFormigoInputErrors (attribute) {
  const attributeKey = attribute.join('.');
  return useSelector((state) => {
    const inputErrors = state.formigo.getIn(['inputErrors', attributeKey]);
    const serverErrors = state.formigo.getIn(['serverErrors', attributeKey]);
    return inputErrors || serverErrors;
  });
}

/**
 */

export function useSelectorFormigoInputReadyValue (attribute) {
  const attributeKey = attribute.join('.');
  return useSelector((state) => {
    return state.formigo.getIn(['ready', attributeKey]);
  });
}

export function useSelectorFormigoHandFillValue (attribute) {
  const attributeKey = attribute.join('.');
  return useSelector((state) => {
    return state.formigo.getIn(['handFill', attributeKey]);
  });
}

export function useSelectorFormigoLoadingValue (attribute) {
  const attributeKey = attribute.join('.');
  return useSelector((state) => {
    return state.formigo.getIn(['loading', attributeKey]);
  });
}

/**
 */

export function useStoreFormigoAttrGetKeyPathValue () {
  const store = useStore();
  return useCallback((attribute) => {
    return store.getState().formigo.getIn(['attr'].concat(attribute));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);
}

export function useStoreFormigoAttrGetValue (attribute) {
  const store = useStore();
  return useCallback(() => {
    return store.getState().formigo.getIn(['attr'].concat(attribute));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);
}

export function useStoreFormigoDraftJsGetEditorState (attribute) {
  const store = useStore();
  const attributeKey = attribute.join('.');
  return useCallback(() => {
    return store.getState().formigo.getIn(['draftJsEditorState', attributeKey]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);
}

export function useStoreFormigoFrontFormHasChanged () {
  const store = useStore();
  return useCallback(() => {
    const state = store.getState().formigo;
    console.log('useStoreFormigoFrontFormHasChanged', state.frontFormId, state.frontFormHasChanged);
    return state.getIn(['frontFormHasChanged', state.frontFormId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);
}

/**
 */

export function useSelectorAttrArrayLength (attribute) {
  return useSelector((state) => {
    return getArrayLength(state.formigo, ['attr'].concat(attribute));
  });
}

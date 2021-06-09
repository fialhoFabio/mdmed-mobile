import {batch} from 'react-redux';
import {
  useDispatchFormigoManualAddValidator,
  useDispatchFormigoManualResetValidators,
} from '../../../utils/redux/formigo/hooks';
import {useDidMountEffect, useDidUpdateEffect} from '../../../utils/hooks';

export const MANUAL_VALIDATOR_ADD_KEY = 'add';

/**
 * @param {Object} params
 * @param {{[String]: func}} manualValidators
 */

function useManualValidators (params, manualValidators) {
  const {
    attribute,
    disabled,
    readOnly,
  } = params;

  const manualValidatorsKeys = Object.keys(manualValidators);

  const addManualValidator = useDispatchFormigoManualAddValidator(attribute);
  const resetManualValidators = useDispatchFormigoManualResetValidators(attribute);

  const preventValidate = disabled || readOnly;

  const addManualValidators = () => {
    if (!preventValidate) {
      manualValidatorsKeys.forEach((itemKey) => {
        addManualValidator(itemKey, manualValidators[itemKey]);
      });
    }
  };

  useDidMountEffect(() => {
    batch(() => {
      addManualValidators();
    });
  });

  useDidUpdateEffect(() => {
    // Em caso de mudança de preventValidate (o readOnly pode mudar) ou alguma propriedade relacionada aos validators
    // roda o processo novamente devem ser reinseridos, é muito mais fácil racionalizar assim do que tirar e inserir pontualmente
    batch(() => {
      resetManualValidators();
      addManualValidators();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preventValidate]);
}

export default useManualValidators;

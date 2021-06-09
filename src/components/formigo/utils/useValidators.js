import {batch} from 'react-redux';
import {useSubmitIdContext} from '../../../shared/utils/withContext';
import {
  useDispatchFormigoInputAddValidator,
  useDispatchFormigoInputResetErrors,
  useDispatchFormigoInputResetValidators,
} from '../../../utils/redux/formigo/hooks';
import {useDidMountEffect, useDidUpdateEffect, useWillUnmountEffect} from '../../../utils/hooks';
import {
  checkRequiredValidator,
  descriptionRequiredValidator,
  minSizeOneRequiredValidator,
  requiredValidator,
} from './validators';

export const VALIDATION_TYPE_CHECK_BOX = 'check-box';
export const VALIDATION_TYPE_CHECK_GROUP = 'check-group';
export const VALIDATION_TYPE_COMBO = 'combo';
export const VALIDATION_TYPE_INPUT = 'input';
export const VALIDATION_TYPE_SUGGEST = 'suggest';
export const VALIDATION_TYPE_INPUT_GROUP_SELECTION = 'input-group-selection';
export const VALIDATION_TYPE_RADIO_GROUP = 'radio-group';
export const VALIDATION_TYPE_TAG_SUGGEST = 'tag-suggest';

/**
 * @param {Object} params
 * @param {Array<func>} additionalValidators
 */
function useValidators (params, additionalValidators = []) {
  const {
    attribute,
    checkValue, // CheckBox/CheckSwitch
    dataListItemDescriptionAttribute, // ComboBox/Select
    disabled,
    forceValidateOnSubmit,
    readOnly,
    required,
    validationType,
  } = params;

  const submitIdContext = useSubmitIdContext();
  const submitId = submitIdContext && submitIdContext.submitId;

  const addValidator = useDispatchFormigoInputAddValidator(attribute);
  const resetErrors = useDispatchFormigoInputResetErrors(attribute);
  const resetValidators = useDispatchFormigoInputResetValidators(attribute);

  const preventValidate = disabled || (readOnly && !forceValidateOnSubmit);

  const addValidators = () => {
    if (!preventValidate) {
      if (required) {
        switch (validationType) {
          case VALIDATION_TYPE_CHECK_BOX:
            addValidator({run: checkRequiredValidator({attribute, checkValue}), submitId});
            break;
          case VALIDATION_TYPE_COMBO:
            addValidator({run: descriptionRequiredValidator({dataListItemDescriptionAttribute}), submitId});
            break;
          case VALIDATION_TYPE_CHECK_GROUP:
          case VALIDATION_TYPE_INPUT_GROUP_SELECTION:
          case VALIDATION_TYPE_TAG_SUGGEST:
            addValidator({run: minSizeOneRequiredValidator({attribute}), submitId});
            break;
          default:
            // VALIDATION_TYPE_INPUT
            // VALIDATION_TYPE_RADIO_GROUP
            // VALIDATION_TYPE_SUGGEST
            addValidator({run: requiredValidator({attribute}), submitId});
        }
      }
      additionalValidators.forEach((validator) => {
        addValidator({run: validator, submitId});
      });
    }
  };

  useDidMountEffect(() => {
    batch(() => {
      resetValidators();
      addValidators();
    });
  });

  useDidUpdateEffect(() => {
    // Em caso de mudança de preventValidate (o readOnly pode mudar) ou alguma propriedade relacionada aos validators
    // roda o processo novamente devem ser reinseridos, é muito mais fácil racionalizar assim do que tirar e inserir pontualmente
    batch(() => {
      resetErrors();
      resetValidators();
      addValidators();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preventValidate, required]);

  useWillUnmountEffect(() => {
    batch(() => {
      resetErrors();
      resetValidators();
    });
  });
}

export default useValidators;

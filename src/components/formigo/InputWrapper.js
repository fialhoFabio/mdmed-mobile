// import styles from 'components/formigo/styles/wrapper.module.css';

import React from 'react';
import PropTypes from 'prop-types';
import FormElement from './layout/FormElement';
import {useSelectorFormigoInputErrors} from '../../utils/redux/formigo/hooks';

function InputWrapper (props) {
  const {
    attribute,
    children,
    label,
    labelHint,
    inputId,
  } = props;

  const inputErrors = useSelectorFormigoInputErrors(attribute);

  const hasError = !!inputErrors;

  let resolvedLabel = label;
  if (label && labelHint) {
    resolvedLabel += '<em class="form-hint">' + labelHint + '</em>';
  }

  return (
    <FormElement>
      {label ? (
        <label
          className = "input-label"
          dangerouslySetInnerHTML = {{__html: resolvedLabel}}
          htmlFor = {inputId}
        />
      ) : null}
      {children}
      {hasError ? <em>{inputErrors.join('; ')}</em> : null}
    </FormElement>
  );
}

InputWrapper.propTypes = {
  attribute: PropTypes.arrayOf(PropTypes.string).isRequired, /* eslint-disable-line react/no-unused-prop-types */ // mapSTP
  children: PropTypes.node.isRequired,
  inputId: PropTypes.string, // id do input para o for do label
  label: PropTypes.string,
  labelHint: PropTypes.string,
};

export default InputWrapper;

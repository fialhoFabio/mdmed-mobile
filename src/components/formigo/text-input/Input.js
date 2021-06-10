import inputStyles from '../styles/input-and-textarea.style.js';

import React from 'react';
import {Text, TextInput, View} from 'react-native';
import InputPrepend from '../InputPrepend';
import PropTypes from 'prop-types';

function Input (props) {
  const {
    error,
    name,
    formHandleChange,
    iconName,
    placeholder,
    secureTextEntry,
    textContentType,
    value,
  } = props;
  return (
    <View style = {inputStyles.inputWrapper}>
      <View style = {[inputStyles.input, error ? inputStyles.inputWarning : null]}>
        <TextInput
          onChangeText = {formHandleChange(name)} // TODO: precisa para o formigo controlar o input, depois implementar no redux
          placeholder = {placeholder}
          secureTextEntry = {secureTextEntry} /* FIXME: Tem um erro de estilo no placeholder do input por causa disso: https://github.com/facebook/react-native/issues/30123 */
          style = {inputStyles.inputText}
          textContentType = {textContentType}
          value = {value} // TODO: precisa para o formigo controlar o input, depois implementar no redux
        />
        <InputPrepend iconName = {iconName}/>
      </View>
      {error ? <Text style = {inputStyles.waringText}>{error[0]}</Text> : null}
    </View>
  );
}

Input.propTypes = {
  error: PropTypes.arrayOf(PropTypes.string),
  formHandleChange: PropTypes.func,
  iconName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  textContentType: PropTypes.string,
  value: PropTypes.string,
};

export default Input;

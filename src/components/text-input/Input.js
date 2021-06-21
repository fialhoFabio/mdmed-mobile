import inputStyles from '../styles/input-and-textarea.style.js';

import React from 'react';
import {Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import {useFormigoHooks, useGetFormigoState} from '../useFormContext';

function Input (props) {
  const {
    attribute,
    placeholder,
    secureTextEntry,
  } = props;

  const {
    setFormigoAttrValue,
  } = useFormigoHooks();

  const context = useGetFormigoState();

  const error = false; // TODO field error

  return (
    <View style = {inputStyles.inputWrapper}>
      <View style = {[inputStyles.input, error ? inputStyles.inputWarning : null]}>
        <TextInput
          onChangeText = {(value) => setFormigoAttrValue(attribute, value)}
          placeholder = {placeholder}
          secureTextEntry = {secureTextEntry}
          style = {inputStyles.inputText}
          value = {context.getIn(['attr'].concat(attribute))}
        />
      </View>
      {error ? <Text style = {inputStyles.waringText}>{error[0]}</Text> : null}
    </View>
  );
}

Input.propTypes = {
  attribute: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

export default Input;

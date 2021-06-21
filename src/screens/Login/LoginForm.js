import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import {FormContextProvider} from '../../components/useFormContext';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Input from '../../components/text-input/Input';

const modelName = 'LoginForm'; // É um model do php, não do db

function LoginForm () {
  return (
    <FormContextProvider action = "/login">
      <View>
        <Input
          attribute = {[modelName, 'username']}
          placeholder = "Usuario"
        />
        <Input
          attribute = {[modelName, 'password']}
          placeholder = "Senha"
          secureTextEntry = {true}
        />
        <SubmitButton/>
      </View>
    </FormContextProvider>
  );
}

export default LoginForm;

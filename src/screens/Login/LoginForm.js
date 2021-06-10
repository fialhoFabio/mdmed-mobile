import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Formigo, {Input} from '../../components/formigo/Formigo';
import PropTypes from 'prop-types';

const modelName = 'LoginForm'; // É um model do php, não do db

function LoginForm ({navigation}) { // TODO: HOC WITH SUBMIT USE EFFECT :) probably im gonna copy from the main project
  return (
    <Formigo action = "/login" modelName = {modelName}>
      {(props) => {
        return <LoginFormComponent {...props} navigation = {navigation}/>;
      }}
    </Formigo>
  );
}

function LoginFormComponent (props) {
  const {
    errors, // Formik
    handleChange, // Formik
    handleSubmit, // Formik
    navigation,
    values, // Formik
  } = props;
  const customHandleSubmit = () => {
    handleSubmit();
    if (!errors) {
      navigation.navigate('PatientList');
    }
  };
  return (
    <View>
      <Input
        autoFocus = {true}
        error = {errors.username}
        formHandleChange = {handleChange}
        name = "username"
        placeholder = "Usuario"
        value = {values.username}
      />
      <Input
        error = {errors.password}
        formHandleChange = {handleChange}
        name = "password"
        placeholder = "Senha"
        secureTextEntry = {true}
        value = {values.password}
      />
      <TouchableOpacity // TODO: Custom component ->> SubmitButton
        onPress = {customHandleSubmit}
        style = {styles.button}
        title = "Submit"
      >
        <Text style = {styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#d51f26',
    height: 48,
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

LoginForm.propTypes = {
  navigation: PropTypes.instanceOf(Object),
};

LoginFormComponent.propTypes = {
  errors: PropTypes.instanceOf(Object),
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  navigation: PropTypes.instanceOf(Object),
  values: PropTypes.instanceOf(Object),
};

export default LoginForm;

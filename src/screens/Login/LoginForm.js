import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Formigo, {Input} from '../../components/formigo/Formigo';

function LoginForm () {
  return (
    <Formigo>
      {(handleChange, handleSubmit, values) => (
        <View>
          <Input
            autoFocus = {true}
            formHandleChange = {handleChange}
            name = "username"
            placeholder = "Usuario"
            value = {values.username}
          />
          <Input
            formHandleChange = {handleChange}
            name = "password"
            placeholder = "Senha"
            secureTextEntry = {true}
            value = {values.password}
          />
          <TouchableOpacity // TODO: Custom component ->> SubmitButton
            onPress = {handleSubmit}
            style = {styles.button}
            title = "Submit"
          >
            <Text style = {styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formigo>
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

export default LoginForm;

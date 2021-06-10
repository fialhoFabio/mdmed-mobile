import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Formigo, {Input} from '../../components/formigo/Formigo';

const modelName = 'LoginForm'; // É um model do php, não do db

function LoginForm () {
  return (
    <Formigo action = "/login" modelName = {modelName}>
      {(error, handleChange, handleSubmit, values) => (
        <View>
          <Input
            autoFocus = {true}
            error = {error.username}
            formHandleChange = {handleChange}
            name = "username"
            placeholder = "Usuario"
            value = {values.username}
          />
          <Input
            error = {error.password}
            formHandleChange = {handleChange}
            name = "password"
            placeholder = "Senha"
            secureTextEntry = {true}
            value = {values.password}
          />
          <TouchableOpacity // TODO: Custom component ->> SubmitButton
            onPress = {() => handleSubmit('oi')}
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

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useFormigoHooks, useGetFormigoState} from '../useFormContext';

function SubmitButton () {
  const {fetchSubmitData} = useFormigoHooks();
  const context = useGetFormigoState();
  return (
    <TouchableOpacity
      onPress = {() => fetchSubmitData(context.getIn(['attr']))}
      style = {styles.button}
      title = "Submit"
    >
      <Text style = {styles.buttonText}>Enviar</Text>
    </TouchableOpacity>
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

export default SubmitButton;

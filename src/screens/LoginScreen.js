import React from 'react';
import {Text} from 'react-native';

function LoginScreen () {
  console.log('fetch:');
  fetch('http://api.mdmed.local').then((res) => console.log(res));
  return <Text>Login Screen</Text>;
}

export default LoginScreen;

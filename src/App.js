import styles from './App.style.js';

import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import Feedback from './Feedback';
import Routes from './Routes';
import ActivityIndicatorCustom from './shared/components/ActivityIndicatorCustom';

function App () {
  const {isLoading} = useState(false);
  if (isLoading) {
    return <ActivityIndicatorCustom/>;
  }
  return (
    <NavigationContainer>
      <View style = {styles.wrapper}>
        <Feedback feedback = {{}}/>
        <Routes/>
      </View>
    </NavigationContainer>
  );
}

export default App;

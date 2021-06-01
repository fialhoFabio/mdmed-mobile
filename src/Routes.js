import {createStackNavigator} from '@react-navigation/stack';
// import AuthLoading from './screens/AuthLoading/Screen';
// import Camera from './screens/Camera/Screen';
// import FileList from './screens/FileList/Screen';
// import Gate from './screens/Gate/Screen';
import Login from './screens/Login/Screen';
// import PatientList from './screens/PatientList/Screen';
// import PhotoPreview from './screens/PhotoPreview/Screen';
// import PhotoView from './screens/PhotoView/Screen';
import {colors} from './styles/global';

import React from 'react';


const Stack = createStackNavigator();

function Routes () {
  return (
    <Stack.Navigator>
      <Stack.Screen component = {Login} name = "Login"/>
    </Stack.Navigator>
  );
}

export default Routes;

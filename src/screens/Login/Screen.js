import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';

const logoImage = require('../../../assets/logo.png');

function Screen ({navigation}) {
  return (
    <>
      <View style = {styles.logoWrapper}>
        <Image source = {logoImage} style = {styles.logo}/>
      </View>
      <LoginForm navigation = {navigation}/>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 200,
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 120,
  },
});

Screen.propTypes = {
  navigation: PropTypes.instanceOf(Object),
};

export default Screen;

import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import globalStyles, {colors} from '../../styles/global';
import styles from './Screen.style';

class Screen extends Component {
  constructor () {
    super();
    this.state = {
      modelErrors: {},
      password: null,
      username: null,
    };
  }

  handleChangeTextUsername = (username) => {
    this.setState({username});
  };

  handleChangeTextPassword = (password) => {
    this.setState({password});
  };

  // handleSubmit = () => {
  //   const {navigation} = this.props;
  //   // const {sendData} = screenProps;
  //   const {password, username} = this.state;
  //   const data = {LoginForm: {password, remember_me: true, username}};
  //   // sendData('/login', data, (responseData) => {
  //   //   const {feedback} = responseData;
  //   //   if (feedback.type === 'success' && feedback.redirect.pathname === '/gate') {
  //   //     navigation.navigate('Gate', {password, username});
  //   //     return;
  //   //   }
  //   //   if (feedback.type === 'success' && feedback.redirect.pathname === '/home') {
  //   //     navigation.navigate('App');
  //   //     return;
  //   //   }
  //   //   const modelErrors = feedback.modelErrors.errors;
  //   //   if (modelErrors) {
  //   //     this.setState({modelErrors});
  //   //   }
  //   // }, true);
  // };

  render () {
    const {modelErrors} = this.state;
    const usernameInputStyleSet = [
      globalStyles.input,
      modelErrors.username ? globalStyles.inputWithError : null,
    ];
    const passwordInputStyleSet = [
      globalStyles.input,
      modelErrors.password ? globalStyles.inputWithError : null,
    ];
    return (
      <Fragment>
        <StatusBar backgroundColor = {colors.antiFlashWhite} barStyle = "dark-content"/>
        <SafeAreaView style = {styles.safeArea}>
          <View style = {styles.contentWrapperTop}>
            <View style = {styles.logoWrapper}>
            </View>
          </View>
          <View style = {styles.contentWrapperBottom}>
            <View style = {styles.inputMessageWrapper}>
              <TextInput
                autoCapitalize = "none"
                onChangeText = {this.handleChangeTextUsername}
                placeholder = "Login"
                style = {usernameInputStyleSet}
                underlineColorAndroid = "transparent"
              />
              {modelErrors.username
                ? (
                  <Text style = {globalStyles.inputErrorMessage}>
                    {modelErrors.username.join('; ')}
                  </Text>
                )
                : null}
            </View>
            <View style = {styles.inputMessageWrapper}>
              <TextInput
                autoCapitalize = "none"
                onChangeText = {this.handleChangeTextPassword}
                placeholder = "Senha"
                secureTextEntry = {true}
                style = {passwordInputStyleSet}
                underlineColorAndroid = "transparent"
              />
              {modelErrors.password
                ? (
                  <Text style = {globalStyles.inputErrorMessage}>
                    {modelErrors.password.join('; ')}
                  </Text>
                )
                : null
              }
            </View>
            <Button title = "Enviar" onPress = {this.handleSubmit} style = {styles.submitButton}/>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

Screen.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Screen;

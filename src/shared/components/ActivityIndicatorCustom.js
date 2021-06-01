import React from 'react';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../styles/global';
import styles from './ActivityIndicatorCustom.style';

function ActivityIndicatorCustom () {
  return (
    <ActivityIndicator
      color = {colors.activityIndicator}
      size = "large"
      style = {styles.activityIndicator}
    />
  );
}

export default ActivityIndicatorCustom;

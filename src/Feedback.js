import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './Feedback.style';

function Feedback (props) {
  const {feedback} = props;
  if (!feedback?.exception) return null;
  return (
    <View style = {styles.view}>
      <Text>{feedback.exception.message}</Text>
    </View>
  );
}

Feedback.propTypes = {
  feedback: PropTypes.instanceOf(Object),
};

export default Feedback;

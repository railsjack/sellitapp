import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const input = props => {
  let template;
  switch (props.type) {
    case 'textinput':
      template = (
        <TextInput
          underlineColorAndroid="transparent"
          {...props}
          style={[styles.input, styles.overrideStyle]}
        />
      );
      break;
    default:
      return template;
  }
  return template;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    padding: 5,
    marginTop: 10,
  },
});

export default input;

import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';

class Login extends Component {
  render() {
    return <Text style={styles.loginText}> Login </Text>;
  }
}

const styles = StyleSheet.create({
  loginText: {
    fontFamily: 'Roboto-Regular'
  }
});

export default Login;

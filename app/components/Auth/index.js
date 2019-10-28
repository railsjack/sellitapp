import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import Logo from './logo';

class Login extends Component {
  render() {
    return (
      <>
        <Logo />
      </>
    );
  }
}

const styles = StyleSheet.create({
  loginText: {
    fontFamily: 'Roboto-Regular'
  }
});

export default Login;

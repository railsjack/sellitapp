import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import Logo from './logo';

import {
  getOrientation,
  setOrientationListener,
  removeOrientationListener,
} from '../utils/misc';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: getOrientation(),
    };

    setOrientationListener(this.changeOrientation);
  }

  changeOrientation = () => {
    this.setState({
      orientation: getOrientation(),
    });
  };

  componentWillUnmount() {
    removeOrientationListener();
  }

  render() {
    return (
      <>
        <Logo orientation={this.state.orientation} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  loginText: {
    fontFamily: 'Roboto-Regular',
  },
});

export default Login;

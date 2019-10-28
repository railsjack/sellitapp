import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Logo from './logo';
import LoginPanel from './loginPanel';

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
      logoAnimFinished: false,
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

  onLogoAnimFinished = () => {
    this.setState({
      logoAnimFinished: true,
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Logo
          animFinished={this.onLogoAnimFinished}
          orientation={this.state.orientation}
        />
        <LoginPanel
          show={this.state.logoAnimFinished}
          orientation={this.state.orientation}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default Login;

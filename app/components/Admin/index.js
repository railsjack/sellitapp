import React, {Component} from 'react';
import {Button, Text} from 'react-native';
import {removeToken} from '../utils/misc';

class Admin extends Component {
  logout = () => {
    removeToken(() => {
      this.props.navigation.navigate('Auth');
    });
  };
  render() {
    return (
      <>
        <Text> Admin </Text>
        <Button title="Logout" onPress={this.logout} />
      </>
    );
  }
}

export default Admin;

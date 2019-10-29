import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';

import Input from '../utils/forms/inputs';
import {getPlatform} from '../utils/misc';
import ValidationRules from '../utils/forms/validationRules';

class LoginForm extends Component {
  state = {
    type: 'Login',
    action: 'Login',
    actionMode: 'I want to register',
    form: {
      email: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isEmail: true,
        },
      },
      password: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          minLength: 6,
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          confirmPass: 'password',
        },
      },
    },
  };

  updateInput = (name, value) => {
    let formCopy = this.state.form;
		formCopy[name].value = value;
		
		let rules = formCopy[name].rules;
		let valid = ValidationRules(value, rules, formCopy);
		formCopy[name].valid = valid;

    this.setState({
      hasErrors: valid,
      form: formCopy,
    });
  };

  changeFormType = () => {
    const type = this.state.type;
    this.setState({
      type: type === 'Login' ? 'Register' : 'Login',
      action: type === 'Login' ? 'Register' : 'Login',
      actionMode: type === 'Login' ? 'I want to login' : 'I want to register',
    });
  };

  confirmPassword = () =>
    this.state.type === 'Register' ? (
      <Input
        placeholder="Enter your confirm password"
        value={this.state.form.confirmPassword.value}
        type={this.state.form.confirmPassword.type}
        onChangeText={value => this.updateInput('confirmPassword', value)}
        secureTextEntry
      />
    ) : null;

  render() {
    const platform = getPlatform();
    const {action, actionMode} = this.state;
    return (
      <View style={styles.container}>
        <Input
          placeholder="Enter your email"
          value={this.state.form.email.value}
          type={this.state.form.email.type}
          onChangeText={value => this.updateInput('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          placeholder="Enter your password"
          value={this.state.form.password.value}
          type={this.state.form.password.type}
          onChangeText={value => this.updateInput('password', value)}
          secureTextEntry
        />
        {this.confirmPassword()}
        <View
          style={
            platform === 'android'
              ? styles.buttonStyleAndroid
              : styles.buttonStyleIOS
          }>
          <Button title={action} color="#fd9727" />
        </View>
        <View
          style={
            platform === 'android'
              ? styles.buttonStyleAndroid
              : styles.buttonStyleIOS
          }>
          <Button
            title={actionMode}
            onPress={this.changeFormType}
            color="lightgray"
          />
        </View>
        <View>
          <Button title="I'll do it later" color="lightgray" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
  },
  buttonStyleAndroid: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonStyleIOS: {
    marginBottom: 0,
  },
});

export default LoginForm;

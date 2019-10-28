import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Input from '../utils/forms/inputs';

class LoginForm extends Component {
	state = {
		form: {
			email: {
				value: "",
				valid: false,
				type: "textinput",
				rules: {
					isEmail: true
				}
			},
			password: {
				value: "",
				valid: false,
				type: "textinput",
				rules: {
					minLength: 6
				}
			},
			confirmPassword: {
				value: "",
				valid: false,
				type: "textinput",
				rules: {
					confirmPass: 'password'
				}
			}
		}
	};

	updateInput = (name, value) => {
		let formCopy = this.state.form;
		formCopy[name].value = value;

		this.setState({
			hasErrors: false,
			form: formCopy
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Input
					placeholder="Enter your email"
					value={this.state.form.email.value}
					type={this.state.form.email.type}
					onChangeText={value=>this.updateInput("email", value)}
					autoCapitalize="none"
					keyboardType="email-address"
				/>
				<Input
					placeholder="Enter your password"
					value={this.state.form.password.value}
					type={this.state.form.password.type}
					onChangeText={value=>this.updateInput("password", value)}
					secureTextEntry
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		minHeight: 400
	}
})

export default LoginForm;

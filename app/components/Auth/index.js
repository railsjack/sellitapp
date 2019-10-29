import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, ScrollView, View} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {autoSignIn} from '../../store/actions/user_actions';
import {setToken} from '../utils/misc';

import Logo from './logo';
import LoginPanel from './loginPanel';

import {
  getOrientation,
  setOrientationListener,
  removeOrientationListener,
  getToken,
} from '../utils/misc';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: getOrientation(),
      logoAnimFinished: false,
      loading: true,
    };

    setOrientationListener(this.changeOrientation);
  }

  componentDidMount() {
    getToken(values => {
      if (values[0][0] === null) {
        this.setState({loading: false});
      } else {
        this.props.autoSignIn(values[2][1]).then(() => {
          if (!this.props.User.auth.token) {
            this.setState({loading: false});
          } else {
            setToken(this.props.User.auth, () => {
              this.goNext();
            });
          }
        });
      }
    });
  }

  goNext = () => {
    this.props.navigation.navigate('App');
  };

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
    return this.state.loading ? (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator />
      </View>
    ) : (
      <ScrollView contentContainerStyle={styles.container}>
        <Logo
          animFinished={this.onLogoAnimFinished}
          orientation={this.state.orientation}
        />
        <LoginPanel
          goNext={this.goNext}
          User={this.props.User}
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
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    User: state.User
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({autoSignIn}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

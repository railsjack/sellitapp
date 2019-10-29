import React, {Component} from 'react';
import {Animated, Easing, Image, StyleSheet, Text, View} from 'react-native';

import LoginForm from './loginForm';
import BackImage from '../../../assets/images/loginPanel.jpg';

class LoginPanel extends Component {
  state = {
    imageAnim: new Animated.Value(0),
    formAnim: new Animated.Value(0),
    animFinished: false,
  };

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps.show !== prevProps.show) {
      return {show: nextProps.show};
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show !== this.props.show) {
      this.startAnimation();
    }
  }

  startAnimation = () => {
    if (this.props.show && !this.state.animFinished) {
      Animated.parallel([
        Animated.timing(this.state.imageAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.easeOutCubic,
        }),
        Animated.timing(this.state.formAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.easeOutCubic,
        }),
      ]).start(() => {
        this.setState({
          animFinished: true,
        });
      });
    }
  };

  render() {
    const {imageAnim, formAnim} = this.state;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: imageAnim,
          }}>
          <Image
            style={
							this.props.orientation === 'portrait'
							? styles.imageStylePortrait
							: styles.imageStyleLandscape
						}
            source={BackImage}
            resizeMode={'contain'}
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: formAnim,
            top: formAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          }}>
          <LoginForm User={this.props.User} goNext={this.props.goNext} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  imageStylePortrait: {
    width: 270,
    height: 150,
  },
  imageStyleLandscape: {
    height: 0,
  },
});

export default LoginPanel;

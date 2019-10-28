import React, {Component} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';

class Logo extends Component {
  state = {
    sellAnim: new Animated.Value(0),
    itAnim: new Animated.Value(0),
  };

  componentDidMount() {
    const {sellAnim, itAnim} = this.state;
    Animated.sequence([
      Animated.timing(sellAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.easeOutCubic,
      }),
      Animated.timing(itAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.easeOutCubic,
      }),
    ]).start(() => {});
  }

  render() {
    const {sellAnim, itAnim} = this.state;
    const orientation = this.props.orientation;
    return (
      <View
        style={
          orientation === 'portrait'
            ? styles.logoStylesPortrait
            : styles.logoStylesLandscape
        }>
        <Animated.View
          style={{
            opacity: sellAnim,
            top: sellAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          }}>
          <Text style={styles.sell}>Sell</Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: itAnim,
          }}>
          <Text style={styles.it}>It</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoStylesPortrait: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    maxHeight: 100,
  },
  logoStylesLandscape: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    maxHeight: 50,
  },
  sell: {
    fontSize: 30,
    color: 'darkblue',
    fontFamily: 'Roboto-Regular',
  },
  it: {
    fontSize: 30,
    color: 'darkgreen',
    fontFamily: 'Roboto-Regular',
  },
});

export default Logo;

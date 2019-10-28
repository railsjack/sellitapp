import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {RootNavigator} from './routes';

const App: () => React$Node = () => {
  const Nav = RootNavigator();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Nav />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default App;

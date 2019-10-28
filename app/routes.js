import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SignIn from './components/Auth';
import Home from './components/Home';
import SubHome from './components/Home/SubHome';
import Admin from './components/Admin';
import AddPost from './components/Admin/AddPost';

const HomeStack = createStackNavigator({
  Home,
  SubHome,
});

const AdminStack = createStackNavigator({
  Admin,
  AddPost,
});

const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Admin: AdminStack,
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      showLabel: false,
      activeBackgroundColor: '#00194b',
      inactivebackgroundColor: '#001338',
      style: {
        backgroundColor: '#001338',
      },
    },
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = 'md-home';
            break;
          case 'Admin':
            iconName = 'md-person';
            break;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

const AuthStack = createStackNavigator(
  {
    SignIn,
  },
  {
    headerMode: 'none',
  },
);

export const RootNavigator = () =>
  createAppContainer(
    createSwitchNavigator(
      {
        Auth: AuthStack,
        App: AppStack,
      },
      {
        initialRouteName: 'Auth',
      },
    ),
  );

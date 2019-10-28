# How to configure the project

## Install dependencies

```
yarn add react-navigation redux react-redux redux-promise
yarn add react-native-gesture-handler react-native-reanimated react-native-screens react-native-vector-icons
yarn add react-navigation-stack react-navigation-tabs
yarn add @react-native-community/async-storage axios moment
```

## Configure react-navigation for Android (React Native 0.60 and higher)

add the following two lines to dependencies section in android/app/build.gradle:

```
implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'
```

configure jetifier to support dependencies using androidx:

```
yarn add --dev jetifier
```

Then add it to the postinstall script in package.json:

```
"scripts": {
  "postinstall": "jetifier -r"
}
```

> NOTE: Remember to remove this when you upgrade to React Native 0.60 and higher.

Now, run the postinstall script manually:

```
yarn postinstall
# or with npm
# npm run postinstall
```

make the following modifications to MainActivity.java:

```
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```

# How to configure Redux store

## - Create actions and reducers

app/store/actions/user_actions.js

```
export function signIn() {
  return {
    type: 'SIGN_IN',
    payload: 'something'
  }
}
```

app/store/reducers/users_reducer.js

```
export default ( state={}, action ) => {
  switch(action.type) {
    case 'SIGN_IN':
      return state;
    case 'SIGN_UP':
      return state;
  }
}
```

app/store/reducers/index.js

```
import { combineReducers } from 'redux';
import User from 'users_reducer.js'
const rootReducer = combineReducers({
  User
});
export default rootReducer;
```

## - Import provider, store, middleware, promiseMiddleware

index.js

```
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { promiseMiddleware } from 'redux-promise';
```

## - Create compose with devtools

```
const composeEnhancers =
  (typeof window !== undefined &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

```

## - Create store (with reducers and Enhancers (with applyMiddleware (with promiseMiddleware))))

```
const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware)),
);
```

## - Create AppRedux using createStoreWithMiddleware

```
const appRedux = () => (
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>
);
```

## - Register Component as a main component

```
AppRegistry.registerComponent(appName, ()=>appRedux )
```

# How to configure Route

## Import Ionicons from react-native-vector-icons

```
import Ionicons from 'react-native-vector-icons/Ionicons';
```

## Import necessary stacks from 'react-navigation'

```
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
```

## Import necessary components

```
import SignIn from './app/components/Auth';
import Home from './app/components/Home';
import Admin from './app/components/Admin';
import AddPost from './app/components/Admin/AddPost';
```

## Create Auth stack using stackNavigator

```
const AuthStack = createStackNavigator({
  SignIn
},{
  headerMode: 'none'
})
```

## Define default headerConf

```
const headerConf = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#001338',
    },
    headerTintColor: 'white',
    headerTitle: 'Logo'
  }
};
```

## Create necessary stacks using StackNavigator

```
const HomeStack = createStackNavigator({
  Home
}, headerConf);
const AdminStack = createStackNavigator({
  Admin,
  AddPost
}, headerConf);
```

## Create App stack using bottomTabNavigator
```
const AppStack = createBottomNavigator({
  Home: HomeStack,
  Admin: AdminStack
},{
  tabBarOptions: {
    activeTintColor: 'white',
    showLabel: false,
    activeBackgroundColor: '#00194b',
    inactiveBackgroundColor: '#001338',
    style: {
      backgroundColor: '#001338',
    }
  },
  initialRouteName: 'HomeStack',
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      const {routeName} = navigation.state;
      let iconName;
      switch(routeName){
        case 'Home':
          iconName = 'md-home';
          break;
        case 'Admin':
          iconName = 'md-person';
          break;
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    }
  })
})
```

## Create RootNavitator using Auth, App, createSwitchNavigator, createAppContainer

```
const RootNavitator = () =>
  createAppContainer(
    createSwitchNavigator(
      {
        Auth: AuthStack,
        App: AppStack
      },
      {
        initialRouteName: 'Auth'
      },
    ),
  )

export default RootNavitator;
```

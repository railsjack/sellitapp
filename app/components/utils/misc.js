import {Dimensions, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Firebase
import {FIREBASE_API_KEY} from '../../config/keys';
export const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
export const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
export const REFRESH_URL = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`;
// Firebase end

const APP_NAME = '@sellitapp';

export const setToken = (values, cb) => {
  console.log('setToken values: ', values)
  AsyncStorage.multiSet([
    [`${APP_NAME}@uid`, values.uid],
    [`${APP_NAME}@token`, values.token],
    [`${APP_NAME}@refToken`, values.refToken],
  ]).then(cb);
};

export const getToken = cb => {
  AsyncStorage.multiGet([
    `${APP_NAME}@uid`,
    `${APP_NAME}@token`,
    `${APP_NAME}@refToken`,
  ]).then(values => {
    cb(values);
  });
};


export const removeToken = cb => {
  AsyncStorage.multiRemove([
    `${APP_NAME}@uid`,
    `${APP_NAME}@token`,
    `${APP_NAME}@refToken`,
  ]).then(cb);
};

export const getOrientation = (height = 500) => {
  return Dimensions.get('window').height > height ? 'portrait' : 'landscape';
};

export const setOrientationListener = cb => {
  Dimensions.addEventListener('change', cb);
};

export const removeOrientationListener = () => {
  Dimensions.removeEventListener('change');
};

export const getPlatform = () => {
  if (Platform.OS === 'ios') {
    return 'ios';
  } else {
    return 'android';
  }
};

import {Dimensions, Platform} from 'react-native';

// Firebase
import {FIREBASE_API_KEY} from '../../config/keys';
export const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
export const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
// Firebase end







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

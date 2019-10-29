import {SIGN_IN, SIGN_UP} from '../types';

import {SIGNUP_URL, SIGNIN_URL} from '../../components/utils/misc';

import axios from 'axios';

export const signIn = data => {
  return {
    type: SIGN_IN,
    payload: 'something',
  };
};

export const signUp = data => {
  const request = axios({
    url: SIGNUP_URL,
    method: 'POST',
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    header: {
      'Content-Type': 'application/json'
    }
  })
  .then(response=>{
    return response.data;
  })
  .catch(e=>{
    return false;
  })
  return {
    type: SIGN_UP,
    payload: request,
  };
};

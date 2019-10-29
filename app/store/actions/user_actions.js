import {SIGN_IN, SIGN_UP, AUTO_SIGN_IN} from '../types';

import {SIGNUP_URL, SIGNIN_URL, REFRESH_URL} from '../../components/utils/misc';

import axios from 'axios';

export const signIn = data => {
  const request = axios({
    url: SIGNIN_URL,
    method: 'POST',
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });
  return {
    type: SIGN_IN,
    payload: request,
  };
};

export const signUp = data => {
  const request = axios({
    url: SIGNUP_URL,
    method: 'POST',
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });
  return {
    type: SIGN_UP,
    payload: request,
  };
};

export const autoSignIn = refToken => {
  const request = axios({
    url: REFRESH_URL,
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `grant_type=refresh_token&refresh_token=${refToken}`,
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });
  return {
    type: AUTO_SIGN_IN,
    payload: request,
  };
};

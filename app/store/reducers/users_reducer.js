import {SIGN_IN, SIGN_UP} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        auth: {
          uid: action.payload.localId,
          token: action.payload.idToken,
          refToken: action.payload.refreshToken
        },
      };
    case SIGN_UP:
      return {
        ...state,
        auth: {
          uid: action.payload.localId,
          token: action.payload.idToken,
          refToken: action.payload.refreshToken
        },
      };
    default:
      return state;
  }
};

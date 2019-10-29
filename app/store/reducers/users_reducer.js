import {SIGN_IN, SIGN_UP, AUTO_SIGN_IN} from '../types';

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
    case AUTO_SIGN_IN:
      return {
        ...state,
        auth: {
          uid: action.payload.user_id,
          token: action.payload.id_token,
          refToken: action.payload.refresh_token
        }
      }
    default:
      return state;
  }
};

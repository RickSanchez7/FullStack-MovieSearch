import { LOGIN, SIGNOUT, REGISTER } from './auth-actions';

const AuthReducer = async (state, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case SIGNOUT:
      return {
        ...state,
        currentUser: action.payload,
      };
    case REGISTER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;

import { TOGGLE_AUTH, CLOSE_AUTH } from './authButton-actions';

const authButtonReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_AUTH:
      return {
        ...state,
        showAuthLinks: !state.showAuthLinks,
      };
    case CLOSE_AUTH:
      return {
        ...state,
        showAuthLinks: false,
      };
    default:
      return state;
  }
};

export default authButtonReducer;

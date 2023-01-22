import { TOGGLE, CLOSE } from './navbar-actions';

const navbarReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        showLinks: !state.showLinks,
      };
    case CLOSE:
      return {
        ...state,
        showLinks: false,
      };
    default:
      return state;
  }
};

export default navbarReducer;

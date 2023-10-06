import { ADD_USER } from '../actions';

const userState = {
  email: '',
};

type ActionType = {
  type: string;
  payload: string;
};

const userReducer = (state = userState, action: ActionType) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

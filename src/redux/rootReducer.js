import {SET_PERSONAL_INFO, SET_MAIL} from './actions';

const initialState = {
  personalInfo: {
    userName: '',
    userSurname: '',
    userPatronymicName: '',
    birthdate: ''
  },
  email: {
    email: '',
    password: ''
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PERSONAL_INFO:
      return {
        ...state,
        personalInfo: action.payload
      };

    case SET_MAIL:
      return {
        ...state,
        email: action.payload
      };

    default: 
      return state
  };
};

export default rootReducer;

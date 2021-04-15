export const SET_PERSONAL_INFO = 'SET_PERSONAL_INFO';
export const SET_MAIL = 'SET_MAIL';

export const setPersonalInfo = (data) => ({
  type: SET_PERSONAL_INFO,
  payload: data
});

export const setMail = (data) => ({
  type: SET_MAIL,
  payload: data
});

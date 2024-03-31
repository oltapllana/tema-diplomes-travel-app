// actionTypes.js
export const SET_USER_ROLE = 'SET_USER_ROLE';

// actionCreators.js
export const setUserRole = (role) => ({
  type: SET_USER_ROLE,
  payload: role,
});

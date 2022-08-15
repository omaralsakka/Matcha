import { USERS_FETCHED_SUCCESS, USERS_FETCHED_ERROR } from "../actions/types";
import { getUsersService } from "../services/usersServices";
const initialState = {
  users: [],
  error: null,
};

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USERS_FETCHED_SUCCESS:
      return {
        ...state,
        users: payload,
        error: null,
      };

    case USERS_FETCHED_ERROR:
      return {
        ...state,
        users: [],
        error: payload,
      };
    default:
      return state;
  }
};

const usersFetchSuccess = (users) => {
  return {
    type: USERS_FETCHED_SUCCESS,
    payload: users,
  };
};

const usersFetchError = (error) => {
  return {
    type: USERS_FETCHED_ERROR,
    payload: error,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await getUsersService();
      dispatch(usersFetchSuccess(response));
      return response;
    } catch (error) {
      dispatch(usersFetchError(error.message));
      console.error(error.message);
      return error.message;
    }
  };
};

export default usersReducer;

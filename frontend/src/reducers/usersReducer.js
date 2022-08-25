import {
  USERS_FETCHED_SUCCESS,
  USER_LIKE_SUCCESS,
  USER_DISLIKE_SUCCESS,
  USER_REPORT_SUCCESS,
  DELETE_REPORTED_USER,
  USERS_REDUCER_ERROR,
} from "../actions/types";

import {
  getUsersService,
  likeUserService,
  dislikeUserService,
  reportUserService,
  getUsersByCountryService,
} from "../services/usersServices";

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

    case USER_LIKE_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.user_id === payload[0].user_id) {
            return { ...user, liked_by: payload[0].liked_by };
          }
          return user;
        }),
        error: null,
      };

    case USER_DISLIKE_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.user_id === payload[0].user_id) {
            return { ...user, liked_by: payload[0].liked_by };
          }
          return user;
        }),
        error: null,
      };

    case USER_REPORT_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.user_id === payload[0].user_id) {
            return { ...user, reports_by: payload[0].reports_by };
          }
          return user;
        }),
        error: null,
      };

    case DELETE_REPORTED_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.user_id !== payload),
        error: null,
      };
    case USERS_REDUCER_ERROR:
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

const likeUserSuccess = (updatedUser) => {
  return {
    type: USER_LIKE_SUCCESS,
    payload: updatedUser,
  };
};

const disLikeUserSuccess = (updatedUser) => {
  return {
    type: USER_DISLIKE_SUCCESS,
    payload: updatedUser,
  };
};

const reportUserSuccess = (updatedUser) => {
  return {
    type: USER_REPORT_SUCCESS,
    payload: updatedUser,
  };
};

const deleteReportedUser = (userId) => {
  return {
    type: DELETE_REPORTED_USER,
    payload: userId,
  };
};

const usersReducerError = (error) => {
  return {
    type: USERS_REDUCER_ERROR,
    payload: error,
  };
};

export const fetchUsers = (user, country) => {
  return async (dispatch) => {
    try {
      const response = await getUsersService(user, country);
      const filteredUsersArr = response.filter(
        (elem) => elem.user_id !== user.user_id
      );
      dispatch(usersFetchSuccess(filteredUsersArr));
      return filteredUsersArr;
    } catch (error) {
      dispatch(usersReducerError(error.message));
      console.error(error.message);
      return error.message;
    }
  };
};

export const getUsersByCountry = (country, user) => {
  return async (dispatch) => {
    try {
      const data = { country, user };
      const response = await getUsersByCountryService(data);
      dispatch(usersFetchSuccess(response));
      return response;
    } catch (error) {
      dispatch(usersReducerError(error.message));
      console.error(error.message);
      return error.message;
    }
  };
};

export const likeUser = (likedUserId, likedById) => {
  return async (dispatch) => {
    try {
      const usersIds = { likedUserId, likedById };
      const updatedUser = await likeUserService(usersIds);

      dispatch(likeUserSuccess(updatedUser));

      return updatedUser;
    } catch (error) {
      dispatch(usersReducerError(error.message));
      console.error(error.message);
      return error.message;
    }
  };
};

export const disLikeUser = (likedUserId, likedById) => {
  return async (dispatch) => {
    try {
      const usersIds = { likedUserId, likedById };
      const updatedUser = await dislikeUserService(usersIds);
      dispatch(disLikeUserSuccess(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error(error.message);
      dispatch(usersReducerError(error.message));
      return error.message;
    }
  };
};

export const reportUser = (loggedUserId, reportedUser) => {
  return async (dispatch) => {
    try {
      const usersId = { loggedUserId, reportedUser };
      const serviceResponse = await reportUserService(usersId);

      if (serviceResponse.length) {
        dispatch(reportUserSuccess(serviceResponse));
      } else {
        dispatch(deleteReportedUser(reportedUser));
      }

      return true;
    } catch (error) {
      console.error(error.message);
      dispatch(usersReducerError(error.message));
      return false;
    }
  };
};

export default usersReducer;

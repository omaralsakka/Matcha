import {
  USERS_FETCHED_SUCCESS,
  USERS_FETCHED_ERROR,
  USER_LIKE_SUCCESS,
  USERS_LIKE_ERROR,
  USER_DISLIKE_SUCCESS,
  USER_DISLIKE_ERROR,
  SORT_USERS_SUCCESS,
} from "../actions/types";

import {
  getUsersService,
  likeUserService,
  dislikeUserService,
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

    case USERS_FETCHED_ERROR:
      return {
        ...state,
        users: [],
        error: payload,
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

    case USERS_LIKE_ERROR:
      return {
        ...state,
        users: [],
        error: payload,
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

    case USER_DISLIKE_ERROR:
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

const likeUserSuccess = (updatedUser) => {
  return {
    type: USER_LIKE_SUCCESS,
    payload: updatedUser,
  };
};

const likeUserError = (error) => {
  return {
    type: USERS_LIKE_ERROR,
    payload: error,
  };
};

const disLikeUserSuccess = (updatedUser) => {
  return {
    type: USER_DISLIKE_SUCCESS,
    payload: updatedUser,
  };
};

const disLikeUserError = (error) => {
  return {
    type: USER_DISLIKE_ERROR,
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

export const likeUser = (likedUserId, likedById) => {
  return async (dispatch) => {
    try {
      const usersIds = { likedUserId, likedById };
      const updatedUser = await likeUserService(usersIds);

      dispatch(likeUserSuccess(updatedUser));

      return updatedUser;
    } catch (error) {
      dispatch(likeUserError(error.message));
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
      dispatch(disLikeUserError(error.message));
      console.error(error.message);
      return error.message;
    }
  };
};

export default usersReducer;

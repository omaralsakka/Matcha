import {
  USERS_FETCHED_SUCCESS,
  USER_LIKE_SUCCESS,
  USER_DISLIKE_SUCCESS,
  USER_REPORT_SUCCESS,
  USERS_STATUS_UPDATED,
  DELETE_REPORTED_USER,
  USER_BLOCK_SUCCESS,
  USER_UNMATCHED_SUCCESS,
  USERS_REDUCER_ERROR,
} from "../actions/types";

import {
  likeUserService,
  dislikeUserService,
  reportUserService,
  getUsersByCountryService,
  getUserById,
  blockUserService,
  clearChat,
  checkUsersService,
} from "../services/usersServices";

import { getConnections } from "./connectionsReducer";
import sendNotification from "../utils/sendNotification";

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

    case USERS_STATUS_UPDATED:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.user_id === payload[0].user_id) {
            return {
              ...user,
              status: payload[0].status,
              last_logged_time: payload[0].last_logged_time,
            };
          }
          return user;
        }),
        error: null,
      };

    case USER_UNMATCHED_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.user_id === payload.unMatchedUserId) {
            return {
              ...user,
              liked_by: user.liked_by.filter(
                (ids) => ids !== payload.loggedUserId
              ),
            };
          }
          return user;
        }),
      };
    case USER_BLOCK_SUCCESS:
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

export const usersFetchSuccess = (users) => {
  return {
    type: USERS_FETCHED_SUCCESS,
    payload: users,
  };
};

const updateStoreUser = (updatedUser, type) => {
  return {
    type,
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

export const likeUser = (
  likedUserId,
  likedById,
  likerUsername,
  likedUsername
) => {
  return async (dispatch) => {
    try {
      const usersIds = { likedUserId, likedById };
      const updatedUser = await likeUserService(usersIds);
      if (
        updatedUser[0].liked === null ||
        updatedUser[0].liked.includes(likedById) !==
          updatedUser[0].liked_by.includes(likedById)
      ) {
        sendNotification(
          likedUserId,
          likerUsername,
          "Your profile was liked by"
        );
      } else if (
        updatedUser[0].liked.includes(likedById) ===
        updatedUser[0].liked_by.includes(likedById)
      ) {
        sendNotification(
          likedUserId,
          likerUsername,
          "Your profile is matched and you are now able to chat with"
        );
        sendNotification(
          likedById,
          likedUsername,
          "Your profile is matched and you are now able to chat with"
        );
        dispatch(getConnections());
      }
      dispatch(updateStoreUser(updatedUser, USER_LIKE_SUCCESS));
      return updatedUser;
    } catch (error) {
      dispatch(usersReducerError(error.message));
      console.error(error.message);
      return error.message;
    }
  };
};

export const disLikeUser = (likedUserId, likedById, disLikerUsername) => {
  return async (dispatch) => {
    try {
      const usersIds = { likedUserId, likedById };
      const updatedUser = await dislikeUserService(usersIds);
      if (
        updatedUser[0].liked !== null &&
        updatedUser[0].liked.includes(likedById) &&
        !updatedUser[0].liked_by.includes(likedById)
      ) {
        sendNotification(
          likedUserId,
          disLikerUsername,
          "You are unmatched with"
        );
        dispatch(getConnections());

        await clearChat(likedUserId, likedById);
      }
      dispatch(updateStoreUser(updatedUser, USER_DISLIKE_SUCCESS));

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
        dispatch(updateStoreUser(serviceResponse, USER_REPORT_SUCCESS));
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

export const updateUsersStatus = (userId) => {
  return async (dispatch) => {
    try {
      const updatedUser = await getUserById(userId);
      if (updatedUser.length) {
        dispatch(updateStoreUser(updatedUser, USERS_STATUS_UPDATED));
      }
      return true;
    } catch (error) {
      console.error(error.message);
      dispatch(usersReducerError(error.message));
      return false;
    }
  };
};

export const blockUser = (loggedUser, blockedUser) => {
  return async (dispatch) => {
    try {
      const usersIds = { loggedUser, blockedUser };
      const response = await blockUserService(usersIds);
      if (response) {
        dispatch(updateStoreUser(usersIds.blockedUser, USER_BLOCK_SUCCESS));
      }
      return true;
    } catch (error) {
      console.error(error.message);
      dispatch(usersReducerError(error.message));
      return false;
    }
  };
};

export const checkUsers = (users) => {
  return async (dispatch) => {
    try {
      const ids = users.map((user) => user.user_id);
      for (let index = 0; index < ids.length; index++) {
        const response = await checkUsersService(ids[index]);
        if (!response){
          dispatch(deleteReportedUser(ids[index]))
        }
      }
    } catch (error) {
      console.error(error.message);
      dispatch(usersReducerError(error.message));
      return false;
    }
  };
};

export const updateUnmatchedUsers = (loggedUserId, unMatchedUserId) => {
  return async (dispatch) => {
    try {
      const updatedIds = { loggedUserId, unMatchedUserId };
      dispatch(updateStoreUser(updatedIds, USER_UNMATCHED_SUCCESS));
    } catch (error) {
      console.error(error.message);
      dispatch(usersReducerError(error.message));
      return false;
    }
  };
};

export default usersReducer;

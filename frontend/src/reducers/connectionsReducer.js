import {
  FETCH_CONNECTIONS_SUCCESS,
  CONNECTIONS_REDUCER_ERROR,
  UNMATCH_CONNECTIONS_SUCCESS,
} from "../actions/types";
import { fetchConnections } from "../services/userServices";
import { dislikeUserService, clearChat } from "../services/usersServices";
import { updateUnmatchedUsers } from "./usersReducer";

const initialState = {
  users: [],
  error: null,
};

const connectionsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CONNECTIONS_SUCCESS:
      return {
        ...state,
        users: payload,
        error: null,
      };
    case UNMATCH_CONNECTIONS_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.user_id !== payload),
        error: null,
      };
    case CONNECTIONS_REDUCER_ERROR:
      return {
        ...state,
        users: [],
        error: null,
      };
    default:
      return state;
  }
};

const fetchConnectionSuccess = (users) => {
  return {
    type: FETCH_CONNECTIONS_SUCCESS,
    payload: users,
  };
};

const unMatchSuccess = (id) => {
  return {
    type: UNMATCH_CONNECTIONS_SUCCESS,
    payload: id,
  };
};

const fetchConnectionError = (error) => {
  return {
    type: CONNECTIONS_REDUCER_ERROR,
    payload: error,
  };
};

export const getConnections = (userId) => {
  return async (dispatch) => {
    try {
      if (userId) {
        const response = await fetchConnections(userId);
        dispatch(fetchConnectionSuccess(response));
        return response;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error.message);
      dispatch(fetchConnectionError(error.messaage));
      return false;
    }
  };
};

export const unMatchUser = (unMatchedUserId, loggedUserId) => {
  return async (dispatch) => {
    try {
      const usersIds = {
        likedUserId: unMatchedUserId,
        likedById: loggedUserId,
      };
      const updatedUser = await dislikeUserService(usersIds);
      dispatch(unMatchSuccess(unMatchedUserId));
      dispatch(updateUnmatchedUsers(loggedUserId, unMatchedUserId));
      await clearChat(unMatchedUserId, loggedUserId);
      return updatedUser;
    } catch (error) {
      console.error(error.message);
      dispatch(fetchConnectionError(error.messaage));
      return false;
    }
  };
};

export default connectionsReducer;

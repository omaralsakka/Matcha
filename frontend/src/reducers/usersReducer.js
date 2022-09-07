import {
  USERS_FETCHED_SUCCESS,
  USER_LIKE_SUCCESS,
  USER_DISLIKE_SUCCESS,
  USER_REPORT_SUCCESS,
  USERS_STATUS_UPDATED,
  DELETE_REPORTED_USER,
  USER_BLOCK_SUCCESS,
  USERS_REDUCER_ERROR,
} from "../actions/types";

import {
  getUsersService,
  likeUserService,
  dislikeUserService,
  reportUserService,
  getUsersByCountryService,
  getUserById,
  blockUserService,
} from "../services/usersServices";

import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

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

// export const fetchUsers = (user, country) => {
//   return async (dispatch) => {
//     try {
//       const response = await getUsersService(user, country);
//       const filteredUsersArr = response.filter(
//         (elem) => elem.user_id !== user.user_id
//       );
//       dispatch(usersFetchSuccess(filteredUsersArr));
//       return filteredUsersArr;
//     } catch (error) {
//       dispatch(usersReducerError(error.message));
//       console.error(error.message);
//       return error.message;
//     }
//   };
// };

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

export const likeUser = (likedUserId, likedById, likerUsername) => {
  return async (dispatch) => {
    try {
      const usersIds = { likedUserId, likedById };
      const updatedUser = await likeUserService(usersIds);
	  if(updatedUser[0].liked.includes(likedById) === updatedUser[0].liked_by.includes(likedById)) {
		const notificationData = {
			room: likedUserId,
			username: likerUsername,
			message: "your profile is matched",
			time:
			  new Date(Date.now()).getHours() +
			  ":" +
			  new Date(Date.now()).getMinutes(),
		  };
		  await socket.emit("send_message", notificationData);
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
	  console.log(updatedUser[0])
	  if(updatedUser[0].liked.includes(likedById) && !updatedUser[0].liked_by.includes(likedById)) {
		const notificationData = {
			room: likedUserId,
			username: disLikerUsername,
			message: "your profile is un-matched",
			time:
			  new Date(Date.now()).getHours() +
			  ":" +
			  new Date(Date.now()).getMinutes(),
		  };
		  await socket.emit("send_message", notificationData);
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

// workin on this
export const updateUsersStatus = (users) => {
  return async (dispatch) => {
    try {
      for (let index = 0; index < users.length; index++) {
        const updatedUser = await getUserById(users[index].user_id);
        if (updatedUser) {
          dispatch(updateStoreUser(updatedUser, USERS_STATUS_UPDATED));
        }
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

export default usersReducer;

import {
  NOTIFICATION_FETCH_SUCCESS,
  NOTIFICATION_NEW_SUCCESS,
  NOTIFICATION_CLEAR_SUCCESS,
  NOTIFICATION_REDUCER_ERROR,
} from "../actions/types";

import {
  getNotificationsService,
  insertNotificationService,
  clearNotificationsService,
} from "../services/userServices";

const initialState = {
  notifications: [],
//   amount: 0,
  error: null,
};

const notificationsReducer = (state = initialState, actions) => {
  const { type, payload } = actions;

  switch (type) {
    case NOTIFICATION_FETCH_SUCCESS:
      return {
        ...state,
        notifications: payload,
        // amount: payload.length,
        error: null,
      };

    case NOTIFICATION_NEW_SUCCESS:
      return {
        ...state,
        notifications: [...state.notifications, ...payload],
        // amount: state.notifications.length + payload.length,
        error: null,
      };

    case NOTIFICATION_CLEAR_SUCCESS:
      return {
        ...state,
        notifications: payload,
        // amount: 0,
        error: null,
      };

    case NOTIFICATION_REDUCER_ERROR:
      return {
        ...state,
        notifications: [],
        // amount: 0,
        error: payload,
      };
    default:
      return state;
  }
};

const notificationFetchSuccess = (notifications) => {
  return {
    type: NOTIFICATION_FETCH_SUCCESS,
    payload: notifications,
  };
};

const notificationUpdateSuccess = (newNotification) => {
  return {
    type: NOTIFICATION_NEW_SUCCESS,
    payload: newNotification,
  };
};

const notificationClearSuccess = () => {
  return {
    type: NOTIFICATION_CLEAR_SUCCESS,
    payload: [],
  };
};

const notificationReducerError = (error) => {
  return {
    type: NOTIFICATION_REDUCER_ERROR,
    payload: error,
  };
};

export const fetchNotifications = (userId) => {
  return async (dispatch) => {
    try {
      const notifications = await getNotificationsService(userId);
      dispatch(notificationFetchSuccess(notifications));
    } catch (error) {
      console.error(error.message);
      dispatch(notificationReducerError(error.message));
    }
  };
};

export const addNotification = (notification) => {
  return async (dispatch) => {
    try {
      const newNotification = await insertNotificationService(notification);
      dispatch(notificationUpdateSuccess(newNotification));
    } catch (error) {
      console.error(error.message);
      dispatch(notificationReducerError(error.message));
    }
  };
};

export const clearNotifications = () => {
  return async (dispatch) => {
    try {
      await clearNotificationsService();
      dispatch(notificationClearSuccess());
    } catch (error) {
      console.error(error.message);
      dispatch(notificationReducerError(error.message));
    }
  };
};

export default notificationsReducer;

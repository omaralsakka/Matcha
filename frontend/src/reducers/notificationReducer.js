import {
  NOTIFICATION_FETCH_SUCCESS,
  NOTIFICATION_NEW_SUCCESS,
  NOTIFICATION_CLEAR_SUCCESS,
  NOTIFICATION_SEEN_SUCCESS,
  NOTIFICATION_REDUCER_ERROR,
} from "../actions/types";

import {
  getNotificationsService,
  getMostRecentNotificationService,
  clearNotificationsService,
  seenNotificationsService,
} from "../services/userServices";

const initialState = {
  notifications: [],
  error: null,
};
let limit = 0;
const notificationsReducer = (state = initialState, actions) => {
  const { type, payload } = actions;

  switch (type) {
    case NOTIFICATION_FETCH_SUCCESS:
      return {
        ...state,
        notifications: payload.map((item) => {
          if (item) {
            return { ...item, date: item.date.split("T") };
          } else {
            return [];
          }
        }),
        error: null,
      };

    case NOTIFICATION_NEW_SUCCESS:
      return {
        ...state,
        notifications: [...state.notifications, ...payload],
        error: null,
      };

    case NOTIFICATION_CLEAR_SUCCESS:
      return {
        ...state,
        notifications: payload,
        error: null,
      };

    case NOTIFICATION_SEEN_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map((notification) => {
          return { ...notification, status: "seen" };
        }),
        error: null,
      };

    case NOTIFICATION_REDUCER_ERROR:
      return {
        ...state,
        notifications: [],
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

const NotificationUpdateSuccess = (newNotification) => {
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

const notificationSeenSuccess = () => {
  return {
    type: NOTIFICATION_SEEN_SUCCESS,
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
      if (limit === 0) {
        limit = 1;
        const newNotification = await getMostRecentNotificationService(
          notification
        );
        dispatch(NotificationUpdateSuccess(newNotification));
      } else {
        setTimeout(() => (limit = 0), 1);
      }
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

export const seenNotifications = () => {
  return async (dispatch) => {
    try {
      await seenNotificationsService();
      dispatch(notificationSeenSuccess());
    } catch (error) {
      console.error(error.message);
      dispatch(notificationReducerError(error.message));
    }
  };
};

export default notificationsReducer;

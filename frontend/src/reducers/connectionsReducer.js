import {
  FETCH_CONNECTIONS_SUCCESS,
  CONNECTIONS_REDUCER_ERROR,
} from "../actions/types";
import { fetchConnections } from "../services/userServices";

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

const fetchConnectionError = (error) => {
  return {
    type: CONNECTIONS_REDUCER_ERROR,
    payload: error,
  };
};

export const getConnections = () => {
  return async (dispatch) => {
    try {
      const response = await fetchConnections();
      dispatch(fetchConnectionSuccess(response));
      return response;
    } catch (error) {
      console.error(error.message);
      dispatch(fetchConnectionError(error.messaage));
      return false;
    }
  };
};

export default connectionsReducer;

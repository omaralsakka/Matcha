import {
  SEARCH_FETCH_SUCCESS,
  SEARCH_UPDATE_SUCCESS,
  SEARCH_REDUCER_ERROR,
} from "../actions/types";

import { getSearch, updateSearch } from "../services/userServices";

const initialState = {
  search: {},
  error: null,
};

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_FETCH_SUCCESS:
      return {
        ...state,
        search: payload,
        error: null,
      };

    case SEARCH_UPDATE_SUCCESS:
      return {
        ...state,
        search: payload,
        error: null,
      };

    case SEARCH_REDUCER_ERROR:
      return {
        ...state,
        search: null,
        error: payload,
      };
    default:
      return state;
  }
};

const searchFetchSuccess = (search) => {
  return {
    type: SEARCH_FETCH_SUCCESS,
    payload: search,
  };
};

const searchUpdateSuccess = (search) => {
  return {
    type: SEARCH_UPDATE_SUCCESS,
    payload: search,
  };
};

const searchReducerError = (error) => {
  return {
    type: SEARCH_REDUCER_ERROR,
    payload: error,
  };
};

export const fetchUserSearch = (user_id) => {
  return async (dispatch) => {
    try {
      const response = await getSearch(user_id);
      dispatch(searchFetchSuccess(response[0]));
    } catch (error) {
      dispatch(searchReducerError(error.message));
      console.error(error.message);
      return false;
    }
  };
};

export const updateUserSearch = (user_id, newSettings) => {
  return async (dispatch) => {
    try {
      const data = {
        user_id,
        newSettings,
      };

      const response = await updateSearch(data);
      dispatch(searchUpdateSuccess(response[0]));
      return response[0];
    } catch (error) {
      dispatch(searchReducerError(error.message));
      console.error(error.message);
      return false;
    }
  };
};

export default searchReducer;

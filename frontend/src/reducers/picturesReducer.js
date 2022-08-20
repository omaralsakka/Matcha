import {
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_ERROR,
  CLEAR_STORE_IMAGES,
} from "../actions/types";

import { getUsersImages } from "../services/usersServices";
const initialState = { pictures: [], error: null };

const picturesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        pictures: state.push(payload),
        error: null,
      };
    case FETCH_IMAGES_ERROR:
      return {
        ...state,
        pictures: [],
        error: payload,
      };

    case CLEAR_STORE_IMAGES:
      return {
        ...state,
        pictures: [],
        error: null,
      };

    default:
      return state;
  }
};

const fetchImagesSuccess = (pictures) => {
  return {
    type: FETCH_IMAGES_SUCCESS,
    payload: pictures,
  };
};

const fetchImagesError = (error) => {
  return {
    type: FETCH_IMAGES_ERROR,
    payload: error,
  };
};

const clearImagesSuccess = () => {
  return {
    type: CLEAR_STORE_IMAGES,
    payload: "",
  };
};

export const fetchUserImages = (userId) => {
  return async (dispatch) => {
    try {
      const picturesResponse = await getUsersImages(userId);

      if (picturesResponse.length) {
        dispatch(fetchImagesSuccess(picturesResponse));
        return picturesResponse;
      }
    } catch (error) {
      console.error(error.message);
      dispatch(fetchImagesError(error.message));
    }
  };
};

export const clearStoreImages = () => {
  return async (dispatch) => {
    try {
      dispatch(clearImagesSuccess());
      return true;
    } catch (error) {
      console.error(error.message);
    }
  };
};

export default picturesReducer;

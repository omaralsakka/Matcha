import {
  IMAGES_FETCH_SUCCESS,
  IMAGES_REDUCER_ERROR,
  CLEAR_STORE_IMAGES,
} from "../actions/types";

import { getUsersImages } from "../services/usersServices";
const initialState = { pictures: [], error: null };

const picturesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case IMAGES_FETCH_SUCCESS:
      let stateCopy = [...state];
      return {
        ...state,
        pictures: stateCopy.push(payload),
        error: null,
      };

    case CLEAR_STORE_IMAGES:
      return {
        ...state,
        pictures: [],
        error: null,
      };

    case IMAGES_REDUCER_ERROR:
      return {
        ...state,
        pictures: [],
        error: payload,
      };
    default:
      return state;
  }
};

const fetchImagesSuccess = (pictures) => {
  return {
    type: IMAGES_FETCH_SUCCESS,
    payload: pictures,
  };
};

const imagesReducerError = (error) => {
  return {
    type: IMAGES_REDUCER_ERROR,
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
      dispatch(imagesReducerError(error.message));
      return false;
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
      dispatch(imagesReducerError(error.message));
      return false;
    }
  };
};

export default picturesReducer;

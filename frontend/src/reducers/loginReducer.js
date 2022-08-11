import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  TOKEN_LOGIN_ERROR,
} from "../actions/types";
import {
  setServiceToken,
  loginService,
  tokenLoginService,
} from "../services/userServices";

const initialState = {
  user: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        error: "",
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: null,
        error: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: "",
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        user: null,
        error: payload,
      };
    case TOKEN_LOGIN_ERROR:
      return {
        ...state,
        user: null,
        error: payload,
      };
    default:
      return state;
  }
};

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const loginFailed = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
    payload: "",
  };
};

const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error,
  };
};

const tokenLoginError = (error) => {
  return {
    type: TOKEN_LOGIN_ERROR,
    payload: error,
  };
};

export const logUser = (userInfo) => {
  return async (dispatch) => {
    try {
      const response = await loginService(userInfo);
      setServiceToken(response.token);
      dispatch(loginSuccess(response));
      window.localStorage.setItem("LoggedMatchaUser", JSON.stringify(response));
      return response;
    } catch (error) {
      dispatch(loginFailed(error.message));
      return false;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      setServiceToken(null);
      dispatch(logoutSuccess);
      window.localStorage.removeItem("LoggedMatchaUser");
      return true;
    } catch (error) {
      dispatch(logoutError(error.message));
      return false;
    }
  };
};

export const tokenLoginCall = (userInfo, token) => {
  return async (dispatch) => {
    try {
      const response = await tokenLoginService(userInfo);
      setServiceToken(token);
      if (response) {
        dispatch(loginSuccess(response));
      }
    } catch (error) {
      dispatch(tokenLoginError(error.message));
    }
  };
};

export default loginReducer;

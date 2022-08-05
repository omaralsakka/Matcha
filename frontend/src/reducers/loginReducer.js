import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  TOKEN_LOGIN_ERROR,
} from "../actions/types";
import {
  setToken,
  loginService,
  tokenLoginService,
} from "../services/Services";

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

export const loginSuccess = (user) => {
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

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
    payload: "",
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
      setToken(response.token);
      dispatch(loginSuccess(response));
      window.localStorage.setItem("LoggedMatchaUser", JSON.stringify(response));
      return response;
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };
};

export const tokenLoginCall = (userInfo) => {
  return async (dispatch) => {
    try {
      const response = await tokenLoginService(userInfo);
      if (response) {
        console.log(response);
      }
    } catch (error) {
      dispatch(tokenLoginError(error.message));
    }
  };
};

export default loginReducer;

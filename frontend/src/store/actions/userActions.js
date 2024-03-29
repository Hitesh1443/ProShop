import * as actionTypes from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_LOGIN_REQUEST,
    });
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    console.log("Email is" + email);

    console.log("Password is" + password);
    const { data } = await axios.post(
      "/api/users/login",
      { email, password }
      // config
    );

    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const logout = (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: actionTypes.USER_LOGOUT });
  dispatch({ type: actionTypes.USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_REGISTER_REQUEST,
    });
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password }
      // config
    );

    dispatch({
      type: actionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: actionTypes.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

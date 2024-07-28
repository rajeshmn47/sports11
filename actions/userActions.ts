import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../constants/userConstants'
import axios from 'axios';
import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, RESTORE_TOKEN } from '../constants/userConstants';
import { DevSettings } from 'react-native';

export const API = axios.create({ baseURL: `${URL}` });

API.interceptors.request.use(async (req:any) => {
      const servertoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NWQxOGE4YWI5MDE1MTQ3ZDE2Nzc1YmYiLCJpYXQiOjE3MjAwNjc4MjgsImV4cCI6MTc1MDA2NzgyOH0.OhlljUvsTOdrKNbci5dX_U4IUGuCAobntz_37tW2_PA";
      req.headers.Authorization = `Bearer ${servertoken}`;
      req.headers.servertoken = servertoken;
      req.headers.ContentType = "application/json";
    return req;
  });

  export const logout = () => async (dispatch:any) => {
    try {
      await AsyncStorage.removeItem("server_token");
      dispatch({type:LOGOUT_SUCCESS})
      DevSettings.reload()
    } catch (error:any) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  export const loadToken = () => async (dispatch:any) => {
    try {
      const server_token = await AsyncStorage.getItem("server_token");
      console.log(server_token,'servertokentest');
      if (server_token) {
        dispatch({ type: RESTORE_TOKEN, payload: server_token });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const loadUser = () => async (dispatch:any) => {
    try {
      const servertoken = await AsyncStorage.getItem("server_token");
      dispatch({ type: LOAD_USER_REQUEST });
      const { data } = await API.get(`/auth/loaduser`);
      if (data?.message) {
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.message });
      }
    } catch (error) {
      console.log(error);
    }
  };
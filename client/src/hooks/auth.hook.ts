import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "./http.hook";
import { login, logout } from "./../redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "./redux.hook";

const storage = "user";

interface IUseAuth {
  idDataload?: boolean;
}

export const useAuth = (idDataload = false) => {
  const { request } = useHttp();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem(storage);
    dispatch(logout());
    navigate("/");
  };
  const loginUser = useCallback((data: any) => {
    localStorage.setItem(
      storage,
      JSON.stringify({
        userlogin: data.login,
        token: data.token,
      })
    );
    dispatch(login(data));
    navigate("/workshop/");
  }, []);

  const getUserData = useCallback(
    async (body: any) => {
      try {
        const data = await request(
          "/api/user/auth",
          "POST",
          { login: body.login },
          {
            Authorization: `Bearer ${body.token}`,
          }
        );
        loginUser(data);
      } catch (error) {
        logoutUser();
      }
    },
    [request]
  );

  useEffect(() => {
    if (!idDataload) return;
    const data: any = JSON.parse(localStorage.getItem(storage) as string);

    if (data) {
      getUserData({ login: data.userlogin, token: data.token });
    }
  }, [getUserData]);

  return { loginUser, logoutUser };
};

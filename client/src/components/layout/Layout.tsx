import React, { useState } from "react";
import scss from "./Layout.module.scss";
import { Outlet, useNavigate } from "react-router";
import chat from "@public/icons/chat.svg";
import send from "@public/icons/send.svg";
import AppMsg from "../commons/appmsg/AppMsg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import {
  selectorIsAuthUser,
  selectorMessage,
  selectorUser,
} from "../../redux/selectors";
import { Auth } from "./auth/Auth";
import User from "./user/User";
import { useAuth } from "../../hooks/auth.hook";
import Logo from "./logo/Logo";
import Menu from "./menu/Menu";

export default function Layout() {
  const msg = useAppSelector((state) => selectorMessage(state));

  const isAuthUser = useAppSelector((state) => selectorIsAuthUser(state));

  const { loginUser } = useAuth(true);
  return (
    <div className={scss.layout}>
      <div className={scss.mainmenu}>
        <div className={scss.top}>
          <div className={scss.logo}>
            <Logo />
          </div>
          <div className={scss.enterActiv}>
            {!isAuthUser ? <Auth aloginUser={loginUser} /> : <User />}
          </div>
          {isAuthUser ? <Menu /> : null}
        </div>

        <div className={scss.support}>
          <div>
            <div>Напишите нам:</div>
            <div className={scss.email}>support@tinmanager.ru</div>
            {/* <div className={scss.chatico}>
              <div className={scss.chat}>
                <div className={scss.listchat}>
                  <div>skdlfkd;sl</div>
                </div>
                <div className={scss.message}>
                  <textarea name="" id=""></textarea>
                  <div>
                    <img src={send} alt="" />
                  </div>
                </div>
              </div>
              <span>Чат:</span> <img src={chat} alt="" />
            </div> */}
          </div>
        </div>
      </div>

      <div className={scss.content}>
        <Outlet />
      </div>
      <AppMsg msg={msg} />
    </div>
  );
}

import React, { useContext } from "react";
import style from "./User.module.scss";
import avatar from "./media/1.png";
import exit from "./media/exit.svg";
import option from "./media/option.svg";

import { useAppSelector } from "../../../hooks/redux.hook";

import { useAuth } from "../../../hooks/auth.hook";
import { selectorUser } from "../../../redux/selectors";
import { NavLink } from "react-router-dom";

export default function User() {
  const user = useAppSelector((state) => selectorUser(state));

  const { logoutUser } = useAuth();
  return (
    <div className={style.user}>
      <div className={style.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={style.email}>
        <div>{user?.login}</div>

        <div className={style.option}>
          <NavLink to={"/workshop/setting"}>
            <img src={option} alt="" />
          </NavLink>
          <img src={exit} alt="" onClick={logoutUser} />
        </div>
      </div>
    </div>
  );
}

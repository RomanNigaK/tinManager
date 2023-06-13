import React from "react";
import scss from "./Logo.module.scss";
import t from "./media/t.svg";
import { NavLink } from "react-router-dom";
export default function Logo() {
  return (
    <div className={scss.logo}>
      <div>
        <img src={t} alt="логотип" />
      </div>
      <NavLink to="/">
        <div>
          <b>in</b>Manager
        </div>
      </NavLink>
    </div>
  );
}

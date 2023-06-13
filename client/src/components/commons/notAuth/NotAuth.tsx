import React from "react";
import scss from "./NotAuth.module.scss";
import { NavLink } from "react-router-dom";
export default function NotAuth() {
  return (
    <div className={scss.notauth}>
      <div>
        <h4>Вы не авторизованы</h4>
        <h5>
          Войдете в приложение или пройдите{" "}
          <NavLink to="/reg"> регистрацию</NavLink>
        </h5>
      </div>
    </div>
  );
}

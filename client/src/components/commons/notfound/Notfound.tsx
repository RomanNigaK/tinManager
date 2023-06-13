import React from "react";
import scss from "./Notfound.module.scss";
import notfound from "@public/icons/notfound.svg";
interface IPropsNotfound {
  title: string;
  tooltip?: string;
}
export default function Notfound({ title, tooltip }: IPropsNotfound) {
  return (
    <div className={scss.notfound}>
      <div>
        <img src={notfound} alt="" />
        <div>{title}</div>
      </div>
      <div>{tooltip}</div>
    </div>
  );
}

import React, { Dispatch, SetStateAction, useState } from "react";
import scss from "./Toggle.module.scss";

interface IPropsToggle {
  title: string;
  toggle: [boolean, Dispatch<SetStateAction<string | boolean>>];
  name: string | boolean;
  click?: () => void;
}
export default function Toggle({ title, toggle, name, click }: IPropsToggle) {
  const handleToggle = () => {
    toggle[1](toggle[0] ? "" : name);
  };
  return (
    <div className={scss.togglediv} onClick={click}>
      <div className={scss.wrapper} onClick={handleToggle}>
        <div className={toggle[0] ? scss.activtoggle : ""}></div>
      </div>
      <div>{title}</div>
    </div>
  );
}

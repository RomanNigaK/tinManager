import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import scss from "./Toggle.module.scss";
import { useAppDispatch } from "../../../hooks/redux.hook";

interface IPropsToggle {
  title: string;
  setFilter: Function;
  id: number;
  toggle: boolean;
}
export default function Toggle2({
  title,
  setFilter,
  id,
  toggle,
}: IPropsToggle) {
  const dispatch = useAppDispatch();
  const [state, setstate] = useState(toggle ? 1 : 0);

  const handleToggle = () => {
    setstate(state ? 0 : id);
    dispatch(setFilter(id));
  };
  useEffect(() => {}, []);

  return (
    <div className={scss.togglediv2}>
      <div>{title}</div>
      <div className={scss.wrapper} onClick={handleToggle}>
        <div className={state ? scss.activtoggle : ""}></div>
      </div>
    </div>
  );
}

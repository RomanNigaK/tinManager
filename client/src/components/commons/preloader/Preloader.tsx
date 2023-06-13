import React from "react";
import load from "./media/746 (1).svg";
import style from "./Preloader.module.scss";
interface IPropsPreloader {
  text?: string;
}
export default function Preloader({ text }: IPropsPreloader) {
  return (
    <div className={style.preloader}>
      <img src={load} alt="Загрузка" />
    </div>
  );
}

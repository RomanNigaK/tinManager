import React from "react";
import Preloader from "./Preloader";
import style from "./Preloader.module.scss";
interface IPropsExtendsPreloader {
  text: string;
}
export default function ExtendsPreloader({ text }: IPropsExtendsPreloader) {
  return (
    <div className={style.extendspreloader}>
      <div className={style.gif}>
        <Preloader />
      </div>
      {text}
    </div>
  );
}

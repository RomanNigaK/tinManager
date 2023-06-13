import React, { PropsWithChildren, ReactNode, useState } from "react";
import style from "./SelectBlock.module.scss";
import arrow from "./media/arrow.svg";
import arrowDark from "./media/arrowdark.svg";

interface IPropsSelectBlock extends PropsWithChildren {
  title: string;
  darkArrow?: boolean;
}
export default function SelectBlock({
  children,
  title,
  darkArrow = false,
}: IPropsSelectBlock) {
  const [isShowItems, setIsShowItems] = useState<boolean>(false);

  return (
    <div className={style.selectBlock}>
      <div
        className={style.header}
        onClick={() => setIsShowItems(isShowItems ? false : true)}
      >
        <div className={style.ico}>
          <img
            src={darkArrow ? arrowDark : arrow}
            alt=""
            className={isShowItems ? style.imgrotateshow : style.imgrotatehide}
          />
        </div>
        <div
          className={style.title}
          style={darkArrow ? { color: "black" } : undefined}
        >
          {title}
        </div>
      </div>
      {isShowItems && children}
    </div>
  );
}

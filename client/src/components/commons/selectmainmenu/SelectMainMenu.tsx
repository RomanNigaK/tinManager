import React, { ReactNode, useState } from "react";
import style from "./SelectMainMenu.module.scss";
import arrow from "./media/arrow.svg";
import arrowDark from "./media/arrowdark.svg";
import { NavLink } from "react-router-dom";
interface IPropsSelectMainMenu {
  items: { name: string; url: string }[];
  title: string;
  darkArrow?: boolean;
}
export default function SelectMainMenu({
  items,
  title,
  darkArrow = false,
}: IPropsSelectMainMenu) {
  const [isShowItems, setIsShowItems] = useState<boolean>(false);

  return (
    <div className={style.SelectMainMenu}>
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
      {isShowItems ? (
        <div className={style.items}>
          {items.map((i, index) => {
            return (
              <NavLink to={i.url} key={index + "itemsmenu"}>
                <div className={style.item}>{i.name}</div>
              </NavLink>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

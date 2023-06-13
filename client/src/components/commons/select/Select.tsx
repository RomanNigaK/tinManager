import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import scss from "./Select.module.scss";
import arrow from "./media/arrow.svg";
import coverage from "./media/coverage.svg";
import thicknesess from "./media/thicknesses.svg";
import color from "./media/color.svg";
import { useAppDispatch } from "../../../hooks/redux.hook";
interface IPropsSelect {
  title: string;
  values: string[] | number[] | null;
  ico: string;
  disp: Function;
}

export default function Select({ title, values, ico, disp }: IPropsSelect) {
  const [isShow, setisShow] = useState(false);
  const [current, setcurrent] = useState<string | number | null>(null);

  const dispatch = useAppDispatch();
  const handleChangeItem = (item: string | number) => {
    setisShow(false);
    setcurrent(item);
  };

  useEffect(() => {
    dispatch(disp(current));
  }, [current]);
  return (
    <div className={scss.select}>
      <div
        className={scss.header}
        onClick={() => setisShow(isShow ? false : true)}
        style={current ? { background: "#99B4BF" } : {}}
      >
        <img src={arrow} alt="" className={isShow ? scss.showselect : ""} />
        {current ? (
          <div className={scss.title} data-title={current}>
            {current}
          </div>
        ) : (
          <div className={scss.titlef}>{title}</div>
        )}
      </div>
      <div>
        {current ? (
          <div className={scss.clearfilter} onClick={() => setcurrent(null)}>
            &#215;
          </div>
        ) : null}
      </div>
      {isShow ? (
        <div className={scss.hideselect}>
          <div className={scss.ico}>
            <div>
              {ico === "coverage" ? <img src={coverage} alt="" /> : null}
              {ico === "thicknesses" ? <img src={thicknesess} alt="" /> : null}
              {ico === "color" ? <img src={color} alt="" /> : null}
            </div>
            <div onClick={() => setisShow(false)}>&#10006;</div>
          </div>
          <div className={scss.items}>
            {values?.length
              ? values.map((e, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => handleChangeItem(e)}
                      className={e === current ? scss.activitem : ""}
                    >
                      {e}
                    </div>
                  );
                })
              : "Нет данных"}
          </div>
        </div>
      ) : null}
    </div>
  );
}

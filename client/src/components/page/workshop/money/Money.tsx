import React, { useEffect, useState } from "react";
import scss from "./Money.module.scss";
import Align from "../../../commons/align/Align";

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";
import { actionListCategories } from "../../../../redux/slice/moneySlice";
import {
  selectorBasisforcashflow,
  selectorListCategories,
  selectorMoney,
} from "../../../../redux/selectors";

import { dateToStr } from "../../../../scripts/script";
import Toggle2 from "../../../commons/toggle/Toggle2";
import Kassa from "../../../commons/kassa/Kassa";
export default function Money() {
  const basisforcashflow = useAppSelector((state) =>
    selectorBasisforcashflow(state)
  );
  const money = useAppSelector((state) => selectorMoney(state));
  const listCategories = useAppSelector((state) =>
    selectorListCategories(state)
  );

  return (
    <div className={scss.money}>
      <div className={scss.options}>
        <Kassa />

        <Align side="right">
          <div>
            {basisforcashflow?.map((e, idx) => {
              return (
                <Toggle2
                  title={e.name}
                  id={e.id}
                  setFilter={actionListCategories}
                  toggle={listCategories.includes(e.id)}
                  key={idx + "toggle"}
                />
              );
            })}
          </div>
        </Align>
      </div>
      <div className={scss.header}>
        <h4>Приход/расход денежных средств</h4>
      </div>

      <div className={scss.content}>
        {money.length ? (
          <table className={scss.table}>
            <tbody>
              {money.map((e, idx) => {
                return (
                  <tr key={idx + "tablemoney"}>
                    <td>№ {e.id} </td>
                    <td className={scss.tdtablesalessumma}>
                      {e.type === -1 ? "-" + e.summa : e.summa} &#8381;
                    </td>
                    <td className={scss.data}>{dateToStr(e.date)}</td>
                    <td>{e.basis}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className={scss.clearlist}>
            <h4>По фильтрам данных нет</h4>
          </div>
        )}
      </div>
      <div className={scss.binddata}></div>
    </div>
  );
}

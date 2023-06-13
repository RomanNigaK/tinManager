import React from "react";
import scss from "./Entrance.module.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/redux.hook";
import { selectorNoPayEntrance } from "../../../../../../redux/selectors";

import DetailsEntrance from "../../../../../commons/detailsentrance/DetailsEntrance";
import Btn from "../../../../../commons/btn/Btn";
import Align from "../../../../../commons/align/Align";
import { IMoney, addMoney } from "../../../../../../redux/slice/moneySlice";
import { useHttp } from "../../../../../../hooks/http.hook";
import { dateToStr, numberRoundTwo } from "../../../../../../scripts/script";
export default function Entrance() {
  const noPayEntrance = useAppSelector((state) => selectorNoPayEntrance(state));
  const { request, loading } = useHttp();
  const dispatch = useAppDispatch();
  const newMoney = async (body: IMoney) => {
    try {
      const money = await request("/api/money/new", "POST", body, {});
      dispatch(addMoney(money[0]));
    } catch (error) {}
  };
  return (
    <div>
      <h4>Неоплаченные поступления</h4>
      {noPayEntrance.map((e, idx) => {
        const summa = numberRoundTwo(
          e.items.reduce(
            (summa: number, value: { price: number; quantity: number }) =>
              value.price * value.quantity + summa,
            0
          )
        );
        return (
          <div className={scss.entrance} key={idx + "entrancemoney"}>
            <DetailsEntrance
              data={e.date}
              id={e.id}
              idProvider={e.link}
              items={e.items}
              detailsMaterials
            />
            <Align side="left">
              <Btn
                title="Оплатить"
                loading={loading}
                click={() =>
                  newMoney({
                    type: -1,
                    category: 1,
                    summa: summa,
                    link: e.id,
                    basis: `Оплата по поступлению № ${e.id} от ${dateToStr(
                      e.date
                    )}`,
                    id: 0,
                    date: 0,
                    author: 0,
                  })
                }
              />
            </Align>
          </div>
        );
      })}
    </div>
  );
}

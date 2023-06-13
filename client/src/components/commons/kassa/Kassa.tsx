import React, { useEffect, useState } from "react";
import scss from "./Kassa.module.scss";
import Align from "../align/Align";
import waliet from "./media/waliet.svg";
import { useHttp } from "../../../hooks/http.hook";
import { numberRoundTwo } from "../../../scripts/script";
import Preloader from "../preloader/Preloader";
import { useAppSelector } from "../../../hooks/redux.hook";
import { selectorQuantityItemMoney } from "../../../redux/selectors";
export default function Kassa() {
  const { request, loading } = useHttp();
  const [allMoney, setallMoney] = useState(0);
  const kassa = async () => {
    const data: { type: number; summa: number }[] = await request(
      "/api/money/kassa",
      "POST",
      {},
      {}
    );
    const sum = data.reduce((s: number, v) => s + v.summa * v.type, 0);
    setallMoney(numberRoundTwo(sum));
  };

  const count = async () => {
    const data = await request("/api/money/count", "POST", {}, {});
  };
  const moneyQuantity = useAppSelector((state) =>
    selectorQuantityItemMoney(state)
  );

  useEffect(() => {
    kassa();
    //count();
  }, [moneyQuantity]);
  return (
    <div className={scss.kassa}>
      <Align side="right">
        <h4>Касса</h4>
      </Align>
      <div className={scss.money}>
        <div>
          <img src={waliet} alt="" />
          <div>{loading ? <Preloader /> : allMoney} &#8381;</div>
        </div>
      </div>
    </div>
  );
}

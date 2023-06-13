import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import scss from "./payexpenses.module.scss";
import Align from "../../../../commons/align/Align";
import Pay from "../partians/entrance/Entrance";
import Expenses from "../partians/expenses/Expenses";
import arrow from "../media/arrow.svg";
import Entrance from "../partians/entrance/Entrance";
import Kassa from "../../../../commons/kassa/Kassa";
import EnterMoney from "../partians/entermoney/EnterMoney";
export default function Payexpenses() {
  const [partial, setpartial] = useState(10);

  return (
    <div className={scss.option}>
      <div className={scss.options}>
        <Kassa />
        <Align side="right">
          <h4>Оплата</h4>
        </Align>
        <PartialSetting disp={setpartial} />
      </div>
      <div className={scss.content}>
        {partial === 0 && <Entrance />}
        {partial === 1 && <Expenses />}
        {partial === 2 && <EnterMoney />}
      </div>
    </div>
  );
}

interface IPropsPartialSetting {
  disp: Dispatch<SetStateAction<number>>;
}
function PartialSetting({ disp }: IPropsPartialSetting) {
  const [currentItem, setcurrentItem] = useState(10);
  const itemsSetting = ["Поступления", "Прочее", "Ввод денежных средств"];

  const handlePartial = (i: number) => {
    setcurrentItem(i);
    disp(i);
  };

  useEffect(() => {
    handlePartial(0);
  }, []);
  return (
    <div className={scss.partialsetting}>
      {itemsSetting.map((e, i) => {
        return (
          <div
            key={i + "itemsetting"}
            className={currentItem === i ? scss.currentitem : undefined}
            onClick={() => handlePartial(i)}
          >
            <div>{e}</div>
            <div>
              <img src={arrow} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

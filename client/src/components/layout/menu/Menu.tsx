import React, { PropsWithChildren } from "react";
import style from "./Menu.module.scss";
import SelectMainMenu from "../../commons/selectmainmenu/SelectMainMenu";

const material = [
  { name: "Список", url: "/workshop/" },
  { name: "Новое поступление", url: "/workshop/entrance/" },
  { name: "Ввод остатков", url: "/workshop/enterbalance" },
  { name: "Списание", url: "/workshop/writedowns" },
  { name: "История", url: "/workshop/history/" },
];

const sales = [
  { name: "Новая", url: "/workshop/sale" },
  { name: "История", url: "/workshop/sales/" },
];

const workshop = [{ name: "Заказы на гибку", url: "/workshop/tin" }];

const money = [
  { name: "Платежи", url: "/workshop/payexpenses" },
  { name: "История", url: "/workshop/money" },
];

interface IPropsMenu extends PropsWithChildren {
  items?: string[];
}
export default function Menu({ items, children }: IPropsMenu) {
  return (
    <div className={style.menu}>
      <SelectMainMenu title="Материалы" items={material} />
      <SelectMainMenu title="Продажи" items={sales} />
      <SelectMainMenu title="Цех" items={workshop} />
      <SelectMainMenu title="Касса" items={money} />
    </div>
  );
}

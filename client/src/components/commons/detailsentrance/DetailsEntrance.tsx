import React from "react";
import scss from "./DetailsEntrance.module.scss";
import { dateToStr } from "../../../scripts/script";
import { useAppSelector } from "../../../hooks/redux.hook";
import datesvg from "./media/data.svg";
import devely from "./media/devely.svg";
import wallet from "./media/wallet.svg";
import {
  selectorMaterialMovement,
  selectorProviderId,
} from "../../../redux/selectors";
import ViewListMaterials from "../viewmaterials/ViewListMaterials";

interface IPropsDetaliEntrance {
  data: number;
  id: number;
  idProvider: number;
  items?: any;
  detailsMaterials?: boolean;
}
export default function DetailsEntrance({
  data,
  id,
  idProvider,
  items,
  detailsMaterials = false,
}: IPropsDetaliEntrance) {
  const provider = useAppSelector((state) =>
    selectorProviderId(state, idProvider)
  );

  const material = useAppSelector((state) =>
    selectorMaterialMovement(state, items)
  );

  if (typeof items === "string") items = JSON.parse(items);
  return (
    <div className={scss.detaliEntrance}>
      <h4>Информация о поступлении</h4>
      <div className={scss.datanumber}>
        <img src={datesvg} alt="" />№ {id} от {dateToStr(Number(data))}
      </div>
      <div className={scss.provider}>
        <img src={devely} alt="" />
        {provider && provider.name}
      </div>
      <div className={scss.summa}>
        <img src={wallet} alt="" />
        {items.reduce(
          (summa: number, value: { price: number; quantity: number }) =>
            value.price * value.quantity + summa,
          0
        )}{" "}
        руб.
      </div>

      {detailsMaterials && (
        <div className={scss.items}>
          {material && (
            <ViewListMaterials
              materials={material}
              notDrag
              part="entrance"
              notoptions
            />
          )}
        </div>
      )}
    </div>
  );
}

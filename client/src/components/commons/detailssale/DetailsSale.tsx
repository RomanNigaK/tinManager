import React from "react";
import scss from "./DetailsSale.module.scss";
import { dateToStr } from "../../../scripts/script";
import { useAppSelector } from "../../../hooks/redux.hook";
import datesvg from "./media/data.svg";
import clientsvg from "./media/client.svg";
import wallet from "./media/wallet.svg";
import {
  selectorClientId,
  selectorMaterialMovement,
} from "../../../redux/selectors";
import ViewListMaterials from "../viewmaterials/ViewListMaterials";

interface IPropsDetailsSale {
  data: number;
  id: number;
  idClient: number;
  items?: any;
  detailsMaterials?: boolean;
}
export default function DetailsSale({
  data,
  id,
  idClient,
  items,
  detailsMaterials = false,
}: IPropsDetailsSale) {
  const { client, sale } = useAppSelector((state) =>
    selectorClientId(state, idClient)
  );

  const material = useAppSelector((state) =>
    selectorMaterialMovement(state, items)
  );

  if (typeof items === "string") items = JSON.parse(items);
  return (
    <div className={scss.detaliEntrance}>
      <h4>Информация о реализации</h4>
      <div className={scss.datanumber}>
        <img src={datesvg} alt="" />№ {id} от {dateToStr(Number(data))}
      </div>
      <div className={scss.provider}>
        <img src={clientsvg} alt="" />
        {client && client.name}
      </div>
      <div className={scss.summa}>
        <img src={wallet} alt="" />
        {sale?.summa} руб.
      </div>

      {detailsMaterials && (
        <div className={scss.items}>
          {material && (
            <ViewListMaterials materials={material} notDrag part="entrance" />
          )}
        </div>
      )}
    </div>
  );
}

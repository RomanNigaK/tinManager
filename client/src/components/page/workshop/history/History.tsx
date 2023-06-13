import React, { useEffect, useState } from "react";
import scss from "./History.module.scss";
import Align from "../../../commons/align/Align";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";
import {
  selectorBundle,
  selectorCurrentMovement,
  selectorItemsMovement,
  selectorMaterialMovement,
  selectorMovementId,
  selectorMovements,
} from "../../../../redux/selectors";
import {
  setCurrentMovement,
  setMovements,
  setTypeEnteringbalances,
  setTypeEntrance,
  setTypeSales,
  setTypeWriteDowns,
} from "../../../../redux/slice/movementSlice";
import ViewListMaterials from "../../../commons/viewmaterials/ViewListMaterials";
import Toggle from "../../../commons/toggle/Toggle";
import DetailsEntrance from "../../../commons/detailsentrance/DetailsEntrance";
import DetailsSale from "../../../commons/detailssale/DetailsSale";

export default function History() {
  const movements = useAppSelector((state) => selectorMovements(state));

  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => selectorItemsMovement(state));
  const material = useAppSelector((state) =>
    selectorMaterialMovement(state, items)
  );

  const [isEntrance, setIsEntrance] = useState("entrance");
  const [isWriteDown, setisWriteDown] = useState("");
  const [isEnteringbalances, setisEnteringbalances] = useState("");
  const [isSales, setIsSales] = useState("");

  useEffect(() => {
    dispatch(setTypeEntrance(isEntrance));
  }, [isEntrance]);

  useEffect(() => {
    dispatch(setTypeSales(isSales));
  }, [isSales]);

  useEffect(() => {
    dispatch(setTypeWriteDowns(isWriteDown));
  }, [isWriteDown]);
  useEffect(() => {
    dispatch(setTypeEnteringbalances(isEnteringbalances));
  }, [isEnteringbalances]);

  const currentMovement = useAppSelector((state) =>
    selectorCurrentMovement(state)
  );
  const movement = useAppSelector((state) =>
    selectorMovementId(state, currentMovement || 0)
  );

  let dateStr;
  if (movement) {
    let data = new Date(Number(movement.date));
    dateStr =
      data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
  }

  return (
    <div className={scss.history}>
      <div className={scss.options}>
        <Align side="right">
          <h4>Фильтры</h4>
        </Align>
        <Align side="right">
          <div>
            <Toggle
              title="Поступления"
              toggle={[!!isEntrance, setIsEntrance]}
              name="entrance"
            />
            <Toggle
              title="Списание"
              toggle={[!!isWriteDown, setisWriteDown]}
              name="writedowns"
            />
            <Toggle
              title="Ввод остатков"
              toggle={[!!isEnteringbalances, setisEnteringbalances]}
              name="enteringbalances"
            />
            <Toggle
              title="Продажа"
              toggle={[!!isSales, setIsSales]}
              name="sales"
            />
          </div>
        </Align>
      </div>

      <div className={scss.content}>
        <h4>Список</h4>
        {movements.reverse().map((e, idx) => {
          let data = new Date(Number(e.date));
          let dateStr =
            data.getFullYear() +
            "-" +
            (data.getMonth() + 1) +
            "-" +
            data.getDate();

          return (
            <div
              className={scss.item}
              onClick={() =>
                dispatch(setCurrentMovement({ id: e.id, items: e.items }))
              }
              key={idx + "history"}
            >
              <div>
                {e.type === "entrance" ? "Поступление от поставщика" : null}
                {e.type === "writedowns" ? "Акт списания" : null}
                {e.type === "enteringbalances" ? "Ввод остатков" : null}
                {e.type === "sales" ? "Списание по продаже" : null}
              </div>
              <div>№ {e.id}</div>
              <div>от {dateStr}</div>
            </div>
          );
        })}
      </div>
      <div className={scss.materials}>
        <h4>Номенклатура</h4>
        {movement && (
          <h5>
            <div className={scss.item2}>
              <div>
                {movement.type === "entrance"
                  ? "Поступление от поставщика"
                  : null}
                {movement.type === "writedowns" ? "Акт списания " : null}
                {movement.type === "enteringbalances" ? "Ввод остатков:" : null}
              </div>
              <div> № {movement.id}</div>
              <div> от {dateStr}</div>
            </div>
          </h5>
        )}
        {material && (
          <ViewListMaterials
            notoptions
            deleted
            materials={material}
            notDrag
            part={movement?.type || undefined}
          />
        )}
      </div>
      <div className={scss.data}>
        <Bandle />
      </div>
    </div>
  );
}

function Bandle() {
  const currentMovement = useAppSelector((state) =>
    selectorCurrentMovement(state)
  );
  const movement = useAppSelector((state) =>
    selectorMovementId(state, currentMovement || 0)
  );

  return (
    <div className={scss.bundle}>
      {movement && movement.comment && (
        <div className={scss.comment}>
          <div style={{ display: "flex" }}>
            <b>Комментарий:</b>
            {movement.comment}
          </div>
        </div>
      )}

      {movement?.type === "sales" && (
        <DetailsSale
          data={movement.date}
          id={movement.id}
          idClient={movement.link}
          items={JSON.parse(movement.items as string)}
        />
      )}
      {movement?.type === "entrance" && (
        <DetailsEntrance
          data={movement.date}
          id={movement.id}
          idProvider={movement.link}
          items={JSON.parse(movement.items as string)}
        />
      )}
    </div>
  );
}

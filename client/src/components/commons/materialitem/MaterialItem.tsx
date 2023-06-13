import React, { Key, useRef, useState } from "react";
import style from "./MaterialItem.module.scss";
import entrancesvg from "./media/entrance.svg";
import movedown from "./media/movedown.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";

import { selectorUser } from "../../../redux/selectors";
import { useDrag } from "react-dnd";
import { setCerrentMaterial } from "../../../redux/slice/materialSlice";
import Color from "@commons/color/Color";
interface IPropsMaterialItem {
  name: string;
  color: string;
  thickness: number;
  coverage: string;
  stock?: number;
  id: number;
  enteringBalance?: number;
  writeDown?: number;
  entrance?: number;
  price?: number;
  notDrag: boolean;
  part?: string;
  quantity?: number;
  deleted?: number;
}
export default function MaterialItem({
  name,
  color,
  thickness,
  coverage,
  stock = 0,
  id,
  enteringBalance,
  writeDown,
  entrance,
  price,
  notDrag = false,
  part,
  quantity,
  deleted,
}: IPropsMaterialItem) {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { id },
    end: () => {},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  drag(ref);

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => selectorUser(state));

  const [isTooltip, setisTooltip] = useState(false);
  const [xy, setxy] = useState<null | [number, number]>(null);
  const [timerId, settimerId] = useState<NodeJS.Timeout>();
  const tooltip = (e: { clientX: number; clientY: number }) => {
    const id = setTimeout(() => setisTooltip(true), 300);
    settimerId(id);
    setxy([e.clientX, e.clientY]);
  };

  const deleteTooltip = (timer: NodeJS.Timeout) => {
    setisTooltip(false);
    clearTimeout(timer);
  };

  return (
    <div
      ref={!notDrag ? ref : null}
      style={{
        cursor: !notDrag ? "move" : "pointer",
        opacity: deleted ? 0.5 : 1,
      }}
      className={style.materialitem}
      onDoubleClick={
        !notDrag ? () => dispatch(setCerrentMaterial(id)) : undefined
      }
    >
      <div className={style.line}>
        <div className={style.name}>{name}</div>
        <Color color={color} />
      </div>
      <div className={style.groupinfo}>
        <div className={style.info}>
          <div className={style.thickness}>{thickness} (мм)</div>
          <div className={style.coverage}>
            <div
              onMouseEnter={(e) =>
                tooltip({ clientX: e.clientX, clientY: e.clientY })
              }
              onMouseLeave={() => timerId && deleteTooltip(timerId)}
            >
              {coverage}
            </div>
          </div>
          {part !== "entrance" && (
            <div className={style.remains}>{stock.toFixed(2)} (м2)</div>
          )}

          {isTooltip && (
            <div
              className={style.tooltip}
              style={{ top: xy ? xy[1] : 0, left: xy ? xy[0] : 0 }}
            >
              {coverage}
            </div>
          )}

          {quantity && (
            <div className={style.datadoc}>
              <div>
                <img
                  src={
                    part === "entrance" || part === "enteringbalances"
                      ? entrancesvg
                      : movedown
                  }
                  alt=""
                />
                {quantity} (м2)
              </div>
              <div>
                {price && (
                  <span>
                    <b>&#8381;</b>
                    {price}руб./м2
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

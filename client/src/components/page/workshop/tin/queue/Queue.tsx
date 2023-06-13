import React from "react";
import scss from "./Queue.module.scss";
import Align from "../../../../commons/align/Align";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/redux.hook";
import { setCurrentTin } from "../../../../../redux/slice/tinSlice";
import { selectorSaleListInwork } from "../../../../../redux/selectors";
import { IListSale } from "../../../../../redux/slice/saleSlice";
import { dateToStr } from "../../../../../scripts/script";
import arrow from "../../../../page/workshop/setting/media/arrow.svg";

import clock from "../media/clock.svg";
import ready from "../media/ready.svg";

interface IPropsQueue {
  currentTin: IListSale | null;
}
export default function Queue({ currentTin }: IPropsQueue) {
  const dispatch = useAppDispatch();
  const listSales = useAppSelector((state) => selectorSaleListInwork(state));
  const listSalesInWork = listSales.filter((i) => i.movement === "inwork");
  const listSalesTinReady = listSales.filter(
    (i) => i.movement === "tin" || i.movement === "ready"
  );
  return (
    <>
      <Align side="left">
        <h5>В очереди</h5>
      </Align>
      <div className={scss.listinwork}>
        {listSalesInWork.length ? (
          listSalesInWork.map((e, idx) => {
            return (
              <div
                onClick={() => dispatch(setCurrentTin(e))}
                className={
                  e.id === currentTin?.id ? scss.currenttin : undefined
                }
                key={idx + "tinorder"}
              >
                <div>
                  <div>
                    {e.movement === "tin" && <img src={clock} alt="" />}
                    {e.movement === "ready" && <img src={ready} alt="" />}
                  </div>
                  <div>
                    № {e.id} от {dateToStr(e.date)}
                  </div>
                </div>
                <div>
                  <img src={arrow} alt="" />
                </div>
              </div>
            );
          })
        ) : (
          <h6> - список пуст</h6>
        )}
      </div>
      <Align side="left">
        <h5>Изготовление</h5>
      </Align>
      <div className={scss.listinwork}>
        {listSalesTinReady.length ? (
          listSalesTinReady.map((e, idx) => {
            return (
              <div
                onClick={() => dispatch(setCurrentTin(e))}
                className={
                  e.id === currentTin?.id ? scss.currenttin : undefined
                }
                key={idx + "process"}
              >
                <div>
                  <div>
                    {e.movement === "tin" && <img src={clock} alt="" />}
                    {e.movement === "ready" && <img src={ready} alt="" />}
                  </div>
                  <div>
                    № {e.id} от {dateToStr(e.date)}
                  </div>
                </div>
                <div>
                  <img src={arrow} alt="" />
                </div>
              </div>
            );
          })
        ) : (
          <h6>-список пуст</h6>
        )}
      </div>
    </>
  );
}

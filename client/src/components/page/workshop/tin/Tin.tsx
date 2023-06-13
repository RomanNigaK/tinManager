import React, { useEffect, useState } from "react";
import scss from "./Tin.module.scss";
import Align from "../../../commons/align/Align";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";
import print from "./media/print.svg";
import { selectorCurrentTin } from "../../../../redux/selectors";

import Btn from "../../../commons/btn/Btn";

import ViewTin from "./viewtin/ViewTin";
import Queue from "./queue/Queue";
import { useHttp } from "../../../../hooks/http.hook";
import { setMovement } from "../../../../redux/slice/saleSlice";
import { setCurrentTin } from "../../../../redux/slice/tinSlice";
import { setMessages } from "../../../../redux/slice/appSlice";
import Print from "../../print/Print";

export default function Tin() {
  const currentTin = useAppSelector((state) => selectorCurrentTin(state));

  const dispatch = useAppDispatch();
  const [valueMovement, setvalueMovement] = useState(currentTin?.movement);
  const [isShowTin, setisShowTin] = useState(true);
  const [isShowReady, setisShowReady] = useState(true);
  const [isShowFinish, setisShowFinish] = useState(true);
  const [isPrint, setisPrint] = useState(false);
  const tin = useHttp();
  const ready = useHttp();
  const finish = useHttp();

  const handleInWork = async () => {
    try {
      let body: any = {};
      body.id = currentTin?.id;
      body.movement = "tin";
      await tin.request("/api/sale/updatemovement", "POST", body, {});
      dispatch(setMovement({ id: currentTin?.id, movement: "tin" }));
      setisShowTin(true);
      setisShowReady(false);
    } catch (error) {}
  };
  const handleReady = async () => {
    try {
      let body: any = {};
      body.id = currentTin?.id;
      body.movement = "ready";
      await tin.request("/api/sale/updatemovement", "POST", body, {});
      dispatch(setMovement({ id: currentTin?.id, movement: "ready" }));
      setisShowReady(true);
      setisShowFinish(false);
    } catch (error) {}
  };

  const handleFinish = async () => {
    try {
      let body: any = {};
      body.id = currentTin?.id;
      body.movement = "finish";
      await tin.request("/api/sale/updatemovement", "POST", body, {});
      dispatch(setMovement({ id: currentTin?.id, movement: "finish" }));
      setisShowFinish(true);
      dispatch(setCurrentTin(null));
      dispatch(setMessages("Заказ выдан"));
    } catch (error) {}
  };

  useEffect(() => {
    setisShowTin(currentTin?.movement === "inwork" ? false : true);
    setisShowReady(currentTin?.movement === "tin" ? false : true);
    setisShowFinish(currentTin?.movement === "ready" ? false : true);
  }, [currentTin]);

  useEffect(() => {
    dispatch(setCurrentTin(null));
  }, []);

  return (
    <>
      {isPrint ? (
        <Print close={setisPrint} />
      ) : (
        <div className={scss.tin}>
          <div className={scss.option}>
            <Align side="right">
              <h4>Заказы на изготовление</h4>
            </Align>
            <Queue currentTin={currentTin} />
          </div>
          <div className={scss.header}>
            {currentTin && (
              <div className={scss.actions}>
                <div>
                  <Btn
                    title="В работу"
                    click={handleInWork}
                    disabled={isShowTin}
                  />
                </div>
                <div>
                  <Btn
                    title="Готов"
                    disabled={isShowReady}
                    click={handleReady}
                  />
                </div>
                <div>
                  <Btn
                    title="Выдан"
                    disabled={isShowFinish}
                    click={handleFinish}
                  />
                </div>
                <div onClick={() => setisPrint(true)} className={scss.printbtn}>
                  <div>Распечатать</div>
                  <div>
                    <img src={print} alt="" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={scss.content}>
            {currentTin && <ViewTin currentTin={currentTin} />}
          </div>
        </div>
      )}
    </>
  );
}

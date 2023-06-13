import React from "react";
import Align from "../../../../../../commons/align/Align";
import sale from "@public/icons/sale2.svg";
import rub from "@public/icons/rub.svg";
import wallet from "@public/icons/wallet.svg";
import avatar from "@public/icons/avatar.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../hooks/redux.hook";
import {
  selectorClient,
  selectorSale,
  selectorSumCurrenSale,
  selectorUser,
} from "../../../../../../../redux/selectors";
import scss from "./History.module.scss";
import Btn from "../../../../../../commons/btn/Btn";
import { useHttp } from "../../../../../../../hooks/http.hook";
import { setMessages } from "../../../../../../../redux/slice/appSlice";
import {
  clearSale,
  setSales,
} from "../../../../../../../redux/slice/saleSlice";
export default function HistoryProduct() {
  const { summa, summaSale } = useAppSelector((state) =>
    selectorSumCurrenSale(state)
  );
  const client = useAppSelector((state) => selectorClient(state));
  const user = useAppSelector((state) => selectorUser(state));
  const currentSale = useAppSelector((state) => selectorSale(state));
  const { request, loading } = useHttp();
  const dispatch = useAppDispatch();
  const newRow = async () => {
    try {
      let body: any = {};
      body.workshop = user!.workshop;
      body.userId = user!.id;
      body.link = client?.id;
      body.pay = 0;
      body.comment = "";
      body.movement = "save";
      body.summa = summa! - summaSale!;
      body.items = JSON.stringify(currentSale);

      await request("/api/sale/new", "POST", body);
      const sales = await request(
        "/api/sale/list/",
        "POST",
        { id: user!.workshop },
        {}
      );
      dispatch(setSales(sales));
      dispatch(clearSale(null));
    } catch (error: any) {
      console.log(error);
      dispatch(setMessages(error.message));
    }
  };
  return (
    <div>
      <div>
        <div>
          <Align side="right">
            <h4>Продажа</h4>
          </Align>
          <div className={scss.listitemsale}>
            <div>
              <img src={rub} alt="" /> {summa || 0} руб.
            </div>
            <div>
              <img src={sale} alt="" /> {summaSale || 0} руб.
            </div>
            <div>
              <img src={wallet} alt="" /> {summa! - summaSale! || 0} руб.
            </div>
            <div>
              <img src={avatar} alt="" className={scss.avatar} />{" "}
              {client?.name || "Не выбран"}{" "}
            </div>
          </div>
          {summa && client && (
            <Align side="left">
              <div onClick={newRow}>
                <Btn title="Сохранить" />
              </div>
            </Align>
          )}
        </div>
      </div>
    </div>
  );
}

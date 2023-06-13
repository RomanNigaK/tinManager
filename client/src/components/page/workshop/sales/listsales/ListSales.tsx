import React, { useEffect, useState } from "react";
import scss from "./ListSales.module.scss";
import waitingforpayment from "./media/waitingforpayment.svg";
import inwork from "./media/inwork.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/redux.hook";
import saveimg from "./media/save.svg";
import ready from "./media/ready.svg";
import finish from "./media/finish.svg";

import {
  selectorClients,
  selectorClientsNames,
  selectorCurrentClientId,
  selectorMaterialId,
  selectorMaterialsAll,
  selectorSaleFilterStatus,
  selectorSaleListFilter,
  selectorSettingWorkshop,
  selectorUser,
  selectorViewSale,
} from "../../../../../redux/selectors";
import Select from "../../../../commons/select/Select";
import GroupFilters from "../../../../commons/groupFilters/GroupFilters";

import { setCurrentId } from "../../../../../redux/slice/clientSlice";
import {
  ISale,
  IListSale,
  setFiterStatus,
  setviewSale,
  setValuePay,
  setMovement,
} from "../../../../../redux/slice/saleSlice";
import ProductList from "../../../../../scripts/products";
import ViewProduct from "../viewProduct/ViewProduct";

import { dateToStr } from "../../../../../scripts/script";
import Btn from "../../../../commons/btn/Btn";
import Field from "../../../../commons/field/Field";
import { IMoney, addMoney } from "../../../../../redux/slice/moneySlice";
import { useHttp } from "../../../../../hooks/http.hook";
import Submit from "../../../../commons/submit/Submit";
import { setMessages } from "../../../../../redux/slice/appSlice";
import { setMaterials } from "../../../../../redux/slice/materialSlice";
import { setMovements } from "../../../../../redux/slice/movementSlice";
import Color from "@commons/color/Color";
export default function ListSales() {
  const link = useAppSelector((state) => selectorCurrentClientId(state));
  const movement = useAppSelector((state) => selectorSaleFilterStatus(state));
  const listSales = useAppSelector((state) =>
    selectorSaleListFilter(state, { link, movement })
  );
  const clients = useAppSelector((state) => selectorClients(state));
  const clientsNames = useAppSelector((state) => selectorClientsNames(state));
  const dispatch = useAppDispatch();
  const sale = useAppSelector((state) => selectorViewSale(state));

  return (
    <div className={scss.listsales}>
      <div className={scss.sales}>
        <h4>Продажи</h4>

        {listSales.length ? (
          <table className={scss.table}>
            <tbody>
              {listSales.map((e, idx) => {
                return (
                  <tr
                    onClick={() => dispatch(setviewSale(e))}
                    key={idx + "trlistsale"}
                  >
                    <td>№ {e.id} </td>
                    <td className={scss.data}>{dateToStr(e.date)}</td>
                    <td>{clients?.find((i) => i.id === e.link)?.name}</td>
                    <td className={scss.tdtablesalessumma}>
                      <div>
                        <div> {e.summa} &#8381;</div>

                        <div>
                          {!!!e.pay && <img src={waitingforpayment} alt="" />}{" "}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        {e.movement === "save" && <img src={saveimg} alt="" />}
                        {e.movement === "tin" && <img src={inwork} alt="" />}
                        {e.movement === "inwork" && <img src={inwork} alt="" />}
                        {e.movement === "ready" && <img src={ready} alt="" />}
                        {e.movement === "finish" && <img src={finish} alt="" />}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className={scss.clearlist}>По фильтрам данных нет</div>
        )}
      </div>
      <div className={scss.header}>
        <div>
          <GroupFilters>
            <Select
              title="Клиент"
              values={clientsNames}
              ico="coverage"
              disp={setCurrentId}
            />
            <Select
              title="Статус"
              values={[
                "Сохранен",
                "В очереди",
                "На гибке",
                "Готов к выдаче",
                "Завершен",
              ]}
              ico="coverage"
              disp={setFiterStatus}
            />
          </GroupFilters>
        </div>
      </div>
      <div className={scss.datasale}>
        {sale && <h4>Список изделий</h4>}
        {sale &&
          sale.items.map((e: ISale, idx) => {
            return (
              <div key={idx + "listProduct"}>
                <div>{idx + 1}.</div>
                <ViewProductHistorySale data={e} />
              </div>
            );
          })}
      </div>
      <div className={scss.row}>{sale && <DateCurrentSale sale={sale} />}</div>
    </div>
  );
}

interface IPropsViewProductHistorySale {
  data: ISale;
}

function ViewProductHistorySale({ data }: IPropsViewProductHistorySale) {
  const product = new ProductList();
  const currentProduct = product.getItemId(data.idMaterial!);
  const svg = product.getSvg(
    data.idProduct!,
    currentProduct?.arrow!,
    300,
    undefined,
    undefined,
    2
  );
  const material = useAppSelector((state) =>
    selectorMaterialId(state, data.idMaterial!)
  );
  return (
    <div className={scss.viewproducthistorysale}>
      <div className={scss.nameAndcolor}>
        <div className={scss.name}>{currentProduct?.name}</div>
        <div className={scss.color}>
          <Color color={material?.color!} />
        </div>
      </div>
      {data.h !== 0 && (
        <div className={scss.quantityAndh}>
          <div className={scss.quantity}>
            <u> М.П.</u> - {data.quantity}
          </div>
          <div className={scss.h}>
            <u>Н</u> - {data.h}
          </div>
          <div>
            <u>Цена(1 М.П.)</u> -
            {((data.summa! - data.sale!) / data.quantity).toFixed(2)}
            &#8381;
          </div>
        </div>
      )}
      {!!!data.h && (
        <div className={scss.quantityAndh}>
          <div className={scss.quantity}>
            <u> Количество</u> - {data.quantity}
          </div>
          {/* <div className={scss.h}>
            <u>Н</u> - {data.h}
          </div> */}
          <div>
            <u>Цена(1 за 1 шт.)</u> -
            {((data.summa! - data.sale!) / data.quantity).toFixed(2)}
            &#8381;
          </div>
          <div>
            <u>Вид: {data.pipe}</u>
          </div>
        </div>
      )}

      <div className={scss.svg}>
        <div>
          <ViewProduct svg={svg} positions={data.sizes} />
        </div>
      </div>
      <div className={scss.ticknessAndcoverage}>
        <div className={scss.ticknesess}>{material?.thickness}</div>
        <div className={scss.coverage}>{material?.coverage}</div>
      </div>
    </div>
  );
}

interface IPropsDateCurrentSale {
  sale: IListSale;
}

function DateCurrentSale({ sale }: IPropsDateCurrentSale) {
  const { register, handleSubmit } = useForm<IMoney>({
    defaultValues: { summa: sale.summa },
  });
  const pay = useHttp();
  const movement = useHttp();
  const [isShowPay, setisShowPay] = useState(true);
  const [isInWork, setisInWork] = useState(true);
  const dispatch = useAppDispatch();
  const newPay = async (body: IMoney) => {
    try {
      const money = await pay.request("/api/money/new", "POST", body, {});
      await pay.request("/api/sale/updatepay", "POST", body, {});
      dispatch(setValuePay(sale.id));
      dispatch(addMoney(money[0]));
      setisShowPay(false);
    } catch (error) {}
  };

  const materials = useAppSelector((state) => selectorMaterialsAll(state));
  const user = useAppSelector((state) => selectorUser(state));
  const setting = useAppSelector((state) => selectorSettingWorkshop(state));

  const [sellInTheNegative, setHandlePrice] = useState<boolean>(
    setting.commons.sellInTheNegative
  );

  const upadteMovement = async (id: number) => {
    try {
      const isQuantityLessStock = (currentValue: ISale) => {
        const sqrt = (currentValue.h! / 100) * currentValue.quantity;
        const stock = materials.find((e) => e.id === currentValue.idMaterial)
          ?.stock!;
        return sqrt < stock;
      };

      if (!sale.items.every(isQuantityLessStock) && !sellInTheNegative)
        throw new Error("Нет всех необходимых материалов для запуска в работу");

      let body: any = {};
      body.id = id;
      body.movement = "inwork";

      await movement.request("/api/sale/updatemovement", "POST", body, {});
      dispatch(setMovement({ id: sale.id, movement: "inwork" }));
      setisInWork(false);

      let body2: any = {};
      body2.workshop = user!.workshop;
      body2.userId = user!.id;
      body2.type = "sales";
      body2.link = sale.id;

      body2.items = JSON.stringify(
        sale.items.map((e) => {
          return {
            iditem: e.idMaterial,
            quantity: Math.round(((e.quantity * e.h!) / 1000) * 100) / 100,
          };
        })
      );

      await movement.request("/api/movement/new", "POST", body2);
      const movements = await movement.request(
        "/api/movement/list/",
        "POST",
        { id: user!.workshop },
        {}
      );
      dispatch(setMovements(movements));
      const data = await movement.request("/api/material/list", "POST", {
        id: user!.workshop,
      });
      dispatch(setMaterials(data));
    } catch (error: any) {
      dispatch(setMessages(error.message));
    }
  };

  const onSubmitPay: SubmitHandler<IMoney> = (data) => {
    data.type = 1;
    data.category = 2;
    data.basis = `Оплата по реализации № ${sale.id} от ${dateToStr(sale.date)}`;
    data.link = sale.id;
    newPay(data);
  };

  useEffect(() => {
    setisShowPay(true);
    setisInWork(true);
  }, [sale.id]);
  return (
    <>
      <h4>
        № {sale?.id} от {dateToStr(sale?.date!)}
      </h4>

      <div className={scss.optionrow}>
        {!!!sale.pay && isShowPay ? (
          <div className={scss.formpay}>
            <form onSubmit={handleSubmit(onSubmitPay)}>
              <Field
                name="summa"
                register={register}
                placeholder="сумма"
                titleBtn="Оплатить"
                size="middle"
                idForSubmit="pay"
                readonly
                loading={pay.loading}
              />
              <Submit id="pay" />
            </form>
          </div>
        ) : (
          <div className={scss.status}>-Заказ оплачен</div>
        )}
        {isInWork && (
          <div>
            {sale.movement === "save" && (
              <div onClick={() => upadteMovement(sale.id)}>
                <Btn title="В работу" loading={movement.loading} />
              </div>
            )}
            {sale.movement === "finish" && (
              <div className={scss.status} key={"finish"}>
                -Заказ завершен
              </div>
            )}
            {sale.movement === "tin" && (
              <div className={scss.status} key={"tin"}>
                -Изготовление
              </div>
            )}
            {sale.movement === "inwork" && (
              <div className={scss.status} key={"inwork"}>
                -В очереди на изготовление
              </div>
            )}
            {sale.movement === "ready" && (
              <div className={scss.status} key={"ready"}>
                -Готов к выдаче
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

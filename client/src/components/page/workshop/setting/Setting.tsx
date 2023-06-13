import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import scss from "./Setting.module.scss";
import Align from "../../../commons/align/Align";
import arrow from "./media/arrow.svg";
import Tin from "./partians/tin/Tin";
import Users from "./partians/users/Users";
import Price from "./partians/price/Price";
import SettingProduct from "./partians/product/SettingProduct";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";
import {
  selectorSettingWorkshop,
  selectorWorkshop,
} from "../../../../redux/selectors";
import Commons from "./partians/commons/Commons";
import {
  ISettingCommons,
  ISettingMakePriceProduct,
  ISettingPipe,
  ISettingProducts,
  apdateSetting,
} from "redux/slice/workshopSlice";
import Pipe from "./partians/pipe/Pipe";

interface IPorpsPartiansPage {
  setting?: any;
}

export type { IPorpsPartiansPage };

export default function Setting() {
  const [partial, setpartial] = useState(0);
  const dispatch = useAppDispatch();
  const workshop = useAppSelector((state) => selectorWorkshop(state));
  const setting = useAppSelector((state) => selectorSettingWorkshop(state));

  const [makePriceProduct, setMakePriceProduct] =
    useState<ISettingMakePriceProduct>();
  const [products, setProducts] = useState<ISettingProducts>();
  const [commons, setCommons] = useState<ISettingCommons>();
  const [pipe, setpipe] = useState<ISettingPipe>();

  useEffect(() => {
    setMakePriceProduct(setting.makePriceProduct);
    setProducts(setting.products);
    setCommons(setting.commons);
    setpipe(setting.pipe);
  }, [setting]);
  return (
    <div className={scss.option}>
      <div className={scss.options}>
        <Align side="right">
          <h4>Настройки цеха</h4>
        </Align>
        <PartialSetting disp={setpartial} />
      </div>
      <div className={scss.content}>
        {partial === 0 && <Tin tin={workshop} />}
        {partial === 1 && <Users users={workshop?.users} />}
        {partial === 2 && <Price setting={makePriceProduct} />}
        {partial === 4 && <Pipe setting={pipe} />}
        {partial === 3 && <SettingProduct products={products} />}
        {partial === 5 && <Commons commons={commons} />}
      </div>
    </div>
  );
}

interface IPropsPartialSetting {
  disp: Dispatch<SetStateAction<number>>;
}
function PartialSetting({ disp }: IPropsPartialSetting) {
  const [currentItem, setcurrentItem] = useState(0);
  const itemsSetting = [
    "Управление аккаунтом",
    "Пользователи",
    "Формирование цены",
    "Изделия",
    "Зонты на трубы",
    "Общие",
  ];

  const handlePartial = (i: number) => {
    setcurrentItem(i);
    disp(i);
  };
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

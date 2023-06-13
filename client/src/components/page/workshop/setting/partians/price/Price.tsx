import React, { useEffect, useState } from "react";
import scss from "./Price.module.scss";
import Align from "../../../../../commons/align/Align";
import { SubmitHandler, useForm } from "react-hook-form";
import Field from "../../../../../commons/field/Field";
import Btn from "../../../../../commons/btn/Btn";
import Submit from "../../../../../commons/submit/Submit";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ISetting,
  ISettingMakePriceProduct,
  apdateSetting,
} from "redux/slice/workshopSlice";
import { error } from "console";
import { useAppDispatch } from "@castomhooks/redux.hook";
import Toggle from "@commons/toggle/Toggle";

interface IPrice {
  setting: ISettingMakePriceProduct;
}

const schema = yup.object().shape({
  percentages: yup
    .number()
    .typeError("Вы ввели не корректное число")
    .integer("Введено не целое число")
    .required("обязательно для заполнения")
    .min(50, "Минимальное значение 50%"),
  price1sm: yup
    .number()
    .typeError("Вы ввели не корректное число")
    .integer("Введено не целое число")
    .required("обязательно для заполнения")
    .min(5, "Минимальное значение 5"),
});

export default function Price({ setting }: IPrice) {
  return (
    <div className={scss.price}>
      {setting && <SettingPriceProduct {...setting} />}
    </div>
  );
}

function SettingPriceProduct({
  price1sm,
  percentages,
  makePrice,
  handlePrice,
}: ISettingMakePriceProduct) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISettingMakePriceProduct>({
    defaultValues: { price1sm, percentages },
    resolver: yupResolver(schema),
  });

  const [ishandlePrice, setIshandlePrice] = useState<boolean>(handlePrice);

  const onSubmit: SubmitHandler<ISettingMakePriceProduct> = (data) => {
    const newData = { ...data, handlePrice: !!ishandlePrice };
    dispatch(apdateSetting({ part: "makePriceProduct", setting: newData }));
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Align side="left">
          <h4>Изделия</h4>
        </Align>
        <div className={scss.blockoptions}>
          <div className={scss.title}>
            Установить стоимость за сантиметр изделия
          </div>
          <div className={scss.wrappertoggle}>
            <Field
              name="makePrice"
              register={register}
              toggle={[
                makePrice,
                makePrice === "Фиксированная" ? "Наценка" : "Фиксированная",
              ]}
              size="middle"
              theme="standart"
              setValue={setValue}
            />
          </div>
          <div className={scss.wrapperinput} style={{ width: "200px" }}>
            <Field
              name="percentages"
              placeholder="Наценка, %"
              register={register}
              size="middle"
              theme="standart"
              error={errors.percentages?.message}
            />
          </div>
          <div className={scss.about}>
            - наценка в указанном размере на входящую стоимость,%
          </div>
          <div className={scss.wrapperinput} style={{ width: "120px" }}>
            <Field
              register={register}
              name="price1sm"
              placeholder="Цена"
              size="middle"
              theme="standart"
              error={errors.price1sm?.message}
            />
          </div>
          <div className={scss.about}>
            - розничная цена за см изделия длиной в 1 метр, руб.
          </div>
          <div className={scss.about}>
            * входящей стоимостью будет считаться последняя цена при поступлении
            товара
          </div>
          <div className={scss.about}>
            ** При отсутствии установленной цены товара и при использовании
            режима наценки, будет использоваться фиксированная цена
          </div>
          <div className={scss.toggle}>
            <Toggle
              title="Разрешить ввод стоимости в ручную"
              name="handlePrice"
              toggle={[ishandlePrice, setIshandlePrice]}
            />
          </div>

          <div className={scss.saveedit}>
            <Align side="right">
              <Btn
                title="Сохранить изменения"
                idForHtml="SettingPriceProduct"
              />
            </Align>
          </div>
        </div>
        <Submit id="SettingPriceProduct" />
      </form>
    </>
  );
}

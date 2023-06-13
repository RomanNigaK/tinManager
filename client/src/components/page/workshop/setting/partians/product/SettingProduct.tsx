import React from "react";
import scss from "./SettingProduct.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { ISettingProducts, apdateSetting } from "redux/slice/workshopSlice";
import Field from "@commons/field/Field";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Submit from "@commons/submit/Submit";
import { useAppDispatch, useAppSelector } from "@castomhooks/redux.hook";
import { selectorLoadinWorkshop } from "redux/selectors";

interface IPropsSettingProduct {
  products: ISettingProducts;
}

const schema = yup.object().shape({
  widthBind: yup
    .number()
    .typeError("Вы ввели не корректное число")
    .integer("Введено не целое число")
    .required("обязательно для заполнения")
    .min(5, "Минимальное значение 5 мм"),
});

export default function SettingProduct({ products }: IPropsSettingProduct) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => selectorLoadinWorkshop(state));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISettingProducts>({
    defaultValues: { widthBind: products.widthBind },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<ISettingProducts> = (data) => {
    dispatch(apdateSetting({ part: "products", setting: data }));
  };

  return (
    <div className={scss.settingproduct}>
      <h4>Настройки изделий</h4>
      <div className={scss.blockoptions}>
        <div className={scss.title}>Размер завальцовки изделия, мм</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={scss.wrapperinput} style={{ width: "300px" }}>
            <Field
              name="widthBind"
              placeholder="Размер, мм"
              register={register}
              size="middle"
              theme="standart"
              error={errors.widthBind?.message}
              titleBtn="Сохранить"
              idForSubmit="setwidthBind"
              loading={loading}
            />
          </div>
          <Submit id="setwidthBind" />
        </form>
      </div>
    </div>
  );
}

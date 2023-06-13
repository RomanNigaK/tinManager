import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import scss from "./EnterMoney.module.scss";
import Field from "../../../../../commons/field/Field";
import { IMoney, addMoney } from "../../../../../../redux/slice/moneySlice";
import Submit from "../../../../../commons/submit/Submit";

import { useHttp } from "../../../../../../hooks/http.hook";
import { useAppDispatch } from "../../../../../../hooks/redux.hook";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  summa: yup
    .number()
    .min(100, "минимальная сумма ввода 100 руб.")
    .typeError("Вне корректное число")
    .required("обязательно для заполнения"),
});

export default function EnterMoney() {
  const { request, loading } = useHttp();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMoney>({ resolver: yupResolver(schema) });
  const newMoney = async (body: IMoney) => {
    try {
      const money = await request("/api/money/new", "POST", body, {});
      reset();
      dispatch(addMoney(money[0]));
    } catch (error) {}
  };

  const onSubmit: SubmitHandler<IMoney> = (data) => {
    data.type = 1;
    data.category = 3;
    data.basis = "Ввод денежных средств в кассу";
    newMoney(data);
  };
  return (
    <div className={scss.entermoney}>
      <h4>Ввод денежных средств</h4>
      <div className={scss.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="summa"
            register={register}
            placeholder="Сумма"
            size="middle"
            theme="standart"
            error={errors.summa?.message}
          />
          <Field
            name="comment"
            register={register}
            placeholder="Комментарий"
            size="middle"
            theme="standart"
            titleBtn="Внести"
            error={errors.comment?.message}
            idForSubmit="entermoney"
          />

          <Submit id="entermoney" />
        </form>
      </div>
    </div>
  );
}

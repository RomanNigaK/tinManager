import React, {
  CSSProperties,
  Component,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import scss from "./Expenses.module.scss";
import Align from "../../../../../commons/align/Align";
import Btn from "../../../../../commons/btn/Btn";
import Twopages from "../../../../../commons/twopages/Twopages";
import ListExpenses from "./listexpenses/ListExpenses";
import NewViewExpenses from "./newlistexpenses/NewListExpenses";
import { useForm, SubmitHandler } from "react-hook-form";
import Field from "../../../../../commons/field/Field";
import { selectorCurrentRko } from "../../../../../../redux/selectors";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/redux.hook";
import { IMoney, addMoney } from "../../../../../../redux/slice/moneySlice";
import Submit from "../../../../../commons/submit/Submit";
import { useHttp } from "../../../../../../hooks/http.hook";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  summa: yup
    .number()
    .typeError("не корректное число")
    .required("обязательно для заполнения"),
});

export default function Expenses() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMoney>({
    resolver: yupResolver(schema),
  });
  const { request, loading } = useHttp();
  const currentRko = useAppSelector((state) => selectorCurrentRko(state));
  const dispatch = useAppDispatch();
  const newPay = async (body: IMoney) => {
    try {
      const data = await request("/api/money/new", "POST", body, {});
      dispatch(addMoney(data[0]));
      reset();
    } catch (error) {}
  };

  const onSubmit: SubmitHandler<IMoney> = (data) => {
    data.basis = currentRko!.name;
    data.type = -1;
    data.category = currentRko!.id;
    newPay(data);
  };
  return (
    <div className={scss.expenses}>
      <div className={scss.twopage}>
        <Twopages
          basicPage={ListExpenses}
          additionalPage={NewViewExpenses}
          width={320}
        />
      </div>
      <div className={scss.dataexpenses}>
        <h4>Списание денежных средств</h4>
        {!currentRko && <h5>Выберите наименование расхода</h5>}
        {currentRko && (
          <div className={scss.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h5>{currentRko.name}</h5>
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
                titleBtn="Провести"
                idForSubmit="newmoney"
              />
              <Submit id="newmoney" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

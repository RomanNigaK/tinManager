import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";
import { selectorCurrentMaterial } from "../../../../redux/selectors";
import { objToStr } from "../../../../scripts/script";
import {
  addEnteringBalance,
  setCerrentMaterial,
} from "../../../../redux/slice/materialSlice";
import scss from "./InputQuantity.module.scss";
import CloseRound from "../../../commons/svg/CloseRound";
import Field from "../../../commons/field/Field";
import Submit from "../../../commons/submit/Submit";

type FormValuesQuantity = {
  quantity: number;
};

const schema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("не корректное число")
    .required("обязательно для заполнения")
    .min(0.2, "слишком маленькое значение"),
});

interface IPropsInputQuantity {
  disp: (id: number, quantity: number) => void;
}

export default function InputQuantity({ disp }: IPropsInputQuantity) {
  const dispatch = useAppDispatch();
  const [name, setname] = useState<string | null>(null);
  const currentMaterial = useAppSelector((state) =>
    selectorCurrentMaterial(state)
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesQuantity>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (currentMaterial) setname(objToStr(currentMaterial));
  }, [currentMaterial]);

  const onSubmit: SubmitHandler<FormValuesQuantity> = (data) => {
    disp(currentMaterial!.id, data.quantity);
    reset();
  };

  if (!currentMaterial) return <></>;
  return (
    <div className={scss.inputquantity}>
      <div>
        <div className={scss.name}>{name}</div>
        <div
          className={scss.close}
          onClick={() => dispatch(setCerrentMaterial(0))}
        >
          <CloseRound width="50px" height="50px" color="#D9BA23" stroke="3" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={scss.field}>
          <Field
            titleBtn="Добавить"
            name="quantity"
            register={register}
            theme="standart"
            size="middle"
            round="right"
            placeholder="Количество м2"
            idForSubmit="setQuantity"
            error={errors.quantity?.message}
          />
        </div>
        <Submit id="setQuantity" />
      </form>
    </div>
  );
}

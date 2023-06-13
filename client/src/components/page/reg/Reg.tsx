import React, { useEffect, useState } from "react";
import scss from "./Reg.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Field from "../../commons/field/Field";
import { useAppSelector } from "../../../hooks/redux.hook";
import { selectorEmailUser } from "../../../redux/selectors";
import Submit from "../../commons/submit/Submit";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { error } from "console";
import { useHttp } from "../../../hooks/http.hook";

type FormReG = {
  name: string;
  sename: string;
  phone: string;
  typePerson: string;
  nameCompany: string;
  email: string;
  login: string;
  pass: string;
  rpass: string;
};
const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,12}(\s*)?$/;
const schema = yup.object().shape({
  name: yup.string().required("обязательно для заполнения"),
  sename: yup.string().required("обязательно для заполнения"),
  login: yup.string().required("обязательно для заполнения"),
  phone: yup
    .string()
    .required("обязательно для заполнения")
    .matches(phoneRegExp, "номер телефона не корректен"),
  pass: yup
    .string()
    .required("обязательно для заполнения")
    .min(6, "минимальное количество символов 6"),
  rpass: yup
    .string()
    .required("обязательно для заполнения")
    .oneOf([yup.ref("pass")], "пароли не совпадают"),
  email: yup
    .string()
    .email("email не корректен")
    .required("обязательно для заполнения"),
});
export default function Reg() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormReG>({
    resolver: yupResolver(schema),
  });

  const email = useAppSelector((state) => selectorEmailUser(state));
  const { request, loading } = useHttp();
  useEffect(() => {
    setValue("email", email ? email : "");
  }, []);

  const [isRegValid, setisRegValid] = useState(false);
  const registration = async (body: any) => {
    try {
      body.id = Date.now();
      const data = await request("/api/user/new", "POST", body, {});
      setisRegValid(true);
    } catch (error: any) {}
  };

  const onSubmitReg: SubmitHandler<FormReG> = (data) => {
    console.log(data);
    registration(data);
  };

  const [dependentField, setdependentField] = useState(false);

  return (
    <div className={scss.reg}>
      <div className={scss.header}>
        <div>
          <h4>TinManager</h4>
        </div>
        <div>система управления цехом onLine</div>
      </div>
      <div className={scss.form}>
        {isRegValid ? (
          <>
            <h4>Ваш цех создан!</h4>
            <h5>Войдите под своим логинов и паролем</h5>
          </>
        ) : (
          <>
            <h4>Регистрация</h4>
            <form onSubmit={handleSubmit(onSubmitReg)}>
              <Field
                name="name"
                register={register}
                placeholder="Имя"
                size="middle"
                error={errors.name?.message}
                theme="standart"
              />
              <Field
                name="sename"
                theme="standart"
                register={register}
                placeholder="Фамилия"
                size="middle"
                error={errors.sename?.message}
              />
              <Field
                name="phone"
                theme="standart"
                register={register}
                placeholder="Телефон"
                size="middle"
                error={errors.phone?.message}
              />
              <Field
                name="typePerson"
                theme="standart"
                register={register}
                toggle={["Частное лицо", "Юр. лицо"]}
                size="middle"
                setValue={setValue}
                setdependentField={setdependentField}
              />
              {dependentField && (
                <Field
                  name="namecompany"
                  theme="standart"
                  register={register}
                  placeholder="Название организации"
                  size="middle"
                />
              )}

              <Field
                name="email"
                theme="standart"
                register={register}
                placeholder="Email"
                size="middle"
                error={errors.email?.message}
              />
              <Field
                name="login"
                theme="standart"
                register={register}
                placeholder="Придумайте логин"
                size="middle"
                error={errors.login?.message}
              />
              <Field
                name="pass"
                theme="standart"
                register={register}
                placeholder="Пароль"
                size="middle"
                error={errors.pass?.message}
              />
              <Field
                name="rpass"
                theme="standart"
                register={register}
                placeholder="Повторите пароль"
                size="middle"
                titleBtn="Регистрация"
                idForSubmit="reg"
                error={errors.rpass?.message}
                loading={loading}
              />
              <Submit id="reg" />
            </form>
          </>
        )}
      </div>
    </div>
  );
}

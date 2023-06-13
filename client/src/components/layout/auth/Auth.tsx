import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Submit from "../../commons/submit/Submit";
import { useHttp } from "../../../hooks/http.hook";

import { useAuth } from "../../../hooks/auth.hook";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/redux.hook";
import { useNavigate } from "react-router";
import Field from "../../commons/field/Field";

const schema = yup.object().shape({
  login: yup.string().required("обязательно для заполнения"),
  pass: yup.string().required("обязательно для заполнения"),
});

type FormAuth = {
  login: string;
  pass: string;
};

export const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAuth>({
    resolver: yupResolver(schema),
  });
  const { request, loading } = useHttp();

  const [errorAuth, seterrorAuth] = useState("");
  const { loginUser } = useAuth();

  const authUser = async (body: { login: string; pass: string }) => {
    try {
      let data = await request("/api/user/login", "POST", body, {});
      console.log(data);
      loginUser(data);
    } catch (error) {
      seterrorAuth("Не верная пара логин/пароль");
    }
  };

  const onSubmitAuth: SubmitHandler<FormAuth> = (data) => {
    console.log(data);
    authUser(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitAuth)}>
      <Field
        theme="standart"
        size="little"
        placeholder="Логин"
        name="login"
        register={register}
        error={errors.login?.message || errorAuth}
        notTextError={errorAuth}
      />
      <Field
        register={register}
        theme="standart"
        size="little"
        titleBtn="Войти"
        placeholder="Пароль"
        name="pass"
        idForSubmit="auth"
        error={errors.pass?.message || errorAuth}
        loading={loading}
        type="password"
      />
      <Submit id="auth" />
    </form>
  );
};

import React, { useState } from "react";
import scss from "./Newuser.module.scss";

import { useForm, SubmitHandler } from "react-hook-form";

import Btn from "@commons/btn/Btn";
import Align from "@commons/align/Align";
import Field from "@commons/field/Field";
import Submit from "@commons/submit/Submit";
import { useHttp } from "@castomhooks/http.hook";
import { useAppDispatch, useAppSelector } from "@castomhooks/redux.hook";
import { User } from "redux/slice/userSlice";
import { selectorUser } from "redux/selectors";
import { addUser } from "redux/slice/workshopSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Radio from "@commons/radio/Radio";
import CastomError from "@commons/castomerror/CastomError";

interface InewUser extends User {
  pass: string;
  rpass: string;
}

const schema = yup.object().shape({
  nameUser: yup.string().required("обязательно для заполнения"),
  senameUser: yup.string().required("обязательно для заполнения"),
  login: yup.string().required("обязательно для заполнения"),
  pass: yup
    .string()
    .required("обязательно для заполнения")
    .min(6, "Минимальное количество символов 6"),
  rpass: yup
    .string()
    .required("обязательно для заполнения")
    .oneOf([yup.ref("pass")], "Пароли не совпадают"),
});

export default function Newuser() {
  const [access, setaccess] = useState<string | null>(null);

  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InewUser>({ resolver: yupResolver(schema) });
  const dispatch = useAppDispatch();
  const { request, loading } = useHttp();
  const dataCurrentUser = useAppSelector((state) => selectorUser(state));
  const newUser = async (body: User) => {
    const user = await request("/api/user/adduser", "POST", body, {});
    dispatch(addUser(user[0]));
  };
  const onSubmit: SubmitHandler<User> = (data) => {
    data.workshop = dataCurrentUser.workshop;
    if (!access) {
      setError("access", { type: "custom", message: "Укажите права доступа" });
      return;
    }

    data.access = access;
    newUser(data);
    reset();
  };

  return (
    <div className={scss.newuser}>
      <h4>Создание/редактирование пользователя</h4>
      <div className={scss.blockoptions}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={scss.form}>
            <div>
              <div>
                <Field
                  register={register}
                  name="nameUser"
                  placeholder="Имя"
                  size="middle"
                  theme="standart"
                  error={errors.nameUser?.message}
                />
              </div>
              <div>
                <Field
                  register={register}
                  name="senameUser"
                  placeholder="Фамилия"
                  size="middle"
                  theme="standart"
                  error={errors.senameUser?.message}
                />
              </div>
            </div>
            <div>
              <div>
                <Field
                  register={register}
                  name="login"
                  placeholder="Логин"
                  size="middle"
                  theme="standart"
                  error={errors.login?.message}
                />
              </div>
              <div>
                <Field
                  register={register}
                  name="pass"
                  placeholder="Пароль"
                  size="middle"
                  theme="standart"
                  error={errors.pass?.message}
                />
              </div>
              <div>
                <Field
                  register={register}
                  name="rpass"
                  placeholder="Повторите пароль"
                  size="middle"
                  theme="standart"
                  error={errors.rpass?.message}
                />
              </div>
            </div>
            <div>
              <Radio
                values={["Права доступа", "Администратор", "Продажи", "Цех"]}
                setVal={setaccess}
              />
            </div>
            <div>
              <div>
                <Btn title="Сохранить" idForHtml="newuser" loading={loading} />
              </div>
            </div>
            <div>
              <CastomError>{errors.access?.message}</CastomError>
            </div>
          </div>
          <Submit id="newuser" />
        </form>
      </div>
    </div>
  );
}

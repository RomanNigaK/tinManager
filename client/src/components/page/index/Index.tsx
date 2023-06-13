import React from "react";
import scss from "./Index.module.scss";
import Field from "../../commons/field/Field";
import about from "./media/about.mp4";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Submit from "../../commons/submit/Submit";
import { setEmail } from "../../../redux/slice/userSlice";
import { useAppDispatch } from "../../../hooks/redux.hook";
import { useNavigate } from "react-router";
type FormEmailIndexPage = {
  email: string;
};
const schema = yup.object().shape({
  email: yup
    .string()
    .required("email обязателен для заполнения")
    .email("email не корректен"),
});

export default function Index() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormEmailIndexPage>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormEmailIndexPage> = (data) => {
    dispatch(setEmail(data.email));
    navigate("/reg");
  };
  return (
    <div className={scss.index}>
      <div className={scss.header}>
        <div>
          <h4>TinManager</h4>
        </div>
        <div>система управления цехом onLine</div>
      </div>
      <div className={scss.formreg}>
        <div>
          <h4>Создайте свой цех</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              size="middle"
              theme="standart"
              placeholder="Email"
              titleBtn="Начать"
              idForSubmit="emailindex"
              error={errors.email?.message}
              register={register}
              name="email"
            />
            <Submit id="emailindex" />
          </form>
        </div>
      </div>
      <div className={scss.about}>
        <h4>Что такое TinManager?!</h4>
        <video controls width="900px" loop>
          <source src={about} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

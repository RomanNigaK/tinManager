import React from "react";
import { IPorpsPartiansPage } from "../../Setting";
import { IWorkshop } from "../../../../../../redux/slice/workshopSlice";
import scss from "./Tin.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Field from "@commons/field/Field";
import Submit from "@commons/submit/Submit";
import { useHttp } from "@castomhooks/http.hook";
import { useAuth } from "@castomhooks/auth.hook";
import { useAppDispatch } from "@castomhooks/redux.hook";
import { setMessages } from "redux/slice/appSlice";
interface IPropsTin {
  tin: IWorkshop | null;
}

export default function Tin({ tin }: IPropsTin) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IWorkshop>();
  const dispatch = useAppDispatch();
  const { request, loading } = useHttp();
  const { logoutUser } = useAuth();
  const deleteTin = async () => {
    try {
      await request("/api/workshop/deletetin", "POST", { id: tin.id });
    } catch (error) {}
  };

  const onSubmit: SubmitHandler<IWorkshop> = (data) => {
    if (tin.id != data.id) {
      setError("id", { type: "custom", message: "Значения не совпадают" });
      return;
    }
    deleteTin();
    dispatch(setMessages("Ваш аккаунт удален"));
    setTimeout(() => logoutUser(), 300);
  };

  return (
    <div className={scss.tin}>
      <h4>Основные</h4>
      <div className={scss.blockoptions}>
        <div className={scss.info}>
          <div>
            <span>ID:</span> {tin?.id}
          </div>
          <div>
            <span>Email:</span> {tin?.email}
          </div>
          <div>
            <span>Телефон:</span> {tin?.phone}
          </div>
          <div>
            {tin?.typeuser} {tin?.namecompany}
          </div>
        </div>
      </div>

      <h4>Удаления аккаунта</h4>
      <div className={scss.blockoptions}>
        <div className={scss.title}>
          Для удаления введите ID цеха и нажмите удалить
        </div>
        <div className={scss.deletetin}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ width: "300px" }}>
              <Field
                name="id"
                placeholder="ID цеха"
                register={register}
                size="middle"
                theme="standart"
                error={errors.id?.message}
                titleBtn="Удалить"
                idForSubmit="deletetin"
                loading={loading}
              />
            </div>
            <Submit id="deletetin" />
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./Client.module.scss";
import Align from "../../../../../../commons/align/Align";
import Field from "../../../../../../commons/field/Field";

import Btn from "../../../../../../commons/btn/Btn";
import { useHttp } from "../../../../../../../hooks/http.hook";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../hooks/redux.hook";
import {
  selectorClient,
  selectorClients,
  selectorUser,
} from "../../../../../../../redux/selectors";
import Submit from "../../../../../../commons/submit/Submit";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  setClients,
  setCurrentClient,
} from "../../../../../../../redux/slice/clientSlice";
import { updateSale } from "../../../../../../../redux/slice/saleSlice";
import Search from "@commons/search/Search";

type FormNewSale = {
  search: string;
};
export default function Client() {
  const { register, setValue, handleSubmit } = useForm<FormNewClient>();
  const clients = useAppSelector((state) => selectorClients(state) || []);

  const client = useAppSelector((state) => selectorClient(state));
  const onSubmit: SubmitHandler<FormNewClient> = (data) => {
    console.log(data);
  };
  const dispatch = useAppDispatch();
  const handleClient = (id: number | null, sale: number, name: string) => {
    setRowSearch(name);
    dispatch(setCurrentClient(id));
    dispatch(updateSale(sale));
  };

  const [rowSearch, setRowSearch] = useState(client?.name || "");
  const [resultSearch, setresultSearch] = useState(
    clients.filter(
      (i) => i.name.toLowerCase().indexOf(rowSearch.toLowerCase(), 0) !== -1
    )
  );
  useEffect(() => {
    setresultSearch(
      clients.filter(
        (i) => i.name.toLowerCase().indexOf(rowSearch.toLowerCase(), 0) !== -1
      )
    );
    if (!rowSearch) dispatch(setCurrentClient(0));
  }, [rowSearch]);

  return (
    <div className={scss.client}>
      <Align side="right">
        <h4>Данные покупателя</h4>
      </Align>

      <Search
        setSearch={setRowSearch}
        placeholder="Покупатель"
        val={rowSearch}
      />

      <div className={scss.listclientdiv}>
        {resultSearch.map((e, idx) => {
          return (
            <div
              onClick={() => handleClient(e.id, e.sale, e.name)}
              key={idx + "bayer"}
            >
              {e.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type FormNewClient = {
  name: string;
  phone: string;
  sale: number;
};

const schema = yup.object().shape({
  name: yup.string().required("обязательно для заполнения"),
  sale: yup
    .number()
    .typeError("не корректное число")
    .required("обязательно для заполнения")
    .max(99, "слишком маленькое значение"),
});

export function NewClient() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNewClient>({
    resolver: yupResolver(schema),
  });
  const { request, loading } = useHttp();
  const user = useAppSelector((state) => selectorUser(state));
  const dispatch = useAppDispatch();
  const newRowClient = async (body: any) => {
    try {
      body.workshop = user!.workshop;
      body.userId = user!.id;
      await request("/api/client/new", "POST", body, {});

      const clients = await request(
        "/api/client/list/",
        "POST",
        { id: user!.workshop },
        {}
      );
      dispatch(setClients(clients));
      reset();
    } catch (error) {}
  };
  const onSubmit: SubmitHandler<FormNewClient> = (data) => {
    newRowClient(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          placeholder="Имя"
          register={register}
          name="name"
          round="left"
          size="middle"
          theme="standart"
          error={errors.name?.message}
        />
        <Field
          placeholder="Телефон"
          register={register}
          name="phone"
          round="left"
          size="middle"
          theme="standart"
        />
        <Field
          placeholder="Скидка %"
          register={register}
          name="sale"
          round="left"
          size="middle"
          theme="standart"
          error={errors.sale?.message}
        />
        <Align side="left">
          <Btn title="Добавить" idForHtml="newclient" />
        </Align>
        <Submit id="newclient" />
      </form>
    </div>
  );
}

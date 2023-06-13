import React from "react";
import Align from "../../../../../../commons/align/Align";
import Btn from "../../../../../../commons/btn/Btn";
import scss from "./NewListExpenses.module.scss";
import Field from "../../../../../../commons/field/Field";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHttp } from "../../../../../../../hooks/http.hook";
import Submit from "../../../../../../commons/submit/Submit";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../hooks/redux.hook";
import { setRko } from "../../../../../../../redux/slice/rkoSlice";
import { selectorUser } from "../../../../../../../redux/selectors";

type Form = {
  name: string;
  isappitemname: number;
};
export default function NewListExpenses() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const { request, loading } = useHttp();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectorUser(state));
  const newNameRko = async (body: any) => {
    try {
      await request("/api/rko/new", "POST", body, {});
      const namesRko = await request(
        "/api/rko/list/",
        "POST",
        { id: user!.workshop },
        {}
      );
      dispatch(setRko(namesRko));
    } catch (error) {}
  };

  const onSubmit: SubmitHandler<Form> = (data) => {
    data.isappitemname = 0;
    newNameRko(data);
  };

  return (
    <div className={scss.newlistexpenses}>
      <Align side="right">
        <h5>Добавить вид расхода</h5>
      </Align>
      <div className={scss.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            register={register}
            name="name"
            placeholder="Наименование"
            round="left"
            size="middle"
            theme="standart"
          />
          <Align side="left">
            <Btn title="Добавить" idForHtml="newnameorder" />
          </Align>
          <Submit id="newnameorder" />
        </form>
      </div>
    </div>
  );
}

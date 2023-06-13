import React from "react";
import scss from "./Pipe.module.scss";
import Field from "@commons/field/Field";
import Submit from "@commons/submit/Submit";
import { useHttp } from "@castomhooks/http.hook";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ISetting,
  ISettingPipe,
  apdateSetting,
} from "redux/slice/workshopSlice";
import CastomError from "@commons/castomerror/CastomError";
import { useAppDispatch } from "@castomhooks/redux.hook";

type FormPipe = {
  name: string;
};

interface IPropsPipe {
  setting: ISettingPipe;
}

export default function Pipe({ setting }: IPropsPipe) {
  console.log(setting.list);
  const { loading, request } = useHttp();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormPipe>();
  const onSubmit: SubmitHandler<FormPipe> = (data) => {
    console.log(data);
    let newList: string[] = [...setting.list];
    newList.push(data.name);
    dispatch(apdateSetting({ part: "pipe", setting: { list: newList } }));
    reset();
  };
  return (
    <div>
      <h4>Список вариантов</h4>
      <div className={scss.blockoptions}>
        {setting.list.length === 0 && (
          <CastomError>Нет сохраненных наименований</CastomError>
        )}

        {!!setting.list.length && (
          <div>
            {setting.list.map((e, inx) => {
              return <div key={inx + "namepipe"}>{e}</div>;
            })}
          </div>
        )}
        <div className={scss.title}>Наимнование вида зонта</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={scss.wrapperinput} style={{ width: "300px" }}>
            <Field
              name="name"
              placeholder="Наименование"
              register={register}
              size="middle"
              theme="standart"
              error={errors.name?.message}
              titleBtn="Сохранить"
              idForSubmit="namepipe"
              loading={loading}
            />
          </div>
          <Submit id="namepipe" />
        </form>
        <div className={scss.about}>
          - каждое производство имеет несколько вариантов производства зонтов на
          дымоходы и вентиляционные трубы, что бы можно было отличить варианты
          изделий необходимо каждому варианту дать название.
        </div>
      </div>
    </div>
  );
}

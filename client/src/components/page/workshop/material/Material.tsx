import React, { useEffect, useState } from "react";
import scss from "./Material.module.scss";
import GroupFilters from "../../../commons/groupFilters/GroupFilters";
import Select from "../../../commons/select/Select";
import Btn from "../../../commons/btn/Btn";
import Field from "../../../commons/field/Field";
import load from "@public/icons/load.svg";
import close from "@public/icons/close.svg";
import Align from "../../../commons/align/Align";

import { useHttp } from "../../../../hooks/http.hook";

import {
  MaterialType,
  deleteGroupStandartListMaterial,
  deleteStandartListMaterials,
  setCerrentMaterial,
  setColor,
  setCoverage,
  setMaterials,
  setStandartListMaterials,
  setThickness,
} from "../../../../redux/slice/materialSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";

import {
  selectorChangeFilters,
  selectorCurrentMaterial,
  selectorFiltersMaterials,
  selectorMaterials,
  selectorNotFilterMaterials,
  selectorStandartMaterials,
  selectorUser,
} from "../../../../redux/selectors";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Submit from "../../../commons/submit/Submit";
import ViewListMaterials from "../../../commons/viewmaterials/ViewListMaterials";

import BasketItem from "../../../commons/basketitem/BasketItem";
import AttentionSvg from "../../../commons/svg/AttentionSvg";
import SelectBlock from "@commons/selectBlock/SelectBlock";
import LineiconsOptions from "@commons/lineiconsOptions/LineiconsOptions";

const styleGrid = {
  gridTemplateColumns: "0px auto",
};
const styleAddMat = {
  display: "none",
};
export default function Material() {
  const dispatch = useAppDispatch();
  const { colors, coverages, thicknesses } = useAppSelector((state) =>
    selectorFiltersMaterials(state)
  );

  const filters = useAppSelector((state) => selectorChangeFilters(state));
  const materials = useAppSelector((state) =>
    selectorMaterials(state, filters)
  );

  const [isNewMat, setisNewMat] = useState<string | number | boolean>(true);

  const { mp, gl, noname } = useAppSelector((state) =>
    selectorStandartMaterials(state)
  );

  const isMaterials = useAppSelector((state) =>
    selectorNotFilterMaterials(state)
  ).length;
  const user = useAppSelector((state) => selectorUser(state));
  const { request } = useHttp();

  const savestandartListMaterial = async (listMat?: MaterialType[]) => {
    let body: any = {};
    try {
      body.workshop = user!.workshop;
      body.userId = user!.id;
      if (listMat) {
        body.materials = listMat;
      } else {
        body.materials = [...mp, ...gl, ...noname];
      }

      await request("/api/material/save", "POST", body);

      const materials = await request(
        "/api/material/list/",
        "POST",
        { id: user!.workshop },
        {}
      );
      dispatch(deleteStandartListMaterials());
      dispatch(setMaterials(materials));
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className={scss.material} style={!isNewMat ? styleGrid : {}}>
      <div className={scss.addmat} style={!isNewMat ? styleAddMat : {}}>
        <AddMat materials={!!isMaterials} />
      </div>
      <div className={scss.header}>
        <GroupFilters>
          <Select
            title="Покрытие"
            values={coverages}
            ico="coverage"
            disp={setCoverage}
          />
          <Select
            title="Толщина"
            values={thicknesses}
            ico="thicknesses"
            disp={setThickness}
          />
          <Select title="Цвет" values={colors} ico="color" disp={setColor} />
        </GroupFilters>
      </div>
      <div className={scss.content}>
        {mp.length || gl.length || noname.length ? (
          <>
            <div>
              <h4>Стандартный список материаллов</h4>
              <div className={scss.btns}>
                <Btn title="Сохранить все" click={savestandartListMaterial} />
                <Btn
                  title="Очистить"
                  click={() => dispatch(deleteStandartListMaterials())}
                />
              </div>
            </div>
            {!!gl.length && (
              <SelectBlock title="GRAND LINE" darkArrow>
                <LineiconsOptions>
                  <img
                    src={load}
                    alt=""
                    title="Сохранить"
                    onClick={() => savestandartListMaterial(gl)}
                  />
                  <img
                    src={close}
                    alt=""
                    title="Очистить"
                    onClick={() =>
                      dispatch(deleteGroupStandartListMaterial("GRAND LINE"))
                    }
                  />
                </LineiconsOptions>

                <ViewListMaterials materials={gl} notDrag notoptions />
              </SelectBlock>
            )}
            {!!mp.length && (
              <SelectBlock title="МЕТАЛЛ ПРОФИЛЬ" darkArrow>
                <LineiconsOptions>
                  <img
                    src={load}
                    alt=""
                    title="Сохранить"
                    onClick={() => savestandartListMaterial(mp)}
                  />
                  <img
                    src={close}
                    alt=""
                    title="Очистить"
                    onClick={() =>
                      dispatch(
                        deleteGroupStandartListMaterial("МЕТАЛЛ ПРОФИЛЬ")
                      )
                    }
                  />
                </LineiconsOptions>
                <ViewListMaterials materials={mp} notDrag notoptions />
              </SelectBlock>
            )}
            {!!noname.length && (
              <SelectBlock title="Кастомный вариант" darkArrow>
                <LineiconsOptions>
                  <img
                    src={load}
                    alt=""
                    title="Сохранить"
                    onClick={() => savestandartListMaterial(noname)}
                  />
                  <img
                    src={close}
                    alt=""
                    title="Очистить"
                    onClick={() =>
                      dispatch(deleteGroupStandartListMaterial("noname"))
                    }
                  />
                </LineiconsOptions>
                <ViewListMaterials materials={noname} notDrag notoptions />
              </SelectBlock>
            )}
          </>
        ) : null}

        {materials.filter((i) => i.deleted === 0).length ? (
          <>
            <h4>Список</h4>
            <ViewListMaterials materials={materials} />
          </>
        ) : isMaterials ? (
          <h4>Материалов удовлетворяющих фильтрам не найдено</h4>
        ) : mp.length || gl.length || noname.length ? (
          ""
        ) : (
          <h4>Материалы в вашей базе отсутствуют</h4>
        )}
      </div>
    </div>
  );
}

interface IPropsAddMat {
  materials: boolean;
}
type FormValuesNewMaterial = {
  name: string | undefined;
  thickness: number | undefined;
  coverage: string | undefined;
  color: string | undefined;
};

const schema = yup.object().shape({
  name: yup.string().required("обязательно для заполнения"),
  coverage: yup.string().required("обязательно для заполнения"),
  thickness: yup
    .number()
    .typeError("не корректное число")
    .required("обязательно для заполнения")
    .min(0.2, "слишком маленькое значение")
    .max(1, "слишком большое значение"),

  color: yup.string().required("обязательно для заполнения"),
});
function AddMat({ materials }: IPropsAddMat) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormValuesNewMaterial>({
    resolver: yupResolver(schema),
  });
  const { request, loading } = useHttp();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectorUser(state));
  const loadStandarList = async () => {
    try {
      const data = await request("/api/material/liststandart", "POST", {});
      console.log(data);
      dispatch(setStandartListMaterials(data));
    } catch (error) {}
  };

  const addNewRow = async (body: any) => {
    try {
      body.workshop = user!.workshop;
      body.userId = user!.id;
      await request("/api/material/new", "POST", body);

      const data = await request("/api/material/list", "POST", {
        id: user!.workshop,
      });
      dispatch(setMaterials(data));
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit: SubmitHandler<FormValuesNewMaterial> = (data) => {
    addNewRow(data);
    reset();
  };

  const currentMaterial = useAppSelector((state) =>
    selectorCurrentMaterial(state)
  );
  useEffect(() => {
    dispatch(setCerrentMaterial(0));
  }, []);
  useEffect(() => {
    setValue("name", currentMaterial?.name || undefined);
    setValue("coverage", currentMaterial?.coverage || undefined);
    setValue("thickness", currentMaterial?.thickness || undefined);
    setValue("color", currentMaterial?.color || undefined);
  }, [currentMaterial]);

  return (
    <div>
      <div className={scss.fields}>
        <Align side="right">
          <h4>Новая запись</h4>
        </Align>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="name"
            placeholder="Название"
            register={register}
            theme="standart"
            size="middle"
            round="left"
            error={errors.name?.message}
          />
          <Field
            name="coverage"
            placeholder="Покрытие"
            register={register}
            theme="standart"
            size="middle"
            round="left"
            error={errors.coverage?.message}
          />
          <Field
            name="thickness"
            placeholder="Толщина"
            register={register}
            theme="standart"
            size="middle"
            round="left"
            error={errors.thickness?.message}
          />
          <Field
            name="color"
            placeholder="Цвет"
            register={register}
            theme="standart"
            size="middle"
            round="left"
            error={errors.color?.message}
          />
          <Align side="left">
            <Btn title="Создать" idForHtml="newmat" />
          </Align>
          <Submit id="newmat" />
        </form>
      </div>

      {!materials ? (
        <div className={scss.loadmat}>
          <div>
            <AttentionSvg
              width="30px"
              height="30px"
              color="#C99432"
              stroke="3"
            />
          </div>
          <div className={scss.text}>
            Вы можете загрузить стандартный список материалов с сервера
            различных производителей
          </div>
          <Align side="right">
            <Btn title="Загрузить" click={loadStandarList} loading={loading} />
          </Align>
        </div>
      ) : null}

      <BasketItem />
    </div>
  );
}

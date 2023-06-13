import React, { useEffect, useRef } from "react";
import scss from "./WriteDowns.module.scss";

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";
import {
  selectorChangeFilters,
  selectorCurrentMaterial,
  selectorEnteringBalamces,
  selectorFiltersMaterials,
  selectorListEnteringBalance,
  selectorListWriteDowns,
  selectorMaterials,
  selectorUser,
  selectorWriteDowns,
} from "../../../../redux/selectors";
import ViewListMaterials from "../../../commons/viewmaterials/ViewListMaterials";

import Field from "../../../commons/field/Field";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  MaterialType,
  addEnteringBalance,
  addWriteDown,
  deleteItemForEnteringBalance,
  deleteItemForWriteDown,
  setCerrentMaterial,
  setColor,
  setCoverage,
  setMaterials,
  setThickness,
} from "../../../../redux/slice/materialSlice";

import DeleteAllSvg from "../../../commons/svg/DeleteAllSvg";
import InputQuantity from "../inputquantity/InputQuantity";
import Align from "../../../commons/align/Align";
import Btn from "../../../commons/btn/Btn";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Submit from "../../../commons/submit/Submit";
import { useHttp } from "../../../../hooks/http.hook";
import RemoveBasketSvg from "../../../commons/svg/RemoveBasketSvg";
import { useDrop } from "react-dnd";
import AddList from "../../../commons/svg/AddList";
import { setMessages } from "../../../../redux/slice/appSlice";
import { setMovements } from "../../../../redux/slice/movementSlice";
import GroupFilters from "../../../commons/groupFilters/GroupFilters";
import Select from "../../../commons/select/Select";

export default function WriteDowns() {
  const dispatch = useAppDispatch();
  const { colors, coverages, thicknesses } = useAppSelector((state) =>
    selectorFiltersMaterials(state)
  );

  const filters = useAppSelector((state) => selectorChangeFilters(state));
  const materials = useAppSelector((state) =>
    selectorMaterials(state, filters)
  );

  const listWriteDowns = useAppSelector((state) =>
    selectorListWriteDowns(state)
  );

  const disp = (id: number, quantity: number) => {
    dispatch(
      addWriteDown({
        id,
        quantity,
      })
    );
  };

  useEffect(() => {
    dispatch(setCerrentMaterial(0));
  }, []);

  const ref = useRef(null);
  const [collectedProps, dropRef] = useDrop({
    accept: ["item"],
    drop: (item: { id: number }) => {
      dispatch(setCerrentMaterial(item.id));
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  dropRef(ref);
  const currentMaterial = useAppSelector((state) =>
    selectorCurrentMaterial(state)
  );
  return (
    <div className={scss.material}>
      <div className={scss.options}>
        <Option />
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
            ico="coverage"
            disp={setThickness}
          />
          <Select title="Цвет" values={colors} ico="coverage" disp={setColor} />
        </GroupFilters>
      </div>
      <div className={scss.content} ref={ref}>
        {listWriteDowns.length ? (
          <>
            <h4>Список</h4>
          </>
        ) : null}
        <InputQuantity disp={disp} />
        <div className={scss.list}>
          {listWriteDowns.length ? (
            <List list={listWriteDowns} />
          ) : currentMaterial ? null : (
            <div className={scss.clearlist}>
              <div>
                <div>
                  <AddList
                    width="40px"
                    height="40px"
                    stroke="2"
                    color="#C99432"
                  />
                </div>
                <div>Выберите материал</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={scss.materials}>
        {materials.length ? (
          <>
            <h4>Номенклатура</h4>
            <ViewListMaterials materials={materials} />
          </>
        ) : (
          <h4>Нет</h4>
        )}
      </div>
    </div>
  );
}

type FormComment = {
  comment: string;
};

const schema = yup.object().shape({
  comment: yup.string().required("обязательно для заполнения"),
});

function Option() {
  const dispatch = useAppDispatch();
  const writeDowns = useAppSelector((state) => selectorWriteDowns(state));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormComment>({
    resolver: yupResolver(schema),
  });
  const { request, loading } = useHttp();
  const user = useAppSelector((state) => selectorUser(state));
  const newRow = async (body: any) => {
    try {
      if (!writeDowns.length)
        throw new Error("Список списание не может быть пустым");
      body.workshop = user!.workshop;
      body.userId = user!.id;
      body.type = "writedowns";
      body.link = 0;
      body.items = JSON.stringify(writeDowns);
      await request("/api/movement/new", "POST", body);
      const movements = await request(
        "/api/movement/list/",
        "POST",
        { id: user!.workshop },
        {}
      );
      dispatch(setMovements(movements));

      const data = await request("/api/material/list", "POST", {
        id: user!.workshop,
      });
      dispatch(setMaterials(data));
    } catch (error: any) {
      console.log(error);
      dispatch(setMessages(error.message));
    }
  };

  const onSubmit: SubmitHandler<FormComment> = (data) => {
    newRow(data);
    reset();
  };
  return (
    <>
      <Align side="right">
        <h4>Списание материала</h4>
      </Align>
      <div className={scss.formcomment}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="comment"
            register={register}
            placeholder="Комментарий"
            round="left"
            size="middle"
            theme="standart"
            error={errors.comment?.message}
          />
          <Align side="left">
            <Btn title="Провести" idForHtml="comment" />
          </Align>
          <Submit id="comment" />
        </form>
      </div>
    </>
  );
}

interface IPropsList {
  list: MaterialType[];
}
function List({ list }: IPropsList) {
  const dispatch = useAppDispatch();
  return (
    <div className={scss.listitems}>
      {list.map((e, i) => {
        return (
          <div className={scss.itemlist} key={i}>
            <div>
              <div>
                <div>
                  <div>{e.name}</div>
                  <div>{e.color}</div>
                </div>
                <div>
                  <div>{e.thickness} мм</div>
                  <div>{e.coverage}</div>
                  <div>{e.stock} м2</div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <div> Количество: </div>
                  <div>{e.writeDown} м2.</div>
                </div>
                {/* <div>
                  <div>Цена: </div>
                  <div>{e.price} руб/м2</div>
                </div>
                <div>
                  <div>Сумма: </div>
                  <div> {e.entrance! * e.price!} руб</div>
                </div> */}
              </div>
              <div onClick={() => dispatch(deleteItemForWriteDown(e.id))}>
                <RemoveBasketSvg
                  width="40px"
                  height="40px"
                  stroke="2"
                  color="#C99432"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

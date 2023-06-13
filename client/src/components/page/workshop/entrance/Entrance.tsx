import React, { useEffect, useRef } from "react";
import scss from "./Entrance.module.scss";
import Align from "../../../commons/align/Align";
import { useForm, SubmitHandler } from "react-hook-form";
import Field from "../../../commons/field/Field";
import Btn from "../../../commons/btn/Btn";
import Submit from "../../../commons/submit/Submit";
import ViewListMaterials from "../../../commons/viewmaterials/ViewListMaterials";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";
import {
  selectorChangeFilters,
  selectorCurrentMaterial,
  selectorEntrance,
  selectorFiltersMaterials,
  selectorListEntrance,
  selectorMaterials,
  selectorProviderSearch,
  selectorProvidersSearch,
  selectorSearchValueProvider,
  selectorUser,
} from "../../../../redux/selectors";

import {
  MaterialType,
  addEntrance,
  deleteItemForEntrance,
  setCerrentMaterial,
  setColor,
  setCoverage,
  setMaterials,
  setThickness,
} from "../../../../redux/slice/materialSlice";
import InputQuantityPrice from "../inputquantity/InputQuantityPrice";

import GroupFilters from "../../../commons/groupFilters/GroupFilters";
import Select from "../../../commons/select/Select";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHttp } from "../../../../hooks/http.hook";
import { useDrop } from "react-dnd";
import AddList from "../../../commons/svg/AddList";
import AttentionSvg from "../../../commons/svg/AttentionSvg";

import RemoveBasketSvg from "../../../commons/svg/RemoveBasketSvg";
import { setMessages } from "../../../../redux/slice/appSlice";
import {
  TypeProvider,
  setProviderForInn,
  setProviders,
  setSearchValue,
} from "../../../../redux/slice/providerSlice";
import { setMovements } from "../../../../redux/slice/movementSlice";
import { numberRoundTwo } from "scripts/script";

export default function Entrance() {
  const { colors, coverages, thicknesses } = useAppSelector((state) =>
    selectorFiltersMaterials(state)
  );
  const filters = useAppSelector((state) => selectorChangeFilters(state));
  const materials = useAppSelector((state) =>
    selectorMaterials(state, filters)
  );
  const listentrance = useAppSelector((state) => selectorListEntrance(state));
  const summaListEntrance = numberRoundTwo(
    listentrance.reduce(
      (sum: number, current: MaterialType) =>
        sum + current.entrance! * current.price!,
      0
    )
  );

  const currentMaterial = useAppSelector((state) =>
    selectorCurrentMaterial(state)
  );
  const dispatch = useAppDispatch();
  const disp = (id: number, quantity: number, price: number) => {
    dispatch(
      addEntrance({
        id,
        quantity,
        price,
      })
    );
  };

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
  return (
    <div className={scss.entrance}>
      <div className={scss.options}>
        <Align side="right">
          <h4>Новое поступление</h4>
        </Align>
        <NewEntrance currentSemmaEntrance={summaListEntrance} />
        <Inn />
      </div>
      <div className={scss.header}>
        <div>
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
            <Select
              title="Цвет"
              values={colors}
              ico="coverage"
              disp={setColor}
            />
          </GroupFilters>
        </div>
      </div>
      <div className={scss.content} ref={ref}>
        {!listentrance.length ? null : (
          <>
            <h4>Список</h4>
            <div className={scss.dataentrance}>
              &#8381;:
              {summaListEntrance}
              руб.
              <br />
              Количество наименований:{listentrance.length}шт.
            </div>
          </>
        )}

        <InputQuantityPrice disp={disp} />
        <div className={scss.list}>
          {listentrance.length ? (
            <List list={listentrance} />
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
                <div>Добавьте материал</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={scss.materials}>
        <h4>Номенклатура</h4>
        <ViewListMaterials materials={materials} />
      </div>
    </div>
  );
}

type FormValuesNewEntrance = {
  provider: string;
  amount: number;
  datedoc: number;
  numberdoc: string;
};

const schema = yup.object().shape({
  provider: yup.string().required("обязательно для заполнения"),
});

interface IProrpsNewEntrance {
  currentSemmaEntrance: number;
}

function NewEntrance({ currentSemmaEntrance }: IProrpsNewEntrance) {
  const {
    register,
    setValue,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValuesNewEntrance>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormValuesNewEntrance> = (data) => {
    if (Number(data.amount) !== currentSemmaEntrance) {
      setError("amount", {
        type: "custom",
        message: "Введенная сумма на совпадает с суммой по поступлению",
      });
      return;
    }
    newRow(data);
    reset();
  };
  const user = useAppSelector((state) => selectorUser(state));
  const entrance = useAppSelector((state) => selectorEntrance(state));
  const providers = useAppSelector((state) => selectorProvidersSearch(state));

  const { request } = useHttp();
  const dispatch = useAppDispatch();

  const newRow = async (body: any) => {
    try {
      if (!entrance.length)
        throw new Error("Список поступления не может быть пустым");
      body.workshop = user!.workshop;
      body.userId = user!.id;
      body.type = "entrance";

      body.link = providers?.find((i) => i.name === body.provider)?.id;
      body.items = JSON.stringify(entrance);

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

  const providerFilters = useAppSelector((state) =>
    selectorProvidersSearch(
      state,
      useAppSelector((state) => selectorSearchValueProvider(state))
    )
  );
  useEffect(() => {
    dispatch(setCerrentMaterial(0));
  }, []);
  return (
    <div className={scss.formnewentrance}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="provider"
          register={register}
          placeholder="Поставщик"
          round="left"
          size="middle"
          theme="standart"
          error={errors.provider?.message}
          serach
          searchList={providerFilters}
          dispValue={setSearchValue}
          setValue={setValue}
        />
        <Field
          name="amount"
          register={register}
          placeholder="Сумма"
          round="left"
          size="middle"
          theme="standart"
          error={errors.amount?.message}
        />

        <Align side="left">
          <Btn title="Провести" idForHtml="newentrance" />
        </Align>
        <Submit id="newentrance" />
      </form>
    </div>
  );
}

type FormValueInn = {
  inn: string;
};
function Inn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValueInn>();
  const dispatch = useAppDispatch();
  const { requestinn, loading, request } = useHttp();
  const provider = useAppSelector((state) => selectorProviderSearch(state));

  const onSubmit: SubmitHandler<FormValueInn> = async (data: any) => {
    let res = await requestinn(data.inn);
    dispatch(setProviderForInn(res));
  };
  return (
    <div className={scss.inn}>
      <Align side="center">
        <div>
          <div>
            <AttentionSvg
              width="40px"
              height="40px"
              stroke="2"
              color="#C99432"
            />
          </div>
          <div>Введите ИНН поставщика для автоматического сохранения</div>
        </div>
      </Align>
      <div className={scss.forminn}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="inn"
            placeholder="ИНН"
            register={register}
            size="middle"
            theme="standart"
            error={errors.inn?.message}
            titleBtn="Добавить"
            idForSubmit="inn"
            loading={loading}
          />
          <Submit id="inn" />
        </form>
        {provider ? <SaveCompany company={provider} /> : null}
      </div>
    </div>
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
          <div className={scss.itemlist} key={i + "itemmaterial"}>
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
                  <div>{e.entrance} м2.</div>
                </div>
                <div>
                  <div>Цена: </div>
                  <div>{e.price} руб/м2</div>
                </div>
                <div>
                  <div>Сумма: </div>
                  <div> {numberRoundTwo(e.entrance! * e.price!)} руб</div>
                </div>
              </div>
              <div onClick={() => dispatch(deleteItemForEntrance(e.id))}>
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

interface IPropsSaveCompany {
  company: TypeProvider;
}
type FormValueProvider = {
  provider: string;
};
function SaveCompany({ company }: IPropsSaveCompany) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValueProvider>({
    defaultValues: { provider: company.name },
  });
  const user = useAppSelector((state) => selectorUser(state));
  const { loading, request } = useHttp();
  const dispatch = useAppDispatch();

  const newProvider = async (provider: any) => {
    try {
      let body = { ...provider };
      body.workshop = user!.workshop;
      body.userId = user!.id;
      const data = await request("/api/provider/new", "POST", body, {});
      const providers = await request(
        "/api/provider/list/",
        "POST",
        { id: user!.workshop },
        {}
      );
      dispatch(setProviders(providers));
      dispatch(setProviderForInn(null));
    } catch (error) {
      // console.log(error);
    }
  };
  const onSubmit: SubmitHandler<FormValueProvider> = (data) => {
    newProvider(company);
  };
  return (
    <div className={scss.provider}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            register={register}
            name="provider"
            size="middle"
            theme="standart"
            readonly
          />
          <Align side="space-between">
            <Btn title="Сохранить" idForHtml="savecompany" />
            <div onClick={() => dispatch(setProviderForInn(null))}>
              <Btn title="Отмена" />
            </div>
          </Align>
          <Submit id="savecompany" />
        </form>
      </div>
    </div>
  );
}

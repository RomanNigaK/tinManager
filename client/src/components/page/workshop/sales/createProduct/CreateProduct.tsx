import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ProductList from "../../../../../scripts/products";
import {
  MaterialType,
  setCerrentMaterial,
} from "../../../../../redux/slice/materialSlice";
import scss from "./CreateProduct.module.scss";

import Field from "../../../../commons/field/Field";
import ViewProduct from "../viewProduct/ViewProduct";
import Submit from "../../../../commons/submit/Submit";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISale, addItemSale } from "../../../../../redux/slice/saleSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/redux.hook";
import {
  selectorClient,
  selectorCurrentMaterial,
  selectorMaterialsAll,
  selectorSettingWorkshop,
} from "../../../../../redux/selectors";
import {
  TypeCurrentProduct,
  TypeSizes,
  setCurrentProduct,
} from "../../../../../redux/slice/productSlice";
import { setMessages } from "../../../../../redux/slice/appSlice";
import { numberRoundTwo } from "scripts/script";
import Color from "@commons/color/Color";
interface IPropsCreateProduct {
  material?: MaterialType | null;
  currentProduct?: TypeCurrentProduct;
}

type FormValuesNewProduct = {
  quantity: number;
  price: number;
  square: number;
};

export default function CreateProduct({
  material,
  currentProduct,
}: IPropsCreateProduct) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .integer("число должно быть целым")
      .min(2, "минимальное количество 2")
      .typeError("не корректное число")
      .required("обязательно для заполнения"),
    price: yup
      .number()
      .typeError("не корректное число")
      .required("обязательно для заполнения"),
  });

  const product = new ProductList();

  const svg = product.getSvg(
    currentProduct.id,
    currentProduct.arrow,
    300,
    undefined,
    undefined,
    3
  );

  const widthBind = useAppSelector((state) => selectorSettingWorkshop(state))
    .products.widthBind;
  const sizes = [
    ...currentProduct.sizes.map((e) =>
      e.type === "bend" ? { ...e, value: widthBind } : { ...e }
    ),
  ];

  const h = sizes.reduce((sum: number, current: TypeSizes) => {
    return current.type !== "degree" ? sum + current.value! : sum;
  }, 0);

  const dispatch = useAppDispatch();

  const currentMaterial = useAppSelector((state) =>
    selectorCurrentMaterial(state)
  );

  const client = useAppSelector((state) => selectorClient(state));

  const [makeprice, setMakeprice] = useState<string>();
  const [priceSetting, setPriceSetting] = useState<number>();
  const [quantityextracharge, setQuantityextracharge] = useState<number>();

  const setting = useAppSelector((state) => selectorSettingWorkshop(state));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    setValue,
  } = useForm<FormValuesNewProduct>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setMakeprice(setting.makePriceProduct.makePrice);
    setPriceSetting(setting?.makePriceProduct.price1sm);
    setQuantityextracharge(setting?.makePriceProduct.percentages! / 100);
  }, [setting]);

  useEffect(() => {
    if (currentMaterial) {
      setValue(
        "price",
        setting.makePriceProduct.makePrice === "Наценка" &&
          currentMaterial.costprice
          ? currentMaterial.costprice +
              currentMaterial.costprice * quantityextracharge!
          : priceSetting
      );
    }
  }, [material]);

  useEffect(() => {
    dispatch(setCerrentMaterial(0));
  }, []);

  const onSubmit: SubmitHandler<FormValuesNewProduct> = (data: ISale) => {
    if (!material)
      return setError("quantity", {
        type: "custom",
        message: "Не выбран материал",
      });
    if (h < 20)
      return setError("quantity", {
        type: "custom",
        message: "Маленькая развертка изделия (Н)",
      });

    data.idMaterial = material.id;
    data.idProduct = currentProduct.id;
    data.h = h;
    data.sizes = sizes;

    data.summa = numberRoundTwo(data.quantity * data.price * 0.1 * h);
    data.key = uuidv4();

    data.sale =
      (client?.sale &&
        Math.round(data.summa - data.summa * (client.sale / 100))) ||
      0;
    dispatch(addItemSale(data));
    dispatch(setMessages("Изделие добавлено"));
    reset();
    dispatch(setCurrentProduct(null));
  };

  useEffect(() => {
    material && clearErrors("quantity");
  }, [material]);

  return (
    <div style={{ zIndex: 999 }}>
      <div className={scss.createproduct}>
        <div>
          <div>{currentProduct.name}</div>

          <div>{material && <Color color={material.color} />}</div>
        </div>

        <div className={scss.quantity}>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={scss.inputs} style={{ width: 300 }}>
                <Field
                  name="price"
                  placeholder="Цена"
                  register={register}
                  size="middle"
                  readonly={!setting.makePriceProduct.handlePrice}
                  theme="standart"
                />

                <Field
                  name="quantity"
                  placeholder="м.п."
                  register={register}
                  size="middle"
                  titleBtn="Добавить"
                  idForSubmit="newproduct"
                  error={errors.quantity?.message}
                  theme="standart"
                />
              </div>
              <Submit id="newproduct" />
            </form>
          </div>
        </div>
        <div className={scss.svg}>
          <div>
            {currentProduct && <ViewProduct svg={svg} positions={sizes} />}
          </div>
          <div className={scss.size}>
            <div>H</div>
            <div>{h}</div>
          </div>
          <div>{currentProduct.alias}</div>
        </div>

        <div>
          {material ? (
            <>
              <div>{material.thickness}</div>
              <div>{material.coverage}</div>
            </>
          ) : (
            <span style={{ color: "red" }}>
              Выберите материал для изготовления
            </span>
          )}
        </div>
      </div>
      <div className={scss.closeCreateElement}>
        <div>
          <div onClick={() => dispatch(setCurrentProduct(null))}>
            <svg
              width="42"
              height="33"
              viewBox="0 0 42 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5836 0.00131094C16.4367 -0.0067926 16.2902 0.0227782 16.1586 0.0870908C16.027 0.151403 15.9148 0.248223 15.8333 0.367949L0.35824 15.6751C0.127542 15.9271 0 16.2535 0 16.5917C0 16.9299 0.127542 17.2562 0.35824 17.5083L15.8333 32.6321C15.9148 32.7518 16.027 32.8486 16.1586 32.9129C16.2902 32.9772 16.4367 33.0068 16.5836 32.9987C16.7316 32.9871 16.8758 32.9471 17.0079 32.8809C17.14 32.8146 17.2573 32.7235 17.3532 32.6127C17.4491 32.502 17.5217 32.3738 17.5666 32.2355C17.6116 32.0973 17.6282 31.9517 17.6153 31.8071V22.9162C32.3401 23.5578 37.4047 26.3992 39.6556 31.3488C40.0308 32.0821 40.4059 32.3571 40.6873 32.3571C40.9686 32.3571 41.25 31.9904 41.25 31.4405C41.0624 21.8162 31.8712 12.2837 17.6153 10.9088V1.19288C17.6282 1.04834 17.6116 0.902745 17.5666 0.764479C17.5217 0.626214 17.4491 0.498011 17.3532 0.387255C17.2573 0.276499 17.14 0.185378 17.0079 0.11914C16.8758 0.052903 16.7316 0.0128575 16.5836 0.00131094Z"
                fill="#99B4BF"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

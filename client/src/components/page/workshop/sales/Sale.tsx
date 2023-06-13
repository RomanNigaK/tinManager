import React, { useEffect, useState } from "react";
import scss from "./Sale.module.scss";
import Nav from "./nav/Nav";
import GroupFilters from "../../../commons/groupFilters/GroupFilters";
import Select from "../../../commons/select/Select";
import {
  selectorChangeFilters,
  selectorCurrentMaterial,
  selectorCurrentProduct,
  selectorFiltersMaterials,
  selectorMaterials,
  selectorMaterialsAll,
  selectorSale,
} from "../../../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";
import {
  setColor,
  setCoverage,
  setThickness,
} from "../../../../redux/slice/materialSlice";
import ViewListMaterials from "../../../commons/viewmaterials/ViewListMaterials";
import CreateProduct from "./createProduct/CreateProduct";
import ProductList from "../../../../scripts/products";
import { PreviewProduct } from "./nav/page/catalogproduct/CatalogProduct";
import ViewProduct from "./viewProduct/ViewProduct";
import { ISale, deleteItemSale } from "../../../../redux/slice/saleSlice";
import { numberRoundTwo } from "scripts/script";
import CreateProductPipe from "./createProduct/CreateProductPipe";
export default function Sale() {
  const { colors, coverages, thicknesses } = useAppSelector((state) =>
    selectorFiltersMaterials(state)
  );
  const filters = useAppSelector((state) => selectorChangeFilters(state));
  const materials = useAppSelector((state) =>
    selectorMaterials(state, filters)
  );

  const material = useAppSelector((state) => selectorCurrentMaterial(state));

  const currentProduct = useAppSelector((state) =>
    selectorCurrentProduct(state)
  );
  const sales = useAppSelector((state) => selectorSale(state));
  const product = new ProductList();

  return (
    <div className={scss.sale}>
      <div className={scss.options}>
        <Nav />
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
      <div className={scss.content}>
        {currentProduct && currentProduct.type === 1 && (
          <CreateProduct material={material} currentProduct={currentProduct} />
        )}
        {currentProduct && currentProduct.type === 2 && (
          <CreateProductPipe
            material={material}
            currentProduct={currentProduct}
          />
        )}

        {!!sales.length && !!!currentProduct && (
          <ListSale sales={sales} product={product} />
        )}
      </div>
      <div className={scss.materials}>
        <h4>Номенклатура</h4>
        <ViewListMaterials materials={materials} />
      </div>
    </div>
  );
}

interface IPropsListSale {
  sales: ISale[];
  product: ProductList;
}

function ListSale({ sales, product }: IPropsListSale) {
  const materialAll = useAppSelector((state) => selectorMaterialsAll(state));
  const dispatch = useAppDispatch();
  let mat: number[] | undefined = [];

  sales.forEach((element) => {
    if (mat && !mat.includes(element.idMaterial!)) {
      mat.push(element.idMaterial!);
    }
  });

  return (
    <div>
      {mat.reverse().map((e) => {
        let { name, coverage, thickness, color } = materialAll.find(
          (i) => i.id === e
        )!;

        let groupSales = sales.filter((i) => i.idMaterial === e);

        return (
          <div className={scss.groupmat}>
            <div className={scss.name}>
              <div>{name}</div>
              <div className={scss.coveragematerial}>{coverage}</div>
              <div className={scss.thicknessmaterial}>{thickness}</div>
              <div>{color}</div>
            </div>
            <div className={scss.listproductssale}>
              {groupSales.reverse().map((e, i) => {
                let { idProduct, sizes, h, summa, price, quantity, key, sale } =
                  e!;

                const svg = product.getSvg(
                  idProduct!,
                  product.getItemId(idProduct!)?.arrow!,
                  300,
                  undefined,
                  undefined,
                  3
                );

                return (
                  <>
                    <div
                      className={scss.close}
                      onClick={() => dispatch(deleteItemSale(key))}
                    >
                      <svg
                        width="26"
                        height="28"
                        viewBox="0 0 26 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.35484 6.57143L4.91012 25.5126C4.9541 26.0482 4.97609 26.316 5.0976 26.5171C5.19577 26.6796 5.33818 26.8108 5.50818 26.8954C5.71855 27 5.98726 27 6.52469 27H19.4753C20.0127 27 20.2814 27 20.4918 26.8954C20.6618 26.8108 20.8042 26.6796 20.9024 26.5171C21.0239 26.316 21.0459 26.0482 21.0899 25.5126L22.6452 6.57143M26 4.71429H17.6129M0 4.71429H9.22581M9.22581 4.71429V2.62C9.22581 2.04107 9.22581 1.7516 9.34204 1.53207C9.43584 1.35491 9.58072 1.21003 9.75788 1.11623C9.9774 1 10.2669 1 10.8458 1H15.9929C16.5718 1 16.8613 1 17.0808 1.11623C17.258 1.21003 17.4029 1.35491 17.4967 1.53207C17.6129 1.7516 17.6129 2.04107 17.6129 2.62V4.71429M9.22581 4.71429H17.6129M17.0258 11.4L9.22581 20.0667M9.22581 11.4L17.0258 20.0667"
                          stroke="#C99432"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                    <div className={scss.svg}>
                      <div>
                        <ViewProduct svg={svg} positions={sizes} />
                        <div
                          style={{
                            marginTop: 30,
                            minWidth: 500,
                          }}
                          className={scss.dataitem}
                        >
                          {h !== 0 && <div>Развертка: {h} см</div>}

                          <div>
                            Количество: {quantity} {h === 0 ? "шт." : "м.п."}
                          </div>
                          {h !== 0 && <div>Цена:{price * h * 0.1} руб/м.п</div>}
                          {h === 0 && <div>Цена:{price} руб</div>}

                          <div>
                            {h !== 0 && (
                              <>
                                Сумма:
                                {numberRoundTwo(quantity * price * 0.1 * h)}
                                руб. Скидка: {sale}
                              </>
                            )}
                            {h === 0 && (
                              <>
                                Сумма: {numberRoundTwo(quantity * price)}
                                руб. Скидка: {sale}
                              </>
                            )}
                          </div>

                          <div>
                            Итого:
                            {h !== 0 && (
                              <>
                                {numberRoundTwo(
                                  quantity * price * 0.1 * h - sale!
                                )}
                              </>
                            )}
                            {h === 0 && (
                              <>{numberRoundTwo(quantity * price - sale!)}</>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

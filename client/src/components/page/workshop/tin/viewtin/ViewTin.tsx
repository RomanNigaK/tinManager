import React from "react";
import { IListSale } from "../../../../../redux/slice/saleSlice";
import { useAppSelector } from "../../../../../hooks/redux.hook";
import { selectorMaterialsAll } from "../../../../../redux/selectors";
import ProductList from "../../../../../scripts/products";
import scss from "./ViewTin.module.scss";
import ViewProduct from "../../sales/viewProduct/ViewProduct";

interface IPropsViewTin {
  currentTin: IListSale | null;
}

export default function ViewTin({ currentTin }: IPropsViewTin) {
  console.log(currentTin);
  const materialAll = useAppSelector((state) => selectorMaterialsAll(state));
  let mat: number[] = [];
  currentTin?.items.forEach((element) => {
    if (mat && !mat.includes(element.idMaterial!)) {
      mat.push(element.idMaterial!);
    }
  });
  const product = new ProductList();
  return (
    <>
      {mat.map((e, idx) => {
        let { name, coverage, thickness, color } = materialAll.find(
          (i) => i.id === e
        )!;

        let items = currentTin?.items.filter((i) => i.idMaterial === e);
        return (
          <div className={scss.groupmat} key={idx + "viewtin"}>
            <div className={scss.name}>
              <div>{name}</div>
              <div className={scss.coveragematerial}>{coverage}</div>
              <div className={scss.thicknessmaterial}>{thickness}</div>
              <div>{color}</div>
            </div>
            <div className={scss.listproductssale}>
              {items?.map((e, i) => {
                let { idProduct, sizes, h, quantity, pipe } = e!;

                const svg = product.getSvg(
                  idProduct!,
                  product.getItemId(idProduct!)?.arrow!,
                  300,
                  undefined,
                  undefined,
                  3
                );

                return (
                  <div className={scss.print} key={i + "currenttin"}>
                    <div className={scss.svg}>
                      <div>
                        <ViewProduct svg={svg} positions={sizes} />
                      </div>
                      <div>
                        <div>
                          {h !== 0 && (
                            <>
                              <div>количество: {quantity}(м.п.)</div>

                              <div>H: {h}(мм.)</div>
                            </>
                          )}
                          {h === 0 && (
                            <>
                              <div>количество: {quantity}(шт.)</div>

                              <div>Вид: {pipe}</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

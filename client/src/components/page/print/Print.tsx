import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import {
  selectorCurrentTin,
  selectorMaterialsAll,
  selectorSaleListInwork,
} from "../../../redux/selectors";
import ProductList from "../../../scripts/products";
import scss from "./Print.module.scss";
import ViewProduct from "../workshop/sales/viewProduct/ViewProduct";

interface IPropsPrint {
  close: Dispatch<SetStateAction<boolean>>;
}

export default function Print({ close }: IPropsPrint) {
  const currentTin = useAppSelector((state) => selectorCurrentTin(state));
  const materialAll = useAppSelector((state) => selectorMaterialsAll(state));

  let mat: number[] = [];

  currentTin?.items.forEach((element) => {
    if (mat && !mat.includes(element.idMaterial!)) {
      mat.push(element.idMaterial!);
    }
  });
  const product = new ProductList();

  const back = () => {
    close(false);
  };

  return (
    <div className={scss.printview}>
      <div className={scss.options}>
        <div onClick={back} className={scss.back}>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L26 26M26 1L1 26" stroke="#99B4BF" strokeWidth="2" />
          </svg>
        </div>
        <div onClick={() => window.print()}>
          <svg
            width="32"
            height="28"
            viewBox="0 0 32 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.6551 7.67108V3.18215C25.6551 1.97698 24.6688 1 23.452 1H8.37554C7.15875 1 6.17241 1.97698 6.17241 3.18215V7.67108M25.6551 7.67108H27.3281C29.356 7.67108 31 9.29939 31 11.308V18.0605C31 20.0691 29.356 21.6974 27.3281 21.6974H25.6551M25.6551 7.67108H6.17241M6.17241 7.67108H4.67187C2.64395 7.67108 1 9.29939 1 11.308V18.0605C1 20.0691 2.64395 21.6974 4.67187 21.6974H6.17241M25.6551 21.6974H23.7586M25.6551 21.6974V19.8127C25.6551 18.7753 24.8061 17.9342 23.7586 17.9342M23.7586 21.6974V24.8179C23.7586 26.0231 22.7722 27 21.5555 27H10.4445C9.22778 27 8.24137 26.0231 8.24137 24.8179V21.6974M23.7586 21.6974V17.9342M8.24137 21.6974V17.9342M8.24137 21.6974H6.17241M23.7586 17.9342H8.24137M8.24137 17.9342C7.09875 17.9342 6.17241 18.8517 6.17241 19.9835V21.6974M21.088 12.1184H24.5327C25.1526 12.1184 25.6551 11.6206 25.6551 11.0066C25.6551 10.3925 25.1526 9.89475 24.5327 9.89475H21.0881C20.4681 9.89475 19.9655 10.3925 19.9655 11.0066C19.9655 11.6206 20.4681 12.1184 21.088 12.1184Z"
              stroke="#99B4BF"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {mat.map((e, idx) => {
        let { name, coverage, thickness, color } = materialAll.find(
          (i) => i.id === e
        )!;

        let items = currentTin?.items.filter((i) => i.idMaterial === e);
        return (
          <div className={scss.groupmat} key={idx + "print"}>
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
                  <div className={scss.print} key={i + "print4"}>
                    <div className={scss.svg}>
                      <div>
                        <ViewProduct svg={svg} positions={sizes} />
                      </div>
                      <div>
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
                                <div>Количество: {quantity}(шт.)</div>

                                <div>Вид: {pipe}</div>
                              </>
                            )}
                          </div>
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
    </div>
  );
}

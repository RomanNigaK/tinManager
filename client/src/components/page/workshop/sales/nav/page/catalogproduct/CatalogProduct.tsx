import React, { useEffect, useState } from "react";

import Align from "../../../../../../commons/align/Align";

import scss from "./CatalogProduct.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../../../../../../hooks/redux.hook";

import { setCurrentProduct } from "../../../../../../../redux/slice/productSlice";
import ProductList, {
  TypeProductList,
} from "../../../../../../../scripts/products";
import Search from "@commons/search/Search";
import Notfound from "@commons/notfound/Notfound";

export default function CatalogProduct() {
  const dispatch = useAppDispatch();
  const productList = new ProductList();
  const [rowsearch, setrowsearch] = useState<boolean | string>(false);
  const [products, setstate] = useState(productList.getItems(rowsearch));

  useEffect(() => {
    setstate(productList.getItems(rowsearch));
  }, [rowsearch]);

  return (
    <div className={scss.catalogproduct}>
      <Align side="right">
        <h4>Каталог изделий</h4>
      </Align>

      <Search setSearch={setrowsearch} placeholder="Наименование изделия" />
      <div className={scss.listproducts}>
        {products &&
          products.map((e: TypeProductList, idx) => {
            return (
              <div
                onClick={() => dispatch(setCurrentProduct(e.id))}
                className={scss.previewproduct}
                key={idx + "products"}
              >
                <PreviewProduct
                  svg={productList.getSvg(
                    e.id,
                    0,
                    undefined,
                    undefined,
                    undefined,
                    2
                  )}
                />
              </div>
            );
          })}
        {!!!products.length && (
          <Notfound
            title="Не найдено"
            tooltip="Вы не нашли нужного изделия!? Напишите нам support@tinmanager.ru и мы добавим его в приложение."
          />
        )}
      </div>
    </div>
  );
}

interface IPropsPreviewProduct {
  svg: string;
}
export function PreviewProduct({ svg }: IPropsPreviewProduct) {
  const key = uuidv4();
  useEffect(() => {
    let container = document.getElementById(key);
    container!.innerHTML = svg;
  }, [svg]);
  return <div id={key}>g</div>;
}

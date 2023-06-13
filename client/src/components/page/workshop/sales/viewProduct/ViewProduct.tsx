import { CSSProperties, useEffect, useState } from "react";
import { TypeSizes } from "../../../../../scripts/products";
import { useAppDispatch } from "../../../../../hooks/redux.hook";
import { setValueItemProduct } from "../../../../../redux/slice/productSlice";
import scss from "./ViewProduct.module.scss";
import { v4 as uuidv4 } from "uuid";
import Preloader from "@commons/preloader/Preloader";
interface IPropsViewProduct {
  positions: any[];
  svg: string;
}
export default function ViewProduct({ svg, positions }: IPropsViewProduct) {
  const key = uuidv4();

  useEffect(() => {
    let container = document.getElementById(key);
    container!.innerHTML = svg;
  }, [svg]);
  return (
    <div>
      <div>
        {positions.map((e: TypeSizes, idx) => {
          const style: CSSProperties = {
            marginLeft: e.position.marginLeft,
            marginTop: e.position.marginTop,
          };
          return (
            <div style={style} key={idx + "products2"}>
              <SetLength value={e.value} id={e.id} type={e.type} />
            </div>
          );
        })}
      </div>

      <div id={key}>
        <Preloader />
      </div>
    </div>
  );
}

interface IPropsSetValue {
  id: number;
  value: number;
  type: "length" | "degree" | "bend" | "square";
}

function SetLength({ value, id, type }: IPropsSetValue) {
  const [val, setval] = useState(value);
  const dispatch = useAppDispatch();
  const handleSabmitValue = (e: any) => {
    e.preventDefault();
    dispatch(setValueItemProduct({ id, value: val }));
    setval(val);
  };

  const style: CSSProperties = {
    background: value != val ? "#99B4BF" : "",
  };
  useEffect(() => {
    setval(value);
  }, [value]);
  return (
    <form onSubmit={handleSabmitValue}>
      <div className={scss.fff}>
        <div
          className={type === "degree" || "square" ? scss.degree : undefined}
        >
          <input
            style={style}
            type="text"
            value={val}
            onChange={(e) => setval(Number(e.target.value))}
            maxLength={4}
            minLength={1}
            readOnly={type === "bend" ? true : false}
          />
        </div>
        {type === "degree" && (
          <div>
            <sup>0</sup>
          </div>
        )}
        {type === "square" && (
          <div>
            <sup>m2</sup>
          </div>
        )}
      </div>
    </form>
  );
}

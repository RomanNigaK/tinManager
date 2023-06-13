import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import scss from "./Btn.module.scss";
import Preloader from "../preloader/Preloader";
import { v1 } from "uuid";
interface IPropsBtn {
  title: string;
  click?: (arg?: any) => void;
  idForHtml?: string;
  loading?: boolean;
  disabled?: boolean;
}
export default function Btn({
  title,
  click,
  idForHtml,
  loading,
  disabled = false,
}: IPropsBtn) {
  const style: CSSProperties = {
    background: disabled ? "grey" : "#253c59",
    borderColor: "grey",
  };

  const id = String(Math.floor(Math.random() * Date.now()));

  const [element, setelement] = useState<HTMLElement>();

  useEffect(() => {
    setelement(document.querySelector(`[id='${id}']`) as HTMLElement);
    if (element && !disabled) {
      element.addEventListener("mousedown", function () {
        element.style.background = "#fff";
        element.style.color = "#253c59";
      });
      element.addEventListener("mouseup", function () {
        element.style.background = "#253c59";
        element.style.color = "#fff";
      });
    }
  }, [element]);

  return (
    <div
      className={scss.btn}
      onClick={click && !disabled ? () => click() : undefined}
      style={style}
      id={id}
    >
      {loading ? (
        <Preloader />
      ) : (
        <label htmlFor={!disabled ? idForHtml : undefined}> {title} </label>
      )}
    </div>
  );
}

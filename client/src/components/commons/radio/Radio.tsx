import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import scss from "./Radio.module.scss";
import arrowl from "@public/icons/arrowleft.svg";
import arrowr from "@public/icons/arrowright.svg";

interface IPropsRadio {
  values: string[];
  setVal: Dispatch<SetStateAction<string>>;
}
export default function Radio({ values, setVal }: IPropsRadio) {
  const [currentId, setCurrentId] = useState<number>(0);
  const [quantityValues, setquantityValues] = useState(values.length);
  console.log(currentId);

  const left = () => {
    setCurrentId(currentId - 1 <= 0 ? quantityValues - 1 : currentId - 1);
  };
  const right = () => {
    setCurrentId(currentId + 1 > quantityValues - 1 ? 1 : currentId + 1);
  };

  useEffect(() => {
    if (currentId !== 0) setVal(values[currentId]);
  }, [currentId]);

  return (
    <div className={scss.radio}>
      <div className={scss.left}>
        <img src={arrowl} alt="" onClick={left} />
      </div>
      <div>{values[currentId]}</div>
      <div className={scss.right}>
        <img src={arrowr} alt="" onClick={right} />
      </div>
    </div>
  );
}

import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import scss from "./Twopages.module.scss";

interface IPropsTwopages {
  width: string | number;
  basicPage: (setIsBasicPage: Dispatch<SetStateAction<boolean>>) => JSX.Element;
  additionalPage: () => JSX.Element;
}

export default function Twopages({
  width,
  basicPage,
  additionalPage,
}: IPropsTwopages) {
  const [isBasicPage, setisBasicPage] = useState(true);

  const style: CSSProperties = {
    width: width,
  };

  return (
    <div className={scss.cotainer} style={style}>
      <div>
        <div
          className={
            isBasicPage ? scss.basicpage : scss.basicpage + " " + scss.hide
          }
        >
          {basicPage(setisBasicPage)}
        </div>

        <div className={scss.additionalpage}>
          <div>
            <div className={scss.back} onClick={() => setisBasicPage(true)}>
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L26 26M26 1L1 26"
                  stroke="#99B4BF"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {additionalPage()}
        </div>
      </div>
    </div>
  );
}

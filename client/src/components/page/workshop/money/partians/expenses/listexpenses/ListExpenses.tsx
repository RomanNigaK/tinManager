import React, { CSSProperties, Dispatch, SetStateAction } from "react";
import Align from "../../../../../../commons/align/Align";
import Btn from "../../../../../../commons/btn/Btn";
import scss from "./ListExpenses.module.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../hooks/redux.hook";
import {
  selectorCurrentRko,
  selectorOrderExpenses,
} from "../../../../../../../redux/selectors";
import { setCurrentRko } from "../../../../../../../redux/slice/rkoSlice";
export default function ListExpenses(
  setIsBasicPage: Dispatch<SetStateAction<boolean>>
) {
  const namesRko = useAppSelector((state) => selectorOrderExpenses(state));

  const dispatch = useAppDispatch();

  return (
    <div className={scss.listexpenses}>
      <Align side="right">
        <h4>Виды расходов</h4>
      </Align>
      <div className={scss.list}>
        {namesRko &&
          namesRko.map((e, i) => {
            return (
              <div
                key={i + "orderexpenses"}
                onClick={() => dispatch(setCurrentRko(e))}
              >
                {e.name}
              </div>
            );
          })}
      </div>

      <div onClick={() => setIsBasicPage(false)} className={scss.add}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.778381 12.4561H24.3095M12.544 0.690476V24.2216"
            stroke="#99B4BF"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

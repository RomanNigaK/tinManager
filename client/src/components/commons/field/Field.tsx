import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import scss from "./Field.module.scss";
import Preloader from "../preloader/Preloader";
import {
  TypeProvider,
  setSearchValue,
} from "../../../redux/slice/providerSlice";
import { useAppDispatch } from "../../../hooks/redux.hook";
import { setCurrentClient } from "../../../redux/slice/clientSlice";

import magnifier from "./media/magnifier.svg";

const setBGColor = (theme: string, error?: string): string => {
  if (error) return " rgb(255, 155, 155)";
  switch (theme) {
    case "light":
      return "#F4F4F4";

    case "average":
      return "#d9d9d9";

    case "dark":
      return "#939393";
    case "white":
      return "#fff";
    case "standart":
      return "#99B4BF";
    default:
      return "#F4F4F4";
  }
};

const setBorderRadius = (round: string): string => {
  switch (round) {
    case "left":
      return "100px 0px 0px 100px";

    case "right":
      return "0px 100px 100px 0px";

    default:
      return "100px";
  }
};
const setHeight = (size: string): string => {
  switch (size) {
    case "little":
      return "35px";
    case "middle":
      return "45px";
    case "high":
      return "45px";
    default:
      return "#F4F4F4";
  }
};

interface IPropsField {
  type?: string;
  theme?: "light" | "dark" | "average" | "white" | "standart";
  size?: "little" | "middle" | "high";
  round?: "all" | "left" | "right";
  error?: string;
  titleBtn?: string;
  toggle?: string[];
  placeholder?: string;
  idForSubmit?: string;
  register: any;
  name: string;
  loading?: boolean;
  setValue?: Function;

  setdependentField?: Dispatch<SetStateAction<boolean>>;
  notTextError?: string;
  serach?: boolean;
  searchList?: TypeProvider[] | null;
  dispValue?: Dispatch<SetStateAction<string>> | undefined;
  readonly?: boolean;
}
export default function Field({
  type = "text",
  theme = "light",
  size = "little",
  round = "all",
  error,
  titleBtn,
  toggle,
  placeholder,
  idForSubmit,
  register,
  name,
  loading,
  setValue,

  setdependentField,
  notTextError,
  serach = false,
  searchList,
  dispValue,
  readonly = false,
}: IPropsField) {
  const setDisplay = (istoggle: boolean) => {
    if (toggle) return "none";
  };

  const styleWrapper: CSSProperties = {
    background: setBGColor(theme),
    height: setHeight(size),
    borderColor: setBGColor(theme, error),
    justifyContent: "center",
    borderRadius: setBorderRadius(round),
  };

  const styleInput = {
    display: setDisplay(!!toggle),
  };

  const [currentTogle, setcurrentTogle] = useState<string | null>(
    toggle ? toggle[0] : null
  );

  const setCurrentToggle = (current: string) => {
    setcurrentTogle(current);
  };

  if (toggle) {
    if (toggle[0] === toggle[1]) {
      console.error(
        `Указаны одинаковые значения:
         - массив значений не может быть одинаковым в кнопке переключателя`
      );
      return <></>;
    }
    if (titleBtn) {
      console.error(
        `Указаны противоречивые значения.
          У кнопки переключателя не может быть значения 'titleBtn',
          Так же если используется поле с кнопкой исключите свойство 'toggle'`
      );
      return <></>;
    }
  }

  useEffect(() => {
    if (setValue) setValue(name, currentTogle);
    if (setdependentField && currentTogle)
      setdependentField(toggle?.indexOf(currentTogle) ? true : false);
  }, [currentTogle]);

  useEffect(() => {
    if (setValue) setValue(name, currentTogle);
    if (setdependentField && currentTogle)
      setdependentField(toggle?.indexOf(currentTogle) ? true : false);
  }, [currentTogle]);

  const [isFocus, setIsFocus] = useState(false);
  const focus = (status: boolean) => {
    setIsFocus(status);
  };
  const dispatch = useAppDispatch();
  const handleChange = (str: string) => {
    if (dispValue) dispatch(dispValue(str)!);
    setvalue(str);
  };

  const [value, setvalue] = useState("");
  const setValueField = (field: string, value: string) => {
    if (setValue) {
      setValue(field, value);
      setvalue(value);
      focus(false);
    }
  };

  const changeClient = (field: string, val: string, id: number) => {
    setValueField(field, val);
    dispatch(setCurrentClient(id));
  };

  return (
    <div className={scss.input}>
      <div className={scss.wrapper} style={styleWrapper}>
        {serach ? (
          <input
            type={type}
            style={styleInput}
            placeholder={placeholder}
            onFocus={() => focus(true)}
            onChange={(e) => handleChange(e.target.value)}
            value={value}
            readOnly={readonly}
          />
        ) : (
          <input
            type={type}
            style={styleInput}
            placeholder={placeholder}
            name={name}
            {...register(name)}
            readOnly={readonly}
          />
        )}

        {titleBtn ? (
          <div className={scss.btn}>
            {loading ? (
              <Preloader />
            ) : (
              <label htmlFor={idForSubmit}>{titleBtn}</label>
            )}
          </div>
        ) : null}

        {toggle ? (
          <div className={scss.wrapperTogle}>
            {toggle.map((i, indx) => {
              return (
                <div
                  key={indx}
                  className={i === currentTogle ? scss.active : ""}
                  onClick={() => setCurrentToggle(i)}
                >
                  {i}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className={scss.error}>
        {error && !notTextError ? "*- " + error : null}
      </div>

      {serach && isFocus && searchList?.length ? (
        <div className={scss.search}>
          <div>
            <div onClick={() => setIsFocus(false)}>
              <div>&#215;</div>
            </div>
          </div>
          <div>
            {searchList
              .filter((i) => ~i.name.indexOf(value))
              .map((e, idx) => {
                return (
                  <div
                    onClick={() => changeClient(name, e.name, e.id)}
                    key={idx + "search"}
                  >
                    {e.name}
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

interface IPropsFieldSearch {
  type?: string;
  theme?: "light" | "dark" | "average" | "white" | "standart";
  size?: "little" | "middle" | "high";
  round?: "all" | "left" | "right";
  placeholder?: string;
  name: string;
  setValue?: Function;
  listSearch: { id: number; name: string; sale: number }[];
  disp: Function;
  value?: string;
}

export function FieldSearch({
  placeholder,
  name,
  type = "text",
  theme = "light",
  size = "little",
  round = "all",
  listSearch,
  disp,
  value,
}: IPropsFieldSearch) {
  const styleWrapper: CSSProperties = {
    background: setBGColor(theme),
    height: setHeight(size),
    justifyContent: "center",
    borderRadius: setBorderRadius(round),
  };
  const dispatch = useAppDispatch();
  const [valueSearch, setValueSearch] = useState(value || "");
  const [result, setresult] =
    useState<Array<{ id: number; name: string; sale: number }>>(listSearch);
  const [current, setcurrent] = useState("");

  useEffect(() => {
    setresult(
      listSearch.filter(
        (i: { name: string }) =>
          ~i.name.toLowerCase().indexOf(valueSearch.toLowerCase())
      )
    );
  }, [valueSearch]);

  const handleItem = (name: string, id: number, sale: number) => {
    setValueSearch(name);
    setcurrent(name);
    disp(id, sale);
  };

  const onChange = (name: string) => {
    disp(null);
    setValueSearch(name);
    setcurrent("");
  };

  return (
    <div className={scss.input} style={{ marginBottom: "10px" }}>
      <div className={scss.wrapper} style={styleWrapper}>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={valueSearch}
          onChange={(e) => onChange(e.target.value)}
        />
        <img src={magnifier} />
      </div>
      <div className={scss.resultSearch}>
        {!valueSearch ? (
          <div className={scss.clearList}>Введите значение для поиска</div>
        ) : (
          !current && (
            <div className={scss.searchItems}>
              {result.map((e, idx) => {
                return (
                  <div
                    onClick={() => handleItem(e.name, e.id, e.sale)}
                    key={idx + "providers"}
                  >
                    {e.name}
                  </div>
                );
              })}
            </div>
          )
        )}

        {!result.length && valueSearch && (
          <div className={scss.notfound}>
            Не найдено. Вы можете добавить пользователя
          </div>
        )}
      </div>
    </div>
  );
}

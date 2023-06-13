import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import scss from "./Search.module.scss";
import search from "@public/icons/search.svg";
import close from "@public/icons/closedark.svg";

interface IPropsSearch {
  setSearch: Dispatch<SetStateAction<string | boolean>>;
  placeholder?: string;
  val?: string;
}
export default function Search({ setSearch, placeholder, val }: IPropsSearch) {
  return (
    <div className={scss.search}>
      <div>
        <input
          type="text"
          value={val}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
        />
        {!!val && (
          <img
            src={close}
            alt=""
            style={{ width: 15, cursor: "pointer" }}
            onClick={() => setSearch("")}
          />
        )}

        <img src={search} alt="" />
      </div>
    </div>
  );
}

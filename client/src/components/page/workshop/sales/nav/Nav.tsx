import React, { useEffect, useState } from "react";
import scss from "./Nav.module.scss";

import CatalogProduct from "./page/catalogproduct/CatalogProduct";
import Client from "./page/client/Client";
import Favourites from "./page/favourites/Favourites";
import HistoryProduct from "./page/historyproduct/HistoryProduct";
import HistorySvg from "../../../../commons/svg/navsales/HistorySvg";
import ClientSvg from "../../../../commons/svg/navsales/ClientSvg";
import CatalogSvg from "../../../../commons/svg/navsales/CatalogSvg";
import FavouritesSvg from "../../../../commons/svg/navsales/FavouritesSvg";
import Addclient from "./page/addclient/Addclient";
import AddClientSvg from "@commons/svg/navsales/AddClientSvg";
export default function Nav() {
  const [page, setpage] = useState("Catalog");

  return (
    <div className={scss.nav}>
      <nav>
        <div onClick={() => setpage("Favourites")}>
          <FavouritesSvg
            color={page === "Favourites" ? "#BF8D30" : "#2D4B73"}
          />
        </div>
        <div onClick={() => setpage("History")}>
          <HistorySvg color={page === "History" ? "#BF8D30" : "#2D4B73"} />
        </div>

        <div onClick={() => setpage("Catalog")}>
          <CatalogSvg color={page === "Catalog" ? "#BF8D30" : "#2D4B73"} />
        </div>
        <div onClick={() => setpage("Client")}>
          <ClientSvg color={page === "Client" ? "#BF8D30" : "#2D4B73"} />
        </div>
        <div onClick={() => setpage("Addclient")}>
          <AddClientSvg color={page === "Addclient" ? "#BF8D30" : "#2D4B73"} />
        </div>
      </nav>
      <div className={scss.page}>
        {page === "Catalog" && <CatalogProduct />}
        {page === "Client" && <Client />}
        {page === "History" && <HistoryProduct />}
        {page === "Favourites" && <Favourites />}
        {page === "Addclient" && <Addclient />}
      </div>
    </div>
  );
}

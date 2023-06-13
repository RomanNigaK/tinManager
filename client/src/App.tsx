import React, { useState } from "react";
import "./style/global.scss";

import Layout from "./components/layout/Layout";
import Index from "./components/page/index/Index";

import { Route, Routes } from "react-router";
import Reg from "./components/page/reg/Reg";

import Workshop from "./components/page/workshop/Workshop";
import Material from "./components/page/workshop/material/Material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import EnteringBalances from "./components/page/workshop/enteringbalances/EnteringBalances";
import WriteDowns from "./components/page/workshop/writedowns/WriteDowns";
import Entrance from "./components/page/workshop/entrance/Entrance";
import History from "./components/page/workshop/history/History";
import Sale from "./components/page/workshop/sales/Sale";
import Setting from "./components/page/workshop/setting/Setting";
import ListSales from "./components/page/workshop/sales/listsales/ListSales";
import Tin from "./components/page/workshop/tin/Tin";

import Money from "./components/page/workshop/money/Money";
import Payexpenses from "./components/page/workshop/money/payexpenses/Payexpenses";
import SmallScrin from "@commons/smallscreen/SmallScrin";

export default function App() {
  const [isMobile, setIsmobile] = useState(window.screen.width <= 900);

  window.onresize = function (event) {
    const widthScreen = window.screen.width;
    setIsmobile(widthScreen <= 900 ? true : false);
  };

  if (isMobile) return <SmallScrin />;

  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/reg" element={<Reg />} />
          <Route path="/workshop" element={<Workshop />}>
            <Route index element={<Material />} />
            <Route
              path="/workshop/enterbalance"
              element={<EnteringBalances />}
            />
            <Route path="/workshop/writedowns" element={<WriteDowns />} />
            <Route path="/workshop/entrance" element={<Entrance />} />
            <Route path="/workshop/history" element={<History />} />
            <Route path="/workshop/sale" element={<Sale />} />
            <Route path="/workshop/sales" element={<ListSales />} />
            <Route path="/workshop/setting" element={<Setting />} />
            <Route path="/workshop/tin" element={<Tin />} />
            <Route path="/workshop/payexpenses" element={<Payexpenses />} />
            <Route path="/workshop/money" element={<Money />} />
            <Route path="*" element={<Material />} />
          </Route>
        </Route>
        <Route path="*" element={<Index />} />
      </Routes>
    </DndProvider>
  );
}

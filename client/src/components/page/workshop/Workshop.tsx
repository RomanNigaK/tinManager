import React, { useCallback, useEffect } from "react";
import { Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { selectorIsAuthUser, selectorUser } from "../../../redux/selectors";
import scss from "./Workshop.module.scss";
import NotAuth from "../../commons/notAuth/NotAuth";
import { useHttp } from "../../../hooks/http.hook";
import { setMaterials } from "../../../redux/slice/materialSlice";
import { setProvider } from "../../../redux/slice/arrivalSlice";
import { setProviders } from "../../../redux/slice/providerSlice";
import { setMovements } from "../../../redux/slice/movementSlice";
import { setProducts } from "../../../redux/slice/productSlice";
import { setClients } from "../../../redux/slice/clientSlice";
import { setSales } from "../../../redux/slice/saleSlice";
import { setRko } from "../../../redux/slice/rkoSlice";
import { setMoney } from "../../../redux/slice/moneySlice";
import { setWorkshop } from "../../../redux/slice/workshopSlice";
export default function Workshop() {
  const isAuthUser = useAppSelector((state) => selectorIsAuthUser(state));
  const { request, loading } = useHttp();
  const user = useAppSelector((state) => selectorUser(state));

  const dispatch = useAppDispatch();

  const loadData = useCallback(async () => {
    let body: any = {};
    body.workshop = user!.workshop;
    body.userId = user!.id;
    const materials = request(
      "/api/material/list/",
      "POST",
      { id: user!.workshop },
      {}
    );

    const providers = request(
      "/api/provider/list/",
      "POST",
      { id: user!.workshop },
      {}
    );

    const movements = request(
      "/api/movement/list/",
      "POST",
      { id: user!.workshop },
      {}
    );
    const clients = request(
      "/api/client/list/",
      "POST",
      { id: user!.workshop },
      {}
    );
    const sales = request(
      "/api/sale/list/",
      "POST",
      { id: user!.workshop },
      {}
    );
    const basisforcashflow = request(
      "/api/rko/list/",
      "POST",
      { id: user!.workshop },
      {}
    );
    const money = request(
      "/api/money/list/",
      "POST",
      { id: user!.workshop },
      {}
    );
    const workshop = request(
      "/api/workshop/get/",
      "POST",
      { id: user!.workshop },
      {}
    );
    Promise.all([
      materials,
      providers,
      movements,
      clients,
      sales,
      basisforcashflow,
      money,
      workshop,
    ]).then((values) => {
      dispatch(setMaterials(values[0]));
      dispatch(setProviders(values[1]));
      dispatch(setMovements(values[2]));
      dispatch(setClients(values[3]));
      dispatch(setSales(values[4]));
      dispatch(setRko(values[5]));
      dispatch(setMoney(values[6]));
      dispatch(setWorkshop(values[7]));
    });
  }, [isAuthUser]);

  useEffect(() => {
    if (isAuthUser) loadData();
  }, [isAuthUser]);
  return (
    <div className={scss.workshop}>{isAuthUser ? <Outlet /> : <NotAuth />}</div>
  );
}

import { MaterialType } from "./slice/materialSlice";
import { Item } from "./slice/movementSlice";
import { RootState } from "./store";

export const selectorEmailUser = (state: RootState) =>
  state.user.emailForRegistration;
export const selectorIsAuthUser = (state: RootState) => state.user.isAuth;
export const selectorUser = (state: RootState) => state.user.user;
export const selectorMessage = (state: RootState) => state.app.message;

export const selectorStandartListMaterials = (state: RootState) =>
  state.material.standartListMaterials;

export const selectorMaterials = (store: RootState, filters: any) => {
  const { coverage, color, thickness } = filters;
  const list = [...store.material.material].reverse();
  return list
    .filter((i) => (coverage ? i.coverage === coverage : i.coverage))
    .filter((i) => (color ? i.color === color : i.color))
    .filter((i) => (thickness ? i.thickness === thickness : i.thickness));
};
export const selectorMaterialsAll = (store: RootState) => {
  return store.material.material;
};

export const selectorMaterialId = (store: RootState, id: number) => {
  return store.material.material.find((i) => i.id === id);
};

export const selectorNotFilterMaterials = (store: RootState) => {
  //const list = [...store.material.material].reverse();
  return store.material.material.filter((i) => i.deleted !== 1);
};
export const selectorStandartMaterials = (store: RootState) => {
  //return store.material.standartListMaterials;
  const slm = store.material.standartListMaterials;
  return {
    mp: slm.filter((i) => i.manufacturer === "МЕТАЛЛ ПРОФИЛЬ"),
    gl: slm.filter((i) => i.manufacturer === "GRAND LINE"),
    noname: slm.filter((i) => i.manufacturer === "noname"),
  };
};

export const selectorFiltersMaterials = (state: RootState) => {
  return {
    coverages: state.material.filtersList.coverages,
    thicknesses: state.material.filtersList.thicknesses,
    colors: state.material.filtersList.colors,
  };
};

export const selectorChangeFilters = (state: RootState) => {
  return {
    coverage: state.material.filters.coverage,
    thickness: state.material.filters.thickness,
    color: state.material.filters.color,
  };
};

export const selectorCurrentMaterial = (state: RootState) =>
  state.material.currentMaterial;

export const selectorListEnteringBalance = (state: RootState) => {
  return state.material.material.filter((i) => i.enteringBalance);
};

export const selectorListWriteDowns = (state: RootState) => {
  return state.material.material.filter((i) => i.writeDown);
};
export const selectorListEntrance = (state: RootState) => {
  return state.material.material.filter((i) => i.entrance);
};

export const selectorEnteringBalamces = (state: RootState) => {
  //let list:{iditem:number,quantity:number,unit:string}[]=[];

  let list = state.material.material
    .filter((e) => e.enteringBalance)
    .map((e) => {
      return { iditem: e.id, quantity: e.enteringBalance };
    });

  return list;
};

export const selectorWriteDowns = (state: RootState) => {
  //let list:{iditem:number,quantity:number,unit:string}[]=[];

  let list = state.material.material
    .filter((e) => e.writeDown)
    .map((e) => {
      return { iditem: e.id, quantity: e.writeDown };
    });

  return list;
};

export const selectorEntrance = (state: RootState) => {
  //let list:{iditem:number,quantity:number,unit:string}[]=[];

  let list = state.material.material
    .filter((e) => e.entrance)
    .map((e) => {
      return { iditem: e.id, quantity: e.entrance, price: e.price };
    });

  return list;
};
export const selectorProviderSearch = (state: RootState) =>
  state.provider.providerForInn;

export const selectorProvidersSearch = (state: RootState, filter?: string) => {
  if (filter) {
    console.log(filter);
    return state.provider.providers?.filter(
      (i) => i.name.indexOf(filter) !== -1
    );
  } else {
    return state.provider.providers;
  }
};

export const selectorSearchValueProvider = (state: RootState) =>
  state.provider.searchValue;

export const selectorMovements = (state: RootState) => {
  return state.movement.movements.filter(
    (i) =>
      i.type === state.movement.typeEntrance ||
      i.type === state.movement.typeEnteringbalances ||
      i.type === state.movement.typeWriteDowns ||
      i.type === state.movement.typeSales
  );
};

export const selectorItemsMovement = (state: RootState) => state.movement.items;

export const selectorMaterialMovement = (state: RootState, items: Item[]) => {
  let listMaterials: MaterialType[] = [];
  items.forEach((element) => {
    listMaterials.push({
      ...state.material.material.find((i) => i.id === element.iditem)!,
      quantity: element.quantity,
      price: element.price,
    });
  });
  return listMaterials;
};

export const selectorCurrentMovement = (state: RootState) => {
  return state.movement.currentMovement;
};
export const selectorMovementId = (state: RootState, id: number) => {
  return state.movement.movements.find((i) => i.id === id);
};
export const selectorBundle = (
  state: RootState,
  link?: number,
  nameState?: string
) => {
  switch (nameState) {
    case "entrance":
      return (
        state.provider.providers?.find((i) => i.id === link || 0)?.name || null
      );
    case "sales":
      return state.sale.listSale.find((i) => i.id === link || 0)?.id || null;
    default:
      return;
  }
};

export const selectorCurrentProduct = (state: RootState) =>
  state.product.currentProduct;
export const selectorProducts = (state: RootState) => state.product.products;

export const selectorClients = (state: RootState) => state.client.clients;

export const selectorClientsNames = (state: RootState) =>
  state.client.clients?.map((e) => e.name) || null;
export const selectorCurrentClientId = (state: RootState) =>
  state.client.currentClientId;

export const selectorClient = (state: RootState) => state.client.client;
export const selectorClientId = (state: RootState, id: number) => {
  const sale = state.sale.listSale.find((item) => item.id === id);
  const client = state.client.clients?.find((i) => i.id === sale?.link);
  return { client, sale };
};

export const selectorSale = (state: RootState) => state.sale.sale;

export const selectorSumCurrenSale = (state: RootState) => {
  const summa =
    state.sale.sale.reduce(
      (current: number, item) => current + item.summa!,
      0
    ) || null;
  const summaSale =
    state.sale.sale.reduce(
      (current: number, item) => current + item.sale!,
      0
    ) || null;

  return { summa, summaSale };
};

export const selectorSaleList = (state: RootState) => state.sale.listSale;
export const selectorSaleFilterStatus = (state: RootState) =>
  state.sale.filterStatus;
export const selectorSaleListFilter = (store: RootState, filters: any) => {
  const { link, movement } = filters;
  const list = [...store.sale.listSale].reverse();
  return list
    .filter((i) => (link ? i.link === link : i.link))
    .filter((i) => (movement ? i.movement === movement : i.movement));
};

export const selectorViewSale = (state: RootState) => state.sale.viewSale;

export const selectorSaleListInwork = (state: RootState) =>
  state.sale.listSale.filter(
    (i) =>
      i.movement === "inwork" || i.movement === "tin" || i.movement === "ready"
  );
export const selectorCurrentTin = (state: RootState) => state.tin.currentTin;

export const selectorCurrentTinData = (state: RootState, id: number | null) =>
  state.sale.listSale.find((i) => i.id === id) || null;

export const selectorOrderExpenses = (state: RootState) =>
  state.rko.basisforcashflow?.filter((i) => !!!i.isappitemname);

export const selectorCurrentRko = (state: RootState) => state.rko.currentRko;
export const selectorBasisforcashflow = (state: RootState) =>
  state.rko.basisforcashflow;

export const selectorPayExpenses = (state: RootState) => {
  return { isPay: state.money.isPay, isExpenses: state.money.isExpenses };
};

export const selectorMoney = (state: RootState) => {
  let money = [...state.money.money];

  if (state.money.listCategories.length) {
    money = money.filter((i) =>
      state.money.listCategories.includes(i.category)
    );
    return money.reverse();
  } else {
    return [];
  }
};

export const selectorListCategories = (state: RootState) =>
  state.money.listCategories;

export const selectorNoPayEntrance = (state: RootState) => {
  const idsEntrance = state.movement.movements.map((e) => {
    return e.type === "entrance" && e.id;
  });
  let idsNoPay: number[] = [];
  idsEntrance.forEach((el) => {
    if (!state.money.money.find((e) => e.link === el && e.category === 1))
      typeof el === "number" && idsNoPay.push(el);
  });

  const dd = state.movement.movements.filter((i) => idsNoPay.includes(i.id));
  return dd.map((e) => {
    if (typeof e.items === "string")
      return { ...e, items: JSON.parse(e.items) };
    return e;
  });
};

export const selectorProviderId = (state: RootState, id: number) =>
  state.provider.providers?.find((i) => i.id === id);

export const selectorQuantityItemMoney = (state: RootState) =>
  state.money.money.length;

export const selectorWorkshop = (state: RootState) => state.workshop.workshop;
export const selectorSettingWorkshop = (state: RootState) =>
  state.workshop.setting;

export const selectorLoadinWorkshop = (state: RootState) =>
  state.workshop.loading;

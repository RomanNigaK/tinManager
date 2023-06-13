import { createSlice } from "@reduxjs/toolkit";

interface ISale {
  idMaterial?: number;
  idProduct?: number;
  quantity: number;
  idClient?: number;
  h?: number;
  sizes?: any;
  price?: number;
  sale?: number;
  summa?: number;
  key?: string;
  s?: number;
  pipe?: string;
}

interface IListSale {
  id: number;
  pay: number;
  items: ISale[];
  movement: string;
  link: number;
  comment: string;
  author: number;
  date: number;
  summa: number;
}

export type { ISale, IListSale };

interface IStste {
  sale: ISale[];
  listSale: IListSale[];
  filterStatus: "save" | "inwork" | "ready" | "finish" | "tin" | null;
  viewSale: IListSale | null;
}

const initialState: IStste = {
  sale: [],
  listSale: [],
  filterStatus: null,
  viewSale: null,
};

export const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    addItemSale: (state, action) => {
      state.sale.push(action.payload);
    },
    deleteItemSale: (state, action) => {
      const key = action.payload;
      state.sale = state.sale.filter((i) => i.key !== key);
    },
    updateSale: (state, action) => {
      const applysale = action.payload;

      if (!applysale) {
        state.sale = state.sale.map((e) => {
          return { ...e, sale: 0 };
        });
      } else {
        state.sale = state.sale.map((e) => {
          console.log("summa", e.summa);

          let sale = Math.round(e.summa * (applysale / 100));
          return { ...e, sale: sale };
        });
      }
    },
    setSales: (state, action) => {
      state.listSale = action.payload;
    },
    setFiterStatus: (state, action) => {
      const status:
        | "Сохранен"
        | "В работе"
        | "На гибке"
        | "Готов к выдаче"
        | "Завершен"
        | null = action.payload;
      status === "Сохранен" && (state.filterStatus = "save");
      status === "В работе" && (state.filterStatus = "inwork");
      status === "На гибке" && (state.filterStatus = "tin");
      status === "Завершен" && (state.filterStatus = "finish");
      status === "Готов к выдаче" && (state.filterStatus = "ready");
      status === null && (state.filterStatus = null);
    },
    setviewSale: (state, action) => {
      const items = JSON.parse(action.payload.items);
      state.viewSale = { ...action.payload, items };
    },
    setValuePay: (state, action) => {
      state.listSale = state.listSale.map((e) => {
        if (e.id === action.payload) {
          return { ...e, pay: 1 };
        } else return e;
      });
    },
    setMovement: (state, action) => {
      const { id, movement } = action.payload;
      state.listSale = state.listSale.map((e) => {
        if (e.id === id) {
          return { ...e, movement };
        } else return e;
      });
    },
    clearSale: (state, action) => {
      state.sale = [];
    },
  },
});

export const {
  addItemSale,
  deleteItemSale,
  updateSale,
  setSales,
  setFiterStatus,
  setviewSale,
  setValuePay,
  setMovement,
  clearSale,
} = saleSlice.actions;

export default saleSlice.reducer;

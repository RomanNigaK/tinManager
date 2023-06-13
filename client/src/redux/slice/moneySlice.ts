import { createSlice } from "@reduxjs/toolkit";

interface IMoney {
  id: number;
  type: 1 | -1;
  category: number;
  summa: number;
  link: number;
  basis: string;
  date: number;
  author: number;
  comment?: string;
}

export type { IMoney };

interface IStste {
  money: IMoney[];
  isPay: boolean;
  isExpenses: boolean;
  listCategories: number[];
}

const initialState: IStste = {
  money: [],
  isPay: false,
  isExpenses: false,
  listCategories: [2],
};

export const moneySlice = createSlice({
  name: "money",
  initialState,
  reducers: {
    setIsPay: (state, action) => {
      state.isPay = !!action.payload ? true : false;
    },
    setIsExpenses: (state, action) => {
      state.isExpenses = !!action.payload ? true : false;
    },
    setMoney: (state, action) => {
      state.money = action.payload;
    },
    addMoney: (state, action) => {
      state.money.push(action.payload);
    },
    actionListCategories: (state, action) => {
      const id = action.payload;
      let newList = [...state.listCategories];

      if (state.listCategories.includes(id)) {
        const index = newList.indexOf(id);
        newList.splice(index, 1);
        state.listCategories = newList;
      } else {
        state.listCategories.push(id);
      }
    },
  },
});

export const {
  setIsPay,
  setIsExpenses,
  setMoney,
  addMoney,
  actionListCategories,
} = moneySlice.actions;

export default moneySlice.reducer;

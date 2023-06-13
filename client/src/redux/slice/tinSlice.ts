import { createSlice } from "@reduxjs/toolkit";
import { IListSale } from "./saleSlice";

interface ISetting {
  product: {
    makePrice: {
      typeFormationPrice: {
        value: string;
        listValues: string[];
      };
      percentages: number;
      price1sm: number;
      handlePrice: true;
    };
  };
  commons: {
    sellInTheNegative: boolean;
  };
}

interface ITin {
  // id: number;
  // typeuser: string;
  // nameCompany: string | null;
  // email: string;
  // phone: string;
  // setting: ISetting;
}

interface IStste {
  currentTin: IListSale | null;
}

const initialState: IStste = {
  currentTin: null,
};

export const tinSlice = createSlice({
  name: "tin",
  initialState,
  reducers: {
    setCurrentTin: (state, action) => {
      if (action.payload === null) {
        state.currentTin = null;
        console.log(action.payload);
        return;
      }
      if (typeof action.payload.items === "string") {
        state.currentTin = {
          ...action.payload,
          items: JSON.parse(action.payload.items),
        };
      } else {
        state.currentTin = action.payload;
      }
    },
  },
});

export const { setCurrentTin } = tinSlice.actions;

export default tinSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

type Item = {
  iditem: number;
  quantity: number;
  price?: number;
};
export type { Item };

type MovementType = {
  id: number;
  type: string;
  items: Item | string;
  link: number;
  comment: string | null;
  author: number;
  date: number;
};

interface IStste {
  movements: MovementType[];
  currentMovement: number | null;
  items: Item[];
  typeEntrance: null | string;
  typeWriteDowns: null | string;
  typeEnteringbalances: null | string;
  typeWriteDownsSale: null | string;
  typeSales: null | string;
}

const initialState: IStste = {
  movements: [],
  currentMovement: null,
  items: [],

  typeEntrance: "",
  typeWriteDowns: "",
  typeEnteringbalances: "",
  typeWriteDownsSale: "",
  typeSales: "",
};

export const movementSlice = createSlice({
  name: "movement",
  initialState,
  reducers: {
    setMovements: (state, action) => {
      state.movements = action.payload;
    },
    setCurrentMovement: (state, action) => {
      const { id, items } = action.payload;
      state.currentMovement = id;
      state.items = JSON.parse(items);
    },
    setTypeEntrance: (state, action) => {
      state.typeEntrance = action.payload;
    },
    setTypeSales: (state, action) => {
      state.typeSales = action.payload;
    },
    setTypeWriteDowns: (state, action) => {
      state.typeWriteDowns = action.payload;
    },
    setTypeEnteringbalances: (state, action) => {
      state.typeEnteringbalances = action.payload;
    },
    setTypeWriteDownsSale: (state, action) => {
      state.typeWriteDownsSale = action.payload;
    },
  },
});

export const {
  setMovements,
  setCurrentMovement,
  setTypeEntrance,
  setTypeWriteDowns,
  setTypeEnteringbalances,
  setTypeWriteDownsSale,
  setTypeSales,
} = movementSlice.actions;

export default movementSlice.reducer;

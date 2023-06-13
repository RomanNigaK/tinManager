import { createSlice } from "@reduxjs/toolkit";

type NewArrivalType = {
  id: number;
  material: string;
  m2: number;
  rubm2: number;
};
export type { NewArrivalType };

type ArrivalsType = {
  id: number;
  provider: string;
  amount: number;
  createdata: string;
  data: string;
  inmumberdata: string;
  innumber: string;
};
interface IState {
  newArrival: NewArrivalType[];
  arrivals: ArrivalsType[];
  provider: string | null;
  view: ArrivalsType[] | null;
}

const initialState: IState = {
  newArrival: [],
  arrivals: [],
  provider: null,
  view: null,
};

export const arrivallSlice = createSlice({
  name: "arrival",
  initialState,
  reducers: {
    addItemForArrival: (state, action) => {
      state.newArrival.push(action.payload);
    },
    clearNewArrival: (state) => {
      state.newArrival = [];
    },
    setArrivals: (state, action) => {
      state.arrivals = action.payload;
    },
    addArrivals: (state, action) => {
      state.arrivals.push(action.payload);
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setView: (state, action) => {
      state.view = state.arrivals.filter((e) => e.id === action.payload);
    },
  },
});

export const {
  addItemForArrival,
  setArrivals,
  setProvider,
  setView,
  addArrivals,
  clearNewArrival,
} = arrivallSlice.actions;

export default arrivallSlice.reducer;

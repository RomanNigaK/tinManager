import { createSlice } from "@reduxjs/toolkit";

interface IBasisforcashflow {
  id: number;
  name: string;
  isappitemname: 1 | 0;
  authoh: number;
}

interface IStste {
  basisforcashflow: IBasisforcashflow[];
  currentRko: IBasisforcashflow | null;
}

const initialState: IStste = {
  basisforcashflow: [],
  currentRko: null,
};

export const rkoSlice = createSlice({
  name: "rko",
  initialState,
  reducers: {
    setCurrentRko: (state, action) => {
      state.currentRko = action.payload;
    },
    setRko: (state, action) => {
      state.basisforcashflow = action.payload;
    },
    addNameRko: (state, action) => {
      state.basisforcashflow?.push(action.payload);
    },
  },
});

export const { setCurrentRko, setRko, addNameRko } = rkoSlice.actions;

export default rkoSlice.reducer;

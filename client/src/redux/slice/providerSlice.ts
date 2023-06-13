import { createSlice } from "@reduxjs/toolkit";

type TypeProvider = {
  id: number;
  address?: string;
  inn: string;
  name: string;
  manager?: string;
  phone?: string;
};
export type { TypeProvider };

type IStste = {
  providers: TypeProvider[] | null;
  providerForInn: null | TypeProvider;
  searchValue: string;
};

const initialState: IStste = {
  providers: null,
  providerForInn: null,
  searchValue: "",
};

export const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProviderForInn: (state, action) => {
      state.providerForInn = action.payload;
    },
    setProviders: (state, action) => {
      state.providers = action.payload;
    },
    setSearchValue: (state, action) => {
      console.log(action);
      state.searchValue = action.payload;
    },
  },
});

export const { setProviderForInn, setProviders, setSearchValue } =
  providerSlice.actions;

export default providerSlice.reducer;

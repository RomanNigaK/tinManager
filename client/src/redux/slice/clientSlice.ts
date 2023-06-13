import { createSlice } from "@reduxjs/toolkit";

type TypeClient = {
  id: number;
  address?: string;
  inn: string;
  name: string;
  manager?: string;
  phone?: string;
  sale: number;
};
export type { TypeClient };

type IStste = {
  clients: TypeClient[] | null;
  client: TypeClient | null;
  currentClientId: number | null;
};

const initialState: IStste = {
  clients: null,
  client: null,
  currentClientId: null,
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    setCurrentClient: (state, action) => {
      state.client =
        state.clients?.find((i) => i.id === action.payload) || null;
    },
    setCurrentId: (state, action) => {
      state.currentClientId =
        state.clients?.find((i) => i.name === action.payload)?.id || null;
    },
  },
});

export const { setClients, setCurrentClient, setCurrentId } =
  clientSlice.actions;

export default clientSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface IStste {
  message: { id: number; text: string }[];
}

const initialState: IStste = {
  message: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      if (!action.payload) return;
      const id = Date.now();
      state.message.push({ id: id, text: action.payload });
    },
    deleteMsg: (state, action) => {
      let arr = state.message.filter((i) => i.id !== action.payload);
      state.message = arr;
    },
  },
});

export const { setMessages, deleteMsg } = appSlice.actions;

export default appSlice.reducer;

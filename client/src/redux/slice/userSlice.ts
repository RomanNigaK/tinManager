import { createSlice } from "@reduxjs/toolkit";

type User = {
  id: number;
  nameUser: string;
  senameUser: string;
  access: string;
  login: string;
  token: string;
  workshop: number;
  deleted: number;
};

export type { User };

interface IStste {
  isAuth: boolean;
  user: User | null;
  emailForRegistration: string | null;
}

const initialState: IStste = {
  isAuth: false,
  user: null,
  emailForRegistration: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    setEmail: (state, action) => {
      state.emailForRegistration = action.payload;
    },
  },
});

export const { login, logout, setEmail } = userSlice.actions;

export default userSlice.reducer;

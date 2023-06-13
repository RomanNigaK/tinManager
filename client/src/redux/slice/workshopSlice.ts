import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./userSlice";
import { RootState } from "redux/store";
import { setMessages } from "./appSlice";

type S = {
  part: string;
  setting: any;
};

export const apdateSetting = createAsyncThunk(
  "workshop/apdateSetting",
  async function (info: S, { getState, dispatch }) {
    try {
      const setting = getState() as RootState;
      const newSetting = {
        ...setting.workshop.setting,
        [info.part]: info.setting,
      };
      const data = await fetch("/api/workshop/apdatesetting", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          setting: newSetting,
          id: setting.workshop.workshop.id,
        }),
      });

      if (!data.ok) {
        throw new Error("Ошибка сохранения");
      }
      const response = await data.json();
      dispatch(setSetting(newSetting));
      dispatch(setMessages(response.messageFromServer));
    } catch (error) {
      dispatch(setMessages(error.message));
    }
  }
);

interface ISettingMakePriceProduct {
  makePrice: string;
  percentages: number;
  price1sm: number;
  handlePrice: boolean;
}

interface ISettingProducts {
  widthBind: number;
}

interface ISettingCommons {
  sellInTheNegative: boolean;
}

interface ISettingPipe {
  list: string[];
}

interface ISetting {
  makePriceProduct: ISettingMakePriceProduct;
  products: ISettingProducts;
  commons: ISettingCommons;
  pipe: ISettingPipe;
}

export type {
  ISetting,
  ISettingMakePriceProduct,
  ISettingProducts,
  ISettingCommons,
  ISettingPipe,
};

interface IWorkshop {
  id: number;
  typeuser: string;
  namecompany: string | null;
  email: string;
  phone: string;
  setting: ISetting;
  users: User[];
}

export type { IWorkshop };

interface IStste {
  workshop: IWorkshop | null;
  loading: boolean;
  setting: ISetting;
}

const initialState: IStste = {
  workshop: null,
  loading: false,
  setting: {
    makePriceProduct: {
      makePrice: "Наценка",
      percentages: 200,
      price1sm: 14,
      handlePrice: true,
    },
    products: { widthBind: 10 },
    commons: {
      sellInTheNegative: true,
    },
    pipe: {
      list: [],
    },
  },
};

export const workshopSlice = createSlice({
  name: "workshop",
  initialState,
  reducers: {
    setWorkshop: (state, action) => {
      state.workshop = {
        ...action.payload[0],
        setting: null,
      };
      if (!action.payload[0].setting) {
        state.setting = basicSetting;
      } else {
        state.setting = JSON.parse(action.payload[0].setting);
      }
    },
    addUser: (state, action) => {
      state.workshop.users.push(action.payload);
    },
    setSetting: (state, action) => {
      state.setting = action.payload;
    },
    deleteUser: (state, action) => {
      state.workshop.users = state.workshop.users.map((e) => {
        if (e.id === action.payload) return { ...e, deleted: 1 };
        return { ...e };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apdateSetting.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(apdateSetting.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { setWorkshop, addUser, deleteUser, setSetting } =
  workshopSlice.actions;

export default workshopSlice.reducer;

//================================================================
const basicSetting = {
  makePriceProduct: {
    makePrice: "Наценка",
    percentages: 200,
    price1sm: 14,
    handlePrice: true,
  },
  products: { widthBind: 10 },
  commons: {
    sellInTheNegative: true,
  },
  pipe: {
    list: [],
  },
};

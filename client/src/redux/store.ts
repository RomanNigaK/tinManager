import { configureStore } from "@reduxjs/toolkit";
import materialSlice from "./slice/materialSlice";
import appSlice from "./slice/appSlice";
import userSlice from "./slice/userSlice";
import providerSlice from "./slice/providerSlice";
import movementSlice from "./slice/movementSlice";
import productSlice from "./slice/productSlice";
import clientSlice from "./slice/clientSlice";
import saleSlice from "./slice/saleSlice";
import moneySlice from "./slice/moneySlice";
import tinSlice from "./slice/tinSlice";
import rkoSlice from "./slice/rkoSlice";
import workshopSlice from "./slice/workshopSlice";
export const store = configureStore({
  reducer: {
    material: materialSlice,
    app: appSlice,
    user: userSlice,
    provider: providerSlice,
    movement: movementSlice,
    product: productSlice,
    client: clientSlice,
    sale: saleSlice,
    money: moneySlice,
    tin: tinSlice,
    rko: rkoSlice,
    workshop: workshopSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
export type { RootState };

type AppDispatch = typeof store.dispatch;
export type { AppDispatch };

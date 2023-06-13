import { createSlice } from "@reduxjs/toolkit";
import ProductList from "../../scripts/products";

type TypeProduct = {
  id: number;
  type: 1 | 2;
  name: string;
  alias: string;
  sideColor: number;
  paths: string;
  position: string;
  svg: string;
};
export type { TypeProduct };

// type TypeCurrentProduct = {
//   id: number;
//   name: string;
//   alias: string;
//   sideColor: number;
//   paths: { d: string; stroke: string; strokeWidth: string }[];
//   position: {
//     position: { marginTop: string; marginLeft: string };
//     value: number;
//     id: number;
//   }[];
// };

type TypeSizes = {
  position: { marginLeft: number; marginTop: number };
  value: number;
  id: number;
  type: "length" | "degree" | "bend";
};

export type { TypeSizes };

type TypeCurrentProduct = {
  id: number;
  type: 1 | 2;
  name: string;
  alias: string;
  arrow: number;
  paths: { d: string; stroke: string; strokeWidth: string }[];
  sizes: TypeSizes[];
};
export type { TypeCurrentProduct };

interface IStste {
  products: TypeProduct[] | null;
  currentProduct: any | null;
}

const initialState: IStste = {
  products: null,
  currentProduct: null,
};

export const appSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setValueItemProduct: (state, action) => {
      const { id, value } = action.payload;
      let newPosition: any = [];
      state.currentProduct &&
        state.currentProduct.sizes.forEach((element: TypeSizes) => {
          if (element.id === id) {
            newPosition.push({ ...element, value: Number(value) });
          } else {
            newPosition.push({ ...element });
          }
        });

      state.currentProduct && (state.currentProduct.sizes = newPosition);
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCurrentProduct: (state, action) => {
      const product = new ProductList().getItemId(action.payload);

      state.currentProduct = product;
    },
  },
});

export const { setValueItemProduct, setProducts, setCurrentProduct } =
  appSlice.actions;

export default appSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

type MaterialType = {
  id: number;
  name: string;
  coverage: string;
  color: string;
  thickness: number;
  stock?: number;
  author?: number;
  deleted: number;
  m2?: number;
  rubm2?: number;
  enteringBalance?: null | number;
  writeDown?: null | number;
  entrance?: null | number;
  price?: null | number;
  quantity?: null | number;
  inprice?: null | number;
  costprice?: null | number;
  manufacturer: string;
};
export type { MaterialType };

interface IFilters {
  color: null | string;
  coverage: null | string;
  thickness: null | number;
}

interface IFiltersList {
  colors: string[];
  coverages: string[];
  thicknesses: number[];
}

interface IStste {
  isLoad: boolean;
  material: MaterialType[];
  standartListMaterials: MaterialType[];
  currentMaterial: MaterialType | null;
  filtersList: IFiltersList;
  filters: IFilters;
  listEnteringBalance: { id: number; quantity: number }[];
}

const initialState: IStste = {
  isLoad: false,
  material: [], //хранит занчерие материалла как из бд
  standartListMaterials: [],
  currentMaterial: null,

  listEnteringBalance: [],
  filtersList: {
    colors: [],
    coverages: [],
    thicknesses: [],
  },

  filters: {
    color: null,
    coverage: null,
    thickness: null,
  },
};

export const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    setMaterials: (state, action) => {
      const obj = {
        enteringBalance: null,
        writeDown: null,
        entrance: null,
        price: null,
      };
      let colors: string[] = [];
      let thicknesses: number[] = [];
      let coverages: string[] = [];

      let listMat: MaterialType[] = [];

      action.payload.forEach((element: MaterialType) => {
        if (!coverages.includes(element.coverage)) {
          coverages.push(element.coverage);
        }
        if (!thicknesses.includes(element.thickness)) {
          thicknesses.push(element.thickness);
        }
        if (!colors.includes(element.color)) {
          colors.push(element.color);
        }
        let stroka = { ...element, ...obj };
        listMat.push(stroka);
      });
      state.filtersList.coverages = coverages;
      state.filtersList.colors = colors;
      state.filtersList.thicknesses = thicknesses;

      state.material = listMat;
    },
    setCoverage: (state, action) => {
      state.filters.coverage = action.payload;
    },
    setColor: (state, action) => {
      state.filters.color = action.payload;
    },
    setThickness: (state, action) => {
      state.filters.thickness = action.payload;
    },
    setStandartListMaterials: (state, action) => {
      state.standartListMaterials = action.payload;
    },
    deleteStandartListMaterials: (state) => {
      state.standartListMaterials = [];
    },

    addMaterial: (state, action) => {
      state.material.push(action.payload);
    },

    deleteMaterialId: (state, action) => {
      let materials = [...state.material].filter(
        (i) => i.id !== action.payload
      );
      state.material = materials;
    },

    setCerrentMaterial: (state, action) => {
      const id = action.payload;
      state.currentMaterial = state.material.find((i) => i.id === id) || null;
    },
    addEnteringBalance: (state, action) => {
      const { id, quantity } = action.payload;

      let newMaterial: MaterialType[] = [];

      state.material.forEach((element) => {
        if (element.id === id) {
          newMaterial.push({ ...element, enteringBalance: quantity });
        } else {
          newMaterial.push({ ...element });
        }
      });

      state.material = newMaterial;
      state.currentMaterial = null;
    },
    deleteItemForEnteringBalance: (state, action) => {
      let newMaterial: MaterialType[] = [];

      state.material.forEach((element) => {
        if (element.id === action.payload) {
          newMaterial.push({ ...element, enteringBalance: null });
        } else {
          newMaterial.push({ ...element });
        }
      });
      state.material = newMaterial;
    },

    addWriteDown: (state, action) => {
      const { id, quantity } = action.payload;

      let newMaterial: MaterialType[] = [];

      state.material.forEach((element) => {
        if (element.id === id) {
          newMaterial.push({ ...element, writeDown: quantity });
        } else {
          newMaterial.push({ ...element });
        }
      });

      state.material = newMaterial;
      state.currentMaterial = null;
    },

    deleteItemForWriteDown: (state, action) => {
      let newMaterial: MaterialType[] = [];

      state.material.forEach((element) => {
        if (element.id === action.payload) {
          newMaterial.push({ ...element, writeDown: null });
        } else {
          newMaterial.push({ ...element });
        }
      });
      state.material = newMaterial;
    },

    addEntrance: (state, action) => {
      const { id, quantity, price } = action.payload;

      let newMaterial: MaterialType[] = [];

      state.material.forEach((element) => {
        if (element.id === id) {
          newMaterial.push({ ...element, entrance: quantity, price: price });
        } else {
          newMaterial.push({ ...element });
        }
      });

      state.material = newMaterial;
      state.currentMaterial = null;
    },
    deleteItemForEntrance: (state, action) => {
      let newMaterial: MaterialType[] = [];

      state.material.forEach((element) => {
        if (element.id === action.payload) {
          newMaterial.push({ ...element, entrance: null, price: null });
        } else {
          newMaterial.push({ ...element });
        }
      });
      state.material = newMaterial;
    },
    deleteGroupStandartListMaterial: (state, action) => {
      state.standartListMaterials = state.standartListMaterials.filter(
        (i) => i.manufacturer !== action.payload
      );
    },
  },
});

export const {
  setMaterials,
  setCoverage,
  setColor,
  setThickness,
  setStandartListMaterials,
  deleteStandartListMaterials,
  addMaterial,
  deleteMaterialId,
  setCerrentMaterial,
  addEnteringBalance,
  deleteItemForEnteringBalance,
  addWriteDown,
  deleteItemForWriteDown,
  addEntrance,
  deleteItemForEntrance,
  deleteGroupStandartListMaterial,
} = materialSlice.actions;

export default materialSlice.reducer;

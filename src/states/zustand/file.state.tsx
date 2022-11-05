import create from "zustand";
// types
import { Row, TouristData } from "../../helpers/dataTypes";

interface TotalTouristStore {
  data: TouristData;
  reInputData: (newData: {}) => void;
  initialize: () => void;
}

const useTotalTouristStore = create<TotalTouristStore>()((set) => ({
  data: {},
  reInputData: (newData: TouristData) => set((state) => ({ data: newData })),
  initialize: () =>
    set((state) => {
      return {};
    }),
}));

export { useTotalTouristStore };

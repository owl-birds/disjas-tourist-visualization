import create from "zustand";

// paths

interface FileStore {
  data: any[];
  reInput: (newData: any[]) => void;
}

export {};
// import create from "zustand";
// interface PopulationState {
//   population: number;
//   increase: (by: number) => void;
// }
// const usePopulationStore = create<PopulationState>()((set) => ({
//   population: 0,
//   increase: (by: number) =>
//     set((state) => ({ population: state.population + by })),
// }));
// export { usePopulationStore };

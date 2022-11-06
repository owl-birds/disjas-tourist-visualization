// types
import { TouristData } from "./dataTypes";

const findMax = (data: TouristData, colName: string): number => {
  let max: number = -Infinity;
  const countires: string[] = Object.keys(data);
  for (let country of countires) {
    for (let row of data[country]) {
      if (row[colName] > max) max = row[colName];
    }
  }
  return max;
};
const findMin = (data: TouristData, colName: string): number => {
  let min: number = Infinity;
  const countires: string[] = Object.keys(data);
  for (let country of countires) {
    for (let row of data[country]) {
      if (row[colName] < min) min = row[colName];
    }
  }
  return min;
};

export { findMax, findMin };

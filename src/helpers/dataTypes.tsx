interface Row {
  year: number;
  [totalTourist: string]: number;
}

interface TouristData {
  // [index: string]: Row[];
  [index: string]: any[];
}
export type { Row, TouristData };

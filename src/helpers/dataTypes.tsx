interface Row {
  year: number;
  totalTourist: number;
}

interface TouristData {
  [index: string]: Row[];
}
export type { Row, TouristData };

import { csvParse, autoType } from "d3";

// types
import { Row, TouristData } from "./dataTypes";

const cleaningData = (data: any[], countryCol: string): TouristData => {
  const finalData: TouristData = {};
  const years: number[] = [];
  for (let columnName of Object.keys(data[0])) {
    if (Number(columnName)) {
      years.push(Number(columnName));
      continue;
    }
  }
  // making the data
  for (let row of data) {
    const touristDataObjArr: Row[] = [];
    for (let year of years) {
      const tempObj: Row = { year: year, totalTourist: row[year] };
      touristDataObjArr.push(tempObj);
    }
    if (row[countryCol] === "JUMLAH") {
      finalData["TOTAL"] = touristDataObjArr;
      continue;
    }
    finalData[row[countryCol]] = touristDataObjArr;
  }
  return finalData;
};

const readCsvFile = async (
  path: string,
  countryColumnName: string
): Promise<TouristData> => {
  let countryCol: string = countryColumnName ? countryColumnName : "Kebangsaan";
  let tempRoughArray: any[] = [];
  await fetch(path)
    .then((response) => response.text())
    .then((responseText) => {
      tempRoughArray = csvParse(responseText, autoType);
    });
  let finalData: TouristData = cleaningData(tempRoughArray, countryCol);
  return finalData;
};

export { readCsvFile };

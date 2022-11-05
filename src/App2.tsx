import { useState } from "react";
import { csvParse, autoType } from "d3";
import { readCsvFile } from "./helpers/readCsv";
import { totalTouristCsvPath } from "./helpers/path";

function App() {
  const [text, setText] = useState<string>("");
  // extract year
  // make it into { name of the country :
  // { year: THE YEAR, total: Number }}
  const loadCsvText = async (): Promise<{
    [index: string]: { year: number; totalTourist: number }[];
  }> => {
    let temp: any[] = [];
    await fetch(totalTouristCsvPath)
      .then((response) => response.text())
      .then((responseText: string) => {
        setText(() => responseText);
        temp = csvParse(responseText, autoType);
      });
    const tempColumns: string[] = Object.keys(temp[0]);
    const years: number[] = [];
    let nationality: string = "";
    const nationalities: string[] = [];
    const finalData: {
      [index: string]: { year: number; totalTourist: number }[];
    } = {};
    for (let col of tempColumns) {
      if (Number(col)) {
        years.push(Number(col));
        continue;
      }
      nationality = col;
    }
    // extracting all the nationality
    for (let row of temp) {
      nationalities.push(row[nationality]);
      finalData[row[nationality]] = [];
    }
    for (let row of temp) {
      const tempObjArr: { year: number; totalTourist: number }[] = [];
      for (let year of years) {
        const tempObj: { year: number; totalTourist: number } = {
          year: year,
          totalTourist: row[year],
        };
        tempObjArr.push(tempObj);
      }

      finalData[row[nationality]] = tempObjArr;
    }
    console.log(temp);
    console.log(tempColumns);
    console.log(years);
    console.log(nationalities);
    console.log(finalData);
    console.log(nationality);
    let testFunctionReadCsv: { [index: string]: any[] } = {};
    await (async () => {
      testFunctionReadCsv = await readCsvFile(
        "./data/total-wisatwan-based-on-nationality.csv",
        "Kebangsaan"
      );
    })();
    console.log("SEPARET FUNC 222222");
    console.log(testFunctionReadCsv);
    return finalData;
  };

  return (
    <div className="App">
      <button onClick={loadCsvText}>load text csv</button>
      {text}
    </div>
  );
}

export default App;

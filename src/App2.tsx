import { useState } from "react";
import { csvParse, autoType } from "d3";

function App() {
  const [text, setText] = useState<string>("");
  // extract year
  // make it into { name of the country :
  // { year: THE YEAR, total: Number }}
  const loadCsvText = async (): Promise<void> => {
    let temp: any[] = [];
    await fetch("./data/total-wisatwan-based-on-nationality.csv")
      .then((response) => response.text())
      .then((responseText: string) => {
        setText(() => responseText);
        temp = csvParse(responseText, autoType);
      });
    const tempColumns: string[] = Object.keys(temp[0]);
    const years: number[] = [];
    let nationality: string = "";
    const nationalities: string[] = [];
    const finalData: { [index: string]: [] } = {};
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
    }
    console.log(temp);
    console.log(tempColumns);
    console.log(years);
    console.log(nationalities);
    console.log(nationality);
  };

  return (
    <div className="App">
      <button onClick={loadCsvText}>load text csv</button>
      {text}
    </div>
  );
}

export default App;

import { useState } from "react";
// types
import { TouristData } from "../../helpers/dataTypes";
// components
import { MultipleLine } from "../charts";
import { Slider } from "../general";
//store
import { useTotalTouristStore } from "../../states/zustand";
// funcs/methods
import { randomHexaColor } from "../../helpers/general-funcs";
// props types
interface Props {}

import "./style.scss";
const TouristVisualPage = (props: Props) => {
  const data: TouristData = useTotalTouristStore((state) => state.data);
  console.log(data);

  // color type based on region
  const colorsType: string[] = ["#FBF608", "#fff", "#01DEE6", "#FB475E"];

  // local states
  const maxTotalOne: number = 2000000;
  const [tempMaxVertical, setTempMaxVertical] = useState<number>(maxTotalOne);
  const [tempMinVertical, setTempMinVertical] = useState<number>(0);
  return (
    <section className="total-tourist-visual">
      <div className="visualization-container">
        <h3>
          Visualisasi Jumlah Kunjungan Wisatawan Mancanegara ke Indonesia
          Menurut Kebangsaan (in Million)
        </h3>
        <MultipleLine
          data={data}
          horizontalCol={"year"}
          verticalCol={"totalTourist"}
          lineHoverColor={randomHexaColor()}
          maxVerticalValue={tempMaxVertical}
          minVerticalValue={tempMinVertical}
          colorsType={colorsType}
        />
      </div>
      <div className="visualization-manipulation">
        <Slider
          componentDesc={"MAX TOTAL TOURIST"}
          maxValue={maxTotalOne}
          minValue={0}
          defaultValue={maxTotalOne}
          currValue={tempMaxVertical}
          setStateValue={setTempMaxVertical}
        />
        <Slider
          componentDesc={"MIN TOTAL TOURIST"}
          maxValue={maxTotalOne}
          minValue={0}
          defaultValue={0}
          currValue={tempMinVertical}
          setStateValue={setTempMinVertical}
        />
      </div>
    </section>
  );
};

export default TouristVisualPage;

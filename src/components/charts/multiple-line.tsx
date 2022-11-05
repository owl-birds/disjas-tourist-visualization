import { useEffect, useState } from "react";
// types
import { TouristData } from "../../helpers/dataTypes";

import "./multiple-line.scss";
interface Props {
  width?: number;
  height?: number;
  data: TouristData | {};
}

const MultipleLine = (props: Props) => {
  // data realted
  const data = props.data;
  // finding all the countries/ different kind of line
  const linesArr: string[] = Object.keys(data);
  console.log(linesArr);
  // svg configures
  const width = props.width ? props.width : 700;
  const height = props.height ? props.height : 600;

  // svg manipulation usng d3 and uaseEfect hook
  return (
    <div className="chart-box">
      <div className="chart-svg">
        <svg
          style={{ backgroundColor: "#fff" }}
          width={width}
          height={height}
        ></svg>
      </div>
    </div>
  );
};

export { MultipleLine };

import { useEffect, useState, useRef } from "react";
// types
import { TouristData } from "../../helpers/dataTypes";
// functions/methods
import { findMin, findMax } from "../../helpers/dataFuncs";
// d3
import {
  axisLeft,
  axisBottom,
  max,
  min,
  select,
  selectAll,
  Selection,
  scaleLinear,
  scaleBand,
  Axis,
  NumberValue,
  scaleTime,
  ScaleBand,
  ScaleLinear,
  ScaleTime,
  extent,
  line,
  curveBasis,
} from "d3";
// regions
import {
  asiaPacificCountries,
  americaCountries,
  europeCountries,
} from "../../helpers/regionalList";

import "./multiple-line.scss";
interface Props {
  data: TouristData | {};
  horizontalCol: string;
  verticalCol: string;

  // max and min
  maxVerticalValue?: number;
  minVerticalValue?: number;

  // svg/chart related
  width?: number;
  height?: number;
  innerWidth?: number;
  innerHeight?: number;
  lineWidth?: number;
  tickPadding?: number;
  lineHoverColor?: string;
  toolTipFontSize?: number;
  colorsType?: string[];
}

const MultipleLine = (props: Props) => {
  // ref
  const svgRef = useRef<SVGSVGElement | null>(null);
  // state
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  // data related
  const data: TouristData = props.data;
  // console.log(data);
  const horizontalCol: string = props.horizontalCol;
  const verticalCol: string = props.verticalCol;
  // finding all the countries/ different kind of line
  const linesArr: string[] = Object.keys(data);
  // console.log(linesArr);

  // svg configures
  const WIDTH: number = props.width ? props.width : 700;
  const HEIGHT: number = props.height ? props.height : 400;
  const innerWidth: number = props.innerWidth ? props.innerWidth : WIDTH - 50;
  const innerHeight: number = props.innerHeight
    ? props.innerHeight
    : HEIGHT - 50;

  // chart configuration
  const tickPadding: number = props.tickPadding ? props.tickPadding : 5;
  const lineWidth: number = props.lineWidth ? props.lineWidth : 1;
  const lineHoverColor: string = props.lineHoverColor
    ? props.lineHoverColor
    : "#4ED79B";
  const toolTipFontSize: number = props.toolTipFontSize
    ? props.toolTipFontSize
    : 5;
  const colorsType: string[] | null =
    props.colorsType !== undefined ? props.colorsType : null;
  console.log(colorsType);

  // max and min
  // vertical
  const MAX_VERTICAL_VALUE: number = props.maxVerticalValue
    ? props.maxVerticalValue
    : findMax(data, verticalCol);
  const MIN_VERTICAL_VALUE: number =
    props.minVerticalValue !== undefined
      ? props.minVerticalValue
      : findMin(data, verticalCol);
  // uuse state for interactivity

  // horizontal
  const MAX_HORIZONTAL_VALUE: number = findMax(data, horizontalCol);
  const MIN_HORIZONTAL_VALUE: number = findMin(data, horizontalCol);

  // CONFIGURING SCALE
  const horizontalScale: ScaleLinear<number, number, never> = scaleLinear()
    .domain([MIN_HORIZONTAL_VALUE, MAX_HORIZONTAL_VALUE])
    .range([0, innerWidth])
    .nice();
  const verticalScale: ScaleLinear<number, number, never> = scaleLinear()
    // .domain([0, MAX_VERTICAL_VALUE + MAX_VERTICAL_VALUE * 0.05])
    .domain([MIN_VERTICAL_VALUE, MAX_VERTICAL_VALUE])
    // .domain([0, 2000000])
    .range([innerHeight, 0])
    .nice();

  // CONFIGURING AXIS
  const horizontalAxis: Axis<NumberValue | Date> = axisBottom(horizontalScale)
    .tickPadding(tickPadding)
    // .tickSize(isTickSize ? -chartWrapperHeight : 0);
    .tickFormat((tick) => String(tick));
  const verticalAxis: Axis<NumberValue> = axisLeft(verticalScale)
    .tickPadding(tickPadding)
    // .tickSize(isTickSize ? -chartWrapperWidth : 0);
    .tickFormat((tick) => {
      const temp: number = Number(tick);
      return `${temp / 1000000}`;
    });

  // svg manipulation usng d3 and uaseEfect hook
  useEffect(() => {
    //
    if (!selection) {
      setSelection(() => select(svgRef.current));
    } else {
      selection.attr("width", WIDTH).attr("height", HEIGHT);
      // .style("background-color", "#fff");
      // creating tooltip
      const tooltip: Selection<HTMLDivElement, unknown, HTMLElement, any> =
        // select(`#scatter-plot-${scatterPlotId}`) // in the fuiture maybe will break something cause classname
        select("#svg-wrapper-div")
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("z-index", "10") //An element with greater stack order is always in front of an element with a lower stack order.
          .style("visibility", "hidden")
          .style("background", "#4d4d4d")
          .style("padding", "5px")
          .style("font-weight", "bold")
          .style("color", "#fff")
          .style("font-size", toolTipFontSize)
          .text("tooltip template"); // is this best practice?
      // innerbox
      const chartBoxG: Selection<SVGGElement, unknown, null, undefined> =
        selection
          .append("g")
          .attr("class", "chart-box")
          .attr(
            "transform",
            `translate(${(WIDTH - innerWidth) / 2}, ${
              (HEIGHT - innerHeight) / 2
            })`
          );
      // configuriong the axis
      const horizontalAxisG: Selection<SVGGElement, unknown, null, undefined> =
        chartBoxG
          .append("g")
          .attr("class", "horizontal-axis")
          .call(horizontalAxis)
          .attr("transform", `translate(0, ${innerHeight})`);
      const verticalAxisG: Selection<SVGGElement, unknown, null, undefined> =
        chartBoxG.append("g").attr("class", "vertical-axis").call(verticalAxis);
      // plot
      const plotWrapperG: Selection<SVGGElement, unknown, null, undefined> =
        chartBoxG.append("g").attr("class", "plot-wrapper");
      for (let i = 0; i < linesArr.length; i += 1) {
        // LINE GENERATOR
        const lineGenerator = line()
          .x((row) => horizontalScale(row[horizontalCol as unknown as number]))
          .y((row) => verticalScale(row[verticalCol as unknown as number]));
        // .curve(curveBasis);
        // drawing the line
        // const tempData: any[] = data[linesArr[i]];
        const pathElement = plotWrapperG
          .append("path")
          .attr("d", lineGenerator(data[linesArr[i]]));
        // beautiify
        pathElement
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-width", lineWidth)
          .on("mouseover", () => {
            pathElement
              .style("cursor", "pointer")
              .attr("stroke", lineHoverColor)
              .attr("stroke-width", 5);
            tooltip.style("visibility", "visible").text(`${linesArr[i]}`);
          })
          .on("mousemove", (element) => {
            return tooltip
              .style("top", `${element.pageY + 10}px`)
              .style("left", `${element.clientX + 10}px`);
          })
          .on("mouseout", () => {
            let color: string | null = null;
            if (colorsType) {
              if (asiaPacificCountries[linesArr[i]]) {
                color = colorsType[0];
              } else if (americaCountries[linesArr[i]]) {
                color = colorsType[1];
              } else if (europeCountries[linesArr[i]]) {
                color = colorsType[2];
              } else {
                color = colorsType[3];
              }
            }
            tooltip.style("visibility", "hidden");
            pathElement
              .attr("stroke", color ? color : "#fff")
              .attr("stroke-width", lineWidth);
          });
        if (colorsType) {
          if (asiaPacificCountries[linesArr[i]]) {
            pathElement.attr("stroke", colorsType[0]);
          } else if (americaCountries[linesArr[i]]) {
            pathElement.attr("stroke", colorsType[1]);
          } else if (europeCountries[linesArr[i]]) {
            pathElement.attr("stroke", colorsType[2]);
          } else {
            pathElement.attr("stroke", colorsType[3]);
          }
        }
      }
    }
  }, [selection]);
  // below for interactivity
  useEffect(() => {
    if (selection) {
      // clean it first
      selection.selectAll("*").remove();
      select(".tooltip").remove();
      const tooltip: Selection<HTMLDivElement, unknown, HTMLElement, any> =
        // select(`#scatter-plot-${scatterPlotId}`) // in the fuiture maybe will break something cause classname
        select("#svg-wrapper-div")
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("z-index", "10") //An element with greater stack order is always in front of an element with a lower stack order.
          .style("visibility", "hidden")
          .style("background", "#4d4d4d")
          .style("padding", "5px")
          .style("font-weight", "bold")
          .style("color", "#fff")
          .style("font-size", toolTipFontSize)
          .text("tooltip template"); // is this best practice?
      // update the new one
      selection.attr("width", WIDTH).attr("height", HEIGHT);
      // .style("background-color", "#fff");
      // innerbox
      const chartBoxG: Selection<SVGGElement, unknown, null, undefined> =
        selection
          .append("g")
          .attr("class", "chart-box")
          .attr(
            "transform",
            `translate(${(WIDTH - innerWidth) / 2}, ${
              (HEIGHT - innerHeight) / 2
            })`
          );
      // configuriong the axis
      const horizontalAxisG: Selection<SVGGElement, unknown, null, undefined> =
        chartBoxG
          .append("g")
          .attr("class", "horizontal-axis")
          .call(horizontalAxis)
          .attr("transform", `translate(0, ${innerHeight})`);
      const verticalAxisG: Selection<SVGGElement, unknown, null, undefined> =
        chartBoxG.append("g").attr("class", "vertical-axis").call(verticalAxis);
      // plot
      const plotWrapperG: Selection<SVGGElement, unknown, null, undefined> =
        chartBoxG.append("g").attr("class", "plot-wrapper");
      for (let i = 0; i < linesArr.length; i += 1) {
        // LINE GENERATOR
        const lineGenerator = line()
          .x((row) => horizontalScale(row[horizontalCol as unknown as number]))
          .y((row) => verticalScale(row[verticalCol as unknown as number]));
        // .curve(curveBasis);
        // drawing the line
        // const tempData: any[] = data[linesArr[i]];
        const pathElement = plotWrapperG
          .append("path")
          .attr("d", lineGenerator(data[linesArr[i]]));
        // beautiify
        pathElement
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-width", lineWidth)
          .on("mouseover", () => {
            pathElement
              .style("cursor", "pointer")
              .attr("stroke", lineHoverColor)
              .attr("stroke-width", 5);
            tooltip.style("visibility", "visible").text(`${linesArr[i]}`);
          })
          .on("mousemove", (element) => {
            return tooltip
              .style("top", `${element.pageY + 10}px`)
              .style("left", `${element.clientX + 10}px`);
          })
          .on("mouseout", () => {
            let color: string | null = null;
            if (colorsType) {
              if (asiaPacificCountries[linesArr[i]]) {
                color = colorsType[0];
              } else if (americaCountries[linesArr[i]]) {
                color = colorsType[1];
              } else if (europeCountries[linesArr[i]]) {
                color = colorsType[2];
              } else {
                color = colorsType[3];
              }
            }
            tooltip.style("visibility", "hidden");
            pathElement
              .attr("stroke", color ? color : "#fff")
              .attr("stroke-width", lineWidth);
          });
        if (colorsType) {
          if (asiaPacificCountries[linesArr[i]]) {
            pathElement.attr("stroke", colorsType[0]);
          } else if (americaCountries[linesArr[i]]) {
            pathElement.attr("stroke", colorsType[1]);
          } else if (europeCountries[linesArr[i]]) {
            pathElement.attr("stroke", colorsType[2]);
          } else {
            pathElement.attr("stroke", colorsType[3]);
          }
        }
      }
    }
  }, [MAX_VERTICAL_VALUE, MIN_VERTICAL_VALUE]);
  return (
    <div className="chart-box">
      <div className="chart-svg-wrapper">
        <div className="svg-wrapper" id={"svg-wrapper-div"}>
          <svg ref={svgRef}></svg>
          <span>{horizontalCol}</span>
        </div>
        <div className="chart-desc-color">
          {colorsType?.map((_, idx) => (
            <div
              style={{
                color:
                  idx === 0
                    ? colorsType[0]
                    : idx === 1
                    ? colorsType[1]
                    : idx === 2
                    ? colorsType[2]
                    : colorsType[3],
              }}
            >
              {idx === 0 ? "Asia Pacific Countries" : null}
              {idx === 1 ? "America Countries" : null}
              {idx === 2 ? "Europe Countries" : null}
              {idx === 3 ? "etc (Middle east or Africa" : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { MultipleLine };

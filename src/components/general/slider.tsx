import { useState, useRef, FormEvent, Dispatch, SetStateAction } from "react";
interface Props {
  componentDesc?: string;
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  setStateValue?: Dispatch<SetStateAction<number>>;
}

import "./slider.scss";
const Slider = (props: Props) => {
  // references
  //
  const componentDesc: string = props.componentDesc ? props.componentDesc : "";
  const minValue: number = props.minValue ? props.minValue : 0;
  const maxValue: number = props.maxValue ? props.maxValue : 100;
  const defaultValue: number = props.defaultValue ? props.defaultValue : 0;
  const setStateValue: Dispatch<SetStateAction<number>> | null =
    props.setStateValue ? props.setStateValue : null;

  // event function
  const onInputHandler = (event: FormEvent<HTMLInputElement>) => {
    if (setStateValue) {
      setStateValue(() => Number((event.target as HTMLInputElement).value));
    }
    // console.log((event.target as HTMLInputElement).value);
  };
  return (
    <div className="slider">
      <h4>{componentDesc}</h4>
      <div>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          defaultValue={defaultValue}
          className="slider-input"
          onInput={onInputHandler}
        />
      </div>
    </div>
  );
};

export { Slider };

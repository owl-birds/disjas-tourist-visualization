import { Dispatch, SetStateAction } from "react";
// data types
import { TouristData } from "../../helpers/dataTypes";
// paths
import { totalTouristCsvPath } from "../../helpers/path";
// helper functins
import { readCsvFile } from "../../helpers/readCsv";
// store : zustand
import { useTotalTouristStore } from "../../states/zustand";
// styles
import "./style.scss";

type PropsInitiate = {
  setIsInitiate: Dispatch<SetStateAction<boolean>>;
};

const InitiateData = (props: PropsInitiate) => {
  // setting data in the tourist store
  const reInputData: (newData: TouristData) => void = useTotalTouristStore(
    (state) => state.reInputData
  );
  const { setIsInitiate } = props;
  const initiateDataOnClick = async () => {
    let tempData: TouristData = {};
    await (async () => {
      tempData = await readCsvFile(totalTouristCsvPath, "Kebangsaan");
    })();
    reInputData(tempData);
    setIsInitiate(() => true);
  };
  return (
    <section className="initiate-data">
      <button onClick={initiateDataOnClick}>Initiate Data</button>
    </section>
  );
};

export { InitiateData };

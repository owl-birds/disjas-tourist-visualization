// types
import { TouristData } from "../../helpers/dataTypes";
// components
import { MultipleLine } from "../charts";
//store
import { useTotalTouristStore } from "../../states/zustand";

// props types
interface Props {}

import "./style.scss";
const TouristVisualPage = (props: Props) => {
  const data: TouristData = useTotalTouristStore((state) => state.data);
  return (
    <section className="total-tourist-visual">
      <h3>Total Tourist Visualization</h3>
      <MultipleLine data={data} />
    </section>
  );
};

export default TouristVisualPage;

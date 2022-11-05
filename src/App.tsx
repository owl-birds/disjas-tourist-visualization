import { useState } from "react";
// components
import TouristVisualPage from "./components/totalTourist";
import { InitiateData } from "./components/general";

const App = () => {
  const [isInitiate, setIsInitiate] = useState<boolean>(false);
  // console.log(touristData);
  return (
    <main className="app">
      {isInitiate ? (
        <TouristVisualPage />
      ) : (
        <InitiateData setIsInitiate={setIsInitiate} />
      )}
    </main>
  );
};

export default App;

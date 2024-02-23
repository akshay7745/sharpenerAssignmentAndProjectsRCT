import { useState } from "react";
import addMedicineContext from "./addMedicineContext";

const AddMedicineContextProvider = (props) => {
  const [medicineData, setMedicineData] = useState([]);
  const addMedicineHandler = (data) => {
    setMedicineData((prevData) => {
      return [...prevData, data];
    });
  };
  return (
    <addMedicineContext.Provider value={{ medicineData, addMedicineHandler }}>
      {props.children};
    </addMedicineContext.Provider>
  );
};
export default AddMedicineContextProvider;

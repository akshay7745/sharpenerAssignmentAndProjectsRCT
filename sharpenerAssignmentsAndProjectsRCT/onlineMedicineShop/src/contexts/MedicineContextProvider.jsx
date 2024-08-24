import { createContext, useEffect, useState } from "react";

export const medicineContext = createContext();

const MedicineContextProvider = (props) => {
  const [medicineData, setMedicineData] = useState([]);
  const restoreMedicineData = (data) => {
    setMedicineData(data);
  };
  const getMedicineData = async () => {
    try {
      const res = await fetch(
        "https://crudcrud.com/api/98ff4bdeadcc46b980659074e5164fe4/medicines"
      );
      if (res.ok) {
        const medicines = await res.json();
        restoreMedicineData(medicines);
      }
    } catch (error) {
      console.log(
        "Something went wrong while getting medicine data after app launching"
      );
    }
  };
  useEffect(() => {
    getMedicineData();
  }, []);

  const addAMedicine = (data) => {
    setMedicineData((prevState) => {
      return [...prevState, data];
    });
  };
  return (
    <medicineContext.Provider
      value={{ addAMedicine, restoreMedicineData, medicineData }}
    >
      {props.children}
    </medicineContext.Provider>
  );
};

export default MedicineContextProvider;

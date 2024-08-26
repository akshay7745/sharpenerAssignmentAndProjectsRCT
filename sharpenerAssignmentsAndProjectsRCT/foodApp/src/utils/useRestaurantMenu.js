import { useEffect, useState } from "react";
import { RES_MENU_URL } from "./contants";

const useRestaurantMenu = (resId) => {
  const [resData, setResData] = useState(null);
  useEffect(() => {
    fetchResInfo();
  }, []);

  const fetchResInfo = async () => {
    const res = await fetch(`${RES_MENU_URL}${resId}`);
    const resInfo = await res.json();
    setResData(resInfo?.data?.cards);
  };

  return resData;
};

export default useRestaurantMenu;

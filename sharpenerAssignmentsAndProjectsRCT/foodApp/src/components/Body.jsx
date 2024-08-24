import RestaurantCard from "./RestaurantCard";
import restaurants from "../utils/mockData";
import { useState } from "react";
const Body = () => {
  const [resData, setResData] = useState(restaurants);
  return (
    <div className="body">
      <div className="filter">
        <button
          onClick={() => {
            const filteredResList = resData.filter((res) => {
              return res.info.avgRating > 4;
            });
            setResData(filteredResList);
          }}
        >
          Top Rated Restaurants
        </button>
        <button onClick={() => setResData(restaurants)}>All restaurants</button>
      </div>
      <div className="restaurant-container">
        {resData?.map((restaurant) => (
          <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;

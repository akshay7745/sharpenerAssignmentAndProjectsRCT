import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimer";
import { Link } from "react-router-dom";
// import restaurants from "../utils/mockData";
const Body = () => {
  const [resData, setResData] = useState([]);
  const [allRes, setAllRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    getRestaurants();
  }, []);
  const getRestaurants = async () => {
    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const data = await res.json();

    const restaurantsData =
      data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setResData(restaurantsData);
    setAllRes(restaurantsData);
  };
  if (allRes.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <button
          onClick={() => {
            const filteredResList = allRes.filter((res) => {
              return res.info.avgRating > 4;
            });
            setResData(filteredResList);
          }}
        >
          Top Rated Restaurants
        </button>
        <button onClick={() => setResData([...allRes])}>All restaurants</button>
        <div>
          <input
            value={searchText}
            type="text"
            placeholder="Search restaurants"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={() => {
              const filteredRestaurants = allRes.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setResData(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="restaurant-container">
        {resData.length ? (
          resData?.map((restaurant) => (
            <Link
              key={restaurant?.info?.id}
              to={`/restaurant/${restaurant?.info?.id}`}
            >
              {" "}
              <RestaurantCard resData={restaurant} />
            </Link>
          ))
        ) : (
          <h1>No restaurants found...</h1>
        )}
      </div>
    </div>
  );
};

export default Body;

import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resData = useRestaurantMenu(resId);

  if (!resData) {
    return <h4>Loading data ....</h4>;
  }
  const { name, costForTwoMessage, areaName, cuisines, avgRating, sla } =
    resData[2].card.card.info;

  const resHead = (
    <div>
      <h3>{name}</h3>
      <h4>
        <span>{avgRating}stars</span> <span>{costForTwoMessage}</span>
      </h4>
      <h4>{cuisines.join(", ")}</h4>
      <h5>Outlet {areaName}</h5>
      <h6>{sla.slaString}</h6>
    </div>
  );
  let resMenuList = resData[4].groupedCard.cardGroupMap.REGULAR.cards;
  resMenuList = resMenuList.filter((res, ind) => ind > 1);

  console.log(resMenuList);
  return <div>{resHead}</div>;
};

export default RestaurantMenu;

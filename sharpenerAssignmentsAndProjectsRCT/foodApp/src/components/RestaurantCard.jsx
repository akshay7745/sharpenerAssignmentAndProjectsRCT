import { CDN_URL } from "../utils/contants";

const RestaurantCard = (props) => {
    const { name, cloudinaryImageId, costForTwo, cuisines, avgRating, sla } =
      props?.resData?.info;
    const { slaString } = sla;
    return (
      <div className="restaurant-card">
        <img
          className="restaurant-logo"
          src={`${CDN_URL}${cloudinaryImageId}`}
          alt={name}
        />
        <h2>{name}</h2>
        <h3>{cuisines.join(", ")}</h3>
        <h4>{costForTwo}</h4>
        <h4>{avgRating} stars</h4>
        <h5>Delivery in {slaString}</h5>
      </div>
    );
  };

  export default RestaurantCard;
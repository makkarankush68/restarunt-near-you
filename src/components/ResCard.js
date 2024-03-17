import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
const ResCard = (props) => {
  const {
    name,
    cuisines,
    costForTwo,
    avgRatingString,
    sla,
    cloudinaryImageId,
    id,
  } = props?.resData?.info;
  let s = cuisines.join(", ");
  s = s.length > 34 ? s.substring(0, 31) + ".." : s;
  return (
      <Link to={"res/" + id}>
        <div className="res-card">
          <img
            className="res-logo"
            src={`${CDN_URL}${cloudinaryImageId}`}
          ></img>
          <h3 className="resCard-name">{name}</h3>
          <h4 className="cousine-text">{s}</h4>
          <h4 className="resCard-stars">
            {avgRatingString} <span className="wid-star">⭐⭐⭐⭐⭐</span>
          </h4>
          <h4 className="resCard-cost-time">
            {costForTwo} • {sla.slaString}
          </h4>
        </div>
      </Link>
  );
};

/// Higher Order Component
//  I/P -> RestaruntCard O/P -> RestrauntCardPromoted
export const withExtraLabel = (ResCard) => {
  return (props) => {
    return (
      <div className="res-top-div">
        <h3 className="res-top-label">{props.desc}</h3>
        <ResCard {...props} />
      </div>
    );
  };
};
export default ResCard;

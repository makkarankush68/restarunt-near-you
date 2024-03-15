import ShimmerUi from "./ShimmerUi";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import useResMenu from "../utils/useResMenu";
import AccordContainer from "./AccordContainer";
import React, { useState } from "react";

function resMenu() {
  const { resId } = useParams();
  const resInfo = useResMenu(resId);
  // control accordian of each child
  const [showIndex, setShowIndex] = useState(null);
  // const handleHideAcordBody = () => {
  //   console.log("clicked");
  //   // setShowIndex();
  // };
  if (resInfo === null) return <ShimmerUi n={1} />;

  const {
    name,
    locality,
    city,
    costForTwoMessage,
    sla,
    avgRating,
    cloudinaryImageId,
    nearestOutletNudge,
  } = resInfo?.cards[0]?.card?.card?.info;
  function delTime() {
    if (sla.slaString) return sla.slaString;
    else if (
      nearestOutletNudge?.nearestOutletInfo?.siblingOutlet?.sla?.slaString !=
      undefined
    )
      return nearestOutletNudge.nearestOutletInfo?.siblingOutlet?.sla
        ?.slaString;
    else return "N/A";
  }
  // categories
  const allData = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR.cards;
  const categories = allData.filter((c) => {
    return (
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  });
  return (
    <div className="menu-container">
      <div className="res-menu-info">
        <div className="res-menu-text">
          <h1>
            {name} <span>{`(${avgRating} stars)`}</span>
          </h1>
          <h2>
            {locality} , {city}
          </h2>
          <h3>
            {costForTwoMessage} <span>&#8226;</span> {delTime()}
          </h3>
        </div>
        <img className="res-menu-img" src={CDN_URL + cloudinaryImageId} />
      </div>
      <div className="allAccords">
        {categories.map((c, index) => {
          return (
            <AccordContainer
              key={c?.card?.card.title}
              index={index}
              c={c}
              showItems={index == showIndex ? true : false}
              setShowIndex={(i) => setShowIndex(i)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default resMenu;

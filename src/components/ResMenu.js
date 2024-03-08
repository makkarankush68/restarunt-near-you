import ShimmerUi from "./ShimmerUi";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import useResMenu from "../utils/useResMenu";

function resMenu() {
  const { resId } = useParams();

  const resInfo = useResMenu(resId);

  if (resInfo === null || resInfo == undefined) return <ShimmerUi n={1} />;

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
  // changing data
  const itemList = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR
    ?.cards[1].card.card.itemCards
    ? resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].card.card
        .itemCards
    : resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2].card.card
        .itemCards;
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
      <div className="res-dishes-container">
        <span>Recommended :</span>
        <ItemList itemList={itemList} />
      </div>
    </div>
  );
}

function ItemList(props) {
  const itemList = props.itemList;
  // if item list empty due to change in json
  if (itemList === undefined)
    return <h1>Undefined data returned from api try another restaurant</h1>;
  else {
    return itemList.map((item) => <ItemCard key={item?.card?.info?.id} info={item} />);
  }
}

function ItemCard(props) {
  const { name, description, imageId, price, defaultPrice, id } =
    props?.info?.card?.info;
  return (
    <>
      <div className="menu-dish">
        <div className="dish-info">
          <h2>{name}</h2>
          <h2>Rs. {price ? price / 100 : defaultPrice / 100}</h2>
          <h3>{description}</h3>
        </div>
        {imageId ? <img src={CDN_URL + imageId} height={"100px"} /> : <></>}
      </div>
    </>
  );
}
export default resMenu;
import ResCard from "./ResCard";
import { useEffect, useState } from "react";
import ShimmerUi from "./ShimmerUi";
import useOnlineStatus from "../utils/useOnlineStatus";
import useLocation from "../utils/useLocation";
import { API_KEY_CORS } from "../utils/constants";

const Body = () => {
  const [MainList, setMainList] = useState([]);
  const [listOfRes, setLisOfRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();
  /// changes below
  const { coords, setPreciseLocate } = useLocation(false);
  const { lat, long } = coords;
  useEffect(() => {
    fetchdata(); // and update reslist state variable
  }, [lat]);
  if (onlineStatus == false)
    return <h1 style={{ textAlign: "center" }}>No Internet Connection</h1>;
  async function fetchdata() {
    let response;
    try {
      // throw new Error('yo');
      response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&page_type=DESKTOP_WEB_LISTING`
      );
    } catch (err) {
      response = await fetch(
        `https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&page_type=DESKTOP_WEB_LISTING`,
        {
          headers: {
            "x-cors-api-key": API_KEY_CORS,
          },
        }
      );
    }
    let data = await response.json();
    let restaurants = data?.data?.cards[1]?.card?.card?.gridElements
      ?.infoWithStyle?.restaurants
      ? data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      : data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
    setMainList(restaurants);
    setLisOfRes(restaurants);
  }
  function FilterandUpdate() {
    const filterRes = MainList.filter((res) => {
      return res.info.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setLisOfRes(filterRes);
  }
  console.log("rendering body" + lat + " " + long);
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  return (
    <div className="body">
      {isMobile ? (
        <h5 style={{ textAlign: "center" }}>Please Switch to Desktop View</h5>
      ) : (
        <></>
      )}
      <div className="filters">
        <div className="search">
          <input
            className="search-box"
            type="text"
            value={searchText}
            placeholder="Whats on your mind!"
            onChange={(e) => {
              setSearchText(e.target.value);
              if (e.target.value == "" || e.target.value == " ") {
                setLisOfRes(MainList);
              } else FilterandUpdate();
            }}
          />
          <button
            className="filter-btn"
            onClick={() => {
              FilterandUpdate();
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            setLisOfRes(MainList.filter((res) => res.info.avgRating >= 4.4));
          }}
        >
          {"Rated > 4.4"}
        </button>
        <button
          className="filter-btn reset-btn"
          onClick={() => {
            setLisOfRes(MainList);
          }}
        >
          Reset
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            setPreciseLocate(true);
            console.log("precise location on");
          }}
        >
          Use Real Location
        </button>
      </div>
      {resOrShim()}
    </div>
  );
  function resOrShim() {
    if (listOfRes == undefined || listOfRes.length === 0)
      return <ShimmerUi n={15} />;
    else
      return (
        <div className="res-container">
          {listOfRes.map((res) => {
            return <ResCard key={res?.info?.id} resData={res} />;
          })}
        </div>
      );
  }
};

export default Body;

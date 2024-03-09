import ResCard from "./ResCard";
import { useEffect, useState } from "react";
import ShimmerUi from "./ShimmerUi";
import useOnlineStatus from "../utils/useOnlineStatus";
import useLocation from "../utils/useLocation";

const Body = () => {
  const [MainList, setMainList] = useState([]);
  const [listOfRes, setLisOfRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [preciseLocate, setPreciseLocate] = useState(false);
  const onlineStatus = useOnlineStatus();
  /// changes below
  const { lat, long } = useLocation(preciseLocate);
  useEffect(() => {
    fetchdata(); // and update reslist state variable
  }, [lat]);
  if (onlineStatus == false) return <h1 style={{textAlign:"center"}}>No Internet Connection</h1>;
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
            "x-cors-api-key": "temp_9a16c0228364623f931bce8f803ee55d",
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
  console.log("rendering body");
  return (
    <div className="body">
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
          className="filter-btn"
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
            console.log("precise location " + preciseLocate);
          }}
        >
          UseRealLocation
        </button>
      </div>
      {resOrShim()}
    </div>
  );
  function resOrShim() {
    if (listOfRes == undefined || listOfRes.length === 0)
      return (
        <>
          {listOfRes == undefined ? (
            <h1 style={{ textAlign: "center" }}>Trying to Fetch location</h1>
          ) : (
            <></>
          )}
          <ShimmerUi n={15} />
        </>
      );
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

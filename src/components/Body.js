import ResCard, { withExtraLabel } from "./ResCard";
import { useEffect, useState } from "react";
import ShimmerUi from "./ShimmerUi";
import useOnlineStatus from "../utils/useOnlineStatus";
import useLocation from "../utils/useLocation";
import { API_KEY_CORS, API_KEY_CORS_2 } from "../utils/constants";

const Body = () => {
  const [MainList, setMainList] = useState([]);
  const [listOfRes, setLisOfRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();
  /// Location changes below
  const { coords, setPreciseLocate } = useLocation(false);
  const { lat, long } = coords;
  const [cityName, setCityName] = useState(undefined);

  useEffect(() => {
    fetchdata(); // and update reslist state variable
  }, [lat]);

  if (onlineStatus == false)
    return <h1 style={{ textAlign: "center" }}>No Internet Connection</h1>;

  async function fetchdata() {
    setCityName("");
    setLisOfRes(undefined);
    let response;
    try {
      // throw new Error('yo');
      response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&page_type=DESKTOP_WEB_LISTING`
      );
    } catch (err) {
      try {
        response = await fetch(
          `https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&page_type=DESKTOP_WEB_LISTING`,
          {
            headers: {
              "x-cors-api-key": API_KEY_CORS,
            },
          }
        );
      } catch (err) {
        response = await fetch(
          `https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&page_type=DESKTOP_WEB_LISTING`,
          {
            headers: {
              "x-cors-api-key": API_KEY_CORS_2,
            },
          }
        );
      }
    }
    let data = await response.json();
    if (!data) return;
    /// city name
    let metaData = data?.data?.cards.filter((res) => {
      return (
        res?.card?.card["@type"] ==
        "type.googleapis.com/swiggy.seo.widgets.v1.MetaContext"
      );
    });
    /// res list
    let restaurantsObjs = data?.data?.cards.filter((res) => {
      return (
        res?.card?.card?.gridElements?.infoWithStyle?.restaurants != undefined
      );
    });
    let restaurants = [];
    restaurantsObjs.map((res) => {
      let contestant =
        res?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (contestant.length > restaurants.length) restaurants = contestant;
    });
    /// set items
    setCityName(metaData[0]?.card?.card?.citySlug);
    setMainList(restaurants);
    setLisOfRes(restaurants);
  }

  function FilterandUpdate() {
    const filterRes = MainList.filter((res) => {
      return res.info.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setLisOfRes(filterRes);
  }
  /// extra label
  const WithLabelComponent = withExtraLabel(ResCard);
  return (
    <div className="body">
      <div className="location-bar">
        <div className="locaiton-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            id="location"
          >
            <g fill="#fofofo">
              <path d="m32 55.7-.9-1.1c-.6-.8-15.9-18.7-15.9-29.4 0-9.3 7.6-16.8 16.8-16.8S48.8 16 48.8 25.2c0 10.7-15.3 28.7-15.9 29.4l-.9 1.1zm0-45c-8 0-14.4 6.5-14.4 14.4 0 8.4 11.1 22.7 14.4 26.8 3.3-4.1 14.4-18.3 14.4-26.8 0-7.9-6.4-14.4-14.4-14.4z"></path>
              <path d="M32 31.6c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.9 6.4-6.4 6.4zm0-10.4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"></path>
            </g>
          </svg>
          <h4>{cityName}</h4>
        </div>
        {localStorage.getItem("user-coords-z1a") ? (
          ""
        ) : (
          <button
            className="location-btn"
            onClick={() => {
              setPreciseLocate(true);
              console.log("precise location on");
            }}
          >
            {"Update Location"}
          </button>
        )}
      </div>
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
            if (res?.info?.badgesV2?.entityBadges?.imageBased?.badgeObject) {
              const desc =
                res?.info?.badgesV2?.entityBadges?.imageBased?.badgeObject[0]
                  ?.attributes.description;
              return (
                <WithLabelComponent
                  key={res?.info?.id}
                  resData={res}
                  desc={desc}
                />
              );
            } else {
              return <ResCard key={res?.info?.id} resData={res} />;
            }
          })}
        </div>
      );
  }
};

export default Body;

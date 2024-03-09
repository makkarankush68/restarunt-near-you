import { useState, useEffect } from "react";
const useLocation = (props) => {
  console.log(props);
  const [coords, setCoords] = useState({ lat: 0, long: 0 });
  useEffect(() => {
    if (!props) fetchFromIp();
    else getLocation();
  }, [props]);
  async function fetchFromIp() {
    let response = await fetch("http://ip-api.com/json/");
    let data = await response.json();
    const UserCoords = {
      lat: data.lat,
      long: data.lon,
    };
    setCoords(UserCoords);
  }
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          const lat = res.coords.latitude.toFixed(4);
          const long = res.coords.longitude.toFixed(4);
          const UserCoords = {
            lat: lat,
            long: long,
          };
          setCoords(UserCoords);

          // sessionStorage.setItem(
          //   "user-coords",
          //   JSON.stringify({
          //     lat: lat,
          //     long: long,
          //   })
          // );
        },
        (err) => alert(err.message)
      );
    } else alert("no location");
  };
  console.log(coords.lat + " " + coords.long + " returned");
  return coords;
};
export default useLocation;

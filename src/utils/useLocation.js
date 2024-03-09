import { useState, useEffect } from "react";
const useLocation = (props) => {
  console.log(props);
  const [coords, setCoords] = useState({ lat: 0, long: 0 });
  useEffect(() => {
    if (localStorage.getItem("user-coords-z1a")) {
      const data = JSON.parse(localStorage.getItem("user-coords-z1a"));
      setCoords({
        lat: data.lat,
        long: data.long,
      });
    } else if (!props)
      setCoords({
        lat: 28.704,
        long: 77.10249019,
      });
    else getLocation();
  }, [props]);
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

          localStorage.setItem(
            "user-coords-z1a",
            JSON.stringify({
              lat: lat,
              long: long,
            })
          );
        },
        (err) => alert(err.message)
      );
    } else alert("no location");
  };
  console.log(coords.lat + " " + coords.long + " returned");
  return coords;
};
export default useLocation;

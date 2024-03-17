import { useState, useEffect } from "react";

const useLocation = (props) => {
  const [preciseLocate, setPreciseLocate] = useState(props);
  const [coords, setCoords] = useState({ lat: 0, long: 0 });
  useEffect(() => {
    if (localStorage.getItem("user-coords-z1a")) {
      const data = JSON.parse(localStorage.getItem("user-coords-z1a"));
      setCoords({
        lat: data.lat,
        long: data.long,
      });
    } else if (!preciseLocate)
      setCoords({
        lat: 28.704,
        long: 77.1024,
      });
    else getLocation();
  }, [preciseLocate]);

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
        (err) => alert(err.message + "\n \nTurn on location from settings ⬆️ \n \nRefresh Page and Try again ✅")
      );
    } else alert("No location support");
  };
  // console.log(coords.lat + " " + coords.long + " returned");
  return {
    coords,
    setPreciseLocate: (i) => {
      setPreciseLocate(i);
    },
  };
};

export default useLocation;

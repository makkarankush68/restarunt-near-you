import { useState, useEffect } from "react";
const useLocation = () => {
  const [coords, setCoords] = useState({ lat: 0, long: 0 });
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          const lat = res.coords.latitude.toFixed(4);
          const long = res.coords.longitude.toFixed(4);
          // alert("navigator use effect"+ lat);
          const UserCoords = {
            lat: lat,
            long: long,
          };

          sessionStorage.setItem(
            "user-coords",
            JSON.stringify({
              lat: lat,
              long: long,
            })
          );
          setCoords(UserCoords);
        },
        (err) => alert(err.message)
      );
    } else alert("no location");
  };
  console.log(coords.lat + " " + coords.long + " returned");
  return coords;
};
export default useLocation;

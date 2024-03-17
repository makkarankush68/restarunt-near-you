import { useEffect, useState } from "react";
import { API_KEY_CORS, MENU_URL, API_KEY_CORS_2 } from "./constants";

const useResMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let response;
    try {
      response = await fetch(MENU_URL + resId);
    } catch (err) {
      try {
        response = await fetch(`https://proxy.cors.sh/` + MENU_URL + resId, {
          headers: {
            "x-cors-api-key": API_KEY_CORS,
          },
        });
      } catch (err) {
        response = await fetch(`https://proxy.cors.sh/` + MENU_URL + resId, {
          headers: {
            "x-cors-api-key": API_KEY_CORS_2,
          },
        });
      }
    }
    let jsonData = await response.json();
    setResInfo(jsonData.data);
  };
  return resInfo;
};

export default useResMenu;

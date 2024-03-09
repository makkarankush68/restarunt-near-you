import { useEffect, useState } from "react";
import { API_KEY_CORS, MENU_URL } from "./constants";

const useResMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let response;
    try {
      throw new Error("yo");
      response = await fetch(MENU_URL + resId);
    } catch (err) {
      // alert(err.message);
      response = await fetch(`https://proxy.cors.sh/` + MENU_URL + resId, {
        headers: {
          "x-cors-api-key": API_KEY_CORS,
        },
      });
    }
    let jsonData = await response.json();
    setResInfo(jsonData.data);
  };
  return resInfo;
};

export default useResMenu;

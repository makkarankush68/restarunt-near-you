import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);
  // check if
  //   console.log("before useeffect");
  useEffect(() => {
    // console.log("setting event listners");
    window.addEventListener("offline", () => {
      //   console.log("you are offline");
      setOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      //   console.log("you are online");
      setOnlineStatus(true);
    });
  }, []);
  //   console.log("returned status " + onlineStatus);
  return onlineStatus;
};

export default useOnlineStatus;

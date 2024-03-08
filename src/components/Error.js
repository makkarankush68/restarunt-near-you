import { useRouteError } from "react-router-dom";

function Error() {
  const err = useRouteError();
  return (
    <div>
      <h1>Error</h1>
      <h3>Not a valid Route</h3>
      <h3>
        {err.status} : {err.statusText}
      </h3>
    </div>
  );
}

export default Error;

import { useRouteError } from "react-router-dom";

function Error() {
  const err = useRouteError();
  return (
    <div style={{minHeight:"100vh"}}>
      <div style={{display:"flex",flexDirection:"column",margin:"auto",width:"fit-content",paddingTop:"10%"}}>
      <h1>Error</h1>
      <h3>Not a valid Route</h3>
      <h3>
        {err.status} : {err.statusText}
      </h3>
      </div>
    </div>
  );
}

export default Error;

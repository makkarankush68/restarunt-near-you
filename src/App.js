import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import ResMenu from "./components/ResMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ShimmerUi from "./components/ShimmerUi";

// import Grocery from "./components/Grocery";
// instaed use dymanic bundling lazy loading

const Grocery = lazy(() => {
  return import("./components/Grocery");
});

// whole app structure
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

/// Routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/res/:resId",
        element: <ResMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<ShimmerUi n={1}/>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

// getting the root
const root = ReactDOM.createRoot(document.querySelector("#root"));
// rendering the app
root.render(<RouterProvider router={appRouter} />);

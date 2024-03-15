import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ShimmerUi from "./components/ShimmerUi";

const Cart = lazy(() => {
  return import("./components/Cart");
});
const ResMenu = lazy(() => {
  return import("./components/ResMenu");
});
const About = lazy(() => {
  return import("./components/About");
});
/// redux
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
// whole app structure
const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
  </Provider>
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
        element: (
          <Suspense fallback={<ShimmerUi n={1} />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/res/:resId",
        element: (
          <Suspense fallback={<ShimmerUi n={1} />}>
            <ResMenu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<ShimmerUi n={1} />}>
            <Cart />
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

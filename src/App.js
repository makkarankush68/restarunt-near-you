import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ShimmerUi from "./components/ShimmerUi";
import Home from "./components/Home";
import Footer from "./components/Footer";

const Body = lazy(() => {
  return import("./components/Body");
});
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
      <Header />
      <Outlet />
      <Footer/>
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
        element: <Home />,
      },
      {
        path: "/restaurants",
        element: (
          <Suspense fallback={<ShimmerUi n={1} />}>
            <Body />
          </Suspense>
        ),
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
        path: "/restaurants/res/:resId",
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

import "./App.css";
import AboutUs from "./components/Aboutus";
import Body from "./components/Body";
import Cart from "./components/Cart";
import Contactus from "./components/Contactus";
import Error from "./components/Error";
import Header from "./components/Header";
import { createBrowserRouter, Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
function Applayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/contact",
        element: <Contactus />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

export default appRouter;

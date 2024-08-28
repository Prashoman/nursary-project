import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home/Home";
// import Navbar from "../page/Navbar/Navbar";
import App from "../App";
import { Product } from "../page/Product/Product";
import Categories from "../page/Categories/Categories";
import CheckOut from "../page/CheckOut/CheckOut";
import ProductDetails from "../page/Product/ProductDetails/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path:"/product/:id",
        element:<ProductDetails/>
      }
    ],
  },
]);

export default router;

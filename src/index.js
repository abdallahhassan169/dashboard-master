import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Report from "./pages/report";
import Detail_Report from "./pages/detailReports";
import Products from "./pages/products";
import Employees from "./pages/employees";
import Users from "./pages/users";
import ErrorPage from "./pages/errorPage";
import Auth from "./pages/auth";
import { AuthProvider } from "./context/auth";
import Campaigns from "./pages/campaigns";
import DetailedProduct from "./pages/DetailedProduct";
import DetailedCampaign from "./pages/DetailedCampaign";
import Orders from "./pages/Orders";
import FollowOrder from "./pages/FollowOrder";
import "bootstrap/dist/css/bootstrap.min.css";

const darkTheme = createTheme({
  palette: {
    main: "#eee",
    green: "#2e7d32",
    red: "#FF004D",
    darkred: "#d32f2f",
    purple: "#711DB0",
    pink: "#EF4040",
    yellow: "#FFA732",
    blue: "#0B60B0",
  },
});

const ProductRoute = ({ children, auth = false }) => {
  const login = localStorage.getItem("token") !== null || false;
  if (!login && auth) {
    return <Navigate to="/admin/login" />;
  } else if (
    login &&
    ["/admin/login", "/admin/register"].includes(window.location.pathname)
  ) {
    return <Navigate to="/" />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProductRoute>
        <App />
      </ProductRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProductRoute auth={true}>
            <Home />
          </ProductRoute>
        ),
      },
      {
        path: "admin/campaigns",
        element: (
          <ProductRoute auth={true}>
            <Campaigns />
          </ProductRoute>
        ),
      },
      {
        path: "admin/campaigns/:id",
        element: (
          <ProductRoute auth={true}>
            <DetailedCampaign />
          </ProductRoute>
        ),
      },
      {
        path: "admin/login",
        element: (
          <ProductRoute>
            <Auth signUp={false} />{" "}
          </ProductRoute>
        ),
      },
      {
        path: "admin/register",
        element: (
          <ProductRoute>
            <Auth signUp={true} />{" "}
          </ProductRoute>
        ),
      },
      {
        path: "admin/reports/:id",
        element: (
          <ProductRoute auth={true}>
            <Detail_Report />{" "}
          </ProductRoute>
        ),
      },
      {
        path: "admin/employees",
        element: (
          <ProductRoute auth={true}>
            <Employees />{" "}
          </ProductRoute>
        ),
      },
      // {
      //   path: "admin/users",
      //   element: (
      //     <ProductRoute auth={true}>
      //       <Users />
      //     </ProductRoute>
      //   ),
      // },
      {
        path: "admin/detailReport",
        element: (
          <ProductRoute auth={true}>
            <Detail_Report />
          </ProductRoute>
        ),
      },
      {
        path: "admin/products",
        element: (
          <ProductRoute auth={true}>
            <Products />
          </ProductRoute>
        ),
      },
      {
        path: "admin/products/:id",
        element: (
          <ProductRoute auth={true}>
            <DetailedProduct />
          </ProductRoute>
        ),
      },
      {
        path: "admin/followOrder/:id",
        element: (
          <ProductRoute auth={true}>
            <FollowOrder />
          </ProductRoute>
        ),
      },
      {
        path: "admin/orders",
        element: (
          <ProductRoute auth={true}>
            <Orders />
          </ProductRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </AuthProvider>
);

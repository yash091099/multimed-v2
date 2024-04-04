import React from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import CustomerProfile from "./components/CustomerProfile";
import Profile from "./temp/Profile";
import Orders from "./temp/Orders";
import Prescription from "./temp/Prescription";
import WalletAndCoupons from "./temp/WalletAndCoupons";
import OrderHistory from "./temp/OrderHistory";
import ProcessingOrders from "./temp/ProcessingOrders";
import CanceledOrders from "./temp/CanceledOrders";
import EditUser from "./pages/EditUser";
import AddDepartment from "./pages/AddDepartment";
import AddUser from "./pages/AddUser";
import CouponFlow from "./pages/CouponFlow";
import MarketingFlow from "./pages/MarketingFlow";
import Dashboard from "./pages/Dashboard";
import Notification from "./pages/Notification";
import OrdersPage from "./pages/OrdersPage";
import OrderDetails from "./pages/OrderDetails";
import OrderDetailsComponent from "./components/OrderDetailsComponent";
import OrderTracking from "./components/OrderTracking";
import AddNewProduct from "./pages/AddNewProduct";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import EditDepartment from "./pages/EditDepartment";

const ProtectedRoute = ({ children }) => {
  const isUserLoggedIn = localStorage.getItem("token");
  if (isUserLoggedIn === 'undefined' || !isUserLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const isUserLoggedIn = localStorage.getItem("token");

  const routes = createBrowserRouter([
    {
      path: "/",
      element: isUserLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <ProtectedRoute><Home /></ProtectedRoute>,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "inventory", element: <Inventory />},
        { path: "add-product", element:<AddNewProduct />},
        { path: "product", element: <ProductPage />},
        { path: "category", element: <CategoryPage />},
        { path: "edit_user", element: <EditUser /> },
        { path: "customers", element: <Customers /> },
        {
          path: "customer_profile",
          element: <CustomerProfile />,
          children: [
            { path: "", element: <Profile /> },
            {
              path: "orders",
              element: <Orders />,
              children: [
                { path: "", element: <OrderHistory /> },
                { path: "processing_orders", element: <ProcessingOrders /> },
                { path: "cancelled_orders", element: <CanceledOrders /> },
              ],
            },
            { path: "prescription", element: <Prescription /> },
            { path: "wallet_and_coupons", element: <WalletAndCoupons /> },
          ],
        },
        {
          path: "orders",
          element: <Outlet />,
          children: [
            { path: "", element: <OrdersPage /> },
            { path: "order-details", element: <OrderDetails />, children: [ {path: '', element: <OrderDetailsComponent />}, { path: "order-tracking", element: <OrderTracking /> }] },
          ],
        },
        {
          path: "coupons",
          element: <CouponFlow />,
        },
        {
          path: "marketing",
          element: <MarketingFlow />,
        },
        {
          path: "users",
          element: <Outlet />,
          children: [
            {path: "", element: <Users />},
            { path: "add-department", element: <AddDepartment /> },
            { path: "add-user", element: <AddUser /> },
            { path: "edit-department", element: <EditDepartment />}
          ]
        },
        {
          path: "notifications",
          element: <Notification />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;

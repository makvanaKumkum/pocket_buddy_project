import React, { useEffect } from "react";
import "./assets/adminlte.css";
import "./assets/adminlte.min.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Login from "./components/common/Login";
import { Signup } from "./components/common/Signup";
import AdminSidebar from "./components/layouts/AdminSidebar";
import AdminProfile from "./components/role/admin/AdminProfile";
import UserSidebar from "./components/layouts/UserSidebar";
import { AddOffer } from "./components/role/restaurantOwner/AddOffer";
import SearchOffers from "./components/common/SearchOffers";
import ViewOffers from "./components/common/ViewOffers";
import RestaurantOwnerSidebar from "./components/layouts/RestaurantOwnerSidebar";
import axios from "axios";
import PrivateRoutes from "./hooks/PrivateRoutes";
import Reviews from "./components/role/user/Reviews";
import RestaurantOwnerProfile from "./components/role/restaurantOwner/RestaurantOwnerProfile";
import UserProfile from "./components/role/user/UserProfile";
import Logout from "./components/common/LogOut";

const App = () => {
  axios.defaults.baseURL = "http://localhost:5000";

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "signup") {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open";
    }
  }, [location.pathname]);

  return (
    <>
      <div
        className={
          location.pathname === "/login" || location.pathname === "/signup"
            ? ""
            : "app-wrapper"
        }
      >
        {/* <UserContext.Provider value={{ user, setUser }}> */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>

          <Route path="" element={<PrivateRoutes />}>
            <Route path="/admin" element={<AdminSidebar />}>
              <Route index element={<Navigate to="viewOffers" />} />
              <Route path="viewOffers" element={<ViewOffers />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="userProfile" element={<AdminProfile />}></Route>
              <Route
                path="myProfile"
                element={<RestaurantOwnerProfile />}
              ></Route>
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="/restaurantOwner" element={<RestaurantOwnerSidebar />}>
              <Route path="addOffer" element={<AddOffer />}></Route>
              <Route index element={<SearchOffers />} />
              <Route path="viewOffers" element={<SearchOffers />} />
              <Route
                path="myProfile"
                element={<RestaurantOwnerProfile />}
              ></Route>
              <Route path="logout" element={<Logout />} />
            </Route>

            <Route path="/user" element={<UserSidebar />}>
              <Route index element={<SearchOffers />} />
              <Route path="viewOffers" element={<SearchOffers />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="userProfile" element={<UserProfile />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Route>
        </Routes>
        {/* </UserContext.Provider> */}
      </div>
    </>
  );
};

export default App;

import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

export const AdminSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <UserNavbar toggleSidebar={toggleSidebar} />
      <aside
        className={`app-sidebar bg-body-secondary shadow ${
          isSidebarOpen ? "open" : "d-none"
        }`}
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          <Link to="/" className="brand-link">
            <img
              src="../../dist/assets/img/AdminLTELogo.png"
              className="brand-image opacity-75 shadow"
            />
            <span className="brand-text fw-light"> Admin</span>
          </Link>
        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <Link to="viewOffers" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    Dashboard
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="viewOffers" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p> ViewOffers</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="userProfile" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p> Profile </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="userProfile" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p> User Profile </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="myProfile" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p> Restaurant Owner profile </p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="logout" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p> Logout </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};

export default AdminSidebar;

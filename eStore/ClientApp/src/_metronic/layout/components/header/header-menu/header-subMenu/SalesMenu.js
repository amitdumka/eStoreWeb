import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../_helpers";

export default function SalesMenu({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };
  return (
    <>
      {/*Classic submenu*/}
      {/*begin::1 Level*/}
      <li
        data-menu-toggle={layoutProps.menuDesktopToggle}
        aria-haspopup="true"
        className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
          "/sales"
        )}`}
      >
        <NavLink className="menu-link menu-toggle" to="/sales">
          <span className="menu-text">Sales</span>
          <i className="menu-arrow"></i>
        </NavLink>
        <div className="menu-submenu menu-submenu-classic menu-submenu-left">
          <ul className="menu-subnav">
            {/*begin::2 Level*/}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/e-commerce"
              )}`}
              data-menu-toggle="hover"
              aria-haspopup="true"
            >
              <NavLink className="menu-link menu-toggle" to="/e-commerce">
                <span className="menu-text">Invoice</span>
                <i className="menu-arrow" />
              </NavLink>
              <div
                className={`menu-submenu menu-submenu-classic menu-submenu-right`}
              >
                <ul className="menu-subnav">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/salesers"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/e-commerce/salesers">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Customers</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/products"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/e-commerce/products">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Sale Invoice</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/products"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/e-commerce/products">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Manual Invoice</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                  {/*end::3 Level*/}
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/products"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/e-commerce/products">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Sales Return</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                </ul>
              </div>
            </li>
            {/*end::2 Level*/}
            {/*begin::2 Level*/}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/e-commerce"
              )}`}
              data-menu-toggle="hover"
              aria-haspopup="true"
            >
              <NavLink className="menu-link menu-toggle" to="/e-commerce">
                <span className="menu-text">Online Sales</span>
                <i className="menu-arrow" />
              </NavLink>
              <div
                className={`menu-submenu menu-submenu-classic menu-submenu-right`}
              >
                <ul className="menu-subnav">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/salesers"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/e-commerce/salesers">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Vendors</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/products"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/e-commerce/products">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Sale Invoice</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/products"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/e-commerce/products">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Dispatch Entry</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                  {/*end::3 Level*/}
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/products"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/e-commerce/products">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Sales Return</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                </ul>
              </div>
            </li>
            {/*end::2 Level*/}
            {/*begin::2 Level*/}
            <li className={`menu-item ${getMenuItemActive("/builder")}`}>
              <NavLink className="menu-link" to="/sales/dailySales">
                <span className="menu-text text-danger">Daily Sales</span>
              </NavLink>
            </li>
            {/*end::3 Level*/}

            {/*begin::2 Level*/}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/error"
              )}`}
              data-menu-toggle="hover"
              aria-haspopup="true"
            >
              <NavLink className="menu-link menu-toggle" to="/error">
                <span className="menu-text">Reports </span>
                <i className="menu-arrow" />
              </NavLink>
              <div
                className={`menu-submenu menu-submenu-classic menu-submenu-right`}
              >
                <ul className="menu-subnav">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/error/error-v1"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/error/error-v1">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Sale Report</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/error/error-v2"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/error/error-v2">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Sale Analysis</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/error/error-v3"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/error/error-v3">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Salesmen Report</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/error/error-v4"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/error/error-v4">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Sales Return Report</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/error/error-v5"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/error/error-v5">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Defect Report</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/error/error-v6"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/error/error-v6">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Manual Sale Report</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                </ul>
              </div>
            </li>
            {/*end::2 Level*/}
          </ul>
        </div>
      </li>
      {/*end::1 Level*/}
    </>
  );
}

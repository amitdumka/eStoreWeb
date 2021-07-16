/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../_helpers";

export default function StoreSubMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };
  return (
    <>
      {/* Banking */}
      {/*begin::1 Level*/}
      <li
        className={`menu-item menu-item-submenu ${getMenuItemActive(
          "/stores",
          true
        )}`}
        aria-haspopup="true"
        data-menu-toggle="hover"
      >
        <NavLink className="menu-link menu-toggle" to="/stores">
          <span className="svg-icon menu-icon">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")} />
          </span>
          <span className="menu-text">Store Operations</span>
          <i className="menu-arrow" />
        </NavLink>
        <div className="menu-submenu ">
          <ul className="menu-subnav">
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Holiday</span>
                </span>
              </li>

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/stores/operations"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/stores/operations">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Daily Operations</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/stores/badge"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/stores/badge">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Closing</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/stores/breadcrumb"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/stores/breadcrumb">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">End of Days</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/stores/buttons"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/stores/buttons">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Month End</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/stores/button-group"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/stores/button-group"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Store Closed</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}             
            </ul>
          </ul>
        </div>
      </li>
      {/*end::1 Level*/}
    </>
  );
}

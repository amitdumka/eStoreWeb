/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../_helpers";

export default function Templete_MenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };
  return (
    <>
      {/* Menu Item Here */}
      {/*begin::2 Level*/}
      <li
        className={`menu-item ${getMenuItemActive("/mainRoute/subRoute")}`}
        aria-haspopup="true"
      >
        <NavLink className="menu-link" to="/mainRoute/subRoute">
          <i className="menu-bullet menu-bullet-dot">
            <span />
          </i>
          <span className="menu-text">Menu_Name</span>
        </NavLink>
      </li>
      {/*end::2 Level*/}
      {/** Menu item List End here */}
    </>
  );
}

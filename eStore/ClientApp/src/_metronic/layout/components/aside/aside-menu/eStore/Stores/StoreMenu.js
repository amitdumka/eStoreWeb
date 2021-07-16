/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../_helpers";
import StoreSubMenu from "./StoreSubMenu";
import AdminMenu from "./AdminMenu";

export default function StoreMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };
  return (
    <>
      <li className="menu-section ">
        <h4 className="menu-text">Stores</h4>
        <i className="menu-icon flaticon-more-v2"></i>
      </li>
      {/*begin::1 Level*/}
      <li
        className={`menu-item ${getMenuItemActive("/store/stores", false)}`}
        aria-haspopup="true"
      >
        <NavLink className="menu-link" to="/store/stores">
          <span className="svg-icon menu-icon">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Add-user.svg")}
            />
          </span>
          <span className="menu-text">Stores</span>
        </NavLink>
      </li>
      {/*begin::1 Level*/}
      <li
        className={`menu-item ${getMenuItemActive("/store/contacts", false)}`}
        aria-haspopup="true"
      >
        <NavLink className="menu-link" to="/store/contacts">
          <span className="svg-icon menu-icon">
            <SVG
              src={toAbsoluteUrl(
                "/media/svg/icons/Communication/Adress-book1.svg"
              )}
            />
          </span>
          <span className="menu-text">Contacts</span>
        </NavLink>
      </li>
      {/*end::1 Level*/}
      {/* <StoreSubMenu /> */}
      {/* <AdminMenu /> */}
    </>
  );
}

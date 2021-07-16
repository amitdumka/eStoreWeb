/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import PayrollMenu from "./header-subMenu/PayrollMenu";
import SalesMenu from "./header-subMenu/SalesMenu";
import PurchaseMenu from "./header-subMenu/PurchaseMenu";
import AccountingMenu from "./header-subMenu/AccountingMenu";
import StoreMenu from "./header-subMenu/StoreMenu";

export function HeaderMenu({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/dashboard"
          )}`}
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="menu-text">Dashboard</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
        {/*end::1 Level*/}

        <AccountingMenu layoutProps={layoutProps} />
        <PayrollMenu layoutProps={layoutProps} />
        <SalesMenu layoutProps={layoutProps} />
        <PurchaseMenu layoutProps={layoutProps} />
        <StoreMenu layoutProps={layoutProps} />
      </ul>
      {/*end::Header Nav*/}
    </div>
  );
}

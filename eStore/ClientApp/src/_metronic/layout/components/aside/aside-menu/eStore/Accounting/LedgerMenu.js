/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../_helpers";

export default function LedgerMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };
  return (
    <>
      {/* Ledger-Menu */}
      {/*begin::1 Level*/}
      <li
        className={`menu-item menu-item-submenu ${getMenuItemActive(
          "/ledger",
          true
        )}`}
        aria-haspopup="true"
        data-menu-toggle="hover"
      >
        <NavLink className="menu-link menu-toggle" to="/ledger">
          <span className="svg-icon menu-icon">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
          </span>
          <span className="menu-text">Ledger(s)</span>
          <i className="menu-arrow" />
        </NavLink>
        <div className="menu-submenu ">
          <i className="menu-arrow" />
          <ul className="menu-subnav">
            <li className="menu-item  menu-item-parent" aria-haspopup="true">
              <span className="menu-link">
                <span className="menu-text">Ledger(s)</span>
              </span>
            </li>
            {/**Menu Item Will Follow from Level 2 */}

            {/*begin::2 Level*/}
            <li
              className={`menu-item ${getMenuItemActive("/ledger/ledgerTypes")}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to="/ledger/ledgerTypes">
                <i className="menu-bullet menu-bullet-dot">
                  <span />
                </i>
                <span className="menu-text">Ledger Types</span>
              </NavLink>
            </li>
            {/*end::2 Level*/}
            {/*begin::2 Level*/}
            <li
              className={`menu-item ${getMenuItemActive("/ledger/party")}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to="/ledger/party">
                <i className="menu-bullet menu-bullet-dot">
                  <span />
                </i>
                <span className="menu-text">Parties</span>
              </NavLink>
            </li>
            {/*end::2 Level*/}
            {/*begin::2 Level*/}
            <li
              className={`menu-item ${getMenuItemActive(
                "/ledger/ledgerMaster"
              )}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to="/ledger/ledgerMaster">
                <i className="menu-bullet menu-bullet-dot">
                  <span />
                </i>
                <span className="menu-text">Ledger Master</span>
              </NavLink>
            </li>
            {/*end::2 Level*/}
            {/*begin::2 Level*/}
            <li
              className={`menu-item ${getMenuItemActive("/ledger/ledgerEntry")}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to="/ledger/ledgerEntry">
                <i className="menu-bullet menu-bullet-dot">
                  <span />
                </i>
                <span className="menu-text">Ledger Entry</span>
              </NavLink>
            </li>
            {/*end::2 Level*/}
            {/**end of Menu Item */}
          </ul>
        </div>
      </li>{" "}
      {/*End Of Start Tag*/}
    </>
  );
}

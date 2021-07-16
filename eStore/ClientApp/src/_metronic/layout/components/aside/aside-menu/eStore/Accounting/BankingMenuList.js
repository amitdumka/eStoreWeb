/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../_helpers";

export default function BankingMenuList({ layoutProps }) {
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
          "/banking",
          true
        )}`}
        aria-haspopup="true"
        data-menu-toggle="hover"
      >
        <NavLink className="menu-link menu-toggle" to="/banking">
          <span className="svg-icon menu-icon">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")} />
          </span>
          <span className="menu-text">Banking</span>
          <i className="menu-arrow" />
        </NavLink>
        <div className="menu-submenu ">
          <ul className="menu-subnav">
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Banking</span>
                </span>
              </li>

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/banking/banks"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/banking/banks">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Banks</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/banking/accounts"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/banking/accounts">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Accounts</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/banking/deposits"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/banking/deposit">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Deposit</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/banking/bankWithdrawals"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/banking/bankWithdrawals">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Withdrawal</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/banking/chequesLog"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/banking/chequesLog"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Cheque Logs</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/banking/chequesIssue"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/banking/chequesIssue">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Cheque Issue</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/banking/bankAccounts"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/banking/bankAccounts">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Bank Accounts</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/banking/accountSecurity"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/banking/accountSecurity">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Account Security</span>
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

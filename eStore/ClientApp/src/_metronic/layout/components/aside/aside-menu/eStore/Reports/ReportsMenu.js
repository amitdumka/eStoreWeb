/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../_helpers";

export default function ReportsMenuList({ layoutProps }) {
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
          <h4 className="menu-text">Reports</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
      {/* Reports-Menu */}
      {/*begin::1 Level*/}
      <li
        className={`menu-item menu-item-submenu ${getMenuItemActive(
          "/reports",
          true
        )}`}
        aria-haspopup="true"
        data-menu-toggle="hover"
      >
        <NavLink className="menu-link menu-toggle" to="/reports">
          <span className="svg-icon menu-icon">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
          </span>
          <span className="menu-text">Reports</span>
          <i className="menu-arrow" />
        </NavLink>
        <div className="menu-submenu ">
          <i className="menu-arrow" />
          <ul className="menu-subnav">
            <li className="menu-item  menu-item-parent" aria-haspopup="true">
              <span className="menu-link">
                <span className="menu-text">Reports</span>
              </span>
            </li>

            {/* Rent */}
            {/*begin::2 Level*/}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/reports",
                true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink
                className="menu-link menu-toggle"
                to="/reports"
              >
                <i className="menu-bullet menu-bullet-dot">
                  <span />
                </i>
                <span className="menu-text">Finance</span>
                <i className="menu-arrow" />
              </NavLink>
              <div className="menu-submenu ">
                <i className="menu-arrow" />
                <ul className="menu-subnav">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item  ${getMenuItemActive(
                      "/reports/incomeExpenses"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/reports/incomeExpenses"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Income/Expense</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/reports/rents"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/reports/rents"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Others</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
       
                </ul>
              </div>
            </li>
            {/*end::2 Level*/}

            {/* Electricity */}
            {/*begin::2 Level*/}
            <li
              className={`menu-item menu-item-submenu  ${getMenuItemActive(
                "/electricity",
                true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink
                className="menu-link menu-toggle"
                to="/electricity"
              >
                <i className="menu-bullet menu-bullet-dot">
                  <span />
                </i>
                <span className="menu-text">Electricity</span>
                <i className="menu-arrow" />
              </NavLink>
              <div className="menu-submenu">
                <i className="menu-arrow" />
                <ul className="menu-subnav">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/electricity/connections"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/electricity/connections"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Connections</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/electricity/bills"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/electricity/bills"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Bills</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/electricity/ebilPayments"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/electricity/ebilPayments"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Payments</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                    
                  {/*end::3 Level*/}
                </ul>
              </div>
            </li>
            {/*end::2 Level*/}

            {/* Surfaces */}
            {/*begin::2 Level*/}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/reports/expense",
                true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink
                className="menu-link menu-toggle"
                to="/reports/expense"
              >
                <i className="menu-bullet menu-bullet-dot">
                  <span />
                </i>
                <span className="menu-text">Payments</span>
                <i className="menu-arrow" />
              </NavLink>
              <div className="menu-submenu">
                <i className="menu-arrow" />
                <ul className="menu-subnav">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/reports/expense/payments"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/reports/expense/payments"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Payments Voucher</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/reports/expense/cashPayments"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/reports/expense/cashPayments"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Cash Payments</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/reports/expense/expenses"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/reports/expense/expenses"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Expense Voucher</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  
                </ul>
              </div>
            </li>
            {/*end::2 Level*/}

            {/* Feedback */}
            {/*begin::2 Level*/}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/reports/receipt",
                true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink
                className="menu-link menu-toggle"
                to="/reports/receipt"
              >
                <i className="menu-bullet menu-bullet-dot">
                  <span />
                </i>
                <span className="menu-text">Receipts</span>
                <i className="menu-arrow" />
              </NavLink>
              <div className="menu-submenu">
                <i className="menu-arrow" />
                <ul className="menu-subnav">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/reports/receipt/cashReceipts"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/reports/receipt/cashReceipts"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Cash Receipts</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                 

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/reports/receipt/receipts"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/reports/receipt/receipts"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Receipts Voucher</span>
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

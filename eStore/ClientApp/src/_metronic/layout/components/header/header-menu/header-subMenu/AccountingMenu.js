import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../_helpers";

export default function AccountingMenu({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };
  return (
    <>
      {/*Mega submenu*/}
      {/*begin::1 Level*/}
      <li
        className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
          "/accounting"
        )}`}
        data-menu-toggle={layoutProps.menuDesktopToggle}
        aria-haspopup="true"
      >
        <NavLink className="menu-link menu-toggle" to="/accounting">
          <span className="menu-text">Accounting</span>
          <i className="menu-arrow"></i>
        </NavLink>
        <div
          className="menu-submenu menu-submenu-fixed menu-submenu-left"
          style={{ width: "1000px" }}
        >
          <div className="menu-subnav">
            <ul className="menu-content">
              <li className="menu-item ">
                <h3 className="menu-heading menu-toggle">
                  <i className="menu-bullet menu-bullet-dot">
                    <span></span>
                  </i>
                  <span className="menu-text">Payment/Receipts</span>
                  <i className="menu-arrow"></i>
                </h3>
                <ul className="menu-inner">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/accounting/expense/payments"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/accounting/expense/payments"
                    >
                      <span className="menu-text">Payment Voucher</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/accounting/expense/cashPayments"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/accounting/expense/cashPayments"
                    >
                      <span className="menu-text">Cash Payments</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/accounting/expense/expenses"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/accounting/expense/expenses"
                    >
                      <span className="menu-text">Expense Voucher</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/accounting/receipt/receipts"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/accounting/receipt/receipts"
                    >
                      <span className="menu-text">Receipts</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/accounting/receipt/cashReceipts"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/accounting/receipt/cashReceipts"
                    >
                      <span className="menu-text">Cash Receipts</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/electricity/ebilPayments"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/electricity/ebilPayments"
                    >
                      <span className="menu-text">Electricity Payment</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/due/recoverd"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/due/recoverd">
                      <span className="menu-text">Dues Recovery</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/renting/rents"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/renting/rents">
                      <span className="menu-text">Rent Payment</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                </ul>
              </li>
              <li className="menu-item ">
                <ul className="menu-inner">
                  <h3 className="menu-heading menu-toggle">
                    <i className="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span className="menu-text">Banking</span>
                    <i className="menu-arrow"></i>
                  </h3>
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/banking/banks"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/banking/banks">
                      <span className="menu-text">Bank</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/banking/accounts"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/banking/accounts">
                      <span className="menu-text">Accounts</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/banking/deposit"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/banking/deposit">
                      <span className="menu-text">Deposits</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/banking/bankWithdrawals"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/banking/bankWithdrawals"
                    >
                      <span className="menu-text">Withdrawal</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/banking/chequesLog"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/banking/chequesLog">
                      <span className="menu-text">Cheques Log</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/banking/chequesIssue"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/banking/chequesIssue">
                      <span className="menu-text">Cheques Issue</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/banking/bankAccounts"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/banking/bankAccounts">
                      <span className="menu-text">Bank Accounts</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/banking/accountSecurity"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/banking/accountSecurity"
                    >
                      <span className="menu-text">Account Security</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                </ul>
              </li>
              <li className="menu-item ">
                <h3 className="menu-heading menu-toggle">
                  <i className="menu-bullet menu-bullet-dot">
                    <span></span>
                  </i>
                  <span className="menu-text">Ledger(s)</span>
                  <i className="menu-arrow"></i>
                </h3>
                <ul className="menu-inner">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/ledger/ledgerTypes"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/ledger/ledgerTypes">
                      <span className="menu-text">Ledger Type</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/ledger/party"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/ledger/party">
                      <span className="menu-text">Parties</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/ledger/ledgerMaster"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/ledger/ledgerMaster">
                      <span className="menu-text">Ledger Master</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/ledger/ledgerEntry"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/ledger/ledgerEntry">
                      <span className="menu-text">Ledger Entry</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                </ul>
              </li>
              <li className="menu-item ">
                <h3 className="menu-heading menu-toggle">
                  <i className="menu-bullet menu-bullet-dot">
                    <span></span>
                  </i>
                  <span className="menu-text">Accounting</span>
                  <i className="menu-arrow"></i>
                </h3>
                <ul className="menu-inner">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/taxes/saletax"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/taxes/saletax">
                      <span className="menu-text">Taxes</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/renting/rentedLocations"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/renting/rentedLocations"
                    >
                      <span className="menu-text">Rented Location</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/electricity/connections"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/electricity/connections"
                    >
                      <span className="menu-text">Electricity Connections</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/electricity/bills"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/electricity/bills">
                      <span className="menu-text">Electricity Bills</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive("/due/duelist")}`}
                  >
                    <NavLink className="menu-link" to="/due/duelist">
                      <span className="menu-text">Due List</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/accounting/transcationTypes"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/accounting/transcationTypes"
                    >
                      <span className="menu-text">Transitions Types</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </>
  );
}

/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../_helpers";

export default function PayRollLiteMenu({ layoutProps }) {
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
        <h4 className="menu-text">PayRoll</h4>
        <i className="menu-icon flaticon-more-v2"></i>
      </li>

      {/* Payroll-Menu */}
      {/*begin::1 Level*/}
      {/* <li
        className={`menu-item menu-item-submenu ${getMenuItemActive(
          "/payroll/employee",
          true
        )}`}
        aria-haspopup="true"
        data-menu-toggle="hover"
      > */}
      {/* <NavLink className="menu-link menu-toggle" to="/payroll/employee">
          <span className="svg-icon menu-icon">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
          </span>
          <span className="menu-text">Employee</span>
          <i className="menu-arrow" />
        </NavLink> */}
      {/* <div className="menu-submenu ">
          <i className="menu-arrow" />

          <ul className="menu-subnav"> */}

      {/* <li className="menu-item  menu-item-parent" aria-haspopup="true">
              <span className="menu-link">
                <span className="menu-text">Employee</span>
              </span>
            </li> */}

      {/**Menu Item Will Follow from Level 2 */}
      {/*begin::2 Level*/}
      <li
        className={`menu-item ${getMenuItemActive(
          "/payroll/employee/employees"
        )}`}
        aria-haspopup="true"
      >
        <NavLink className="menu-link" to="/payroll/employee/employees">
          <span className="svg-icon menu-icon">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/General/User.svg")}
            />
          </span>
          <span className="menu-text">Employees</span>
        </NavLink>
      </li>
      {/*end::2 Level*/}
      {/*begin::2 Level*/}
      <li
        className={`menu-item ${getMenuItemActive(
          "/payroll/employee/attendances"
        )}`}
        aria-haspopup="true"
      >
        <NavLink className="menu-link" to="/payroll/employee/attendances">
          <span className="svg-icon menu-icon">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Clipboard-check.svg")}
            />
          </span>
          <span className="menu-text">Attendance</span>
        </NavLink>
      </li>
      {/*end::2 Level*/}
      {/*begin::2 Level*/}
      <li
        className={`menu-item ${getMenuItemActive(
          "/payroll/employee/salarypayments"
        )}`}
        aria-haspopup="true"
      >
        <NavLink className="menu-link" to="/payroll/employee/salarypayments">
          <span className="svg-icon menu-icon">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Shopping/Wallet.svg")}
            />
          </span>
          <span className="menu-text">Salary</span>
        </NavLink>
      </li>
      {/*end::2 Level*/}
      {/**end of Menu Item */}
      {/* </ul>
        </div> */}
      {/* </li>{" "} */}
      {/*End Of Start Tag*/}
      {/** Menu item List End here */}
    </>
  );
}

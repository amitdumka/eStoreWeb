/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../_helpers";

function StoreMenu({ layoutProps }) {
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
          "/store"
        )}`}
      >
        <NavLink className="menu-link menu-toggle" to="/store">
          <span className="menu-text">Stores</span>
          <i className="menu-arrow"></i>
        </NavLink>
        <div className="menu-submenu menu-submenu-classic menu-submenu-left">
          <ul className="menu-subnav">
            {/*begin::2 Level*/}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/payroll/inputs"
              )}`}
              data-menu-toggle="hover"
              aria-haspopup="true"
            >
              <NavLink className="menu-link menu-toggle" to="/payroll/inputs">
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Design/PenAndRuller.svg"
                    )}
                  />
                </span>
                <span className="menu-text">Store Operations</span>
                <i className="menu-arrow" />
              </NavLink>
              <div
                className={`menu-submenu menu-submenu-classic menu-submenu-right`}
              >
                <ul className="menu-subnav">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/payroll/inputs/autocomplete"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/payroll/inputs/autocomplete"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Daily Operations</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/payroll/inputs/buttons"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/payroll/inputs/buttons">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Closing</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/payroll/inputs/checkboxes"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/payroll/inputs/checkboxes"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">End of Day</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/payroll/inputs/pickers"
                    )}`}
                  >
                    <NavLink className="menu-link" to="/payroll/inputs/pickers">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Month End</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  {/* <li className={`menu-item ${getMenuItemActive('/payroll/inputs/radio-buttons')}`}>
                                        <NavLink className="menu-link" to="/payroll/inputs/radio-buttons">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Radio Buttons</span>
                                        </NavLink>
                                    </li> */}
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  {/* <li className={`menu-item ${getMenuItemActive('/payroll/inputs/selects')}`}>
                                        <NavLink className="menu-link" to="/payroll/inputs/selects">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Selects</span>
                                        </NavLink>
                                    </li> */}
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  {/* <li className={`menu-item ${getMenuItemActive('/payroll/inputs/switches')}`}>
                                        <NavLink className="menu-link" to="/payroll/inputs/switches">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Switches</span>
                                        </NavLink>
                                    </li> */}
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  {/* <li className={`menu-item ${getMenuItemActive('/payroll/inputs/text-fields')}`}>
                                        <NavLink className="menu-link" to="/payroll/inputs/text-fields">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Text Fields</span>
                                        </NavLink>
                                    </li> */}
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  {/* <li className={`menu-item ${getMenuItemActive('/payroll/inputs/transfer-list')}`}>
                                        <NavLink className="menu-link" to="/payroll/inputs/transfer-list">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Transfer List</span>
                                        </NavLink>
                                    </li> */}
                  {/*end::3 Level*/}
                </ul>
              </div>
            </li>
            {/*end::2 Level*/}

            {/*begin::2 Level*/}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/payroll/navigation"
              )}`}
              data-menu-toggle="hover"
              aria-haspopup="true"
            >
              <NavLink
                className="menu-link menu-toggle"
                to="/payroll/navigation"
              >
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Navigation/Arrow-from-left.svg"
                    )}
                  />
                </span>
                <span className="menu-text">Administration</span>
                <i className="menu-arrow" />
              </NavLink>
              <div
                className={`menu-submenu menu-submenu-classic menu-submenu-right`}
              >
                <ul className="menu-subnav">
                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/payroll/navigation/bottom-navigation"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/payroll/navigation/bottom-navigation"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Users</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/payroll/navigation/breadcrumbs"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/payroll/navigation/breadcrumbs"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Roles</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/payroll/navigation/drawer"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/payroll/navigation/drawer"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Config</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}

                  {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/payroll/navigation/links"
                    )}`}
                  >
                    <NavLink
                      className="menu-link"
                      to="/payroll/navigation/links"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Master Report</span>
                    </NavLink>
                  </li>
                  {/*end::3 Level*/}
                </ul>
              </div>
            </li>
            {/*end::2 Level*/}

            {/*begin::2 Level*/}
            <li
              className={`menu-item ${getMenuItemActive("/store/stores")}`}
              data-menu-toggle="hover"
              aria-haspopup="true"
            >
              <NavLink className="menu-link " to="/store/stores">
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Layout/Layout-left-panel-1.svg"
                    )}
                  />
                </span>
                <span className="menu-text">Stores</span>
                {/* <i className="menu-arrow" /> */}
              </NavLink>
            </li>
            {/*end::2 Level*/}
            {/*begin::2 Level*/}
            <li
              className={`menu-item ${getMenuItemActive("/store/customers")}`}
              data-menu-toggle="hover"
              aria-haspopup="true"
            >
              <NavLink className="menu-link " to="/store/customers">
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Layout/Layout-left-panel-1.svg"
                    )}
                  />
                </span>
                <span className="menu-text">Customers</span>
                {/* <i className="menu-arrow" /> */}
              </NavLink>
            </li>
            {/*end::2 Level*/}
            {/*begin::2 Level*/}
            <li
              className={`menu-item ${getMenuItemActive("/store/contacts")}`}
              data-menu-toggle="hover"
              aria-haspopup="true"
            >
              <NavLink className="menu-link " to="/store/contacts">
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Layout/Layout-left-panel-1.svg"
                    )}
                  />
                </span>
                <span className="menu-text">Contacts</span>
                {/* <i className="menu-arrow" /> */}
              </NavLink>
            </li>
            {/*end::2 Level*/}
          </ul>
        </div>
      </li>
      {/*end::1 Level*/}
    </>
  );
}

export default StoreMenu;

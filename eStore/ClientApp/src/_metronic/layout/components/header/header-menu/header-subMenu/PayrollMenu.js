/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../_helpers";

function PayrollMenu({ layoutProps }) {
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }
    return (
        <>
             {/*Classic submenu*/}
            {/*begin::1 Level*/}
            <li
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/payroll')}`}>
                <NavLink className="menu-link menu-toggle" to="/payroll">
                    <span className="menu-text">Payrolls</span>
                    <i className="menu-arrow"></i>
                </NavLink>
                <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                    <ul className="menu-subnav">
                        {/*begin::2 Level*/}
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/payroll/inputs')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/payroll/inputs">
                                <span className="svg-icon menu-icon">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Design/PenAndRuller.svg")} />
                                </span>
                                <span className="menu-text">
                                    Employees
                                </span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                                <ul className="menu-subnav">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/inputs/autocomplete')}`}>
                                        <NavLink className="menu-link" to="/payroll/inputs/autocomplete">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Employees</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/inputs/buttons')}`}>
                                        <NavLink className="menu-link" to="/payroll/inputs/buttons">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Attendance</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/inputs/checkboxes')}`}>
                                        <NavLink className="menu-link" to="/payroll/inputs/checkboxes">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Salary</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/inputs/pickers')}`}>
                                        <NavLink className="menu-link" to="/payroll/inputs/pickers">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Welfare</span>
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
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/payroll/navigation')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/payroll/navigation">
                                <span className="svg-icon menu-icon">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-from-left.svg")} />
                                </span>
                                <span className="menu-text">
                                    Salary
                                </span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                                <ul className="menu-subnav">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/navigation/bottom-navigation')}`}>
                                        <NavLink className="menu-link" to="/payroll/navigation/bottom-navigation">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Payslip</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/navigation/breadcrumbs')}`}>
                                        <NavLink className="menu-link" to="/payroll/navigation/breadcrumbs">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Current Salary</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/navigation/drawer')}`}>
                                        <NavLink className="menu-link" to="/payroll/navigation/drawer">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Leaves</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/navigation/links')}`}>
                                        <NavLink className="menu-link" to="/payroll/navigation/links">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Receipts</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                </ul>
                            </div>
                        </li>
                        {/*end::2 Level*/}

                        {/*begin::2 Level*/}
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/payroll/surfaces')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/payroll/surfaces">
                                <span className="svg-icon menu-icon">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-left-panel-1.svg")} />
                                </span>
                                <span className="menu-text">
                                    Leaves Management
                                </span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                                <ul className="menu-subnav">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/surfaces/app-bar')}`}>
                                        <NavLink className="menu-link" to="/payroll/surfaces/app-bar">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Leaves En-cash</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/surfaces/paper')}`}>
                                        <NavLink className="menu-link" to="/payroll/surfaces/paper">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Leave Request</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/surfaces/cards')}`}>
                                        <NavLink className="menu-link" to="/payroll/surfaces/cards">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Leave Approval</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                </ul>
                            </div>
                        </li>
                        {/*end::2 Level*/}

                        {/*begin::2 Level*/}
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/payroll/feedback')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/payroll/feedback">
                                <span className="svg-icon menu-icon">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/General/Half-star.svg")} />
                                </span>
                                <span className="menu-text">
                                    Reports
                                </span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                                <ul className="menu-subnav">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/feedback/progress')}`}>
                                        <NavLink className="menu-link" to="/payroll/feedback/progress">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Progress</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/feedback/dialogs')}`}>
                                        <NavLink className="menu-link" to="/payroll/feedback/dialogs">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Dialogs</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/feedback/snackbars')}`}>
                                        <NavLink className="menu-link" to="/payroll/feedback/snackbars">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Snackbars</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </div>
                        </li>
                        {/*end::2 Level*/}

                        {/*begin::2 Level*/}
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/payroll/data-displays')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/payroll/data-displays">
                                <span className="svg-icon menu-icon">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Devices/iMac.svg")} />
                                </span>
                                <span className="menu-text">
                                   Export Data
                                </span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                                <ul className="menu-subnav">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/feedback/progress')}`}>
                                        <NavLink className="menu-link" to="/payroll/data-displays/avatars">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Avatars</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/data-displays/badges')}`}>
                                        <NavLink className="menu-link" to="/payroll/data-displays/badges">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Badges</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/data-displays/chips')}`}>
                                        <NavLink className="menu-link" to="/payroll/data-displays/chips">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Chips</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/data-displays/dividers')}`}>
                                        <NavLink className="menu-link" to="/payroll/data-displays/dividers">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Dividers</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/data-displays/icons')}`}>
                                        <NavLink className="menu-link" to="/payroll/data-displays/icons">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Icons</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/data-displays/lists')}`}>
                                        <NavLink className="menu-link" to="/payroll/data-displays/lists">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Lists</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/data-displays/tables')}`}>
                                        <NavLink className="menu-link" to="/payroll/data-displays/tables">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Tables</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/data-displays/tooltips')}`}>
                                        <NavLink className="menu-link" to="/payroll/data-displays/tooltips">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Tooltips</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/data-displays/typography')}`}>
                                        <NavLink className="menu-link" to="/payroll/data-displays/typography">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Typography</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </div>
                        </li>
                        {/*end::2 Level*/}

                        {/*begin::2 Level*/}
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/payroll/utils')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/payroll/utils">
                                <span className="svg-icon menu-icon">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Tools/Swiss-knife.svg")} />
                                </span>
                                <span className="menu-text">
                                    Utils
                                </span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                                <ul className="menu-subnav">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/utils/click-away-listener')}`}>
                                        <NavLink className="menu-link" to="/payroll/utils/click-away-listener">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Click Away Listener</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/utils/modal')}`}>
                                        <NavLink className="menu-link" to="/payroll/utils/modal">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Modal</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/utils/no-ssr')}`}>
                                        <NavLink className="menu-link" to="/payroll/utils/no-ssr">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">No SSR</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/utils/popover')}`}>
                                        <NavLink className="menu-link" to="/payroll/utils/popover">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Popover</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/utils/popper')}`}>
                                        <NavLink className="menu-link" to="/payroll/utils/popper">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Popper</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/utils/portal')}`}>
                                        <NavLink className="menu-link" to="/payroll/utils/portal">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Portal</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/utils/transitions')}`}>
                                        <NavLink className="menu-link" to="/payroll/utils/transitions">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Transitions</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/utils/use-media-query')}`}>
                                        <NavLink className="menu-link" to="/payroll/utils/use-media-query">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">useMediaQuery</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </div>
                        </li>
                        {/*end::2 Level*/}

                        {/*begin::2 Level*/}
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/payroll/layout')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/payroll/layout">
                                <span className="svg-icon menu-icon">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-top-panel-2.svg")} />
                                </span>
                                <span className="menu-text">
                                    Import Data
                                </span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                                <ul className="menu-subnav">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/layout/box')}`}>
                                        <NavLink className="menu-link" to="/payroll/layout/box">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Box</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/layout/container')}`}>
                                        <NavLink className="menu-link" to="/payroll/layout/container">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Container</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/layout/grid')}`}>
                                        <NavLink className="menu-link" to="/payroll/layout/grid">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Grid</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/layout/grid-list')}`}>
                                        <NavLink className="menu-link" to="/payroll/layout/grid-list">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Grid list</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/payroll/layout/hidden')}`}>
                                        <NavLink className="menu-link" to="/payroll/layout/hidden">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Hidden</span>
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
    )
}

export default PayrollMenu

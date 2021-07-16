import React from 'react'
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../_helpers";

export default function PurchasesMenu({ layoutProps }) {
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }
    return (
        <>
             {/*Mega submenu*/}
            {/*begin::1 Level*/}
            <li
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/purchases')}`}
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
            >
                <NavLink className="menu-link menu-toggle" to="/purchases">
                    <span className="menu-text">Purchases</span>
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
                                    <i className="menu-bullet menu-bullet-dot"><span></span></i>
                                    <span className="menu-text">A ... C</span>
                                    <i className="menu-arrow"></i>
                                </h3>
                                <ul className="menu-inner">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/alert')}`}>
                                        <NavLink className="menu-link" to="/purchases/alert">
                                            <span className="menu-text">Alerts</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/accordion')}`}>
                                        <NavLink className="menu-link" to="/purchases/accordion">
                                            <span className="menu-text">Accordion</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/badge')}`}>
                                        <NavLink className="menu-link" to="/purchases/badge">
                                            <span className="menu-text">Badge</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/breadcrumb')}`}>
                                        <NavLink className="menu-link" to="/purchases/breadcrumb">
                                            <span className="menu-text">Breadcrumb</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/buttons')}`}>
                                        <NavLink className="menu-link" to="/purchases/buttons">
                                            <span className="menu-text">Buttons</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/button-group')}`}>
                                        <NavLink className="menu-link" to="/purchases/button-group">
                                            <span className="menu-text">Button Group</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/cards')}`}>
                                        <NavLink className="menu-link" to="/purchases/cards">
                                            <span className="menu-text">Cards</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </li>
                            <li className="menu-item ">
                                <ul className="menu-inner">
                                    <h3 className="menu-heading menu-toggle">
                                        <i className="menu-bullet menu-bullet-dot"><span></span></i>
                                        <span className="menu-text">C ... J</span>
                                        <i className="menu-arrow"></i>
                                    </h3>
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/carousel')}`}>
                                        <NavLink className="menu-link" to="/purchases/carousel">
                                            <span className="menu-text">Carousel</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/dropdowns')}`}>
                                        <NavLink className="menu-link" to="/purchases/dropdowns">
                                            <span className="menu-text">Dropdowns</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/forms')}`}>
                                        <NavLink className="menu-link" to="/purchases/forms">
                                            <span className="menu-text">Forms</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/input-group')}`}>
                                        <NavLink className="menu-link" to="/purchases/input-group">
                                            <span className="menu-text">Input Group</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/images')}`}>
                                        <NavLink className="menu-link" to="/purchases/images">
                                            <span className="menu-text">Images</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/figures')}`}>
                                        <NavLink className="menu-link" to="/purchases/figures">
                                            <span className="menu-text">Figures</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/jumbotron')}`}>
                                        <NavLink className="menu-link" to="/purchases/jumbotron">
                                            <span className="menu-text">Jumbotron</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </li>
                            <li className="menu-item ">
                                <h3 className="menu-heading menu-toggle">
                                    <i className="menu-bullet menu-bullet-dot"><span></span></i>
                                    <span className="menu-text">L ... P</span>
                                    <i className="menu-arrow"></i>
                                </h3>
                                <ul className="menu-inner">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/list-group')}`}>
                                        <NavLink className="menu-link" to="/purchases/list-group">
                                            <span className="menu-text">List group</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/modal')}`}>
                                        <NavLink className="menu-link" to="/purchases/modal">
                                            <span className="menu-text">Modal</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/navs')}`}>
                                        <NavLink className="menu-link" to="/purchases/navs">
                                            <span className="menu-text">Navs</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/navbar')}`}>
                                        <NavLink className="menu-link" to="/purchases/navbar">
                                            <span className="menu-text">Navbar</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/overlays')}`}>
                                        <NavLink className="menu-link" to="/purchases/overlays">
                                            <span className="menu-text">Overlays</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/pagination')}`}>
                                        <NavLink className="menu-link" to="/purchases/pagination">
                                            <span className="menu-text">Pagination</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/popovers')}`}>
                                        <NavLink className="menu-link" to="/purchases/popovers">
                                            <span className="menu-text">Popovers</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </li>
                            <li className="menu-item ">
                                <h3 className="menu-heading menu-toggle">
                                    <i className="menu-bullet menu-bullet-dot"><span></span></i>
                                    <span className="menu-text">P ... T</span>
                                    <i className="menu-arrow"></i>
                                </h3>
                                <ul className="menu-inner">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/progress')}`}>
                                        <NavLink className="menu-link" to="/purchases/progress">
                                            <span className="menu-text">Progress</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/spinners')}`}>
                                        <NavLink className="menu-link" to="/purchases/spinners">
                                            <span className="menu-text">Spinners</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/table')}`}>
                                        <NavLink className="menu-link" to="/purchases/table">
                                            <span className="menu-text">Table</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/tabs')}`}>
                                        <NavLink className="menu-link" to="/purchases/tabs">
                                            <span className="menu-text">Tabs</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/tooltips')}`}>
                                        <NavLink className="menu-link" to="/purchases/tooltips">
                                            <span className="menu-text">Tooltips</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/purchases/toasts')}`}>
                                        <NavLink className="menu-link" to="/purchases/toasts">
                                            <span className="menu-text">Toasts</span>
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
    )
}

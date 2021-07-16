import React from "react";
//import { useLocation } from "react-router";
//import { NavLink } from "react-router-dom";
//import SVG from "react-inlinesvg";
//import { checkIsActive } from "../../../../../../_helpers";
import BankingMenu from "./BankingMenuList";
import ExpensesMenu from "./ExpensesMenu";
import LedgerMenu from "./LedgerMenu";
import DuesMenu from "./DuesMenu";
import TaxMenu from "./TaxMenu";


export default function AccoutingMenuList({ layoutProps }) {
  //const location = useLocation();
  // const getMenuItemActive = (url, hasSubmenu = false) => {
  //   return checkIsActive(location, url)
  //     ? ` ${!hasSubmenu &&
  //         "menu-item-active"} menu-item-open menu-item-not-hightlighted`
  //     : "";
  // };
  return (
    <>
        <li className="menu-section ">
          <h4 className="menu-text">Accounting</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* <ExpensesMenu /> */}
        {/* <BankingMenu />  
        <LedgerMenu/> */}
        {/* <DuesMenu/> */}
        {/* <TaxMenu/> */}

    </>
  );
}

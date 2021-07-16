import React from "react";
import {useSubheader} from "../../_metronic/layout";

import ExcelToJson from "./ExcelToJson";

export const MyPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("My Custom title");

  return (<>My Page
   <div>  <ExcelToJson />
   </div>
  </>);
};

export const ImportExcel=()=>{

}; 
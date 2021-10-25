import React from "react";
import { useSubheader } from "../../_metronic/layout";

import ExcelToJson, { ProcessImport } from "./ExcelToJson";

export const MyPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Voyager Importer");

  return (
    <>
      <div className="m-5">
        {" "}
        <ExcelToJson />
      </div>
      <div className="m-5 p-5 table-danger border rounded border-success">
        <ProcessImport />
      </div>
    </>
  );
};

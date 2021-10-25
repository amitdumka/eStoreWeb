import React from "react";
import { useSubheader } from "../../_metronic/layout";
import { ReportBuilder } from "react-report-builder";
import { PeekdataApi } from "peekdata-datagateway-api-sdk";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-table/react-table.css";
import "react-report-builder/lib/main.css";

const peekdataApi = new PeekdataApi({
  baseUrl: "https://demo.peekdata.io:8443/datagateway/rest/v1",
  timeout: 0,
});

export const MyReports = () => {
  const subHeader = useSubheader();
  subHeader.setTitle("Report(s)");

  return (
    <>
      eStore Reports
      <div>
        <ReportBuilder
          peekdataApi={peekdataApi}
          defaultRowsOffset={0}
          defaultRowsLimit={100}
          showRequestViewButton={true}
          showResponseViewButton={true}
          showDataTabs={true}
        />
      </div>
    </>
  );
};
export default MyReports;

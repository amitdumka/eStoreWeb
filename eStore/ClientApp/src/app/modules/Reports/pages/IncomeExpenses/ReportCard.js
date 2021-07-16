import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ReportTable } from "./ReportTable";

//import { useUIContext } from "./UIContext";

//Rent
//rent


export function ReportCard() {
  // const uiContext = useUIContext();
  // const uiProps = useMemo(() => {
  //   return {
  //     ids: uiContext.ids,
  //     newRentButtonClick: uiContext.newRentButtonClick,
  //   };
  // }, [uiContext]);

  return (
    <Card>
      <CardHeader title="Income Expenses Report">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"            
          >
            Refresh
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
       <ReportTable/> 
      </CardBody>
    </Card>
  );
}

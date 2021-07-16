import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
//import { DailySalesFilter } from "./filter/Filter";
import { DataTable } from "./table/Table";
//import { DailySalesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//DailySale
//dailySale


export function ViewCard() {
  const titleName="Daily Sale";  
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      newButtonClick: uiContext.newButtonClick,
    };
  }, [uiContext]);

  return (
    <Card>
      <CardHeader title={`${titleName} list`}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={uiProps.newButtonClick}
          >
            New {titleName}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <DailySalesFilter />
        {uiProps.ids.length > 0 && <DailySalesGrouping />} */}
        <DataTable />
      </CardBody>
    </Card>
  );
}

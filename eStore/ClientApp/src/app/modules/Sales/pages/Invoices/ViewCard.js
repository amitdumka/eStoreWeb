import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
//import { InvoicesFilter } from "./filter/Filter";
import { DataTable } from "./table/Table";
//import { InvoicesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//Invoice
//invoice


export function ViewCard() {
  const titleName="Invoice";  
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
          <button
            type="button"
            className="btn btn-warning ml-3"
            onClick={uiProps.newButtonClick}
          >
            New  Sale Return
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <InvoicesFilter />
        {uiProps.ids.length > 0 && <InvoicesGrouping />} */}
        <DataTable keyFieldName="invoiceNumber"/>
      </CardBody>
    </Card>
  );
}

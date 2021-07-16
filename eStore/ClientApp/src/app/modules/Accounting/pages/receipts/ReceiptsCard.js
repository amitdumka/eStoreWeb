import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ReceiptsFilter } from "./filter/Filter";
import { ReceiptsTable } from "./table/Table";
import { ReceiptsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//Receipt
//receipt


export function ReceiptsCard() {
  const ReceiptsUIContext = useUIContext();
  const ReceiptsUIProps = useMemo(() => {
    return {
      ids: ReceiptsUIContext.ids,
      newReceiptButtonClick: ReceiptsUIContext.newReceiptButtonClick,
    };
  }, [ReceiptsUIContext]);

  return (
    <Card>
      <CardHeader title="Receipt list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary btn-rounded"
            onClick={ReceiptsUIProps.newReceiptButtonClick}
          >
            New Receipt
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
         <ReceiptsFilter /> 
        {ReceiptsUIProps.ids.length > 0 && <ReceiptsGrouping />}
        <ReceiptsTable />
      </CardBody>
    </Card>
  );
}

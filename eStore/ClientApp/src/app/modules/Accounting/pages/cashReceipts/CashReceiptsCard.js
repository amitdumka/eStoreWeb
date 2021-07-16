import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CashReceiptsFilter } from "./filter/Filter";
import { CashReceiptsTable } from "./table/Table";
import { CashReceiptsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//CashReceipt
//cashReceipt


export function CashReceiptsCard() {
  const CashReceiptsUIContext = useUIContext();
  const CashReceiptsUIProps = useMemo(() => {
    return {
      ids: CashReceiptsUIContext.ids,
      newCashReceiptButtonClick: CashReceiptsUIContext.newCashReceiptButtonClick,
    };
  }, [CashReceiptsUIContext]);

  return (
    <Card>
      <CardHeader title="CashReceipt list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary btn-rounded"
            onClick={CashReceiptsUIProps.newCashReceiptButtonClick}
          >
            New CashReceipt
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
         <CashReceiptsFilter /> 
        {CashReceiptsUIProps.ids.length > 0 && <CashReceiptsGrouping />}
        <CashReceiptsTable />
      </CardBody>
    </Card>
  );
}

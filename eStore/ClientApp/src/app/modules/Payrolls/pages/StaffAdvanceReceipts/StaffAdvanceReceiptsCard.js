import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { StaffAdvanceReceiptsTable } from "./table/Table";
import { StaffAdvanceReceiptsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//StaffAdvanceReceipt
//staffAdvanceReceipt

export function StaffAdvanceReceiptsCard() {
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      newStaffAdvanceReceiptButtonClick:
        uiContext.newStaffAdvanceReceiptButtonClick,
    };
  }, [uiContext]);

  return (
    <Card>
      <CardHeader title="Advance Receipt list (Staff)">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={uiProps.newStaffAdvanceReceiptButtonClick}
          >
            New  Advance Receipt
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <StaffAdvanceReceiptsFilter /> */}
        {uiProps.ids.length > 0 && <StaffAdvanceReceiptsGrouping />}
        <StaffAdvanceReceiptsTable />
      </CardBody>
    </Card>
  );
}

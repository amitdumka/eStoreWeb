import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { BillPaymentsFilter } from "./filter/Filter";
import { BillPaymentsTable } from "./table/Table";
import { BillPaymentsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//BillPayment
//billPayment


export function BillPaymentsCard() {
  const BillPaymentsUIContext = useUIContext();
  const BillPaymentsUIProps = useMemo(() => {
    return {
      ids: BillPaymentsUIContext.ids,
      newBillPaymentButtonClick: BillPaymentsUIContext.newBillPaymentButtonClick,
    };
  }, [BillPaymentsUIContext]);

  return (
    <Card>
      <CardHeader title="Bill Payment list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={BillPaymentsUIProps.newBillPaymentButtonClick}
          >
            New Payment
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BillPaymentsFilter />
        {BillPaymentsUIProps.ids.length > 0 && <BillPaymentsGrouping />}
        <BillPaymentsTable />
      </CardBody>
    </Card>
  );
}

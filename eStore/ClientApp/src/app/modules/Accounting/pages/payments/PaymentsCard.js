import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PaymentsFilter } from "./filter/Filter";
import { PaymentsTable } from "./table/Table";
import { PaymentsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//Payment
//payment


export function PaymentsCard() {
  const PaymentsUIContext = useUIContext();
  const PaymentsUIProps = useMemo(() => {
    return {
      ids: PaymentsUIContext.ids,
      newPaymentButtonClick: PaymentsUIContext.newPaymentButtonClick,
    };
  }, [PaymentsUIContext]);

  return (
    <Card>
      <CardHeader title="Payment list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary btn-rounded"
            onClick={PaymentsUIProps.newPaymentButtonClick}
          >
            New Payment
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
         <PaymentsFilter /> 
        {PaymentsUIProps.ids.length > 0 && <PaymentsGrouping />}
        <PaymentsTable />
      </CardBody>
    </Card>
  );
}

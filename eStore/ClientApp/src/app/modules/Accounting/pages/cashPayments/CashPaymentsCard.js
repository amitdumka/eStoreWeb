import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CashPaymentsFilter } from "./filter/Filter";
import { CashPaymentsTable } from "./table/Table";
import { CashPaymentsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//CashPayment
//cashPayment


export function CashPaymentsCard() {
  const CashPaymentsUIContext = useUIContext();
  const CashPaymentsUIProps = useMemo(() => {
    return {
      ids: CashPaymentsUIContext.ids,
      newCashPaymentButtonClick: CashPaymentsUIContext.newCashPaymentButtonClick,
    };
  }, [CashPaymentsUIContext]);

  return (
    <Card>
      <CardHeader title="CashPayment list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary btn-rounded"
            onClick={CashPaymentsUIProps.newCashPaymentButtonClick}
          >
            New CashPayment
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
         <CashPaymentsFilter /> 
        {CashPaymentsUIProps.ids.length > 0 && <CashPaymentsGrouping />}
        <CashPaymentsTable />
      </CardBody>
    </Card>
  );
}

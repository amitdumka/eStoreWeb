import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SalaryPaymentsTable } from "./table/Table";
import { SalaryPaymentsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//SalaryPayment
//salaryPayment

export function SalaryPaymentsCard() {
  const SalaryPaymentsUIContext = useUIContext();
  const SalaryPaymentsUIProps = useMemo(() => {
    return {
      ids: SalaryPaymentsUIContext.ids,
      newSalaryPaymentButtonClick:
        SalaryPaymentsUIContext.newSalaryPaymentButtonClick,
    };
  }, [SalaryPaymentsUIContext]);

  return (
    <Card>
      <CardHeader title="Salary Payments list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={SalaryPaymentsUIProps.newSalaryPaymentButtonClick}
          >
            New SalaryPayment
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <SalaryPaymentsFilter /> */}
        {SalaryPaymentsUIProps.ids.length > 0 && <SalaryPaymentsGrouping />}
        <SalaryPaymentsTable />
      </CardBody>
    </Card>
  );
}

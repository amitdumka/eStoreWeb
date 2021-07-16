import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//salaryPayment
//SalaryPayment


export function SalaryPaymentsLoadingDialog() {
  // SalaryPayments Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.salaryPayments.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

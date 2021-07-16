import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//billPayment
//BillPayment


export function BillPaymentsLoadingDialog() {
  // BillPayments Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.billPayments.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

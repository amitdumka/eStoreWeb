import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//cashPayment
//CashPayment


export function CashPaymentsLoadingDialog() {
  // CashPayments Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cashPayments.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

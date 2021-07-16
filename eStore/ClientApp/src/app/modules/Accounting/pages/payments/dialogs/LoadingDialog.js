import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//payment
//Payment


export function PaymentsLoadingDialog() {
  // Payments Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.payments.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

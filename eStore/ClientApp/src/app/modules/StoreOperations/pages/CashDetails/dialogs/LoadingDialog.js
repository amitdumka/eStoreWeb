import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//cashDetail
//CashDetail


export function CashDetailsLoadingDialog() {
  // CashDetails Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cashDetails.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

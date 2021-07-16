import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//bankWithdrawal
//BankWithdrawal

export function BankWithdrawalsLoadingDialog() {
  // BankWithdrawals Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bankWithdrawals.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

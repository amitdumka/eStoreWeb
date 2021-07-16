import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//bankDeposit
//BankDeposit

export function BankDepositsLoadingDialog() {
  // BankDeposits Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bankDeposits.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

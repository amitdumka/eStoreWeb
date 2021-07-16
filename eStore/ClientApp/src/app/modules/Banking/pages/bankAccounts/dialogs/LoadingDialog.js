import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//bankAccount
//BankAccount


export function BankAccountsLoadingDialog() {
  // BankAccounts Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bankAccounts.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

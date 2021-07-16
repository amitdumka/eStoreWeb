import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//expense
//Expense


export function ExpensesLoadingDialog() {
  // Expenses Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.expenses.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

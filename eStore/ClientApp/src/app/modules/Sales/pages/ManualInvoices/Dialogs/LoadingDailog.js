import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//invoice
//Invoice


export function DataLoadingDialog() {
  // Invoices Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.invoices.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

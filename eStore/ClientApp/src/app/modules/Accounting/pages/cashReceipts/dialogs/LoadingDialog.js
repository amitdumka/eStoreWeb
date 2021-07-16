import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//cashReceipt
//CashReceipt


export function CashReceiptsLoadingDialog() {
  // CashReceipts Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cashReceipts.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

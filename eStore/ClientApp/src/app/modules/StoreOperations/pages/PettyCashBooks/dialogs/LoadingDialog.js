import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//pettyCashBook
//PettyCashBook


export function PettyCashBooksLoadingDialog() {
  // PettyCashBooks Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.pettyCashBooks.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

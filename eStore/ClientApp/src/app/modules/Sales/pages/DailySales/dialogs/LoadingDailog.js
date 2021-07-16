import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//dailySale
//DailySale


export function DataLoadingDialog() {
  // DailySales Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.dailySales.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

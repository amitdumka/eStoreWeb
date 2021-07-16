import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//dueRecovered
//DueRecovered


export function DueRecoveredsLoadingDialog() {
  // DueRecovereds Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.dueRecovereds.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//transcationMode
//TranscationMode


export function TranscationModesLoadingDialog() {
  // TranscationModes Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.transcationModes.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

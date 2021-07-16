import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//Parties
//parties
//Party
//party



export function PartiesLoadingDialog() {
  // Parties Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.parties.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

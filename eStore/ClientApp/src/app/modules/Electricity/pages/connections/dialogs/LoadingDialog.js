import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";


//Connection
//connection

export function ConnectionsLoadingDialog() {
  // Connections Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.connections.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

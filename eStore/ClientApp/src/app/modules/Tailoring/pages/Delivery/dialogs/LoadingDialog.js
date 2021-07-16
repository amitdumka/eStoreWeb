import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//Deliveries
//deliveries
//Delivery
//delivery



export function DeliveriesLoadingDialog() {
  // Deliveries Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.deliveries.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

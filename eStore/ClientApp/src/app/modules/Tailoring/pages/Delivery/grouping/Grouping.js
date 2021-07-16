import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//Deliveries
//deliveries
//Delivery
//delivery


export function DeliveriesGrouping() {
  // Deliveries UI Context
  const deliveriesUIContext = useUIContext();
  const deliveriesUIProps = useMemo(() => {
    return {
      ids: deliveriesUIContext.ids,
      setIds: deliveriesUIContext.setIds,
      openDeleteDeliveriesDialog: deliveriesUIContext.openDeleteDeliveriesDialog,
      openFetchDeliveriesDialog: deliveriesUIContext.openFetchDeliveriesDialog,
      openUpdateDeliveriesStatusDialog:
        deliveriesUIContext.openUpdateDeliveriesStatusDialog,
    };
  }, [deliveriesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{deliveriesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={deliveriesUIProps.openDeleteDeliveriesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={deliveriesUIProps.openFetchDeliveriesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={deliveriesUIProps.openUpdateDeliveriesStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

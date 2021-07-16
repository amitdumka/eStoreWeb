import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//Rent
//rent


export function RentsGrouping() {
  // Rents UI Context
  const rentsUIContext = useUIContext();
  const rentsUIProps = useMemo(() => {
    return {
      ids: rentsUIContext.ids,
      setIds: rentsUIContext.setIds,
      openDeleteRentsDialog: rentsUIContext.openDeleteRentsDialog,
      openFetchRentsDialog: rentsUIContext.openFetchRentsDialog,
      openUpdateRentsStatusDialog:
        rentsUIContext.openUpdateRentsStatusDialog,
    };
  }, [rentsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{rentsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={rentsUIProps.openDeleteRentsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={rentsUIProps.openFetchRentsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={rentsUIProps.openUpdateRentsStatusDialog}
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

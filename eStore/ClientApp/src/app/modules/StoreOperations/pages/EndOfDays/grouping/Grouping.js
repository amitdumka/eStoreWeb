import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//EndOfDay
//endOfDay


export function EndOfDaysGrouping() {
  // EndOfDays UI Context
  const endOfDaysUIContext = useUIContext();
  const endOfDaysUIProps = useMemo(() => {
    return {
      ids: endOfDaysUIContext.ids,
      setIds: endOfDaysUIContext.setIds,
      openDeleteEndOfDaysDialog: endOfDaysUIContext.openDeleteEndOfDaysDialog,
      openFetchEndOfDaysDialog: endOfDaysUIContext.openFetchEndOfDaysDialog,
      openUpdateEndOfDaysStatusDialog:
        endOfDaysUIContext.openUpdateEndOfDaysStatusDialog,
    };
  }, [endOfDaysUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{endOfDaysUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={endOfDaysUIProps.openDeleteEndOfDaysDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={endOfDaysUIProps.openFetchEndOfDaysDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={endOfDaysUIProps.openUpdateEndOfDaysStatusDialog}
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

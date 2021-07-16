import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//DayClosing
//dayClosing


export function DayClosingsGrouping() {
  // DayClosings UI Context
  const dayClosingsUIContext = useUIContext();
  const dayClosingsUIProps = useMemo(() => {
    return {
      ids: dayClosingsUIContext.ids,
      setIds: dayClosingsUIContext.setIds,
      openDeleteDayClosingsDialog: dayClosingsUIContext.openDeleteDayClosingsDialog,
      openFetchDayClosingsDialog: dayClosingsUIContext.openFetchDayClosingsDialog,
      openUpdateDayClosingsStatusDialog:
        dayClosingsUIContext.openUpdateDayClosingsStatusDialog,
    };
  }, [dayClosingsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{dayClosingsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={dayClosingsUIProps.openDeleteDayClosingsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={dayClosingsUIProps.openFetchDayClosingsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={dayClosingsUIProps.openUpdateDayClosingsStatusDialog}
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

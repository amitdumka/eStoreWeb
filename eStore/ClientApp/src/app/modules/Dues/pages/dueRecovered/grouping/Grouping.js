import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//DueRecovered
//dueRecovered


export function DueRecoveredsGrouping() {
  // DueRecovereds UI Context
  const dueRecoveredsUIContext = useUIContext();
  const dueRecoveredsUIProps = useMemo(() => {
    return {
      ids: dueRecoveredsUIContext.ids,
      setIds: dueRecoveredsUIContext.setIds,
      openDeleteDueRecoveredsDialog: dueRecoveredsUIContext.openDeleteDueRecoveredsDialog,
      openFetchDueRecoveredsDialog: dueRecoveredsUIContext.openFetchDueRecoveredsDialog,
      openUpdateDueRecoveredsStatusDialog:
        dueRecoveredsUIContext.openUpdateDueRecoveredsStatusDialog,
    };
  }, [dueRecoveredsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{dueRecoveredsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={dueRecoveredsUIProps.openDeleteDueRecoveredsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={dueRecoveredsUIProps.openFetchDueRecoveredsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={dueRecoveredsUIProps.openUpdateDueRecoveredsStatusDialog}
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

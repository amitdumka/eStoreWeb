import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";


//Connection
//connection

export function ConnectionsGrouping() {
  // Connections UI Context
  const connectionsUIContext = useUIContext();
  const connectionsUIProps = useMemo(() => {
    return {
      ids: connectionsUIContext.ids,
      setIds: connectionsUIContext.setIds,
      openDeleteConnectionsDialog: connectionsUIContext.openDeleteConnectionsDialog,
      openFetchConnectionsDialog: connectionsUIContext.openFetchConnectionsDialog,
      openUpdateConnectionsStatusDialog:
        connectionsUIContext.openUpdateConnectionsStatusDialog,
    };
  }, [connectionsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{connectionsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={connectionsUIProps.openDeleteConnectionsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={connectionsUIProps.openFetchConnectionsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={connectionsUIProps.openUpdateConnectionsStatusDialog}
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

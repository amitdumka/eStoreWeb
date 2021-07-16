import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//PettyCashBook
//pettyCashBook


export function PettyCashBooksGrouping() {
  // PettyCashBooks UI Context
  const pettyCashBooksUIContext = useUIContext();
  const pettyCashBooksUIProps = useMemo(() => {
    return {
      ids: pettyCashBooksUIContext.ids,
      setIds: pettyCashBooksUIContext.setIds,
      openDeletePettyCashBooksDialog: pettyCashBooksUIContext.openDeletePettyCashBooksDialog,
      openFetchPettyCashBooksDialog: pettyCashBooksUIContext.openFetchPettyCashBooksDialog,
      openUpdatePettyCashBooksStatusDialog:
        pettyCashBooksUIContext.openUpdatePettyCashBooksStatusDialog,
    };
  }, [pettyCashBooksUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{pettyCashBooksUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={pettyCashBooksUIProps.openDeletePettyCashBooksDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={pettyCashBooksUIProps.openFetchPettyCashBooksDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={pettyCashBooksUIProps.openUpdatePettyCashBooksStatusDialog}
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

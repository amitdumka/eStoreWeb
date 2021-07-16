import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//Receipt
//receipt


export function ReceiptsGrouping() {
  // Receipts UI Context
  const receiptsUIContext = useUIContext();
  const receiptsUIProps = useMemo(() => {
    return {
      ids: receiptsUIContext.ids,
      setIds: receiptsUIContext.setIds,
      openDeleteReceiptsDialog: receiptsUIContext.openDeleteReceiptsDialog,
      openFetchReceiptsDialog: receiptsUIContext.openFetchReceiptsDialog,
      openUpdateReceiptsStatusDialog:
        receiptsUIContext.openUpdateReceiptsStatusDialog,
    };
  }, [receiptsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{receiptsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={receiptsUIProps.openDeleteReceiptsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={receiptsUIProps.openFetchReceiptsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={receiptsUIProps.openUpdateReceiptsStatusDialog}
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

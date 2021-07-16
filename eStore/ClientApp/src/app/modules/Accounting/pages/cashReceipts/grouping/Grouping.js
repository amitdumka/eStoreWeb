import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//CashReceipt
//cashReceipt


export function CashReceiptsGrouping() {
  // CashReceipts UI Context
  const cashReceiptsUIContext = useUIContext();
  const cashReceiptsUIProps = useMemo(() => {
    return {
      ids: cashReceiptsUIContext.ids,
      setIds: cashReceiptsUIContext.setIds,
      openDeleteCashReceiptsDialog: cashReceiptsUIContext.openDeleteCashReceiptsDialog,
      openFetchCashReceiptsDialog: cashReceiptsUIContext.openFetchCashReceiptsDialog,
      openUpdateCashReceiptsStatusDialog:
        cashReceiptsUIContext.openUpdateCashReceiptsStatusDialog,
    };
  }, [cashReceiptsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{cashReceiptsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={cashReceiptsUIProps.openDeleteCashReceiptsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={cashReceiptsUIProps.openFetchCashReceiptsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={cashReceiptsUIProps.openUpdateCashReceiptsStatusDialog}
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

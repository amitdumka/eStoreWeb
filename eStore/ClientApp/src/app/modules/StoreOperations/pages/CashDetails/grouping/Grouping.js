import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//CashDetail
//cashDetail


export function CashDetailsGrouping() {
  // CashDetails UI Context
  const cashDetailsUIContext = useUIContext();
  const cashDetailsUIProps = useMemo(() => {
    return {
      ids: cashDetailsUIContext.ids,
      setIds: cashDetailsUIContext.setIds,
      openDeleteCashDetailsDialog: cashDetailsUIContext.openDeleteCashDetailsDialog,
      openFetchCashDetailsDialog: cashDetailsUIContext.openFetchCashDetailsDialog,
      openUpdateCashDetailsStatusDialog:
        cashDetailsUIContext.openUpdateCashDetailsStatusDialog,
    };
  }, [cashDetailsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{cashDetailsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={cashDetailsUIProps.openDeleteCashDetailsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={cashDetailsUIProps.openFetchCashDetailsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={cashDetailsUIProps.openUpdateCashDetailsStatusDialog}
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

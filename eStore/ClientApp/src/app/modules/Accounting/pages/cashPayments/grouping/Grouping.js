import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//CashPayment
//cashPayment


export function CashPaymentsGrouping() {
  // CashPayments UI Context
  const cashPaymentsUIContext = useUIContext();
  const cashPaymentsUIProps = useMemo(() => {
    return {
      ids: cashPaymentsUIContext.ids,
      setIds: cashPaymentsUIContext.setIds,
      openDeleteCashPaymentsDialog: cashPaymentsUIContext.openDeleteCashPaymentsDialog,
      openFetchCashPaymentsDialog: cashPaymentsUIContext.openFetchCashPaymentsDialog,
      openUpdateCashPaymentsStatusDialog:
        cashPaymentsUIContext.openUpdateCashPaymentsStatusDialog,
    };
  }, [cashPaymentsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{cashPaymentsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={cashPaymentsUIProps.openDeleteCashPaymentsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={cashPaymentsUIProps.openFetchCashPaymentsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={cashPaymentsUIProps.openUpdateCashPaymentsStatusDialog}
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

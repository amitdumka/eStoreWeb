import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//Bill
//bill


export function BillsGrouping() {
  // Bills UI Context
  const billsUIContext = useUIContext();
  const billsUIProps = useMemo(() => {
    return {
      ids: billsUIContext.ids,
      setIds: billsUIContext.setIds,
      openDeleteBillsDialog: billsUIContext.openDeleteBillsDialog,
      openFetchBillsDialog: billsUIContext.openFetchBillsDialog,
      openUpdateBillsStatusDialog:
        billsUIContext.openUpdateBillsStatusDialog,
    };
  }, [billsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{billsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={billsUIProps.openDeleteBillsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={billsUIProps.openFetchBillsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={billsUIProps.openUpdateBillsStatusDialog}
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

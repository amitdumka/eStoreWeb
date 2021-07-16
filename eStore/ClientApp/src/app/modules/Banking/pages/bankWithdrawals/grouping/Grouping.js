import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";


//BankWithdrawal
//bankWithdrawal


export function BankWithdrawalsGrouping() {
  // BankWithdrawals UI Context
  const bankWithdrawalsUIContext = useUIContext();
  const bankWithdrawalsUIProps = useMemo(() => {
    return {
      ids: bankWithdrawalsUIContext.ids,
      setIds: bankWithdrawalsUIContext.setIds,
      openDeleteBankWithdrawalsDialog: bankWithdrawalsUIContext.openDeleteBankWithdrawalsDialog,
      openFetchBankWithdrawalsDialog: bankWithdrawalsUIContext.openFetchBankWithdrawalsDialog,
      openUpdateBankWithdrawalsStatusDialog:
        bankWithdrawalsUIContext.openUpdateBankWithdrawalsStatusDialog,
    };
  }, [bankWithdrawalsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{bankWithdrawalsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={bankWithdrawalsUIProps.openDeleteBankWithdrawalsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={bankWithdrawalsUIProps.openFetchBankWithdrawalsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={bankWithdrawalsUIProps.openUpdateBankWithdrawalsStatusDialog}
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

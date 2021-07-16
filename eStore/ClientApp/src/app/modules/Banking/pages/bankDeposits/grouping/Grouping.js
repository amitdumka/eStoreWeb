import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";


//BankDeposit
//bankDeposit


export function BankDepositsGrouping() {
  // BankDeposits UI Context
  const bankDepositsUIContext = useUIContext();
  const bankDepositsUIProps = useMemo(() => {
    return {
      ids: bankDepositsUIContext.ids,
      setIds: bankDepositsUIContext.setIds,
      openDeleteBankDepositsDialog: bankDepositsUIContext.openDeleteBankDepositsDialog,
      openFetchBankDepositsDialog: bankDepositsUIContext.openFetchBankDepositsDialog,
      openUpdateBankDepositsStatusDialog:
        bankDepositsUIContext.openUpdateBankDepositsStatusDialog,
    };
  }, [bankDepositsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{bankDepositsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={bankDepositsUIProps.openDeleteBankDepositsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={bankDepositsUIProps.openFetchBankDepositsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={bankDepositsUIProps.openUpdateBankDepositsStatusDialog}
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

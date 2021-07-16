import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//BankAccount
//bankAccount


export function BankAccountsGrouping() {
  // BankAccounts UI Context
  const bankAccountsUIContext = useUIContext();
  const bankAccountsUIProps = useMemo(() => {
    return {
      ids: bankAccountsUIContext.ids,
      setIds: bankAccountsUIContext.setIds,
      openDeleteBankAccountsDialog: bankAccountsUIContext.openDeleteBankAccountsDialog,
      openFetchBankAccountsDialog: bankAccountsUIContext.openFetchBankAccountsDialog,
      openUpdateBankAccountsStatusDialog:
        bankAccountsUIContext.openUpdateBankAccountsStatusDialog,
    };
  }, [bankAccountsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{bankAccountsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={bankAccountsUIProps.openDeleteBankAccountsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={bankAccountsUIProps.openFetchBankAccountsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={bankAccountsUIProps.openUpdateBankAccountsStatusDialog}
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

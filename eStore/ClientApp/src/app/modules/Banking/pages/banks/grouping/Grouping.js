import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";


//Bank
//bank

export function BanksGrouping() {
  // Banks UI Context
  const banksUIContext = useUIContext();
  const banksUIProps = useMemo(() => {
    return {
      ids: banksUIContext.ids,
      setIds: banksUIContext.setIds,
      openDeleteBanksDialog: banksUIContext.openDeleteBanksDialog,
      openFetchBanksDialog: banksUIContext.openFetchBanksDialog,
      openUpdateBanksStatusDialog:
        banksUIContext.openUpdateBanksStatusDialog,
    };
  }, [banksUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{banksUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={banksUIProps.openDeleteBanksDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={banksUIProps.openFetchBanksDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={banksUIProps.openUpdateBanksStatusDialog}
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

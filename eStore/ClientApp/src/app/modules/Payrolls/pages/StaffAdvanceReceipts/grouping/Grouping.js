import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//StaffAdvanceReceipt
//staffAdvanceReceipt


export function StaffAdvanceReceiptsGrouping() {
  // StaffAdvanceReceipts UI Context
  const staffAdvanceReceiptsUIContext = useUIContext();
  const staffAdvanceReceiptsUIProps = useMemo(() => {
    return {
      ids: staffAdvanceReceiptsUIContext.ids,
      setIds: staffAdvanceReceiptsUIContext.setIds,
      openDeleteStaffAdvanceReceiptsDialog: staffAdvanceReceiptsUIContext.openDeleteStaffAdvanceReceiptsDialog,
      openFetchStaffAdvanceReceiptsDialog: staffAdvanceReceiptsUIContext.openFetchStaffAdvanceReceiptsDialog,
      openUpdateStaffAdvanceReceiptsStatusDialog:
        staffAdvanceReceiptsUIContext.openUpdateStaffAdvanceReceiptsStatusDialog,
    };
  }, [staffAdvanceReceiptsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{staffAdvanceReceiptsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={staffAdvanceReceiptsUIProps.openDeleteStaffAdvanceReceiptsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={staffAdvanceReceiptsUIProps.openFetchStaffAdvanceReceiptsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={staffAdvanceReceiptsUIProps.openUpdateStaffAdvanceReceiptsStatusDialog}
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

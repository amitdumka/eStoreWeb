import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//SalaryPayment
//salaryPayment


export function SalaryPaymentsGrouping() {
  // SalaryPayments UI Context
  const salaryPaymentsUIContext = useUIContext();
  const salaryPaymentsUIProps = useMemo(() => {
    return {
      ids: salaryPaymentsUIContext.ids,
      setIds: salaryPaymentsUIContext.setIds,
      openDeleteSalaryPaymentsDialog: salaryPaymentsUIContext.openDeleteSalaryPaymentsDialog,
      openFetchSalaryPaymentsDialog: salaryPaymentsUIContext.openFetchSalaryPaymentsDialog,
      openUpdateSalaryPaymentsStatusDialog:
        salaryPaymentsUIContext.openUpdateSalaryPaymentsStatusDialog,
    };
  }, [salaryPaymentsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{salaryPaymentsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={salaryPaymentsUIProps.openDeleteSalaryPaymentsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={salaryPaymentsUIProps.openFetchSalaryPaymentsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={salaryPaymentsUIProps.openUpdateSalaryPaymentsStatusDialog}
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

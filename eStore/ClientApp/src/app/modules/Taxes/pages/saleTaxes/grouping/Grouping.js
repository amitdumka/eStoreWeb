import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//SaleTaxes
//saleTaxes
//SaleTax
//saleTax


export function SaleTaxesGrouping() {
  // SaleTaxes UI Context
  const saleTaxesUIContext = useUIContext();
  const saleTaxesUIProps = useMemo(() => {
    return {
      ids: saleTaxesUIContext.ids,
      setIds: saleTaxesUIContext.setIds,
      openDeleteSaleTaxesDialog: saleTaxesUIContext.openDeleteSaleTaxesDialog,
      openFetchSaleTaxesDialog: saleTaxesUIContext.openFetchSaleTaxesDialog,
      openUpdateSaleTaxesStatusDialog:
        saleTaxesUIContext.openUpdateSaleTaxesStatusDialog,
    };
  }, [saleTaxesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{saleTaxesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={saleTaxesUIProps.openDeleteSaleTaxesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={saleTaxesUIProps.openFetchSaleTaxesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={saleTaxesUIProps.openUpdateSaleTaxesStatusDialog}
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

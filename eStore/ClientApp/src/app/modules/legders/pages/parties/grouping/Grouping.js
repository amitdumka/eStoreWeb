import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//Parties
//parties
//Party
//party


export function PartiesGrouping() {
  // Parties UI Context
  const partiesUIContext = useUIContext();
  const partiesUIProps = useMemo(() => {
    return {
      ids: partiesUIContext.ids,
      setIds: partiesUIContext.setIds,
      openDeletePartiesDialog: partiesUIContext.openDeletePartiesDialog,
      openFetchPartiesDialog: partiesUIContext.openFetchPartiesDialog,
      openUpdatePartiesStatusDialog:
        partiesUIContext.openUpdatePartiesStatusDialog,
    };
  }, [partiesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{partiesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={partiesUIProps.openDeletePartiesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={partiesUIProps.openFetchPartiesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={partiesUIProps.openUpdatePartiesStatusDialog}
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

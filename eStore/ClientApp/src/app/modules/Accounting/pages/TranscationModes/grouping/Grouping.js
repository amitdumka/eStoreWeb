import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//TranscationMode
//transcationMode


export function TranscationModesGrouping() {
  // TranscationModes UI Context
  const transcationModesUIContext = useUIContext();
  const transcationModesUIProps = useMemo(() => {
    return {
      ids: transcationModesUIContext.ids,
      setIds: transcationModesUIContext.setIds,
      openDeleteTranscationModesDialog: transcationModesUIContext.openDeleteTranscationModesDialog,
      openFetchTranscationModesDialog: transcationModesUIContext.openFetchTranscationModesDialog,
      openUpdateTranscationModesStatusDialog:
        transcationModesUIContext.openUpdateTranscationModesStatusDialog,
    };
  }, [transcationModesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{transcationModesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={transcationModesUIProps.openDeleteTranscationModesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={transcationModesUIProps.openFetchTranscationModesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={transcationModesUIProps.openUpdateTranscationModesStatusDialog}
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

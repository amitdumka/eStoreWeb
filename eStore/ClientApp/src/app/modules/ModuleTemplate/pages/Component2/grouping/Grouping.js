import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";


//RentedLocation
//rentedLocation

export function RentedLocationsGrouping() {
  // RentedLocations UI Context
  const rentedLocationsUIContext = useUIContext();
  const rentedLocationsUIProps = useMemo(() => {
    return {
      ids: rentedLocationsUIContext.ids,
      setIds: rentedLocationsUIContext.setIds,
      openDeleteRentedLocationsDialog: rentedLocationsUIContext.openDeleteRentedLocationsDialog,
      openFetchRentedLocationsDialog: rentedLocationsUIContext.openFetchRentedLocationsDialog,
      openUpdateRentedLocationsStatusDialog:
        rentedLocationsUIContext.openUpdateRentedLocationsStatusDialog,
    };
  }, [rentedLocationsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{rentedLocationsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={rentedLocationsUIProps.openDeleteRentedLocationsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={rentedLocationsUIProps.openFetchRentedLocationsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={rentedLocationsUIProps.openUpdateRentedLocationsStatusDialog}
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

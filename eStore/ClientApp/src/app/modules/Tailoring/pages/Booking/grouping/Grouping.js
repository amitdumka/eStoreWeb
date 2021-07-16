import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

//booking
//Booking

export function BookingsGrouping() {
  // Bookings UI Context
  const bookingsUIContext = useUIContext();
  const bookingsUIProps = useMemo(() => {
    return {
      ids: bookingsUIContext.ids,
      setIds: bookingsUIContext.setIds,
      openDeleteBookingsDialog: bookingsUIContext.openDeleteBookingsDialog,
      openFetchBookingsDialog: bookingsUIContext.openFetchBookingsDialog,
      openUpdateBookingsStatusDialog:
        bookingsUIContext.openUpdateBookingsStatusDialog,
    };
  }, [bookingsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{bookingsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={bookingsUIProps.openDeleteBookingsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={bookingsUIProps.openFetchBookingsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={bookingsUIProps.openUpdateBookingsStatusDialog}
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

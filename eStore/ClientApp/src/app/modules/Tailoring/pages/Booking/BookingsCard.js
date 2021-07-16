import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { BookingsFilter } from "./filter/Filter";
import { BookingsTable } from "./table/Table";
import { BookingsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//booking
//Booking

export function BookingsCard() {
  const bookingsUIContext = useUIContext();
  const bookingsUIProps = useMemo(() => {
    return {
      ids: bookingsUIContext.ids,
      newBookingButtonClick: bookingsUIContext.newBookingButtonClick,
    };
  }, [bookingsUIContext]);

  return (
    <Card>
      <CardHeader title="Bookings list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={bookingsUIProps.newBookingButtonClick}
          >
            New Booking
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BookingsFilter />
        {bookingsUIProps.ids.length > 0 && <BookingsGrouping />}
        <BookingsTable />
      </CardBody>
    </Card>
  );
}

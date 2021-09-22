import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DuplicateBookingTable } from "./Table";

export function DuplicateBookingCard() {
  return (
    <Card>
      <CardHeader title="Duplicate Booking list">
        <CardHeaderToolbar></CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <BookingsFilter />
        {uiProps.ids.length > 0 && <BookingsGrouping />} */}
        <DuplicateBookingTable />
      </CardBody>
    </Card>
  );
}

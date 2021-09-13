import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { RentedLocationsFilter } from "./filter/Filter";
import { RentedLocationsTable } from "./table/Table";
import { RentedLocationsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";


//RentedLocation
//rentedLocation

export function RentedLocationsCard() {
  const rentedLocationsUIContext = useUIContext();
  const rentedLocationsUIProps = useMemo(() => {
    return {
      ids: rentedLocationsUIContext.ids,
      newRentedLocationButtonClick: rentedLocationsUIContext.newRentedLocationButtonClick,
    };
  }, [rentedLocationsUIContext]);

  return (
    <Card>
      <CardHeader title="Rented Locations list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={rentedLocationsUIProps.newRentedLocationButtonClick}
          >
            New Rented Location
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RentedLocationsFilter />
        {rentedLocationsUIProps.ids.length > 0 && <RentedLocationsGrouping />}
        <RentedLocationsTable />
      </CardBody>
    </Card>
  );
}

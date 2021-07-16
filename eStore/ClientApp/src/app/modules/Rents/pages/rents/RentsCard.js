import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { RentsFilter } from "./filter/Filter";
import { RentsTable } from "./table/Table";
import { RentsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//Rent
//rent


export function RentsCard() {
  const RentsUIContext = useUIContext();
  const RentsUIProps = useMemo(() => {
    return {
      ids: RentsUIContext.ids,
      newRentButtonClick: RentsUIContext.newRentButtonClick,
    };
  }, [RentsUIContext]);

  return (
    <Card>
      <CardHeader title="Rent Payment list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={RentsUIProps.newRentButtonClick}
          >
            New Payment
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RentsFilter />
        {RentsUIProps.ids.length > 0 && <RentsGrouping />}
        <RentsTable />
      </CardBody>
    </Card>
  );
}

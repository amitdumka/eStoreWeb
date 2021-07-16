import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { EndOfDaysFilter } from "./filter/Filter";
import { EndOfDaysTable } from "./table/Table";
import { EndOfDaysGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//EndOfDay
//endOfDay


export function EndOfDaysCard() {
  const EndOfDaysUIContext = useUIContext();
  const EndOfDaysUIProps = useMemo(() => {
    return {
      ids: EndOfDaysUIContext.ids,
      newEndOfDayButtonClick: EndOfDaysUIContext.newEndOfDayButtonClick,
    };
  }, [EndOfDaysUIContext]);

  return (
    <Card>
      <CardHeader title="EndOfDay Payment list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={EndOfDaysUIProps.newEndOfDayButtonClick}
          >
            New Payment
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EndOfDaysFilter />
        {EndOfDaysUIProps.ids.length > 0 && <EndOfDaysGrouping />}
        <EndOfDaysTable />
      </CardBody>
    </Card>
  );
}

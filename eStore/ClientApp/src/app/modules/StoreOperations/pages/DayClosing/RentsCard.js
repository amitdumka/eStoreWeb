import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DayClosingsFilter } from "./filter/Filter";
import { DayClosingsTable } from "./table/Table";
import { DayClosingsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//DayClosing
//dayClosing


export function DayClosingsCard() {
  const DayClosingsUIContext = useUIContext();
  const DayClosingsUIProps = useMemo(() => {
    return {
      ids: DayClosingsUIContext.ids,
      newDayClosingButtonClick: DayClosingsUIContext.newDayClosingButtonClick,
    };
  }, [DayClosingsUIContext]);

  return (
    <Card>
      <CardHeader title="DayClosing Payment list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={DayClosingsUIProps.newDayClosingButtonClick}
          >
            New Payment
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DayClosingsFilter />
        {DayClosingsUIProps.ids.length > 0 && <DayClosingsGrouping />}
        <DayClosingsTable />
      </CardBody>
    </Card>
  );
}

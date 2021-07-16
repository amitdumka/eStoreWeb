import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { AttendancesFilter } from "./filter/Filter";
import { AttendancesTable } from "./table/Table";
import { AttendancesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

export function AttendancesCard() {
  const AttendancesUIContext = useUIContext();
  const AttendancesUIProps = useMemo(() => {
    return {
      ids: AttendancesUIContext.ids,
      newAttendanceButtonClick: AttendancesUIContext.newAttendanceButtonClick,
    };
  }, [AttendancesUIContext]);

  return (
    <Card>
      <CardHeader title="Attendances list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={AttendancesUIProps.newAttendanceButtonClick}
          >
            New Attendance
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AttendancesFilter />
        {AttendancesUIProps.ids.length > 0 && <AttendancesGrouping />}
        <AttendancesTable />
      </CardBody>
    </Card>
  );
}

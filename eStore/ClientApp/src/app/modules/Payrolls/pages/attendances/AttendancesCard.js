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

export function AttendancesCard({yesterday}) {
  const AttendancesUIContext = useUIContext();
  const AttendancesUIProps = useMemo(() => {
    return {
      ids: AttendancesUIContext.ids,
      newAttendanceButtonClick: AttendancesUIContext.newAttendanceButtonClick,
      yesterdayAttendanceButtonClick:AttendancesUIContext.yesterdayAttendanceButtonClick
    };
  }, [AttendancesUIContext]);

  return (
    <Card>
      <CardHeader title="Attendances list">
        <CardHeaderToolbar>
        {/* <button
            type="button"
            className="btn btn-success mr-4"
            onClick={AttendancesUIProps.yesterdayAttendanceButtonClick}
          >
            {yesterday && yesterday?"Today" : "Yesterday"} Attendance
          </button> */}
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
        <AttendancesTable yesterday={yesterday} />
      </CardBody>
    </Card>
  );
}

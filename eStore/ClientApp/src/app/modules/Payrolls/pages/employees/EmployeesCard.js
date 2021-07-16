import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { EmployeesFilter } from "./filter/Filter";
import { EmployeesTable } from "./table/Table";
import { EmployeesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

export function EmployeesCard() {
  const employeesUIContext = useUIContext();
  const employeesUIProps = useMemo(() => {
    return {
      ids: employeesUIContext.ids,
      newEmployeeButtonClick: employeesUIContext.newEmployeeButtonClick,
    };
  }, [employeesUIContext]);

  return (
    <Card>
      <CardHeader title="Employees list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeesUIProps.newEmployeeButtonClick}
          >
            New Employee
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeesFilter />
        {employeesUIProps.ids.length > 0 && <EmployeesGrouping />}
        <EmployeesTable />
      </CardBody>
    </Card>
  );
}

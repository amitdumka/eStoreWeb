import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SalariesFilter } from "./filter/Filter";
import { SalariesTable } from "./table/Table";
import { SalariesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

export function SalariesCard() {
  const SalariesUIContext = useUIContext();
  const SalariesUIProps = useMemo(() => {
    return {
      ids: SalariesUIContext.ids,
      newSalaryButtonClick: SalariesUIContext.newSalaryButtonClick,
    };
  }, [SalariesUIContext]);

  return (
    <Card>
      <CardHeader title="Salaries list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={SalariesUIProps.newSalaryButtonClick}
          >
            New Salary
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SalariesFilter />
        {SalariesUIProps.ids.length > 0 && <SalariesGrouping />}
        <SalariesTable />
      </CardBody>
    </Card>
  );
}

import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DueRecoveredsFilter } from "./filter/Filter";
import { DueRecoveredsTable } from "./table/Table";
import { DueRecoveredsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//DueRecovered
//dueRecovered

export function DueRecoveredsCard() {
  const DueRecoveredsUIContext = useUIContext();
  const DueRecoveredsUIProps = useMemo(() => {
    return {
      ids: DueRecoveredsUIContext.ids,
      newDueRecoveredButtonClick: DueRecoveredsUIContext.newDueRecoveredButtonClick,
    };
  }, [DueRecoveredsUIContext]);

  return (
    <Card>
      <CardHeader title="DueRecovered list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary btn-rounded"
            onClick={DueRecoveredsUIProps.newDueRecoveredButtonClick}
          >
            New DueRecovered
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
         <DueRecoveredsFilter /> 
        {DueRecoveredsUIProps.ids.length > 0 && <DueRecoveredsGrouping />}
        <DueRecoveredsTable />
      </CardBody>
    </Card>
  );
}

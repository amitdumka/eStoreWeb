import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DuesListsFilter } from "./filter/Filter";
import { DuesListsTable } from "./table/Table";
import { DuesListsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//DuesList
//duesList


export function DuesListsCard() {
  const DuesListsUIContext = useUIContext();
  const DuesListsUIProps = useMemo(() => {
    return {
      ids: DuesListsUIContext.ids,
      newDuesListButtonClick: DuesListsUIContext.newDuesListButtonClick,
    };
  }, [DuesListsUIContext]);

  return (
    <Card>
      <CardHeader title="DuesList list">
        <CardHeaderToolbar>
          {/* <button
            type="button"
            className="btn btn-primary btn-rounded"
            onClick={DuesListsUIProps.newDuesListButtonClick}
          >
            New DuesList
          </button> */}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
         <DuesListsFilter /> 
        {DuesListsUIProps.ids.length > 0 && <DuesListsGrouping />}
        <DuesListsTable />
      </CardBody>
    </Card>
  );
}

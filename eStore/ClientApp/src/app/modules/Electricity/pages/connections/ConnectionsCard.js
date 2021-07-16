import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ConnectionsFilter } from "./filter/Filter";
import { ConnectionsTable } from "./table/Table";
import { ConnectionsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";


//Connection
//connection

export function ConnectionsCard() {
  const connectionsUIContext = useUIContext();
  const connectionsUIProps = useMemo(() => {
    return {
      ids: connectionsUIContext.ids,
      newConnectionButtonClick: connectionsUIContext.newConnectionButtonClick,
    };
  }, [connectionsUIContext]);

  return (
    <Card>
      <CardHeader title="Connection list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={connectionsUIProps.newConnectionButtonClick}
          >
            New Connection
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ConnectionsFilter />
        {connectionsUIProps.ids.length > 0 && <ConnectionsGrouping />}
        <ConnectionsTable />
      </CardBody>
    </Card>
  );
}

import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PartiesFilter } from "./filter/Filter";
import { PartiesTable } from "./table/Table";
import { PartiesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";
import ExportToExcel from "../../../../../_estore/Utilites/ExportData/ExportToExcel";

//Parties
//parties
//Party
//party

export function PartiesCard() {
  const PartiesUIContext = useUIContext();
  const PartiesUIProps = useMemo(() => {
    return {
      ids: PartiesUIContext.ids,
      newPartyButtonClick: PartiesUIContext.newPartyButtonClick,
    };
  }, [PartiesUIContext]);

  return (
    <Card>
      <CardHeader title="Party list">
        <CardHeaderToolbar>
          <ExportToExcel />
          <button
            type="button"
            className="btn btn-primary btn-sm mr-2 ml-2"
            onClick={PartiesUIProps.newPartyButtonClick}
          >
            New Party
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PartiesFilter />
        {PartiesUIProps.ids.length > 0 && <PartiesGrouping />}
        <PartiesTable />
      </CardBody>
    </Card>
  );
}

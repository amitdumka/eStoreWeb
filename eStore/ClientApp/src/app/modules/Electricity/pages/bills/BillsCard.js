import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { BillsFilter } from "./filter/Filter";
import { BillsTable } from "./table/Table";
import { BillsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//Bill
//bill


export function BillsCard() {
  const BillsUIContext = useUIContext();
  const BillsUIProps = useMemo(() => {
    return {
      ids: BillsUIContext.ids,
      newBillButtonClick: BillsUIContext.newBillButtonClick,
    };
  }, [BillsUIContext]);

  return (
    <Card>
      <CardHeader title="Bill list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={BillsUIProps.newBillButtonClick}
          >
            New Bill
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BillsFilter />
        {BillsUIProps.ids.length > 0 && <BillsGrouping />}
        <BillsTable />
      </CardBody>
    </Card>
  );
}

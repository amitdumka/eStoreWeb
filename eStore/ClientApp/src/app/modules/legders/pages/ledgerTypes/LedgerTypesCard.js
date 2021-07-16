import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { LedgerTypesFilter } from "./filter/Filter";
import { LedgerTypesTable } from "./table/Table";
import { LedgerTypesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//ledgerType
//LedgerType

export function LedgerTypesCard() {
  const ledgerTypesUIContext = useUIContext();
  const ledgerTypesUIProps = useMemo(() => {
    return {
      ids: ledgerTypesUIContext.ids,
      newLedgerTypeButtonClick: ledgerTypesUIContext.newLedgerTypeButtonClick,
    };
  }, [ledgerTypesUIContext]);

  return (
    <Card>
      <CardHeader title="LedgerTypes list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={ledgerTypesUIProps.newLedgerTypeButtonClick}
          >
            New LedgerType
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <LedgerTypesFilter />
        {ledgerTypesUIProps.ids.length > 0 && <LedgerTypesGrouping />}
        <LedgerTypesTable />
      </CardBody>
    </Card>
  );
}

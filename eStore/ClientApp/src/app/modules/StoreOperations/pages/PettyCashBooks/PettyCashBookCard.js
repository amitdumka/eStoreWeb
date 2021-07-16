import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PettyCashBooksFilter } from "./filter/Filter";
import { PettyCashBooksTable } from "./table/Table";
import { PettyCashBooksGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//PettyCashBook
//pettyCashBook


export function PettyCashBookCard() {
  const PettyCashBooksUIContext = useUIContext();
  const PettyCashBooksUIProps = useMemo(() => {
    return {
      ids: PettyCashBooksUIContext.ids,
      newPettyCashBookButtonClick: PettyCashBooksUIContext.newPettyCashBookButtonClick,
    };
  }, [PettyCashBooksUIContext]);

  return (
    <Card>
      <CardHeader title="Petty Cash Book  list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={PettyCashBooksUIProps.newPettyCashBookButtonClick}
          >
            New Slip
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PettyCashBooksFilter />
        {PettyCashBooksUIProps.ids.length > 0 && <PettyCashBooksGrouping />}
        <PettyCashBooksTable />
      </CardBody>
    </Card>
  );
}

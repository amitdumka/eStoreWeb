import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CashDetailsFilter } from "./filter/Filter";
import { CashDetailsTable } from "./table/Table";
import { CashDetailsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//CashDetail
//cashDetail


export function CashDetailsCard() {
  const CashDetailsUIContext = useUIContext();
  const CashDetailsUIProps = useMemo(() => {
    return {
      ids: CashDetailsUIContext.ids,
      newCashDetailButtonClick: CashDetailsUIContext.newCashDetailButtonClick,
    };
  }, [CashDetailsUIContext]);

  return (
    <Card>
      <CardHeader title="CashDetail Payment list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={CashDetailsUIProps.newCashDetailButtonClick}
          >
            New Payment
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CashDetailsFilter />
        {CashDetailsUIProps.ids.length > 0 && <CashDetailsGrouping />}
        <CashDetailsTable />
      </CardBody>
    </Card>
  );
}

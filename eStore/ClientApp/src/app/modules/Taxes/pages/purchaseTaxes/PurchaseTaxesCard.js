import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PurchaseTaxesFilter } from "./filter/Filter";
import { PurchaseTaxesTable } from "./table/Table";
import { PurchaseTaxesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//purchaseTax
//PurchaseTax

export function PurchaseTaxesCard() {
  const purchaseTaxesUIContext = useUIContext();
  const purchaseTaxesUIProps = useMemo(() => {
    return {
      ids: purchaseTaxesUIContext.ids,
      newPurchaseTaxButtonClick: purchaseTaxesUIContext.newPurchaseTaxButtonClick,
    };
  }, [purchaseTaxesUIContext]);

  return (
    <Card>
      <CardHeader title="PurchaseTaxes list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={purchaseTaxesUIProps.newPurchaseTaxButtonClick}
          >
            New PurchaseTax
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PurchaseTaxesFilter />
        {purchaseTaxesUIProps.ids.length > 0 && <PurchaseTaxesGrouping />}
        <PurchaseTaxesTable />
      </CardBody>
    </Card>
  );
}

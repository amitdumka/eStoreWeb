import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SaleTaxesFilter } from "./filter/Filter";
import { SaleTaxesTable } from "./table/Table";
import { SaleTaxesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//SaleTaxes
//saleTaxes
//SaleTax
//saleTax

export function SaleTaxesCard() {
  const SaleTaxesUIContext = useUIContext();
  const SaleTaxesUIProps = useMemo(() => {
    return {
      ids: SaleTaxesUIContext.ids,
      newSaleTaxButtonClick: SaleTaxesUIContext.newSaleTaxButtonClick,
    };
  }, [SaleTaxesUIContext]);

  return (
    <Card>
      <CardHeader title="SaleTax list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={SaleTaxesUIProps.newSaleTaxButtonClick}
          >
            New SaleTax
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SaleTaxesFilter />
        {SaleTaxesUIProps.ids.length > 0 && <SaleTaxesGrouping />}
        <SaleTaxesTable />
      </CardBody>
    </Card>
  );
}

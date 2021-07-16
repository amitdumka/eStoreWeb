import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { BanksFilter } from "./filter/Filter";
import { BanksTable } from "./table/Table";
import { BanksGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";


//Bank
//bank

export function BanksCard() {
  const banksUIContext = useUIContext();
  const banksUIProps = useMemo(() => {
    return {
      ids: banksUIContext.ids,
      newBankButtonClick: banksUIContext.newBankButtonClick,
    };
  }, [banksUIContext]);

  return (
    <Card>
      <CardHeader title="Banks list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={banksUIProps.newBankButtonClick}
          >
            New Bank
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BanksFilter />
        {banksUIProps.ids.length > 0 && <BanksGrouping />}
        <BanksTable />
      </CardBody>
    </Card>
  );
}

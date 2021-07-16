import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { BankAccountsFilter } from "./filter/Filter";
import { BankAccountsTable } from "./table/Table";
import { BankAccountsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//BankAccount
//bankAccount


export function BankAccountsCard() {
  const BankAccountsUIContext = useUIContext();
  const BankAccountsUIProps = useMemo(() => {
    return {
      ids: BankAccountsUIContext.ids,
      newBankAccountButtonClick: BankAccountsUIContext.newBankAccountButtonClick,
    };
  }, [BankAccountsUIContext]);

  return (
    <Card>
      <CardHeader title="Bank Accounts list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={BankAccountsUIProps.newBankAccountButtonClick}
          >
            New Bank Account
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BankAccountsFilter />
        {BankAccountsUIProps.ids.length > 0 && <BankAccountsGrouping />}
        <BankAccountsTable />
      </CardBody>
    </Card>
  );
}

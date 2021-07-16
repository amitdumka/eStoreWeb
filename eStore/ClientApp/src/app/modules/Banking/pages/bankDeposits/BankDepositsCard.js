import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { BankDepositsFilter } from "./filter/Filter";
import { BankDepositsTable } from "./table/Table";
import { BankDepositsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";


//BankDeposit
//bankDeposit


export function BankDepositsCard() {
  const BankDepositsUIContext = useUIContext();
  const BankDepositsUIProps = useMemo(() => {
    return {
      ids: BankDepositsUIContext.ids,
      newBankDepositButtonClick: BankDepositsUIContext.newBankDepositButtonClick,
    };
  }, [BankDepositsUIContext]);

  return (
    <Card>
      <CardHeader title="Bank Deposits list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={BankDepositsUIProps.newBankDepositButtonClick}
          >
            New Bank Deposit
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BankDepositsFilter />
        {BankDepositsUIProps.ids.length > 0 && <BankDepositsGrouping />}
        <BankDepositsTable />
      </CardBody>
    </Card>
  );
}

import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { BankWithdrawalsFilter } from "./filter/Filter";
import { BankWithdrawalsTable } from "./table/Table";
import { BankWithdrawalsGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";


//BankWithdrawal
//bankWithdrawal


export function BankWithdrawalsCard() {
  const BankWithdrawalsUIContext = useUIContext();
  const BankWithdrawalsUIProps = useMemo(() => {
    return {
      ids: BankWithdrawalsUIContext.ids,
      newBankWithdrawalButtonClick: BankWithdrawalsUIContext.newBankWithdrawalButtonClick,
    };
  }, [BankWithdrawalsUIContext]);

  return (
    <Card>
      <CardHeader title="Bank Withdrawals list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={BankWithdrawalsUIProps.newBankWithdrawalButtonClick}
          >
            New Bank Withdrawal
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BankWithdrawalsFilter />
        {BankWithdrawalsUIProps.ids.length > 0 && <BankWithdrawalsGrouping />}
        <BankWithdrawalsTable />
      </CardBody>
    </Card>
  );
}

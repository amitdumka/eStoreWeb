import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ExpensesFilter } from "./filter/Filter";
import { ExpensesTable } from "./table/Table";
import { ExpensesGrouping } from "./grouping/Grouping";
import { useUIContext } from "./UIContext";

//Expense
//expense


export function ExpensesCard() {
  const ExpensesUIContext = useUIContext();
  const ExpensesUIProps = useMemo(() => {
    return {
      ids: ExpensesUIContext.ids,
      newExpenseButtonClick: ExpensesUIContext.newExpenseButtonClick,
    };
  }, [ExpensesUIContext]);

  return (
    <Card>
      <CardHeader title="Expense list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary btn-rounded"
            onClick={ExpensesUIProps.newExpenseButtonClick}
          >
            New Expense
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
         <ExpensesFilter /> 
        {ExpensesUIProps.ids.length > 0 && <ExpensesGrouping />}
        <ExpensesTable />
      </CardBody>
    </Card>
  );
}

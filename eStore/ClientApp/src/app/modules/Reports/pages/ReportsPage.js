import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";

import {IncomeExpensesPage} from "./IncomeExpenses/IncomeExpensesPage";

import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function ReportsPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from payroll root URL to /employees */
          <Redirect
            exact={true}
            from="/reports"
            to="/reports/incomeExpenses"
          />
        }
        <ContentRoute path="/reports/incomeExpenses" component={IncomeExpensesPage} />
        <ContentRoute path="/reports/dailySales" />
        <ContentRoute path="/reports/monthlyTailoring" />
        <ContentRoute path="/reports/employeesReport"/>
        
      </Switch>
    </Suspense>
  );
}

import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ExpensesPage } from "./expenses/ExpensesPage";
import {PaymentsPage} from "./payments/PaymentsPage";
import {ReceiptsPage} from "./receipts/ReceiptsPage";
import {CashReceiptsPage} from "./cashReceipts/CashReceiptsPage";
import {CashPaymentsPage} from "./cashPayments/CashPaymentsPage";
import {TranscationModesPage} from "./TranscationModes/TranscationModesPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function AccountingPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from accounting root URL to /expense/expenses */
          <Redirect 
            exact={true}
            from="/accounting"
            to="/accounting/expense/expenses"
          />
        }
        <ContentRoute path="/accounting/receipt/receipts" component={ReceiptsPage}/> 
        <ContentRoute path="/accounting/expense/expenses" component={ExpensesPage} />
        <ContentRoute path="/accounting/expense/payments" component={PaymentsPage} />
        <ContentRoute path="/accounting/receipt/cashReceipts" component={CashReceiptsPage} />
        <ContentRoute path="/accounting/expense/cashPayments" component={CashPaymentsPage} />
        <ContentRoute path="/accounting/transcationModes" component={TranscationModesPage}/>

         
      </Switch>
    </Suspense>
  );
}

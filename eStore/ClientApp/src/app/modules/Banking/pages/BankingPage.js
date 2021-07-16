import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { BanksPage } from "./banks/BanksPage";
import {BankAccountsPage} from "./bankAccounts/BankAccountsPage";
import {BankDepositsPage} from "./bankDeposits/BankDepositsPage";
import {BankWithdrawalsPage} from "./bankWithdrawals/BankWithdrawalsPage";


import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function BankingPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from payroll root URL to /employees */
          <Redirect
            exact={true}
            from="/banking"
            to="/banking/banks"
          />
        }
        <ContentRoute path="/banking/banks" component={BanksPage} />
        <ContentRoute path="/banking/bankAccounts"  component={BankAccountsPage}/>
        <ContentRoute path="/banking/deposit" component={BankDepositsPage}/>
        <ContentRoute path="/banking/bankWithdrawals" component={BankWithdrawalsPage}/>
        
      </Switch>
    </Suspense>
  );
}

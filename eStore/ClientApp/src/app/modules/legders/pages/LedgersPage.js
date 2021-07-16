import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import {LedgerTypesPage} from "./ledgerTypes/LedgerTypesPage";
import {PartiesPage} from "./parties/PartiesPage";

export default function LedgersPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from payroll root URL to /employees */
          <Redirect exact={true} from="/ledger" to="/ledger/party" />
        }
        <ContentRoute path="/ledger/ledgerTypes" component={LedgerTypesPage}/>
        <ContentRoute path="/ledger/party" component={PartiesPage}/>
       
      </Switch>
    </Suspense>
  );
}

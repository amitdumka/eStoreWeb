import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

import { BillsPage } from "./bills/BillsPage";
import {ConnectionsPage} from "./connections/ConnectionsPage";
import {BillPaymentsPage} from "./billPayments/BillPaymentsPage";


export default function ElectricityPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect
            exact={true}
            from="/electricity"
            to="/electricity/ebilPayments"
          />
        }
        <ContentRoute path="/electricity/connections" component={ConnectionsPage} />
        <ContentRoute path="/electricity/bills" component={BillsPage} />
        <ContentRoute path="/electricity/ebilPayments"  component={BillPaymentsPage} />
        
      </Switch>
    </Suspense>
  );
}

import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import {DailySalesPage} from "./DailySales/DailySalesPage";
import {InvoicesPage} from "./Invoices/InvoicesPage";


export default function SalesPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from sales root URL to /dailySales */
          <Redirect exact={true} from="/sales" to="/sales/dailySales" />
        }
        <ContentRoute path="/sales/dailySales" component={DailySalesPage}/>
        <ContentRoute path="/sales/invoices" component={InvoicesPage}/>
       
      </Switch>
    </Suspense>
  );
}

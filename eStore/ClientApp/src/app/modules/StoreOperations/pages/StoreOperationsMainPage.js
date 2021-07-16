import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { StoreOperationsPage } from "./StoreOperations/StoreOperationsPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import {PettyCashBooksPage} from "./PettyCashBooks/PettyCashBooksPage";

export default function StoreOperationsMainPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from payroll root URL to /employees */
          <Redirect
            exact={true}
            from="/stores"
            to="/stores/operations"
          />
        }
        <ContentRoute path="/stores/operations" component={StoreOperationsPage} />
        <ContentRoute path="/stores/pettyCashBooks" component={PettyCashBooksPage} />
        
      </Switch>
    </Suspense>
  );
}

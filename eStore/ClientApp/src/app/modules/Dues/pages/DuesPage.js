import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";

import { DuesListsPage } from "./duesLists/DuesListsPage";
import {DueRecoveredsPage} from "./dueRecovered/DueRecoveredsPage";

import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function DuesPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from accounting root URL to /expense/expenses */
          <Redirect 
            exact={true}
            from="/due"
            to="/due/duelist"
          />
        }
        <ContentRoute path="/due/duelist" component={DuesListsPage}/>
        <ContentRoute path="/due/recoverd" component={DueRecoveredsPage}/> 
        
      </Switch>
    </Suspense>
  );
}

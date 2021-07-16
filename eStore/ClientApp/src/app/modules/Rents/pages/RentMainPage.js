import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";

import { RentsPage } from "./rents/RentsPage";
import {RentedLocationsPage} from "./rentedLocations/RentedLocationsPage";


import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function RentMainPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from payroll root URL to /employees */
          <Redirect
            exact={true}
            from="/renting"
            to="/renting/rents"
          />
        }
        <ContentRoute path="/renting/rents" component={RentsPage} />
        <ContentRoute path="/renting/rentedLocations"  component={RentedLocationsPage}/>
        
      </Switch>
    </Suspense>
  );
}

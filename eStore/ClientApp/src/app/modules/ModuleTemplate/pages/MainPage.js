import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

// List of components Add here
import { RentsPage } from "./Component1/Component1Page";
import { RentedLocationsPage } from "./Component2/RentedLocationsPage";

const BasePath = "/renting";
const DefaultPath = "/renting/rents";

const ComponentList = [
  { path: "rents", component: { RentsPage } },
  { path: "rentedLocations", component: { RentedLocationsPage } },
];

export default function MainPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from={BasePath} to={DefaultPath} />}
        {ComponentList.map((item)=> <ContentRoute path={BasePath+"/"+item.path} component={item.component} /> )}
      </Switch>
    </Suspense>
  );
}

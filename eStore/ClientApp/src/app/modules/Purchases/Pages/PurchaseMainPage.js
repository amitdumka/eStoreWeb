import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

//TODO: Templeting using Purchase 

const BasePath = "/purchase/";
const DefaultPath = "/purchase/purchases";

const ComponentList = [
  { path: "productItems", component: null },
  { path: "purchaseProducts", component: null },
  { path: "purchaseItems", component: null },
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
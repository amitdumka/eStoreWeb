import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

// List of components Add here
import { Component1Page  as VendorPage} from "./Component1/Component1Page";
import { Component2Page  as VendorPaymentPage} from "./Component2/Component2Page";

//TODO: Templeting using Vendor and Vendor Payment System. 
//Vendor , Vendor Payment, and Vendor Debit Credit Note will be in path.

const BasePath = "/vendor/";
const DefaultPath = "/vendor/vendors";

const ComponentList = [
  { path: "vendors", component: { VendorPage } },
  { path: "vendorPayments", component: { VendorPaymentPage } },
  { path: "vendorVouchers", component: { VendorPage } },
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

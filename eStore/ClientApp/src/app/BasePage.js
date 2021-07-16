import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import {FinReportPage} from "./pages/FinReportPage";
import {  SecureRoute, LoginCallback } from "@okta/okta-react";
import CustomLoginComponent from "./modules/okta/Login";
import Messages from "./modules/okta/Messages";
//import { Report } from "@material-ui/icons";
const StoreMainPage = lazy(() =>
  import("./modules/Stores/pages/StoreMainPage")
);
const PayrollPage = lazy(() => import("./modules/Payrolls/pages/PayrollPage"));
const AccountingPage = lazy(() =>
  import("./modules/Accounting/pages/AccountingPage")
);
const BankingPage = lazy(() => import("./modules/Banking/pages/BankingPage"));
const LedgerPage = lazy(() => import("./modules/legders/pages/LedgersPage"));
const TaxesPage = lazy(() => import("./modules/Taxes/pages/TaxesPage"));
const DuesPage = lazy(() => import("./modules/Dues/pages/DuesPage"));
const ReportsPage = lazy(() =>import("./modules/Reports/pages/ReportsPage"));
const TailoringPage = lazy(() =>
  import("./modules/Tailoring/pages/TailoringPage")
);
const RentMainPage = lazy(() => import("./modules/Rents/pages/RentMainPage"));
const ElectricityPage = lazy(() =>
  import("./modules/Electricity/pages/ElectricityPage")
);
 const StoreOperationsMainPage= lazy(() =>import("./modules/StoreOperations/pages/StoreOperationsMainPage"));
 const SalesPage = lazy(() =>import("./modules/Sales/pages/SalesPage"));

 //const FinReportPage = lazy(() =>import("./pages/FinReportPage"));


export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <ContentRoute path="/fin-page" component={FinReportPage} />
        <Route path="/store" component={StoreMainPage} />
        <Route path="/payroll" component={PayrollPage} />
        <Route path="/accounting" component={AccountingPage} />
        <Route path="/banking" component={BankingPage} />
        <Route path="/ledger" component={LedgerPage} />
        <Route path="/taxes" component={TaxesPage} />
        <Route path="/due" component={DuesPage} />
        <Route path="/tailoring" component={TailoringPage} />
        <Route path="/renting" component={RentMainPage} />
        <Route path="/electricity" component={ElectricityPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/login" component={CustomLoginComponent} />
        <Route path="/stores" component={StoreOperationsMainPage} />
        <Route path="/reports" component={ReportsPage}/>
        <Route path="/sales" component={SalesPage}/>
        
        <SecureRoute path="/messages" component={Messages} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}

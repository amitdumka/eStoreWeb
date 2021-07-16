import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { EmployeesPage } from "./employees/EmployeesPage";
import {AttendancesPage} from "./attendances/AttendancesPage";
import {SalaryPaymentsPage} from "./salaryPayments/SalaryPaymentsPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import {StaffAdvanceReceiptsPage} from "./StaffAdvanceReceipts/StaffAdvanceReceiptsPage";

export default function PayrollPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from payroll root URL to /employees */
          <Redirect 
            exact={true}
            from="/payroll"
            to="/payroll/employee/employees"
          />
        }
        {/* <ContentRoute path="/payroll/stores" component={StoresPage}/> */}
        <ContentRoute path="/payroll/employee/employees" component={EmployeesPage} />
        <ContentRoute path="/payroll/employee/attendances" component={AttendancesPage} />
        <ContentRoute path="/payroll/employee/salaryPayments" component={SalaryPaymentsPage} />
        <ContentRoute path="/payroll/salary/receipts" component={StaffAdvanceReceiptsPage} />
      </Switch>
    </Suspense>
  );
}

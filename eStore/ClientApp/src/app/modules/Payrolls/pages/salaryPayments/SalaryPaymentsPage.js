import React from "react";
import { Route } from "react-router-dom";
import { SalaryPaymentsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { SalaryPaymentsCard } from "./SalaryPaymentsCard";

//SalaryPayment
//salaryPayment

export function SalaryPaymentsPage({ history }) {
  const salaryPaymentsUIEvents = {
    newSalaryPaymentButtonClick: () => {
      history.push("/payroll/employee/salaryPayments/new");
    },
    openEditSalaryPaymentDialog: (id) => {
      history.push(`/payroll/employee/salaryPayments/${id}/edit`);
    },
    openDeleteSalaryPaymentDialog: (id) => {
      history.push(`/payroll/employee/salaryPayments/${id}/delete`);
    },
    openDeleteSalaryPaymentsDialog: () => {
      history.push(`/payroll/employee/salaryPayments/deleteSalaryPayments`);
    },
    openFetchSalaryPaymentsDialog: () => {
      history.push(`/payroll/employee/salaryPayments/fetch`);
    },
    openUpdateSalaryPaymentsStatusDialog: () => {
      history.push("/payroll/employee/salaryPayments/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={salaryPaymentsUIEvents}>
      <SalaryPaymentsLoadingDialog />
      <Route path="/payroll/employee/salaryPayments/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/salaryPayments");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/salaryPayments/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/payroll/employee/salaryPayments");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/salaryPayments/deleteSalaryPayments">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/salaryPayments");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/salaryPayments/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/payroll/employee/salaryPayments");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/salaryPayments/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/salaryPayments");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/salaryPayments/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/salaryPayments");
            }}
          />
        )}
      </Route>
      <SalaryPaymentsCard />
    </UIProvider>
  );
}

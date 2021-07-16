import React from "react";
import { Route } from "react-router-dom";
import { EmployeesLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { EmployeesCard } from "./EmployeesCard";

export function EmployeesPage({ history }) {
  const employeesUIEvents = {
    newEmployeeButtonClick: () => {
      history.push("/payroll/employee/employees/new");
    },
    openEditEmployeeDialog: (id) => {
      history.push(`/payroll/employee/employees/${id}/edit`);
    },
    openDeleteEmployeeDialog: (id) => {
      history.push(`/payroll/employee/employees/${id}/delete`);
    },
    openDeleteEmployeesDialog: () => {
      history.push(`/payroll/employee/employees/deleteEmployees`);
    },
    openFetchEmployeesDialog: () => {
      history.push(`/payroll/employee/employees/fetch`);
    },
    openUpdateEmployeesStatusDialog: () => {
      history.push("/payroll/employee/employees/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={employeesUIEvents}>
      <EmployeesLoadingDialog />
      <Route path="/payroll/employee/employees/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/employees");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/employees/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/payroll/employee/employees");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/employees/deleteEmployees">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/employees");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/employees/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/payroll/employee/employees");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/employees/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/employees");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/employees/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/employees");
            }}
          />
        )}
      </Route>
      <EmployeesCard />
    </UIProvider>
  );
}

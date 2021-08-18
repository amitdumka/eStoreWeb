import React from "react";
import { Route } from "react-router-dom";
import { SalariesLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { SalariesCard } from "./SalariesCard";

export function SalariesPage({ history }) {
  const salariesUIEvents = {
    newSalaryButtonClick: () => {
      history.push("/payroll/employee/salaries/new");
    },
    openEditSalaryDialog: (id) => {
      history.push(`/payroll/employee/salaries/${id}/edit`);
    },
    openDeleteSalaryDialog: (id) => {
      history.push(`/payroll/employee/salaries/${id}/delete`);
    },
    openDeleteSalariesDialog: () => {
      history.push(`/payroll/employee/salaries/deleteSalaries`);
    },
    openFetchSalariesDialog: () => {
      history.push(`/payroll/employee/salaries/fetch`);
    },
    openUpdateSalariesStatusDialog: () => {
      history.push("/payroll/employee/salaries/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={salariesUIEvents}>
      <SalariesLoadingDialog />
      <Route path="/payroll/employee/salaries/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/salaries");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/salaries/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/payroll/employee/salaries");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/salaries/deleteSalaries">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/salaries");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/salaries/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/payroll/employee/salaries");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/salaries/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/salaries");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/salaries/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/salaries");
            }}
          />
        )}
      </Route>
      <SalariesCard />
    </UIProvider>
  );
}

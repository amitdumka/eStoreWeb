import React from "react";
import { Route } from "react-router-dom";
import { AttendancesLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { AttendancesCard } from "./AttendancesCard";

export function AttendancesPage({ history }) {
  const attendancesUIEvents = {
    newAttendanceButtonClick: () => {
      history.push("/payroll/employee/attendances/new");
    },
    openEditAttendanceDialog: (id) => {
      history.push(`/payroll/employee/attendances/${id}/edit`);
    },
    openDeleteAttendanceDialog: (id) => {
      history.push(`/payroll/employee/attendances/${id}/delete`);
    },
    openDeleteAttendancesDialog: () => {
      history.push(`/payroll/employee/attendances/deleteAttendances`);
    },
    openFetchAttendancesDialog: () => {
      history.push(`/payroll/employee/attendances/fetch`);
    },
    openUpdateAttendancesStatusDialog: () => {
      history.push("/payroll/employee/attendances/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={attendancesUIEvents}>
      <AttendancesLoadingDialog />
      <Route path="/payroll/employee/attendances/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/attendances");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/attendances/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/payroll/employee/attendances");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/attendances/deleteAttendances">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/attendances");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/attendances/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/payroll/employee/attendances");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/attendances/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/attendances");
            }}
          />
        )}
      </Route>
      <Route path="/payroll/employee/attendances/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/payroll/employee/attendances");
            }}
          />
        )}
      </Route>
      <AttendancesCard />
    </UIProvider>
  );
}

import React from "react";
import { Route } from "react-router-dom";
import { DayClosingsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { DayClosingsCard } from "./DayClosingsCard";

//DayClosing
//dayClosing

export function DayClosingsPage({ history }) {
  const dayClosingsUIEvents = {
    newDayClosingButtonClick: () => {
      history.push("/dayClosinging/dayClosings/new");
    },
    openEditDayClosingDialog: (id) => {
      history.push(`/dayClosinging/dayClosings/${id}/edit`);
    },
    openDeleteDayClosingDialog: (id) => {
      history.push(`/dayClosinging/dayClosings/${id}/delete`);
    },
    openDeleteDayClosingsDialog: () => {
      history.push(`/dayClosinging/dayClosings/deleteDayClosings`);
    },
    openFetchDayClosingsDialog: () => {
      history.push(`/dayClosinging/dayClosings/fetch`);
    },
    openUpdateDayClosingsStatusDialog: () => {
      history.push("/dayClosinging/dayClosings/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={dayClosingsUIEvents}>
      <DayClosingsLoadingDialog />
      <Route path="/dayClosinging/dayClosings/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/dayClosinging/dayClosings");
            }}
          />
        )}
      </Route>
      <Route path="/dayClosinging/dayClosings/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/dayClosinging/dayClosings");
            }}
          />
        )}
      </Route>
      <Route path="/dayClosinging/dayClosings/deleteDayClosings">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/dayClosinging/dayClosings");
            }}
          />
        )}
      </Route>
      <Route path="/dayClosinging/dayClosings/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/dayClosinging/dayClosings");
            }}
          />
        )}
      </Route>
      <Route path="/dayClosinging/dayClosings/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/dayClosinging/dayClosings");
            }}
          />
        )}
      </Route>
      <Route path="/dayClosinging/dayClosings/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/dayClosinging/dayClosings");
            }}
          />
        )}
      </Route>
      <DayClosingsCard />
    </UIProvider>
  );
}

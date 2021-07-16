import React from "react";
import { Route } from "react-router-dom";
import { DueRecoveredsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { DueRecoveredsCard } from "./DueRecoveredsCard";

//DueRecovered
//dueRecovered

export function DueRecoveredsPage({ history }) {
  const dueRecoveredsUIEvents = {
    newDueRecoveredButtonClick: () => {
      history.push("/due/recoverd/new");
    },
    openEditDueRecoveredDialog: (id) => {
      history.push(`/due/recoverd/${id}/edit`);
    },
    openDeleteDueRecoveredDialog: (id) => {
      history.push(`/due/recoverd/${id}/delete`);
    },
    openDeleteDueRecoveredsDialog: () => {
      history.push(`/due/recoverd/deleteDueRecovereds`);
    },
    openFetchDueRecoveredsDialog: () => {
      history.push(`/due/recoverd/fetch`);
    },
    openUpdateDueRecoveredsStatusDialog: () => {
      history.push("/due/recoverd/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={dueRecoveredsUIEvents}>
      <DueRecoveredsLoadingDialog />
      <Route path="/due/recoverd/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/due/recoverd");
            }}
          />
        )}
      </Route>
      <Route path="/due/recoverd/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/due/recoverd");
            }}
          />
        )}
      </Route>
      <Route path="/due/recoverd/deleteDueRecovereds">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/due/recoverd");
            }}
          />
        )}
      </Route>
      <Route path="/due/recoverd/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/due/recoverd");
            }}
          />
        )}
      </Route>
      <Route path="/due/recoverd/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/due/recoverd");
            }}
          />
        )}
      </Route>
      <Route path="/due/recoverd/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/due/recoverd");
            }}
          />
        )}
      </Route>
      <DueRecoveredsCard />
    </UIProvider>
  );
}

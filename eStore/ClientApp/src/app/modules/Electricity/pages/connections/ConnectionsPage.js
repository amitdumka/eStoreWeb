import React from "react";
import { Route } from "react-router-dom";
import { ConnectionsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { ConnectionsCard } from "./ConnectionsCard";

//Connection
//connection

export function ConnectionsPage({ history }) {
  const connectionsUIEvents = {
    newConnectionButtonClick: () => {
      history.push("/electricity/connections/new");
    },
    openEditConnectionDialog: (id) => {
      history.push(`/electricity/connections/${id}/edit`);
    },
    openDeleteConnectionDialog: (id) => {
      history.push(`/electricity/connections/${id}/delete`);
    },
    openDeleteConnectionsDialog: () => {
      history.push(`/electricity/connections/deleteConnections`);
    },
    openFetchConnectionsDialog: () => {
      history.push(`/electricity/connections/fetch`);
    },
    openUpdateConnectionsStatusDialog: () => {
      history.push("/electricity/connections/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={connectionsUIEvents}>
      <ConnectionsLoadingDialog />
      <Route path="/electricity/connections/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/connections");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/connections/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/electricity/connections");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/connections/deleteConnections">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/connections");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/connections/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/electricity/connections");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/connections/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/connections");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/connections/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/connections");
            }}
          />
        )}
      </Route>
      <ConnectionsCard />
    </UIProvider>
  );
}

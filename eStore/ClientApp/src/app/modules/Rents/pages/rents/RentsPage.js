import React from "react";
import { Route } from "react-router-dom";
import { RentsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { RentsCard } from "./RentsCard";

//Rent
//rent

export function RentsPage({ history }) {
  const rentsUIEvents = {
    newRentButtonClick: () => {
      history.push("/renting/rents/new");
    },
    openEditRentDialog: (id) => {
      history.push(`/renting/rents/${id}/edit`);
    },
    openDeleteRentDialog: (id) => {
      history.push(`/renting/rents/${id}/delete`);
    },
    openDeleteRentsDialog: () => {
      history.push(`/renting/rents/deleteRents`);
    },
    openFetchRentsDialog: () => {
      history.push(`/renting/rents/fetch`);
    },
    openUpdateRentsStatusDialog: () => {
      history.push("/renting/rents/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={rentsUIEvents}>
      <RentsLoadingDialog />
      <Route path="/renting/rents/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rents/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rents/deleteRents">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rents/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rents/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rents/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rents");
            }}
          />
        )}
      </Route>
      <RentsCard />
    </UIProvider>
  );
}

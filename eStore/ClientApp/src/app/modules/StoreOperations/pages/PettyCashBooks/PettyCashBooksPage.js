import React from "react";
import { Route } from "react-router-dom";
import { PettyCashBooksLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { PettyCashBookCard } from "./PettyCashBookCard";

//PettyCashBook
//pettyCashBook

export function PettyCashBooksPage({ history }) {
  const pettyCashBooksUIEvents = {
    newPettyCashBookButtonClick: () => {
      history.push("/stores/pettyCashBooks/new");
    },
    openEditPettyCashBookDialog: (id) => {
      history.push(`/stores/pettyCashBooks/${id}/edit`);
    },
    openDeletePettyCashBookDialog: (id) => {
      history.push(`/stores/pettyCashBooks/${id}/delete`);
    },
    openDeletePettyCashBooksDialog: () => {
      history.push(`/stores/pettyCashBooks/deletePettyCashBooks`);
    },
    openFetchPettyCashBooksDialog: () => {
      history.push(`/stores/pettyCashBooks/fetch`);
    },
    openUpdatePettyCashBooksStatusDialog: () => {
      history.push("/stores/pettyCashBooks/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={pettyCashBooksUIEvents}>
      <PettyCashBooksLoadingDialog />
      <Route path="/stores/pettyCashBooks/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/stores/pettyCashBooks");
            }}
          />
        )}
      </Route>
      <Route path="/stores/pettyCashBooks/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/stores/pettyCashBooks");
            }}
          />
        )}
      </Route>
      <Route path="/stores/pettyCashBooks/deletePettyCashBooks">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/stores/pettyCashBooks");
            }}
          />
        )}
      </Route>
      <Route path="/stores/pettyCashBooks/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/stores/pettyCashBooks");
            }}
          />
        )}
      </Route>
      <Route path="/stores/pettyCashBooks/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/stores/pettyCashBooks");
            }}
          />
        )}
      </Route>
      <Route path="/stores/pettyCashBooks/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/stores/pettyCashBooks");
            }}
          />
        )}
      </Route>
      <PettyCashBookCard />
    </UIProvider>
  );
}

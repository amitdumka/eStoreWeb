import React from "react";
import { Route } from "react-router-dom";
import { PartiesLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { PartiesCard } from "./PartiesCard";

//Parties
//party
//Party
//party

export function PartiesPage({ history }) {
  const partiesUIEvents = {
    newPartyButtonClick: () => {
      history.push("/ledger/party/new");
    },
    openEditPartyDialog: (id) => {
      history.push(`/ledger/party/${id}/edit`);
    },
    openDeletePartyDialog: (id) => {
      history.push(`/ledger/party/${id}/delete`);
    },
    openDeletePartiesDialog: () => {
      history.push(`/ledger/party/deleteParties`);
    },
    openFetchPartiesDialog: () => {
      history.push(`/ledger/party/fetch`);
    },
    openUpdatePartiesStatusDialog: () => {
      history.push("/ledger/party/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={partiesUIEvents}>
      <PartiesLoadingDialog />
      <Route path="/ledger/party/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/ledger/party");
            }}
          />
        )}
      </Route>
      <Route path="/ledger/party/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/ledger/party");
            }}
          />
        )}
      </Route>
      <Route path="/ledger/party/deleteParties">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/ledger/party");
            }}
          />
        )}
      </Route>
      <Route path="/ledger/party/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/ledger/party");
            }}
          />
        )}
      </Route>
      <Route path="/ledger/party/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/ledger/party");
            }}
          />
        )}
      </Route>
      <Route path="/ledger/party/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/ledger/party");
            }}
          />
        )}
      </Route>
      <PartiesCard />
    </UIProvider>
  );
}

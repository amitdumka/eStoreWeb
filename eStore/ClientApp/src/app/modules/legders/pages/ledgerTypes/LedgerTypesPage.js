import React from "react";
import { Route } from "react-router-dom";
import { LedgerTypesLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { LedgerTypesCard } from "./LedgerTypesCard";

//ledgerType
//LedgerType


export function LedgerTypesPage({ history }) {
  const ledgerTypesUIEvents = {
    newLedgerTypeButtonClick: () => {
      history.push("/ledger/ledgerTypes/new");
    },
    openEditLedgerTypeDialog: (id) => {
      history.push(`/ledger/ledgerTypes/${id}/edit`);
    },
    openDeleteLedgerTypeDialog: (id) => {
      history.push(`/ledger/ledgerTypes/${id}/delete`);
    },
    openDeleteLedgerTypesDialog: () => {
      history.push(`/ledger/ledgerTypes/deleteLedgerTypes`);
    },
    openFetchLedgerTypesDialog: () => {
      history.push(`/ledger/ledgerTypes/fetch`);
    },
    openUpdateLedgerTypesStatusDialog: () => {
      history.push("/ledger/ledgerTypes/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={ledgerTypesUIEvents}>
      <LedgerTypesLoadingDialog />
      <Route path="/ledger/ledgerTypes/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/ledger/ledgerTypes");
            }}
          />
        )}
      </Route>
      <Route path="/ledger/ledgerTypes/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/ledger/ledgerTypes");
            }}
          />
        )}
      </Route>
      <Route path="/ledger/ledgerTypes/deleteLedgerTypes">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/ledger/ledgerTypes");
            }}
          />
        )}
      </Route>
      <Route path="/ledger/ledgerTypes/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/ledger/ledgerTypes");
            }}
          />
        )}
      </Route>
      <Route path="/ledger/ledgerTypes/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/ledger/ledgerTypes");
            }}
          />
        )}
      </Route>
      <Route path="/ledger/ledgerTypes/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/ledger/ledgerTypes");
            }}
          />
        )}
      </Route>
      <LedgerTypesCard />
    </UIProvider>
  );
}

import React from "react";
import { Route } from "react-router-dom";
import { TranscationModesLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { TranscationModesCard } from "./TranscationModesCard";

//TranscationMode
//transcationMode
//TranscationModes

// GET
// ​/api​/TranscationModes
// POST
// ​/api​/TranscationModes
// GET
// ​/api​/TranscationModes​/{id}
// PUT
// ​/api​/TranscationModes​/{id}
// DELETE
// ​/api​/TranscationModes​/{id}


export function TranscationModesPage({ history }) {
  const transcationModesUIEvents = {
    newTranscationModeButtonClick: () => {
      history.push("/accounting/transcationModes/new");
    },
    openEditTranscationModeDialog: (id) => {
      history.push(`/accounting/transcationModes/${id}/edit`);
    },
    openDeleteTranscationModeDialog: (id) => {
      history.push(`/accounting/transcationModes/${id}/delete`);
    },
    openDeleteTranscationModesDialog: () => {
      history.push(`/accounting/transcationModes/deleteTranscationModes`);
    },
    openFetchTranscationModesDialog: () => {
      history.push(`/accounting/transcationModes/fetch`);
    },
    openUpdateTranscationModesStatusDialog: () => {
      history.push("/accounting/transcationModes/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={transcationModesUIEvents}>
      <TranscationModesLoadingDialog />
      <Route path="/accounting/transcationModes/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/transcationModes");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/transcationModes/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/transcationModes");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/transcationModes/deleteTranscationModes">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/transcationModes");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/transcationModes/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/transcationModes");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/transcationModes/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/transcationModes");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/transcationModes/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/transcationModes");
            }}
          />
        )}
      </Route>
      <TranscationModesCard />
    </UIProvider>
  );
}

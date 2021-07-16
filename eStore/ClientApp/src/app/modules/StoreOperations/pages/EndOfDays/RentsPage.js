import React from "react";
import { Route } from "react-router-dom";
import { EndOfDaysLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { EndOfDaysCard } from "./EndOfDaysCard";

//EndOfDay
//endOfDay

export function EndOfDaysPage({ history }) {
  const endOfDaysUIEvents = {
    newEndOfDayButtonClick: () => {
      history.push("/endOfDaying/endOfDays/new");
    },
    openEditEndOfDayDialog: (id) => {
      history.push(`/endOfDaying/endOfDays/${id}/edit`);
    },
    openDeleteEndOfDayDialog: (id) => {
      history.push(`/endOfDaying/endOfDays/${id}/delete`);
    },
    openDeleteEndOfDaysDialog: () => {
      history.push(`/endOfDaying/endOfDays/deleteEndOfDays`);
    },
    openFetchEndOfDaysDialog: () => {
      history.push(`/endOfDaying/endOfDays/fetch`);
    },
    openUpdateEndOfDaysStatusDialog: () => {
      history.push("/endOfDaying/endOfDays/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={endOfDaysUIEvents}>
      <EndOfDaysLoadingDialog />
      <Route path="/endOfDaying/endOfDays/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/endOfDaying/endOfDays");
            }}
          />
        )}
      </Route>
      <Route path="/endOfDaying/endOfDays/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/endOfDaying/endOfDays");
            }}
          />
        )}
      </Route>
      <Route path="/endOfDaying/endOfDays/deleteEndOfDays">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/endOfDaying/endOfDays");
            }}
          />
        )}
      </Route>
      <Route path="/endOfDaying/endOfDays/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/endOfDaying/endOfDays");
            }}
          />
        )}
      </Route>
      <Route path="/endOfDaying/endOfDays/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/endOfDaying/endOfDays");
            }}
          />
        )}
      </Route>
      <Route path="/endOfDaying/endOfDays/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/endOfDaying/endOfDays");
            }}
          />
        )}
      </Route>
      <EndOfDaysCard />
    </UIProvider>
  );
}

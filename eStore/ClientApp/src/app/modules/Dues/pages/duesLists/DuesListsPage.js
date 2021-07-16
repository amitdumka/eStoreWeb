import React from "react";
import { Route } from "react-router-dom";
import { DuesListsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { DuesListsCard } from "./DuesListsCard";

//DuesList
//duesList

export function DuesListsPage({ history }) {
  const duesListsUIEvents = {
    newDuesListButtonClick: () => {
      history.push("/due/duelist/new");
    },
    openEditDuesListDialog: (id) => {
      history.push(`/due/duelist/${id}/edit`);
    },
    openDeleteDuesListDialog: (id) => {
      history.push(`/due/duelist/${id}/delete`);
    },
    openDeleteDuesListsDialog: () => {
      history.push(`/due/duelist/deleteDuesLists`);
    },
    openFetchDuesListsDialog: () => {
      history.push(`/due/duelist/fetch`);
    },
    openUpdateDuesListsStatusDialog: () => {
      history.push("/due/duelist/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={duesListsUIEvents}>
      <DuesListsLoadingDialog />
      <Route path="/due/duelist/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/due/duelist");
            }}
          />
        )}
      </Route>
      <Route path="/due/duelist/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/due/duelist");
            }}
          />
        )}
      </Route>
      <Route path="/due/duelist/deleteDuesLists">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/due/duelist");
            }}
          />
        )}
      </Route>
      <Route path="/due/duelist/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/due/duelist");
            }}
          />
        )}
      </Route>
      <Route path="/due/duelist/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/due/duelist");
            }}
          />
        )}
      </Route>
      <Route path="/due/duelist/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/due/duelist");
            }}
          />
        )}
      </Route>
      <DuesListsCard />
    </UIProvider>
  );
}

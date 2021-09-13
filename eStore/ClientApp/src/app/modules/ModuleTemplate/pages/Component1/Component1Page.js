import React from "react";
import { Route } from "react-router-dom";
import { CompLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";
import { DeleteDialog } from "./dialogs/DeleteDialog";
import { DeletesDialog } from "./dialogs/DeletesDialog";
import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { ViewCard } from "./ViewCard";

//Including Setting Page is Must.
import {Settings} from ".Settings";

const BasePath = Settings.BasePath
const ComPath = BasePath + "/" + Settings.ComPath;

export function Component1Page({ history }) {
  const uiEvents = {
    newButtonClick: () => {
      history.push(ComPath + "/new");
    },
    openEditDialog: (id) => {
      history.push(`${ComPath}/${id}/edit`);
    },
    openDeleteDialog: (id) => {
      history.push(`${ComPath}/${id}/delete`);
    },
    openDeletesDialog: () => {
      history.push(`${ComPath}/deletes`);
    },
    openFetchsDialog: () => {
      history.push(`${ComPath}/fetch`);
    },
    openUpdatesStatusDialog: () => {
      history.push(ComPath + "/updateStatus");
    },
  };

  return (
    <UIProvider UIEvents={uiEvents}>
      <CompLoadingDialog />
      <Route path={ComPath + "/new"}>
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push(ComPath);
            }}
          />
        )}
      </Route>
      <Route path={ComPath + "/:id/edit"}>
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push(ComPath + "");
            }}
          />
        )}
      </Route>
      <Route path={ComPath + "/deletes"}>
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push(ComPath + "");
            }}
          />
        )}
      </Route>
      <Route path={ComPath + "/:id/delete"}>
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push(ComPath + "");
            }}
          />
        )}
      </Route>
      <Route path={ComPath + "/fetch"}>
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push(ComPath + "");
            }}
          />
        )}
      </Route>
      <Route path={ComPath + "/updateStatus"}>
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push(ComPath + "");
            }}
          />
        )}
      </Route>
      <ViewCard />
    </UIProvider>
  );
}

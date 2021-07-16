import React from "react";
import { Route } from "react-router-dom";

import { DataLoadingDialog } from "./dialogs/LoadingDailog";
import { EditDialog } from "./dialogs/EditDialog";
//import { DeleteDialog } from "./dialogs/DeleteDialog";
//import { DeletesDialog } from "./dialogs/DeletesDialog";
//import { FetchDialog } from "./dialogs/FetchDialog";
//import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { ViewCard } from "./ViewCard";
import PaymentsDialog from "./dialogs/PaymentsDialog";

//DailySale

export function DailySalesPage({ history }) {
  const path = "/sales/dailySales/";
  const uiEvents = {
    openPaymentDialog: (props) => {
      history.push(path + `payments/${props.keyFieldValue}/${props.payMode}`);
    },
    newButtonClick: () => {
      history.push(path + "new");
    },
    openEditDialog: (id) => {
      history.push(path + `${id}/edit`);
    },
    openDeleteDialog: (id) => {
      history.push(path + `${id}/delete`);
    },
    openDeletesDialog: () => {
      history.push(path + `deleteSelected`);
    },
    openFetchsDialog: () => {
      history.push(path + `fetch`);
    },
    openUpdatesStatusDialog: () => {
      history.push(path + "updateStatus");
    },
  };

  return (
    <UIProvider UIEvents={uiEvents}>
      <DataLoadingDialog />
      <Route path={`${path}new`}>
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push(path);
            }}
          />
        )}
      </Route>
      <Route path={`${path}:id/edit`}>
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push(path);
            }}
          />
        )}
      </Route>
      {/** Here make changes to open Payment Dialog */}
      <Route path={`${path}payments/:keyFieldValue/:payMode`}>
        {({ history, match }) => (
          <PaymentsDialog
            show={match != null}
            id={match && match.params.keyFieldValue}
            payMode={match && match.params.payMode}
            onHide={() => {
              history.push(path);
            }}
          />
        )}
      </Route>
      {/*<Route path={`${path}deleteSelected`}>
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push(path);
            }}
          />
        )}
      </Route> */}
      {/* <Route path={`${path}:id/delete`}>
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push(path);
            }}
          />
        )}
      </Route> */}
      {/* <Route path={`${path}fetch`}>
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push(path);
            }}
          />
        )}
      </Route> */}
      {/* <Route path={`${path}updateStatus`}>
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push(path);
            }}
          />
        )}
      </Route> */}
      <ViewCard />
    </UIProvider>
  );
}

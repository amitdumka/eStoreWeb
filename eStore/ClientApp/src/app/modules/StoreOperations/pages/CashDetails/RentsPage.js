import React from "react";
import { Route } from "react-router-dom";
import { CashDetailsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { CashDetailsCard } from "./CashDetailsCard";

//CashDetail
//cashDetail

export function CashDetailsPage({ history }) {
  const cashDetailsUIEvents = {
    newCashDetailButtonClick: () => {
      history.push("/cashDetailing/cashDetails/new");
    },
    openEditCashDetailDialog: (id) => {
      history.push(`/cashDetailing/cashDetails/${id}/edit`);
    },
    openDeleteCashDetailDialog: (id) => {
      history.push(`/cashDetailing/cashDetails/${id}/delete`);
    },
    openDeleteCashDetailsDialog: () => {
      history.push(`/cashDetailing/cashDetails/deleteCashDetails`);
    },
    openFetchCashDetailsDialog: () => {
      history.push(`/cashDetailing/cashDetails/fetch`);
    },
    openUpdateCashDetailsStatusDialog: () => {
      history.push("/cashDetailing/cashDetails/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={cashDetailsUIEvents}>
      <CashDetailsLoadingDialog />
      <Route path="/cashDetailing/cashDetails/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/cashDetailing/cashDetails");
            }}
          />
        )}
      </Route>
      <Route path="/cashDetailing/cashDetails/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cashDetailing/cashDetails");
            }}
          />
        )}
      </Route>
      <Route path="/cashDetailing/cashDetails/deleteCashDetails">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/cashDetailing/cashDetails");
            }}
          />
        )}
      </Route>
      <Route path="/cashDetailing/cashDetails/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cashDetailing/cashDetails");
            }}
          />
        )}
      </Route>
      <Route path="/cashDetailing/cashDetails/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/cashDetailing/cashDetails");
            }}
          />
        )}
      </Route>
      <Route path="/cashDetailing/cashDetails/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/cashDetailing/cashDetails");
            }}
          />
        )}
      </Route>
      <CashDetailsCard />
    </UIProvider>
  );
}

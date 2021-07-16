import React from "react";
import { Route } from "react-router-dom";
import { ReceiptsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { ReceiptsCard } from "./ReceiptsCard";

//Receipt
//receipt

export function ReceiptsPage({ history }) {
  const receiptsUIEvents = {
    newReceiptButtonClick: () => {
      history.push("/accounting/receipt/receipts/new");
    },
    openEditReceiptDialog: (id) => {
      history.push(`/accounting/receipt/receipts/${id}/edit`);
    },
    openDeleteReceiptDialog: (id) => {
      history.push(`/accounting/receipt/receipts/${id}/delete`);
    },
    openDeleteReceiptsDialog: () => {
      history.push(`/accounting/receipt/receipts/deleteReceipts`);
    },
    openFetchReceiptsDialog: () => {
      history.push(`/accounting/receipt/receipts/fetch`);
    },
    openUpdateReceiptsStatusDialog: () => {
      history.push("/accounting/receipt/receipts/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={receiptsUIEvents}>
      <ReceiptsLoadingDialog />
      <Route path="/accounting/receipt/receipts/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/receipt/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/receipt/receipts/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/receipt/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/receipt/receipts/deleteReceipts">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/receipt/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/receipt/receipts/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/receipt/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/receipt/receipts/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/receipt/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/receipt/receipts/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/receipt/receipts");
            }}
          />
        )}
      </Route>
      <ReceiptsCard />
    </UIProvider>
  );
}

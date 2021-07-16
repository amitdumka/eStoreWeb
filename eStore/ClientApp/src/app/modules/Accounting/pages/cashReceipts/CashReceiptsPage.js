import React from "react";
import { Route } from "react-router-dom";
import { CashReceiptsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { CashReceiptsCard } from "./CashReceiptsCard";

//CashReceipt
//cashReceipt

export function CashReceiptsPage({ history }) {
  const cashReceiptsUIEvents = {
    newCashReceiptButtonClick: () => {
      history.push("/accounting/receipt/cashReceipts/new");
    },
    openEditCashReceiptDialog: (id) => {
      history.push(`/accounting/receipt/cashReceipts/${id}/edit`);
    },
    openDeleteCashReceiptDialog: (id) => {
      history.push(`/accounting/receipt/cashReceipts/${id}/delete`);
    },
    openDeleteCashReceiptsDialog: () => {
      history.push(`/accounting/receipt/cashReceipts/deleteCashReceipts`);
    },
    openFetchCashReceiptsDialog: () => {
      history.push(`/accounting/receipt/cashReceipts/fetch`);
    },
    openUpdateCashReceiptsStatusDialog: () => {
      history.push("/accounting/receipt/cashReceipts/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={cashReceiptsUIEvents}>
      <CashReceiptsLoadingDialog />
      <Route path="/accounting/receipt/cashReceipts/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/receipt/cashReceipts");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/receipt/cashReceipts/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/receipt/cashReceipts");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/receipt/cashReceipts/deleteCashReceipts">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/receipt/cashReceipts");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/receipt/cashReceipts/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/receipt/cashReceipts");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/receipt/cashReceipts/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/receipt/cashReceipts");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/receipt/cashReceipts/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/receipt/cashReceipts");
            }}
          />
        )}
      </Route>
      <CashReceiptsCard />
    </UIProvider>
  );
}

import React from "react";
import { Route } from "react-router-dom";
import { PaymentsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { PaymentsCard } from "./PaymentsCard";

//Payment
//payment

export function PaymentsPage({ history }) {
  const paymentsUIEvents = {
    newPaymentButtonClick: () => {
      history.push("/accounting/expense/payments/new");
    },
    openEditPaymentDialog: (id) => {
      history.push(`/accounting/expense/payments/${id}/edit`);
    },
    openDeletePaymentDialog: (id) => {
      history.push(`/accounting/expense/payments/${id}/delete`);
    },
    openDeletePaymentsDialog: () => {
      history.push(`/accounting/expense/payments/deletePayments`);
    },
    openFetchPaymentsDialog: () => {
      history.push(`/accounting/expense/payments/fetch`);
    },
    openUpdatePaymentsStatusDialog: () => {
      history.push("/accounting/expense/payments/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={paymentsUIEvents}>
      <PaymentsLoadingDialog />
      <Route path="/accounting/expense/payments/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/expense/payments");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/expense/payments/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/expense/payments");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/expense/payments/deletePayments">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/expense/payments");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/expense/payments/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/expense/payments");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/expense/payments/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/expense/payments");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/expense/payments/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/expense/payments");
            }}
          />
        )}
      </Route>
      <PaymentsCard />
    </UIProvider>
  );
}

import React from "react";
import { Route } from "react-router-dom";
import { CashPaymentsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { CashPaymentsCard } from "./CashPaymentsCard";

//CashPayment
//cashPayment

export function CashPaymentsPage({ history }) {
  const cashPaymentsUIEvents = {
    newCashPaymentButtonClick: () => {
      history.push("/accounting/expense/cashPayments/new");
    },
    openEditCashPaymentDialog: (id) => {
      history.push(`/accounting/expense/cashPayments/${id}/edit`);
    },
    openDeleteCashPaymentDialog: (id) => {
      history.push(`/accounting/expense/cashPayments/${id}/delete`);
    },
    openDeleteCashPaymentsDialog: () => {
      history.push(`/accounting/expense/cashPayments/deleteCashPayments`);
    },
    openFetchCashPaymentsDialog: () => {
      history.push(`/accounting/expense/cashPayments/fetch`);
    },
    openUpdateCashPaymentsStatusDialog: () => {
      history.push("/accounting/expense/cashPayments/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={cashPaymentsUIEvents}>
      <CashPaymentsLoadingDialog />
      <Route path="/accounting/expense/cashPayments/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/expense/cashPayments");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/expense/cashPayments/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/expense/cashPayments");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/expense/cashPayments/deleteCashPayments">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/expense/cashPayments");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/expense/cashPayments/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/expense/cashPayments");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/expense/cashPayments/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/expense/cashPayments");
            }}
          />
        )}
      </Route>
      <Route path="/accounting/expense/cashPayments/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/accounting/expense/cashPayments");
            }}
          />
        )}
      </Route>
      <CashPaymentsCard />
    </UIProvider>
  );
}

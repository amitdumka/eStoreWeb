import React from "react";
import { Route } from "react-router-dom";
import { BillPaymentsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { BillPaymentsCard } from "./BillPaymentsCard";

//BillPayment
//billPayment

export function BillPaymentsPage({ history }) {
  const billPaymentsUIEvents = {
    newBillPaymentButtonClick: () => {
      history.push("/electricity/ebilPayments/new");
    },
    openEditBillPaymentDialog: (id) => {
      history.push(`/electricity/ebilPayments/${id}/edit`);
    },
    openDeleteBillPaymentDialog: (id) => {
      history.push(`/electricity/ebilPayments/${id}/delete`);
    },
    openDeleteBillPaymentsDialog: () => {
      history.push(`/electricity/ebilPayments/deleteBillPayments`);
    },
    openFetchBillPaymentsDialog: () => {
      history.push(`/electricity/ebilPayments/fetch`);
    },
    openUpdateBillPaymentsStatusDialog: () => {
      history.push("/electricity/ebilPayments/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={billPaymentsUIEvents}>
      <BillPaymentsLoadingDialog />
      <Route path="/electricity/ebilPayments/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/ebilPayments");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/ebilPayments/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/electricity/ebilPayments");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/ebilPayments/deleteBillPayments">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/ebilPayments");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/ebilPayments/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/electricity/ebilPayments");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/ebilPayments/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/ebilPayments");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/ebilPayments/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/ebilPayments");
            }}
          />
        )}
      </Route>
      <BillPaymentsCard />
    </UIProvider>
  );
}

import React from "react";
import { Route } from "react-router-dom";
import { BillsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { BillsCard } from "./BillsCard";

//Bill
//bill

export function BillsPage({ history }) {
  const billsUIEvents = {
    newBillButtonClick: () => {
      history.push("/electricity/bills/new");
    },
    openEditBillDialog: (id) => {
      history.push(`/electricity/bills/${id}/edit`);
    },
    openDeleteBillDialog: (id) => {
      history.push(`/electricity/bills/${id}/delete`);
    },
    openDeleteBillsDialog: () => {
      history.push(`/electricity/bills/deleteBills`);
    },
    openFetchBillsDialog: () => {
      history.push(`/electricity/bills/fetch`);
    },
    openUpdateBillsStatusDialog: () => {
      history.push("/electricity/bills/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={billsUIEvents}>
      <BillsLoadingDialog />
      <Route path="/electricity/bills/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/bills");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/bills/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/electricity/bills");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/bills/deleteBills">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/bills");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/bills/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/electricity/bills");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/bills/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/bills");
            }}
          />
        )}
      </Route>
      <Route path="/electricity/bills/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/electricity/bills");
            }}
          />
        )}
      </Route>
      <BillsCard />
    </UIProvider>
  );
}

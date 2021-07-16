import React from "react";
import { Route } from "react-router-dom";
import { BankDepositsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { BankDepositsCard } from "./BankDepositsCard";

//BankDeposit
//bankDeposit



export function BankDepositsPage({ history }) {
  const bankDepositsUIEvents = {
    newBankDepositButtonClick: () => {
      history.push("/banking/deposit/new");
    },
    openEditBankDepositDialog: (id) => {
      history.push(`/banking/deposit/${id}/edit`);
    },
    openDeleteBankDepositDialog: (id) => {
      history.push(`/banking/deposit/${id}/delete`);
    },
    openDeleteBankDepositsDialog: () => {
      history.push(`/banking/deposit/deleteBankDeposits`);
    },
    openFetchBankDepositsDialog: () => {
      history.push(`/banking/deposit/fetch`);
    },
    openUpdateBankDepositsStatusDialog: () => {
      history.push("/banking/deposit/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={bankDepositsUIEvents}>
      <BankDepositsLoadingDialog />
      <Route path="/banking/deposit/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/deposit");
            }}
          />
        )}
      </Route>
      <Route path="/banking/deposit/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banking/deposit");
            }}
          />
        )}
      </Route>
      <Route path="/banking/deposit/deleteBankDeposits">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/deposit");
            }}
          />
        )}
      </Route>
      <Route path="/banking/deposit/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banking/deposit");
            }}
          />
        )}
      </Route>
      <Route path="/banking/deposit/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/deposit");
            }}
          />
        )}
      </Route>
      <Route path="/banking/deposit/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/deposit");
            }}
          />
        )}
      </Route>
      <BankDepositsCard />
    </UIProvider>
  );
}

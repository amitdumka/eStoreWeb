import React from "react";
import { Route } from "react-router-dom";
import { BankAccountsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { BankAccountsCard } from "./BankAccountsCard";

//BankAccount
//bankAccount

export function BankAccountsPage({ history }) {
  const bankAccountsUIEvents = {
    newBankAccountButtonClick: () => {
      history.push("/banking/bankAccounts/new");
    },
    openEditBankAccountDialog: (id) => {
      history.push(`/banking/bankAccounts/${id}/edit`);
    },
    openDeleteBankAccountDialog: (id) => {
      history.push(`/banking/bankAccounts/${id}/delete`);
    },
    openDeleteBankAccountsDialog: () => {
      history.push(`/banking/bankAccounts/deleteBankAccounts`);
    },
    openFetchBankAccountsDialog: () => {
      history.push(`/banking/bankAccounts/fetch`);
    },
    openUpdateBankAccountsStatusDialog: () => {
      history.push("/banking/bankAccounts/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={bankAccountsUIEvents}>
      <BankAccountsLoadingDialog />
      <Route path="/banking/bankAccounts/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/bankAccounts");
            }}
          />
        )}
      </Route>
      <Route path="/banking/bankAccounts/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banking/bankAccounts");
            }}
          />
        )}
      </Route>
      <Route path="/banking/bankAccounts/deleteBankAccounts">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/bankAccounts");
            }}
          />
        )}
      </Route>
      <Route path="/banking/bankAccounts/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banking/bankAccounts");
            }}
          />
        )}
      </Route>
      <Route path="/banking/bankAccounts/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/bankAccounts");
            }}
          />
        )}
      </Route>
      <Route path="/banking/bankAccounts/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/bankAccounts");
            }}
          />
        )}
      </Route>
      <BankAccountsCard />
    </UIProvider>
  );
}

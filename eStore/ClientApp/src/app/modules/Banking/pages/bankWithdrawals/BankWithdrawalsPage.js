import React from "react";
import { Route } from "react-router-dom";
import { BankWithdrawalsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { BankWithdrawalsCard } from "./BankWithdrawalsCard";

//BankWithdrawal
//bankWithdrawal



export function BankWithdrawalsPage({ history }) {
  const bankWithdrawalsUIEvents = {
    newBankWithdrawalButtonClick: () => {
      history.push("/banking/bankWithdrawals/new");
    },
    openEditBankWithdrawalDialog: (id) => {
      history.push(`/banking/bankWithdrawals/${id}/edit`);
    },
    openDeleteBankWithdrawalDialog: (id) => {
      history.push(`/banking/bankWithdrawals/${id}/delete`);
    },
    openDeleteBankWithdrawalsDialog: () => {
      history.push(`/banking/bankWithdrawals/deleteBankWithdrawals`);
    },
    openFetchBankWithdrawalsDialog: () => {
      history.push(`/banking/bankWithdrawals/fetch`);
    },
    openUpdateBankWithdrawalsStatusDialog: () => {
      history.push("/banking/bankWithdrawals/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={bankWithdrawalsUIEvents}>
      <BankWithdrawalsLoadingDialog />
      <Route path="/banking/bankWithdrawals/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/bankWithdrawals");
            }}
          />
        )}
      </Route>
      <Route path="/banking/bankWithdrawals/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banking/bankWithdrawals");
            }}
          />
        )}
      </Route>
      <Route path="/banking/bankWithdrawals/deleteBankWithdrawals">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/bankWithdrawals");
            }}
          />
        )}
      </Route>
      <Route path="/banking/bankWithdrawals/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banking/bankWithdrawals");
            }}
          />
        )}
      </Route>
      <Route path="/banking/bankWithdrawals/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/bankWithdrawals");
            }}
          />
        )}
      </Route>
      <Route path="/banking/bankWithdrawals/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/bankWithdrawals");
            }}
          />
        )}
      </Route>
      <BankWithdrawalsCard />
    </UIProvider>
  );
}

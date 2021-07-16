import React from "react";
import { Route } from "react-router-dom";
import { BanksLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { BanksCard } from "./BanksCard";

//Bank
//bank

export function BanksPage({ history }) {
  const banksUIEvents = {
    newBankButtonClick: () => {
      history.push("/banking/banks/new");
    },
    openEditBankDialog: (id) => {
      history.push(`/banking/banks/${id}/edit`);
    },
    openDeleteBankDialog: (id) => {
      history.push(`/banking/banks/${id}/delete`);
    },
    openDeleteBanksDialog: () => {
      history.push(`/banking/banks/deleteBanks`);
    },
    openFetchBanksDialog: () => {
      history.push(`/banking/banks/fetch`);
    },
    openUpdateBanksStatusDialog: () => {
      history.push("/banking/banks/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={banksUIEvents}>
      <BanksLoadingDialog />
      <Route path="/banking/banks/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banking/banks/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banking/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banking/banks/deleteBanks">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banking/banks/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banking/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banking/banks/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banking/banks/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/banking/banks");
            }}
          />
        )}
      </Route>
      <BanksCard />
    </UIProvider>
  );
}

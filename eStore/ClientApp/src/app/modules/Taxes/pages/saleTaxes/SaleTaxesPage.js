import React from "react";
import { Route } from "react-router-dom";
import { SaleTaxesLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { SaleTaxesCard } from "./SaleTaxesCard";

//SaleTaxes
//saleTax
//SaleTax
//saleTax

export function SaleTaxesPage({ history }) {
  const saleTaxesUIEvents = {
    newSaleTaxButtonClick: () => {
      history.push("/taxes/saletax/new");
    },
    openEditSaleTaxDialog: (id) => {
      history.push(`/taxes/saletax/${id}/edit`);
    },
    openDeleteSaleTaxDialog: (id) => {
      history.push(`/taxes/saletax/${id}/delete`);
    },
    openDeleteSaleTaxesDialog: () => {
      history.push(`/taxes/saletax/deleteSaleTaxes`);
    },
    openFetchSaleTaxesDialog: () => {
      history.push(`/taxes/saletax/fetch`);
    },
    openUpdateSaleTaxesStatusDialog: () => {
      history.push("/taxes/saletax/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={saleTaxesUIEvents}>
      <SaleTaxesLoadingDialog />
      <Route path="/taxes/saletax/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/taxes/saletax");
            }}
          />
        )}
      </Route>
      <Route path="/taxes/saletax/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/taxes/saletax");
            }}
          />
        )}
      </Route>
      <Route path="/taxes/saletax/deleteSaleTaxes">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/taxes/saletax");
            }}
          />
        )}
      </Route>
      <Route path="/taxes/saletax/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/taxes/saletax");
            }}
          />
        )}
      </Route>
      <Route path="/taxes/saletax/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/taxes/saletax");
            }}
          />
        )}
      </Route>
      <Route path="/taxes/saletax/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/taxes/saletax");
            }}
          />
        )}
      </Route>
      <SaleTaxesCard />
    </UIProvider>
  );
}

import React from "react";
import { Route } from "react-router-dom";
import { PurchaseTaxesLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { PurchaseTaxesCard } from "./PurchaseTaxesCard";

//purchaseTax
//PurchaseTax


export function PurchaseTaxesPage({ history }) {
  const purchaseTaxesUIEvents = {
    newPurchaseTaxButtonClick: () => {
      history.push("/taxes/purchasetax/new");
    },
    openEditPurchaseTaxDialog: (id) => {
      history.push(`/taxes/purchasetax/${id}/edit`);
    },
    openDeletePurchaseTaxDialog: (id) => {
      history.push(`/taxes/purchasetax/${id}/delete`);
    },
    openDeletePurchaseTaxesDialog: () => {
      history.push(`/taxes/purchasetax/deletePurchaseTaxes`);
    },
    openFetchPurchaseTaxesDialog: () => {
      history.push(`/taxes/purchasetax/fetch`);
    },
    openUpdatePurchaseTaxesStatusDialog: () => {
      history.push("/taxes/purchasetax/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={purchaseTaxesUIEvents}>
      <PurchaseTaxesLoadingDialog />
      <Route path="/taxes/purchasetax/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/taxes/purchasetax");
            }}
          />
        )}
      </Route>
      <Route path="/taxes/purchasetax/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/taxes/purchasetax");
            }}
          />
        )}
      </Route>
      <Route path="/taxes/purchasetax/deletePurchaseTaxes">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/taxes/purchasetax");
            }}
          />
        )}
      </Route>
      <Route path="/taxes/purchasetax/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/taxes/purchasetax");
            }}
          />
        )}
      </Route>
      <Route path="/taxes/purchasetax/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/taxes/purchasetax");
            }}
          />
        )}
      </Route>
      <Route path="/taxes/purchasetax/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/taxes/purchasetax");
            }}
          />
        )}
      </Route>
      <PurchaseTaxesCard />
    </UIProvider>
  );
}

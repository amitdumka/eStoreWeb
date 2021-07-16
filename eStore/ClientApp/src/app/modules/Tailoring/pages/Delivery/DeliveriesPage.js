import React from "react";
import { Route } from "react-router-dom";
import { DeliveriesLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { DeliveriesCard } from "./DeliveriesCard";

//Deliveries
//delivery
//Delivery
//delivery

export function DeliveriesPage({ history }) {
  const deliveriesUIEvents = {
    newDeliveryButtonClick: () => {
      history.push("/tailoring/delivery/new");
    },
    openEditDeliveryDialog: (id) => {
      history.push(`/tailoring/delivery/${id}/edit`);
    },
    openDeleteDeliveryDialog: (id) => {
      history.push(`/tailoring/delivery/${id}/delete`);
    },
    openDeleteDeliveriesDialog: () => {
      history.push(`/tailoring/delivery/deleteDeliveries`);
    },
    openFetchDeliveriesDialog: () => {
      history.push(`/tailoring/delivery/fetch`);
    },
    openUpdateDeliveriesStatusDialog: () => {
      history.push("/tailoring/delivery/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={deliveriesUIEvents}>
      <DeliveriesLoadingDialog />
      <Route path="/tailoring/delivery/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/tailoring/delivery");
            }}
          />
        )}
      </Route>
      <Route path="/tailoring/delivery/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tailoring/delivery");
            }}
          />
        )}
      </Route>
      <Route path="/tailoring/delivery/deleteDeliveries">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/tailoring/delivery");
            }}
          />
        )}
      </Route>
      <Route path="/tailoring/delivery/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tailoring/delivery");
            }}
          />
        )}
      </Route>
      <Route path="/tailoring/delivery/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/tailoring/delivery");
            }}
          />
        )}
      </Route>
      <Route path="/tailoring/delivery/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/tailoring/delivery");
            }}
          />
        )}
      </Route>
      <DeliveriesCard />
    </UIProvider>
  );
}

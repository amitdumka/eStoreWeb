import React from "react";
import { Route } from "react-router-dom";
import { EditDialog } from "./dialogs/EditDialog";
//import { useSubheader } from "../../../../../_metronic/layout";
import { StoresCard } from "./StoresCard";
import { StoresUIProvider } from "./StoreUIContext";

export function StoresPage({ history }) {
  //const suhbeader = useSubheader();
  //suhbeader.setTitle("eStores: Stores");

  const storesUIEvents = {
    newStoreButtonClick: () => {
      history.push("/store/stores/new");
    },
    openEditStoreDialog: (id) => {
      history.push(`/store/stores/${id}/edit`);
    },
    openDeleteStoreDialog: (id) => {
      history.push(`/store/stores/${id}/delete`);
    },
    openDeleteStoresDialog: () => {
      history.push(`/store/stores/deleteStores`);
    },
    openFetchStoresDialog: () => {
      history.push(`/store/stores/fetch`);
    },
    openUpdateStoresStatusDialog: () => {
      history.push("/store/stores/updateStatus");
    },
  };

  return (
    <StoresUIProvider storesUIEvents={storesUIEvents}>
      <Route path="/store/stores/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/store/stores");
            }}
          />
        )}
      </Route>
      <Route path="/store/stores/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/store/stores");
            }}
          />
        )}
      </Route>
      
      <StoresCard />
    </StoresUIProvider>
  );
}

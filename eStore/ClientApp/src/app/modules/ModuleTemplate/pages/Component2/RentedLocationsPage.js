import React from "react";
import { Route } from "react-router-dom";
import { RentedLocationsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { RentedLocationsCard } from "./RentedLocationsCard";

//RentedLocation
//rentedLocation

export function RentedLocationsPage({ history }) {
  const rentedLocationsUIEvents = {
    newRentedLocationButtonClick: () => {
      history.push("/renting/rentedLocations/new");
    },
    openEditRentedLocationDialog: (id) => {
      history.push(`/renting/rentedLocations/${id}/edit`);
    },
    openDeleteRentedLocationDialog: (id) => {
      history.push(`/renting/rentedLocations/${id}/delete`);
    },
    openDeleteRentedLocationsDialog: () => {
      history.push(`/renting/rentedLocations/deleteRentedLocations`);
    },
    openFetchRentedLocationsDialog: () => {
      history.push(`/renting/rentedLocations/fetch`);
    },
    openUpdateRentedLocationsStatusDialog: () => {
      history.push("/renting/rentedLocations/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={rentedLocationsUIEvents}>
      <RentedLocationsLoadingDialog />
      <Route path="/renting/rentedLocations/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rentedLocations");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rentedLocations/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/renting/rentedLocations");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rentedLocations/deleteRentedLocations">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rentedLocations");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rentedLocations/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/renting/rentedLocations");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rentedLocations/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rentedLocations");
            }}
          />
        )}
      </Route>
      <Route path="/renting/rentedLocations/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/renting/rentedLocations");
            }}
          />
        )}
      </Route>
      <RentedLocationsCard />
    </UIProvider>
  );
}

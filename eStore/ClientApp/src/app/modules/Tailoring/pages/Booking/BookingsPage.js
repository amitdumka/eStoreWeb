import React from "react";
import { Route } from "react-router-dom";
import { BookingsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { BookingsCard } from "./BookingsCard";

//booking
//Booking


export function BookingsPage({ history }) {
  const bookingsUIEvents = {
    newBookingButtonClick: () => {
      history.push("/tailoring/booking/new");
    },
    openEditBookingDialog: (id) => {
      history.push(`/tailoring/booking/${id}/edit`);
    },
    openDeleteBookingDialog: (id) => {
      history.push(`/tailoring/booking/${id}/delete`);
    },
    openDeleteBookingsDialog: () => {
      history.push(`/tailoring/booking/deleteBookings`);
    },
    openFetchBookingsDialog: () => {
      history.push(`/tailoring/booking/fetch`);
    },
    openUpdateBookingsStatusDialog: () => {
      history.push("/tailoring/booking/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={bookingsUIEvents}>
      <BookingsLoadingDialog />
      <Route path="/tailoring/booking/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/tailoring/booking");
            }}
          />
        )}
      </Route>
      <Route path="/tailoring/booking/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tailoring/booking");
            }}
          />
        )}
      </Route>
      <Route path="/tailoring/booking/deleteBookings">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/tailoring/booking");
            }}
          />
        )}
      </Route>
      <Route path="/tailoring/booking/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tailoring/booking");
            }}
          />
        )}
      </Route>
      <Route path="/tailoring/booking/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/tailoring/booking");
            }}
          />
        )}
      </Route>
      <Route path="/tailoring/booking/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/tailoring/booking");
            }}
          />
        )}
      </Route>
      <BookingsCard />
    </UIProvider>
  );
}

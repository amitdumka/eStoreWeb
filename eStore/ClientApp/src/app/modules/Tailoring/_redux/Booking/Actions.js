import * as requestFromServer from "./Crud";
import { bookingsSlice, callTypes } from "./Slice";

const { actions } = bookingsSlice;

//bookings
//Bookings
//booking
//Booking

export const fetchPendingDelivery = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getPendingDelivery()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response.data);
      dispatch(actions.pendingDeliveryFetched({ totalCount , entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't load Pending Delivery";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBookings = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBookings(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.bookingsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find bookings";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchBooking = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.bookingFetched({ bookingForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBookingById(id)
    .then((response) => {
      const booking = response.data;
      dispatch(actions.bookingFetched({ bookingForEdit: booking }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find booking";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBooking = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBooking(id)
    .then((response) => {
      dispatch(actions.bookingDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete booking";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBooking = (bookingForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBooking(JSON.stringify(bookingForCreation))
    .then((response) => {
      const booking = response.data;
      // console.log(response.data);
      dispatch(actions.bookingCreated({ booking }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create booking";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBooking = (booking) => (dispatch) => {
  
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBooking(booking)
    .then(() => {
      dispatch(actions.bookingUpdated({ booking }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update booking";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBookingsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBookings(ids, status)
    .then(() => {
      dispatch(actions.bookingsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update bookings status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBookings = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBookings(ids)
    .then(() => {
      dispatch(actions.bookingsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bookings";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

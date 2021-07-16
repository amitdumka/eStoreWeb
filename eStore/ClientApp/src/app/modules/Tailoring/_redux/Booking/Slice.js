import { createSlice } from "@reduxjs/toolkit";

//bookings
//Bookings
//booking
//Booking



const initialBookingsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bookingForEdit: undefined,
  lastError: null,
  pendingDelivery: null,
  totalCountPending:0
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState: initialBookingsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getBookingById
    bookingFetched: (state, action) => {
      state.actionsLoading = false;
      state.bookingForEdit = action.payload.bookingForEdit;
      state.error = null;
    },
    // findBookings
    bookingsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    pendingDeliveryFetched: (state, action) => {

      const {totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.pendingDelivery = entities;
      state.totalCountPending=totalCount;

    },
    // createBooking
    bookingCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.booking);
    },
    // updateBooking
    bookingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.talioringBookingId === action.payload.booking.talioringBookingId) {
          return action.payload.booking;
        }
        return entity;
      });
    },
    // deleteBooking
    bookingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.talioringBookingId !== action.payload.talioringBookingId
      );
    },
    // deleteBookings
    bookingsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.talioringBookingId)
      );
    },
    // bookingsUpdateState
    bookingsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.talioringBookingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});

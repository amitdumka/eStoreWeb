import { createSlice } from "@reduxjs/toolkit";


//Delivery
//delivery

//Deliveries
//deliveries

const initialDeliveriesState = {
  listLoading: false,
  actionsLoading: false,
  entities: null,
  deliveryForEdit: undefined,
  lastError: null,
  bookings: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const deliveriesSlice = createSlice({
  name: "deliveries",
  initialState: initialDeliveriesState,
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
    // get All bank List
    bookingsFetched: function(state, action) {
      const {  entities } = action.payload;
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.bookings = entities;
    },
    // getDeliveryById
    deliveryFetched: (state, action) => {
      state.actionsLoading = false;
      state.deliveryForEdit = action.payload.deliveryForEdit;
      state.error = null;
    },
    // findDeliveries
    deliveriesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDelivery
    deliveryCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.delivery);
    },
    // updateDelivery
    deliveryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.deliveryId === action.payload.delivery.deliveryId) {
          return action.payload.delivery;
        }
        return entity;
      });
    },
    // deleteDelivery
    deliveryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.deliveryId !== action.payload.deliveryId
      );
    },
    // deleteDeliveries
    deliveriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.deliveryId)
      );
    },

    // deliveriesUpdateState
    deliveriesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.deliveryId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});

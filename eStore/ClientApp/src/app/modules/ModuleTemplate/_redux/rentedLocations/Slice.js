import {createSlice} from "@reduxjs/toolkit";

//RentedLocation
//rentedLocation

const initialRentedLocationsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  rentTypes:null,
  rentedLocationForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const rentedLocationsSlice = createSlice({
  name: "rentedLocations",
  initialState: initialRentedLocationsState,
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
    // getRentedLocationById
    rentedLocationFetched: (state, action) => {
      state.actionsLoading = false;
      state.rentedLocationForEdit = action.payload.rentedLocationForEdit;
      state.error = null;
    },
    // findRentedLocations
    rentedLocationsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    rentTypesFetched: function(state, action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.rentTypes=entities;
     
    },
    // createRentedLocation
    rentedLocationCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.rentedLocation);
    },
    // updateRentedLocation
    rentedLocationUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.rentedLocationId === action.payload.rentedLocation.rentedLocationId) {
          return action.payload.rentedLocation;
        }
        return entity;
      });
    },
    // deleteRentedLocation
    rentedLocationDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.rentedLocationId !== action.payload.rentedLocationId);
    },
    // deleteRentedLocations
    rentedLocationsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.rentedLocationId)
      );
    },
    // rentedLocationsUpdateState
    rentedLocationsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.rentedLocationId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

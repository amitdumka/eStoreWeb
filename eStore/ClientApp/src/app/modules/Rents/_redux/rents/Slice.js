import {createSlice} from "@reduxjs/toolkit";



//Rent
//rent


const initialRentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  rentForEdit: undefined,
  lastError: null, 
  rentTypes:null, 
  payModes:null, 
  rentedLocations:null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const rentsSlice = createSlice({
  name: "rents",
  initialState: initialRentsState,
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
    payModesFetched: function(state, action){
      const{entities}=action.payload;
      state.actionsLoading=false;
      state.listLoading =false;
      state.error=null;
      state.payModes=entities;
      
    },
    rentTypesFetched: function(state, action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.rentTypes=entities;
     
    },
    // get All bank List 
    rentedLocationsFetched: function(state,action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.rentedLocations=entities;
     
    },
    // getRentById
    rentFetched: (state, action) => {
      state.actionsLoading = false;
      state.rentForEdit = action.payload.rentForEdit;
      state.error = null;
    },
    // findRents
    rentsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRent
    rentCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.rent);
    },
    // updateRent
    rentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.rentId === action.payload.rent.rentId) {
          return action.payload.rent;
        }
        return entity;
      });
    },
    // deleteRent
    rentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.rentId !== action.payload.rentId);
    },
    // deleteRents
    rentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.rentId)
      );
    },
    
    // rentsUpdateState
    rentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.rentId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

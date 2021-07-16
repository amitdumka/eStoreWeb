import {createSlice} from "@reduxjs/toolkit";



//DayClosing
//dayClosing


const initialDayClosingsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  dayClosingForEdit: undefined,
  lastError: null, 
  dayClosingTypes:null, 
  payModes:null, 
  dayClosingedLocations:null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const dayClosingsSlice = createSlice({
  name: "dayClosings",
  initialState: initialDayClosingsState,
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
    dayClosingTypesFetched: function(state, action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.dayClosingTypes=entities;
     
    },
    // get All bank List 
    dayClosingedLocationsFetched: function(state,action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.dayClosingedLocations=entities;
     
    },
    // getDayClosingById
    dayClosingFetched: (state, action) => {
      state.actionsLoading = false;
      state.dayClosingForEdit = action.payload.dayClosingForEdit;
      state.error = null;
    },
    // findDayClosings
    dayClosingsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDayClosing
    dayClosingCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.dayClosing);
    },
    // updateDayClosing
    dayClosingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.dayClosingId === action.payload.dayClosing.dayClosingId) {
          return action.payload.dayClosing;
        }
        return entity;
      });
    },
    // deleteDayClosing
    dayClosingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.dayClosingId !== action.payload.dayClosingId);
    },
    // deleteDayClosings
    dayClosingsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.dayClosingId)
      );
    },
    
    // dayClosingsUpdateState
    dayClosingsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.dayClosingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

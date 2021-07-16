import {createSlice} from "@reduxjs/toolkit";



//EndOfDay
//endOfDay


const initialEndOfDaysState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  endOfDayForEdit: undefined,
  lastError: null, 
  endOfDayTypes:null, 
  payModes:null, 
  endOfDayedLocations:null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const endOfDaysSlice = createSlice({
  name: "endOfDays",
  initialState: initialEndOfDaysState,
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
    endOfDayTypesFetched: function(state, action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.endOfDayTypes=entities;
     
    },
    // get All bank List 
    endOfDayedLocationsFetched: function(state,action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.endOfDayedLocations=entities;
     
    },
    // getEndOfDayById
    endOfDayFetched: (state, action) => {
      state.actionsLoading = false;
      state.endOfDayForEdit = action.payload.endOfDayForEdit;
      state.error = null;
    },
    // findEndOfDays
    endOfDaysFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEndOfDay
    endOfDayCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.endOfDay);
    },
    // updateEndOfDay
    endOfDayUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.endOfDayId === action.payload.endOfDay.endOfDayId) {
          return action.payload.endOfDay;
        }
        return entity;
      });
    },
    // deleteEndOfDay
    endOfDayDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.endOfDayId !== action.payload.endOfDayId);
    },
    // deleteEndOfDays
    endOfDaysDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.endOfDayId)
      );
    },
    
    // endOfDaysUpdateState
    endOfDaysStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.endOfDayId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

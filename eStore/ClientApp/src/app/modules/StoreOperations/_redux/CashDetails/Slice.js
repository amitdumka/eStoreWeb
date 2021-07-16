import {createSlice} from "@reduxjs/toolkit";



//CashDetail
//cashDetail


const initialCashDetailsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  cashDetailForEdit: undefined,
  lastError: null, 
  cashDetailTypes:null, 
  payModes:null, 
  cashDetailedLocations:null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const cashDetailsSlice = createSlice({
  name: "cashDetails",
  initialState: initialCashDetailsState,
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
    cashDetailTypesFetched: function(state, action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.cashDetailTypes=entities;
     
    },
    // get All bank List 
    cashDetailedLocationsFetched: function(state,action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.cashDetailedLocations=entities;
     
    },
    // getCashDetailById
    cashDetailFetched: (state, action) => {
      state.actionsLoading = false;
      state.cashDetailForEdit = action.payload.cashDetailForEdit;
      state.error = null;
    },
    // findCashDetails
    cashDetailsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCashDetail
    cashDetailCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.cashDetail);
    },
    // updateCashDetail
    cashDetailUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.cashDetailId === action.payload.cashDetail.cashDetailId) {
          return action.payload.cashDetail;
        }
        return entity;
      });
    },
    // deleteCashDetail
    cashDetailDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.cashDetailId !== action.payload.cashDetailId);
    },
    // deleteCashDetails
    cashDetailsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.cashDetailId)
      );
    },
    
    // cashDetailsUpdateState
    cashDetailsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.cashDetailId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

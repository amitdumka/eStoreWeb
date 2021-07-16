import {createSlice} from "@reduxjs/toolkit";



//PettyCashBook
//pettyCashBook


const initialPettyCashBooksState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  pettyCashBookForEdit: undefined,
  lastError: null, 
  pettyCashBookTypes:null, 
  payModes:null, 
  pettyCashBookedLocations:null, 
  sysGenPettyCashSlip:null,
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const pettyCashBooksSlice = createSlice({
  name: "pettyCashBooks",
  initialState: initialPettyCashBooksState,
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
    pettyCashBookTypesFetched: function(state, action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.pettyCashBookTypes=entities;
     
    },
    // get All bank List 
    pettyCashBookedLocationsFetched: function(state,action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.pettyCashBookedLocations=entities;
     
    },
    // getPettyCashBookById
    pettyCashBookFetched: (state, action) => {
      state.actionsLoading = false;
      state.pettyCashBookForEdit = action.payload.pettyCashBookForEdit;
      state.error = null;
    },
    pettyCashBookSysGenFetched: (state, action) => {
      state.actionsLoading = false;
      state.sysGenPettyCashSlip = action.payload.sysGenPettyCashSlip;
      state.error = null;
    },
    // findPettyCashBooks
    pettyCashBooksFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPettyCashBook
    pettyCashBookCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.pettyCashBook);
    },
    // updatePettyCashBook
    pettyCashBookUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.pettyCashBookId === action.payload.pettyCashBook.pettyCashBookId) {
          return action.payload.pettyCashBook;
        }
        return entity;
      });
    },
    // deletePettyCashBook
    pettyCashBookDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.pettyCashBookId !== action.payload.pettyCashBookId);
    },
    // deletePettyCashBooks
    pettyCashBooksDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.pettyCashBookId)
      );
    },
    
    // pettyCashBooksUpdateState
    pettyCashBooksStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.pettyCashBookId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

import {createSlice} from "@reduxjs/toolkit";



//DueRecovered
//dueRecovered

const initialDueRecoveredsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  dueRecoveredForEdit: undefined,
  lastError: null, 
  dueList: null, 
  payModes:null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const dueRecoveredsSlice = createSlice({
  name: "dueRecovereds",
  initialState: initialDueRecoveredsState,
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
    // get All employee List 
    dueListFetched: function(state,action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.dueList=entities;
    },
    // get All parties List 
    payModesFetched: function(state,action){
      const{entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.payModes=entities;

    },
    // getDueRecoveredById
    dueRecoveredFetched: (state, action) => {
      state.actionsLoading = false;
      state.dueRecoveredForEdit = action.payload.dueRecoveredForEdit;
      state.error = null;
    },
    // findDueRecovereds
    dueRecoveredsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDueRecovered
    dueRecoveredCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.dueRecovered);
    },
    // updateDueRecovered
    dueRecoveredUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.dueRecoveredId === action.payload.dueRecovered.dueRecoveredId) {
          return action.payload.dueRecovered;
        }
        return entity;
      });
    },
    // deleteDueRecovered
    dueRecoveredDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.dueRecoveredId !== action.payload.dueRecoveredId);
    },
    // deleteDueRecovereds
    dueRecoveredsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.dueRecoveredId)
      );
    },

    
    // dueRecoveredsUpdateState
    dueRecoveredsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.dueRecoveredId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

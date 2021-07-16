import {createSlice} from "@reduxjs/toolkit";



//TranscationMode
//transcationMode

const initialTranscationModesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  transcationModeForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const transcationModesSlice = createSlice({
  name: "transcationModes",
  initialState: initialTranscationModesState,
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
    employeesListFetched: function(state,action){
      const{totalCount,entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.employeeEntities=entities;
     state.totalCountEmp=totalCount;

    },
    // get All parties List 
    partiesListFetched: function(state,action){
      const{totalCount,entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.partiesEntities=entities;
     state.totalCountparty=totalCount;

    },
    // get All bank account List 
    bankAccountsListFetched: function(state,action){
      const{totalCount,entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.bankaccEntities=entities;
     state.totalCountbankacc=totalCount;

    },
    // getTranscationModeById
    transcationModeFetched: (state, action) => {
      state.actionsLoading = false;
      state.transcationModeForEdit = action.payload.transcationModeForEdit;
      state.error = null;
    },
    // findTranscationModes
    transcationModesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createTranscationMode
    transcationModeCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.transcationMode);
    },
    // updateTranscationMode
    transcationModeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.transcationModeId === action.payload.transcationMode.transcationModeId) {
          return action.payload.transcationMode;
        }
        return entity;
      });
    },
    // deleteTranscationMode
    transcationModeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.transcationModeId !== action.payload.transcationModeId);
    },
    // deleteTranscationModes
    transcationModesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.transcationModeId)
      );
    },

    
    // transcationModesUpdateState
    transcationModesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.transcationModeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

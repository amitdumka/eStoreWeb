import {createSlice} from "@reduxjs/toolkit";



//DailySale
//dailySale

const initialDailySalesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  dailySaleForEdit: undefined,
  lastError: null, 
  employeeEntities: null, 
  totalCountEmp:0, 
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const dailySalesSlice = createSlice({
  name: "dailySales",
  initialState: initialDailySalesState,
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
   
    // getDailySaleById
    dailySaleFetched: (state, action) => {
      state.actionsLoading = false;
      state.dailySaleForEdit = action.payload.dailySaleForEdit;
      state.error = null;
  //    console.log(state.dailySaleForEdit);
    },
    // findDailySales
    dailySalesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDailySale
    dailySaleCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.dailySale);
    },
    // updateDailySale
    dailySaleUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.dailySaleId === action.payload.dailySale.dailySaleId) {
          return action.payload.dailySale;
        }
        return entity;
      });
    },
    // deleteDailySale
    dailySaleDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.dailySaleId !== action.payload.dailySaleId);
    },
    // deleteDailySales
    dailySalesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.dailySaleId)
      );
    },

    
    // dailySalesUpdateState
    dailySalesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.dailySaleId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

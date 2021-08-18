import {createSlice} from "@reduxjs/toolkit";


const initialSalariesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  salaryForEdit: undefined,
  lastError: null, 
  employeeEntities: null, 
  totalCountEmp:0
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const salariesSlice = createSlice({
  name: "salaries",
  initialState: initialSalariesState,
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
    // getSalaryById
    salaryFetched: (state, action) => {
      state.actionsLoading = false;
      state.salaryForEdit = action.payload.salaryForEdit;
      state.error = null;
    },
    // findSalaries
    salariesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSalary
    salaryCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.salary);
    },
    // updateSalary
    salaryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.currentSalaryId === action.payload.salary.currentSalaryId) {
          return action.payload.salary;
        }
        return entity;
      });
    },
    // deleteSalary
    salaryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.currentSalaryId !== action.payload.currentSalaryId);
    },
    // deleteSalaries
    salariesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.currentSalaryId)
      );
    },

    
    // salariesUpdateState
    salariesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.currentSalaryId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

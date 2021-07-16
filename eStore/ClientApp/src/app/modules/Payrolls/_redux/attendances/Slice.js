import {createSlice} from "@reduxjs/toolkit";


const initialAttendancesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  attendanceForEdit: undefined,
  lastError: null, 
  employeeEntities: null, 
  totalCountEmp:0
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const attendancesSlice = createSlice({
  name: "attendances",
  initialState: initialAttendancesState,
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
    // getAttendanceById
    attendanceFetched: (state, action) => {
      state.actionsLoading = false;
      state.attendanceForEdit = action.payload.attendanceForEdit;
      state.error = null;
    },
    // findAttendances
    attendancesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAttendance
    attendanceCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.attendance);
    },
    // updateAttendance
    attendanceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.attendanceId === action.payload.attendance.attendanceId) {
          return action.payload.attendance;
        }
        return entity;
      });
    },
    // deleteAttendance
    attendanceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.attendanceId !== action.payload.attendanceId);
    },
    // deleteAttendances
    attendancesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.attendanceId)
      );
    },

    
    // attendancesUpdateState
    attendancesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.attendanceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

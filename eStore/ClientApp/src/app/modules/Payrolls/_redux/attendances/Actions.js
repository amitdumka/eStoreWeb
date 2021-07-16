import * as requestFromServer from "./Crud";
import {attendancesSlice, callTypes} from "./Slice";

const {actions} = attendancesSlice;

export const fetchEmployees =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getAllEmployees()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.employeesListFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load employees list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchAttendances = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAttendances(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.attendancesFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find attendances";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAttendance = id => dispatch => {
  if (!id) {
    return dispatch(actions.attendanceFetched({ attendanceForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAttendanceById(id)
    .then(response => {
      const attendance = response.data;
      dispatch(actions.attendanceFetched({ attendanceForEdit: attendance }));
    })
    .catch(error => {
      error.clientMessage = "Can't find attendance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAttendance = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAttendance(id)
    .then(response => {
      dispatch(actions.attendanceDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete attendance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createAttendance = attendanceForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createAttendance(JSON.stringify( attendanceForCreation))
    .then(response => {
      const  attendance  = response.data;
      console.log(response.data);
      dispatch(actions.attendanceCreated({ attendance }));
    })
    .catch(error => {
      error.clientMessage = "Can't create attendance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAttendance = attendance => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAttendance(attendance)
    .then(() => {
      console.log(attendance);
      dispatch(actions.attendanceUpdated({ attendance }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update attendance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAttendancesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForAttendances(ids, status)
    .then(() => {
      dispatch(actions.attendancesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update attendances status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAttendances = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAttendances(ids)
    .then(() => {

      dispatch(actions.attendancesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete attendances";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


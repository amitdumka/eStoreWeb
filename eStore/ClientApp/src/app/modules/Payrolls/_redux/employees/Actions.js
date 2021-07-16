import * as requestFromServer from "./Crud";
import {employeesSlice, callTypes} from "./Slice";

const {actions} = employeesSlice;

export const fetchEmployees = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployees(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.employeesFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find employees";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchEmployee = id => dispatch => {
  if (!id) {
    return dispatch(actions.employeeFetched({ employeeForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeById(id)
    .then(response => {
      const employee = response.data;
      dispatch(actions.employeeFetched({ employeeForEdit: employee }));
    })
    .catch(error => {
      error.clientMessage = "Can't find employee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteEmployee = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployee(id)
    .then(response => {
      dispatch(actions.employeeDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete employee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createEmployee = employeeForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createEmployee(JSON.stringify( employeeForCreation))
    .then(response => {
      const  employee  = response.data;
     // console.log(response.data);
      dispatch(actions.employeeCreated({ employee }));
    })
    .catch(error => {
      error.clientMessage = "Can't create employee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateEmployee = employee => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEmployee(employee)
    .then(() => {
      dispatch(actions.employeeUpdated({ employee }));
    })
    .catch(error => {
      error.clientMessage = "Can't update employee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateEmployeesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEmployees(ids, status)
    .then(() => {
      dispatch(actions.employeesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update employees status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteEmployees = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployees(ids)
    .then(() => {

      dispatch(actions.employeesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete employees";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


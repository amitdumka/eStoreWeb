import * as requestFromServer from "./Crud";
import {salariesSlice, callTypes} from "./Slice";

const {actions} = salariesSlice;

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

export const fetchSalaries = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSalaries(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.salariesFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find salaries";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchSalary = id => dispatch => {
  if (!id) {
    return dispatch(actions.salaryFetched({ salaryForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSalaryById(id)
    .then(response => {
      const salary = response.data;
      dispatch(actions.salaryFetched({ salaryForEdit: salary }));
    })
    .catch(error => {
      error.clientMessage = "Can't find salary";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSalary = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSalary(id)
    .then(response => {
      dispatch(actions.salaryDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete salary";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createSalary = salaryForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createSalary(JSON.stringify( salaryForCreation))
    .then(response => {
      const  salary  = response.data;
      console.log(response.data);
      dispatch(actions.salaryCreated({ salary }));
    })
    .catch(error => {
      error.clientMessage = "Can't create salary";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSalary = salary => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateSalary(salary)
    .then(() => {
      console.log(salary);
      dispatch(actions.salaryUpdated({ salary }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update salary";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSalariesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForSalaries(ids, status)
    .then(() => {
      dispatch(actions.salariesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update salaries status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSalaries = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSalaries(ids)
    .then(() => {

      dispatch(actions.salariesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete salaries";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


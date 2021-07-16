import * as requestFromServer from "./Crud";
import {salaryPaymentsSlice, callTypes} from "./Slice";

//SalaryPayment
//salaryPayment


const {actions} = salaryPaymentsSlice;

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

export const fetchSalaryPayments = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSalaryPayments(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.salaryPaymentsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find salaryPayments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchSalaryPayment = id => dispatch => {
  if (!id) {
    return dispatch(actions.salaryPaymentFetched({ salaryPaymentForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSalaryPaymentById(id)
    .then(response => {
      const salaryPayment = response.data;
      dispatch(actions.salaryPaymentFetched({ salaryPaymentForEdit: salaryPayment }));
    })
    .catch(error => {
      error.clientMessage = "Can't find salaryPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSalaryPayment = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSalaryPayment(id)
    .then(response => {
      dispatch(actions.salaryPaymentDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete salaryPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createSalaryPayment = salaryPaymentForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createSalaryPayment(JSON.stringify( salaryPaymentForCreation))
    .then(response => {
      const  salaryPayment  = response.data;
      console.log(response.data);
      dispatch(actions.salaryPaymentCreated({ salaryPayment }));
    })
    .catch(error => {
      error.clientMessage = "Can't create salaryPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSalaryPayment = salaryPayment => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateSalaryPayment(salaryPayment)
    .then(() => {
      console.log(salaryPayment);
      dispatch(actions.salaryPaymentUpdated({ salaryPayment }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update salaryPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSalaryPaymentsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForSalaryPayments(ids, status)
    .then(() => {
      dispatch(actions.salaryPaymentsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update salaryPayments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSalaryPayments = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSalaryPayments(ids)
    .then(() => {

      dispatch(actions.salaryPaymentsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete salaryPayments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


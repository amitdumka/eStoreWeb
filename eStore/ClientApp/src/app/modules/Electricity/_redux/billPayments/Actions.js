import * as requestFromServer from "./Crud";
import {billPaymentsSlice, callTypes} from "./Slice";


//BillPayment
//billPayment


const {actions} = billPaymentsSlice;



export const fetchConnections =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getConnections()
  .then(response=>{
    const entities  = response.data; 
   
    dispatch(actions.connectionsFetched({ entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load Connections list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}
export const fetchBills =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getBills()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
   
    dispatch(actions.billsFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load Bill list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchBillPayments = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBillPayments(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
     
      dispatch(actions.billPaymentsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find billPayments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchBillPayment = id => dispatch => {
  if (!id) {
    return dispatch(actions.billPaymentFetched({ billPaymentForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBillPaymentById(id)
    .then(response => {
      const billPayment = response.data;
      console.log(billPayment);
      dispatch(actions.billPaymentFetched({ billPaymentForEdit: billPayment }));
    })
    .catch(error => {
      error.clientMessage = "Can't find billPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBillPayment = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBillPayment(id)
    .then(response => {
      dispatch(actions.billPaymentDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete billPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBillPayment = billPaymentForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(billPaymentForCreation);
  return requestFromServer
    .createBillPayment(JSON.stringify( billPaymentForCreation))
    .then(response => {
      const  billPayment  = response.data;
      console.log(response.data);
      dispatch(actions.billPaymentCreated({ billPayment }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create billPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBillPayment = billPayment => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(billPayment);
  return requestFromServer
    .updateBillPayment(billPayment)
    .then(() => {
      console.log(billPayment);
      dispatch(actions.billPaymentUpdated({ billPayment }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update billPayment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBillPaymentsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBillPayments(ids, status)
    .then(() => {
      dispatch(actions.billPaymentsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update billPayments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBillPayments = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBillPayments(ids)
    .then(() => {

      dispatch(actions.billPaymentsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete billPayments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


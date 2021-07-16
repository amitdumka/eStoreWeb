import * as requestFromServer from "./Crud";
import {billsSlice, callTypes} from "./Slice";


//Bill
//bill


const {actions} = billsSlice;



export const fetchConnections =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getConnections()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.connectionsFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load Connection list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchBills = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBills(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.billsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find bills";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchBill = id => dispatch => {
  if (!id) {
    return dispatch(actions.billFetched({ billForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBillById(id)
    .then(response => {
      const bill = response.data;
      console.log(bill);
      dispatch(actions.billFetched({ billForEdit: bill }));
    })
    .catch(error => {
      error.clientMessage = "Can't find bill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBill = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBill(id)
    .then(response => {
      dispatch(actions.billDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete bill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBill = billForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(billForCreation);
  return requestFromServer
    .createBill(JSON.stringify( billForCreation))
    .then(response => {
      const  bill  = response.data;
      console.log(response.data);
      dispatch(actions.billCreated({ bill }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create bill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBill = bill => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(bill);
  return requestFromServer
    .updateBill(bill)
    .then(() => {
      console.log(bill);
      dispatch(actions.billUpdated({ bill }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update bill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBillsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBills(ids, status)
    .then(() => {
      dispatch(actions.billsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update bills status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBills = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBills(ids)
    .then(() => {

      dispatch(actions.billsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete bills";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


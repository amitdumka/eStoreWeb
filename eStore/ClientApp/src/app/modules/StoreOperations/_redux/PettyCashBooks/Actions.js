import * as requestFromServer from "./Crud";
import {pettyCashBooksSlice, callTypes} from "./Slice";


//PettyCashBook
//pettyCashBook


const {actions} = pettyCashBooksSlice;



export const fetchPayModes =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getPayModes()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.payModesFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load paymode list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}
export const fetchPettyCashBookTypes =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getPettyCashBookTypes()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.pettyCashBookTypesFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load pettyCashBook type list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}
export const fetchLocations =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getPettyCashBookedLocations()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.pettyCashBookedLocationsFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load pettyCashBook location list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchPettyCashBooks = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPettyCashBooks(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.pettyCashBooksFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find pettyCashBooks";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchSysGenPettyCashSlip =onDate=> dispatch=>{
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
  .getGeneratedPettyCashBook()
  .then(response => {
    const sysGenPettyCashSlip = response.data;
    console.log(sysGenPettyCashSlip);
    dispatch(actions.pettyCashBookSysGenFetched({ sysGenPettyCashSlip: sysGenPettyCashSlip }));
  })
  .catch(error => {
    error.clientMessage = "Can't able to generate Petty Cash Slip";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  });
};

export const fetchPettyCashBook = id => dispatch => {
  if (!id) {
    return dispatch(actions.pettyCashBookFetched({ pettyCashBookForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPettyCashBookById(id)
    .then(response => {
      const pettyCashBook = response.data;
      console.log(pettyCashBook);
      dispatch(actions.pettyCashBookFetched({ pettyCashBookForEdit: pettyCashBook }));
    })
    .catch(error => {
      error.clientMessage = "Can't find pettyCashBook";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePettyCashBook = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePettyCashBook(id)
    .then(response => {
      dispatch(actions.pettyCashBookDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete pettyCashBook";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPettyCashBook = pettyCashBookForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPettyCashBook(JSON.stringify( pettyCashBookForCreation))
    .then(response => {
      const  pettyCashBook  = response.data;
      dispatch(actions.pettyCashBookCreated({ pettyCashBook }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create pettyCashBook";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePettyCashBook = pettyCashBook => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(pettyCashBook);
  return requestFromServer
    .updatePettyCashBook(pettyCashBook)
    .then(() => {
      console.log(pettyCashBook);
      dispatch(actions.pettyCashBookUpdated({ pettyCashBook }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update pettyCashBook";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePettyCashBooksStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPettyCashBooks(ids, status)
    .then(() => {
      dispatch(actions.pettyCashBooksStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update pettyCashBooks status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePettyCashBooks = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePettyCashBooks(ids)
    .then(() => {

      dispatch(actions.pettyCashBooksDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete pettyCashBooks";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


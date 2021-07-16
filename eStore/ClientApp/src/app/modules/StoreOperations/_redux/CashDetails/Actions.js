import * as requestFromServer from "./Crud";
import {cashDetailsSlice, callTypes} from "./Slice";


//CashDetail
//cashDetail


const {actions} = cashDetailsSlice;



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
export const fetchCashDetailTypes =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getCashDetailTypes()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.cashDetailTypesFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load cashDetail type list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}
export const fetchLocations =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getCashDetailedLocations()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.cashDetailedLocationsFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load cashDetail location list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchCashDetails = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCashDetails(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.cashDetailsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find cashDetails";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCashDetail = id => dispatch => {
  if (!id) {
    return dispatch(actions.cashDetailFetched({ cashDetailForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCashDetailById(id)
    .then(response => {
      const cashDetail = response.data;
      console.log(cashDetail);
      dispatch(actions.cashDetailFetched({ cashDetailForEdit: cashDetail }));
    })
    .catch(error => {
      error.clientMessage = "Can't find cashDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCashDetail = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCashDetail(id)
    .then(response => {
      dispatch(actions.cashDetailDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete cashDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCashDetail = cashDetailForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(cashDetailForCreation);
  return requestFromServer
    .createCashDetail(JSON.stringify( cashDetailForCreation))
    .then(response => {
      const  cashDetail  = response.data;
      console.log(response.data);
      dispatch(actions.cashDetailCreated({ cashDetail }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create cashDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCashDetail = cashDetail => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(cashDetail);
  return requestFromServer
    .updateCashDetail(cashDetail)
    .then(() => {
      console.log(cashDetail);
      dispatch(actions.cashDetailUpdated({ cashDetail }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update cashDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCashDetailsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCashDetails(ids, status)
    .then(() => {
      dispatch(actions.cashDetailsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update cashDetails status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCashDetails = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCashDetails(ids)
    .then(() => {

      dispatch(actions.cashDetailsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete cashDetails";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


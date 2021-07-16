import * as requestFromServer from "./Crud";
import {saleTaxesSlice, callTypes} from "./Slice";


//SaleTax
//saleTax
//SaleTaxes
//saleTaxes


const {actions} = saleTaxesSlice;

export const fetchTaxTypes =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getAllTaxTypes()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.taxTypesFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load Ledger Types"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchSaleTaxes = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSaleTaxes(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.saleTaxesFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find saleTaxes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchSaleTax = id => dispatch => {
  if (!id) {
    return dispatch(actions.saleTaxFetched({ saleTaxForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSaleTaxById(id)
    .then(response => {
      const saleTax = response.data;
      console.log(saleTax);
      dispatch(actions.saleTaxFetched({ saleTaxForEdit: saleTax }));
    })
    .catch(error => {
      error.clientMessage = "Can't find saleTax";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSaleTax = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSaleTax(id)
    .then(response => {
      dispatch(actions.saleTaxDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete saleTax";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createSaleTax = saleTaxForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(saleTaxForCreation);
  return requestFromServer
    .createSaleTax(JSON.stringify( saleTaxForCreation))
    .then(response => {
      const  saleTax  = response.data;
      console.log(response.data);
      dispatch(actions.saleTaxCreated({ saleTax }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create saleTax";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSaleTax = saleTax => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(saleTax);
  return requestFromServer
    .updateSaleTax(saleTax)
    .then(() => {
      console.log(saleTax);
      dispatch(actions.saleTaxUpdated({ saleTax }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update saleTax";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSaleTaxesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForSaleTaxes(ids, status)
    .then(() => {
      dispatch(actions.saleTaxesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update saleTaxes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSaleTaxes = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSaleTaxes(ids)
    .then(() => {

      dispatch(actions.saleTaxesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete saleTaxes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


import * as requestFromServer from "./Crud";
import {bankAccountsSlice, callTypes} from "./Slice";


//BankAccount
//bankAccount


const {actions} = bankAccountsSlice;

export const fetchBanks =id=>dispatch => {
  
  dispatch(actions.startCall({callType:callTypes.list}));

  return requestFromServer
  .getAllBanks()
  .then(response=>{
    const entities  = response.data; 
    const totalCount=response.data.length;
    console.log(entities);
    dispatch(actions.banksListFetched({totalCount, entities}));
  })
  .catch(error =>{
    console.log(error);
    error.clientMessage="Can't load banks list"; 
    dispatch(actions.catchError({error,callTypes:callTypes.list}));
  });
}

export const fetchBankAccounts = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBankAccounts(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.bankAccountsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find bankAccounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchBankAccount = id => dispatch => {
  if (!id) {
    return dispatch(actions.bankAccountFetched({ bankAccountForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBankAccountById(id)
    .then(response => {
      const bankAccount = response.data;
      console.log(bankAccount);
      dispatch(actions.bankAccountFetched({ bankAccountForEdit: bankAccount }));
    })
    .catch(error => {
      error.clientMessage = "Can't find bankAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBankAccount = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBankAccount(id)
    .then(response => {
      dispatch(actions.bankAccountDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete bankAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBankAccount = bankAccountForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(bankAccountForCreation);
  return requestFromServer
    .createBankAccount(JSON.stringify( bankAccountForCreation))
    .then(response => {
      const  bankAccount  = response.data;
      console.log(response.data);
      dispatch(actions.bankAccountCreated({ bankAccount }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create bankAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBankAccount = bankAccount => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(bankAccount);
  return requestFromServer
    .updateBankAccount(bankAccount)
    .then(() => {
      console.log(bankAccount);
      dispatch(actions.bankAccountUpdated({ bankAccount }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update bankAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBankAccountsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBankAccounts(ids, status)
    .then(() => {
      dispatch(actions.bankAccountsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update bankAccounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBankAccounts = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBankAccounts(ids)
    .then(() => {

      dispatch(actions.bankAccountsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete bankAccounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


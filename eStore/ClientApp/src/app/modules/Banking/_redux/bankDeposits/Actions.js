import * as requestFromServer from "./Crud";
import {bankDepositsSlice, callTypes} from "./Slice";


//BankDeposit
//bankDeposit


const {actions} = bankDepositsSlice;

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

export const fetchBankDeposits = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBankDeposits(queryParams)
    .then(response => {
      const  entities  = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.bankDepositsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find bankDeposits";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchBankDeposit = id => dispatch => {
  if (!id) {
    return dispatch(actions.bankDepositFetched({ bankDepositForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBankDepositById(id)
    .then(response => {
      const bankDeposit = response.data;
      dispatch(actions.bankDepositFetched({ bankDepositForEdit: bankDeposit }));
    })
    .catch(error => {
      error.clientMessage = "Can't find bankDeposit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBankDeposit = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBankDeposit(id)
    .then(response => {
      dispatch(actions.bankDepositDeleted({ id }));
    })
    .catch(error => {
      
      console.log("CD="+error);
      error.clientMessage = "Can't delete bankDeposit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBankDeposit = bankDepositForCreation => dispatch => {
  console.log((bankDepositForCreation));
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBankDeposit(JSON.stringify( bankDepositForCreation))
    .then(response => {
      const  bankDeposit  = response.data;
      console.log(response.data);
      dispatch(actions.bankDepositCreated({ bankDeposit }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't create bankDeposit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBankDeposit = bankDeposit => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log((bankDeposit));
  return requestFromServer
    .updateBankDeposit(bankDeposit)
    .then(() => {
      console.log(bankDeposit);
      dispatch(actions.bankDepositUpdated({ bankDeposit }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't update bankDeposit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBankDepositsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBankDeposits(ids, status)
    .then(() => {
      dispatch(actions.bankDepositsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update bankDeposits status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBankDeposits = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBankDeposits(ids)
    .then(() => {

      dispatch(actions.bankDepositsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete bankDeposits";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


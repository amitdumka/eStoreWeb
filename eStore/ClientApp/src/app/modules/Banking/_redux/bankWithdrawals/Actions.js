import * as requestFromServer from "./Crud";
import { bankWithdrawalsSlice, callTypes } from "./Slice";

//BankWithdrawal
//bankWithdrawal

const { actions } = bankWithdrawalsSlice;

export const fetchBanks = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllBanks()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.banksListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load banks list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};
export const fetchPayModes = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllPayModes()
    .then((response) => {
      const entities = response.data;
      console.log(entities);
      dispatch(actions.payModeListFetched({ entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load Paymode list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchBankWithdrawals = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBankWithdrawals(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response);
      console.log(response.data.length);
      dispatch(actions.bankWithdrawalsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find bankWithdrawals";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchBankWithdrawal = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.bankWithdrawalFetched({ bankWithdrawalForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBankWithdrawalById(id)
    .then((response) => {
      const bankWithdrawal = response.data;
      dispatch(
        actions.bankWithdrawalFetched({ bankWithdrawalForEdit: bankWithdrawal })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find bankWithdrawal";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBankWithdrawal = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBankWithdrawal(id)
    .then((response) => {
      dispatch(actions.bankWithdrawalDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete bankWithdrawal";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBankWithdrawal = (bankWithdrawalForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(bankWithdrawalForCreation);
  return requestFromServer
    .createBankWithdrawal(JSON.stringify(bankWithdrawalForCreation))
    .then((response) => {
      const bankWithdrawal = response.data;
      console.log(response.data);
      dispatch(actions.bankWithdrawalCreated({ bankWithdrawal }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't create bankWithdrawal";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBankWithdrawal = (bankWithdrawal) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBankWithdrawal(bankWithdrawal)
    .then(() => {
      console.log(bankWithdrawal);
      dispatch(actions.bankWithdrawalUpdated({ bankWithdrawal }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update bankWithdrawal";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBankWithdrawalsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBankWithdrawals(ids, status)
    .then(() => {
      dispatch(actions.bankWithdrawalsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update bankWithdrawals status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBankWithdrawals = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBankWithdrawals(ids)
    .then(() => {
      dispatch(actions.bankWithdrawalsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bankWithdrawals";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

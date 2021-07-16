import * as requestFromServer from "./Crud";
import { paymentsSlice, callTypes } from "./Slice";

//Payment
//payment

const { actions } = paymentsSlice;

export const fetchParties = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllParty()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.partiesListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load parties/Ledger list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};
export const fetchBankAccounts = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllBankAccount()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.bankAccountsListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load Bank Accounts list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};



export const fetchEmployees = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllEmployees()
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(entities);
      dispatch(actions.employeesListFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't load employees list";
      dispatch(actions.catchError({ error, callTypes: callTypes.list }));
    });
};

export const fetchPayments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPayments(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      console.log(response.data);
      
      dispatch(actions.paymentsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find payments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPayment = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.paymentFetched({ paymentForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPaymentById(id)
    .then((response) => {
      const payment = response.data;
      dispatch(actions.paymentFetched({ paymentForEdit: payment }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePayment = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePayment(id)
    .then((response) => {
      dispatch(actions.paymentDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPayment = (paymentForCreation) => (dispatch) => {
  console.log(paymentForCreation);
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPayment(JSON.stringify(paymentForCreation))
    .then((response) => {
      const payment = response.data;
      dispatch(actions.paymentCreated({ payment }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't create payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePayment = (payment) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePayment(payment)
    .then(() => {
      console.log(payment);
      dispatch(actions.paymentUpdated({ payment }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePaymentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPayments(ids, status)
    .then(() => {
      dispatch(actions.paymentsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update payments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePayments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePayments(ids)
    .then(() => {
      dispatch(actions.paymentsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete payments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

import * as requestFromServer from "./Crud";
import { expensesSlice, callTypes } from "./Slice";

//Expense
//expense

const { actions } = expensesSlice;

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

export const fetchExpenses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findExpenses(queryParams)
    .then((response) => {
      const entities = response.data;
      const totalCount = response.data.length;
      dispatch(actions.expensesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find expenses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchExpense = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.expenseFetched({ expenseForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getExpenseById(id)
    .then((response) => {
      const expense = response.data;
      dispatch(actions.expenseFetched({ expenseForEdit: expense }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find expense";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteExpense = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteExpense(id)
    .then((response) => {
      dispatch(actions.expenseDeleted({ id }));
    })
    .catch((error) => {
      console.log("CD=" + error);
      error.clientMessage = "Can't delete expense";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createExpense = (expenseForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createExpense(JSON.stringify(expenseForCreation))
    .then((response) => {
      const expense = response.data;
      dispatch(actions.expenseCreated({ expense }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't create expense";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateExpense = (expense) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateExpense(expense)
    .then(() => {
      console.log(expense);
      dispatch(actions.expenseUpdated({ expense }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't update expense";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateExpensesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForExpenses(ids, status)
    .then(() => {
      dispatch(actions.expensesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update expenses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteExpenses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteExpenses(ids)
    .then(() => {
      dispatch(actions.expensesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete expenses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

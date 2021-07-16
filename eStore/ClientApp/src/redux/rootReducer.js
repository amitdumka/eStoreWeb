import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/Stores/_redux/customers/customersSlice";
import { storesSlice } from "../app/modules/Stores/_redux/stores/Slice";
import { employeesSlice } from "../app/modules/Payrolls/_redux/employees/Slice";
import { attendancesSlice } from "../app/modules/Payrolls/_redux/attendances/Slice";
import { salaryPaymentsSlice } from "../app/modules/Payrolls/_redux/salaryPayments/Slice";
//Expense system and Accounting
import { expensesSlice } from "../app/modules/Accounting/_redux/expenses/Slice";
import { paymentsSlice } from "../app/modules/Accounting/_redux/payments/Slice";
import { receiptsSlice } from "../app/modules/Accounting/_redux/receipts/Slice";
import { cashReceiptsSlice } from "../app/modules/Accounting/_redux/cashReceipts/Slice";

import { cashPaymentsSlice } from "../app/modules/Accounting/_redux/cashPayments/Slice";

import { banksSlice } from "../app/modules/Banking/_redux/banks/Slice";
import { bankAccountsSlice } from "../app/modules/Banking/_redux/bankAccounts/Slice";
import { bankDepositsSlice } from "../app/modules/Banking/_redux/bankDeposits/Slice";
import { bankWithdrawalsSlice } from "../app/modules/Banking/_redux/bankWithdrawals/Slice";
import { ledgerTypesSlice } from "../app/modules/legders/_redux/ledgerTypes/Slice";
import { partiesSlice } from "../app/modules/legders/_redux/parties/Slice";
import { purchaseTaxesSlice } from "../app/modules/Taxes/_redux/purchaseTaxes/Slice";
import { saleTaxesSlice } from "../app/modules/Taxes/_redux/saleTaxes/Slice";
import { duesListsSlice } from "../app/modules/Dues/_redux/duesLists/Slice";
import { dueRecoveredsSlice } from "../app/modules/Dues/_redux/dueRecovereds/Slice";
import { bookingsSlice } from "../app/modules/Tailoring/_redux/Booking/Slice";
import { deliveriesSlice } from "../app/modules/Tailoring/_redux/Delivery/Slice";

import { rentsSlice } from "../app/modules/Rents/_redux/rents/Slice";
import { rentedLocationsSlice } from "../app/modules/Rents/_redux/rentedLocations/Slice";
import { dashboardSlice } from "./dashboard/Slice";
import { commonTypesSlice } from "../app/modules/_redux/Slice";
import { connectionsSlice } from "../app/modules/Electricity/_redux/connections/Slice";
import { billsSlice } from "../app/modules/Electricity/_redux/bills/Slice";
import { billPaymentsSlice } from "../app/modules/Electricity/_redux/billPayments/Slice";
import { storeOperationsSlice } from "../app/modules/StoreOperations/_redux/StoreOperations/Slice";
import { dailySalesSlice } from "../app/modules/Sales/_redux/DailySales/Slice";
import { pettyCashBooksSlice } from "../app/modules/StoreOperations/_redux/PettyCashBooks/Slice";
import { cashDetailsSlice } from "../app/modules/StoreOperations/_redux/CashDetails/Slice";
import {  endOfDaysSlice} from "../app/modules/StoreOperations/_redux/EndOfDays/Slice";
import { dayClosingsSlice } from "../app/modules/StoreOperations/_redux/DayClosing/Slice";
import {contactsSlice} from "../app/modules/Stores/_redux/Contacts/Slice";
import {transcationModesSlice} from "../app/modules/Accounting/_redux/TranscationModes/Slice";
import {staffAdvanceReceiptsSlice} from "../app/modules/Payrolls/_redux/StaffAdvanceReceipts/Slice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  ledgerTypes: ledgerTypesSlice.reducer,
  staffAdvanceReceipts: staffAdvanceReceiptsSlice.reducer,
  transcationModes:transcationModesSlice.reducer,
  customers: customersSlice.reducer,
  employees: employeesSlice.reducer,
  attendances: attendancesSlice.reducer,
  stores: storesSlice.reducer,
  salaryPayments: salaryPaymentsSlice.reducer,
  payments: paymentsSlice.reducer,
  expenses: expensesSlice.reducer,
  receipts: receiptsSlice.reducer,
  cashReceipts: cashReceiptsSlice.reducer,
  cashPayments: cashPaymentsSlice.reducer,
  banks: banksSlice.reducer,
  bankAccounts: bankAccountsSlice.reducer,
  bankDeposits: bankDepositsSlice.reducer,
  bankWithdrawals: bankWithdrawalsSlice.reducer,
  parties: partiesSlice.reducer,
  saleTaxes: saleTaxesSlice.reducer,
  purchaseTaxes: purchaseTaxesSlice.reducer,
  duesLists: duesListsSlice.reducer,
  dueRecovereds: dueRecoveredsSlice.reducer,
  bookings: bookingsSlice.reducer,
  deliveries: deliveriesSlice.reducer,
  rentedLocations: rentedLocationsSlice.reducer,
  rents: rentsSlice.reducer,
  dashboard: dashboardSlice.reducer,
  commonTypes: commonTypesSlice.reducer,
  connections: connectionsSlice.reducer,
  bills: billsSlice.reducer,
  billPayments: billPaymentsSlice.reducer,
  storeOperations: storeOperationsSlice.reducer,
  dailySales: dailySalesSlice.reducer,
  pettyCashBooks: pettyCashBooksSlice.reducer,
  cashDetails: cashDetailsSlice.reducer,
  endOfDays: endOfDaysSlice.reducer,
  dayClosings: dayClosingsSlice.reducer,
  contacts:contactsSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}

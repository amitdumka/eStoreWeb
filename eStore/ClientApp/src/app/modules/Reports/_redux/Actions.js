import * as requestFromServer from "./Crud";
import {reportsSlice, callTypes} from "./Slice";

//Report
//report

const {actions} = reportsSlice;

export const fetchIncomeExpenses = onDate => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getIncomeExpensesReport(onDate)
    .then(response => {
      const  entities  = response.data;
      console.log(response);
      dispatch(actions.incomeExpensesFetched({  entities }));
    })
    .catch(error => {
      console.log(error);
      error.clientMessage = "Can't find Income Expenses Report";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

// export const fetchReport = id => dispatch => {
//   if (!id) {
//     return dispatch(actions.reportFetched({ reportForEdit: undefined }));
//   }

//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer
//     .getReportById(id)
//     .then(response => {
//       const report = response.data;
//       dispatch(actions.reportFetched({ reportForEdit: report }));
//     })
//     .catch(error => {
//       error.clientMessage = "Can't find report";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };
 

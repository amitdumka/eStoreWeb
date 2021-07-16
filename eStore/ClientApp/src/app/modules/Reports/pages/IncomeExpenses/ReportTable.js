import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/Actions";


export function todayDate(separator='/'){
  
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

export function ReportTable() {
  // Getting curret state of rents list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.rents }),
    shallowEqual
  );
  // eslint-disable-next-line no-unused-vars
  const { incomeExpensesEntities, listLoading } = currentState;
 // const todayDate = new Date().format({template:"dd/mm/yyyy"});
  // Report Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call
    dispatch(actions.fetchIncomeExpenses( todayDate()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const IEReport = (data) => {
    const  title = data && data.title && data.title;
    return (
      <>
        <h4> {title ? title : "Income Expenses"} Report</h4>
        <div className="col-6">
          <table className="table table table-head-custom table-vertical-center overflow-hidden">
            {/* Income Part */}
            <tr>
              <td className="text-success">Income</td>
              <td></td>
            </tr>
            <tr>
              <td>TotalSale</td>
              <td>{data.totalSale}</td>
            </tr>
            <tr>
              <td>TotalManualSale</td>
              <td>{data.totalManualSale}</td>
            </tr>
            <tr>
              <td>TotalTailoringSale</td>
              <td>{data.totalTailoringSale}</td>
            </tr>
            <tr>
              <td>TotalCashRecipts</td>
              <td>{data.totalCashRecipts}</td>
            </tr>
            <tr>
              <td>TotalRecipts</td>
              <td>{data.totalRecipts}</td>
            </tr>
            <tr>
              <td>TotalOtherIncome</td>
              <td>{data.totalOtherIncome}</td>
            </tr>
            <tr>
              <td className="text-danger">Total Income</td>
              <td>{data.totalIncome}</td>
            </tr>

            {/* Expenses */}
            <tr>
              <td className="text-warning">Expenses</td>
              <td></td>
            </tr>
            <tr>
              <td>TotalExpenses</td>
              <td>{data.totalExpenses}</td>
            </tr>
            <tr>
              <td>TotalOthersExpenses</td>
              <td>{data.totalOthersExpenses}</td>
            </tr>
            <tr>
              <td>TotalPayments</td>
              <td>{data.totalPayments}</td>
            </tr>
            <tr>
              <td>TotalStaffPayments</td>
              <td>{data.totalStaffPayments}</td>
            </tr>
            <tr>
              <td>TotalCashPayments</td>
              <td>{data.totalCashPayments}</td>
            </tr>
            <tr>
              <td>TotalHomeExpenses</td>
              <td>{data.totalHomeExpenses}</td>
            </tr>
            <tr>
              <td>All Expenses</td>
              <td>{data.totalAllExpenses}</td>
            </tr>
            {/* Dues */}
            <tr>
              <td>Dues</td>
              <td></td>
            </tr>
            <tr>
              <td>TotalDues</td>
              <td>{data.totalDues}</td>
            </tr>
            <tr>
              <td>TotalRecovery</td>
              <td>{data.totalRecovery}</td>
            </tr>
            <tr>
              <td>Pending</td>
              <td>{data.totalPendingDues}</td>
            </tr>
            {/** Footer */}
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </>
    );
  };

  return (
    <div>
      {/* {incomeExpensesEntities && incomeExpensesEntities ? (
        incomeExpensesEntities.map((item) => <IEReport data={item} />)
      ) : (
        <h3 className="text-warning"> No Data Avialable </h3>
      )} */}
      { incomeExpensesEntities && console.log( incomeExpensesEntities)}
      { incomeExpensesEntities && incomeExpensesEntities.map((item) => <IEReport data={item} />)}
    </div>
  );
}

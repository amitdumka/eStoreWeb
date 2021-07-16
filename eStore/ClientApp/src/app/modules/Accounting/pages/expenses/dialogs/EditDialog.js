import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/expenses/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
import * as commonActions from "../../../../_redux/Actions";

//expense
//Expense

export function EditDialog({ id, show, onHide }) {
  // Expenses UI Context
  const expensesUIContext = useUIContext();
  const expensesUIProps = useMemo(() => {
    return {
      initExpense: expensesUIContext.initExpense,
    };
  }, [expensesUIContext]);

  // Expenses Redux state
  const dispatch = useDispatch();
  const { actionsLoading, expenseForEdit ,employeeList, partiesList, bankAccountsList,payModes} = useSelector(
    (state) => ({
      actionsLoading: state.expenses.actionsLoading,
      expenseForEdit: state.expenses.expenseForEdit,
      employeeList:state.expenses.employeeEntities,
      partiesList:state.expenses.partiesEntities, 
      bankAccountsList:state.expenses.bankaccEntities, 
      payModes:state.commonTypes.payModes
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Expense by id
    dispatch(actions.fetchExpense(id));
    dispatch(actions.fetchParties());
    dispatch(actions.fetchBankAccounts());
    dispatch(actions.fetchEmployees());
    dispatch(commonActions.fetchEnumValue("payMode"));
  }, [id, dispatch]);

  // server request for saving expense
  const saveExpense = (expense) => {
    expense.payMode=parseInt(expense.payMode);
    if (!id) {
      // server request for creating expense
      dispatch(actions.createExpense(expense)).then(() => onHide());
    } else {
      // server request for updating expense
      dispatch(actions.updateExpense(expense)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <EditDialogHeader id={id} />
      <EditForm
        saveExpense={saveExpense}
        actionsLoading={actionsLoading}
        expense={expenseForEdit || expensesUIProps.initExpense}
        onHide={onHide}
        employeeList={employeeList}
        partiesList={partiesList}
        bankAccountsList={bankAccountsList}
        payModes={payModes}
      />
    </Modal>
  );
}

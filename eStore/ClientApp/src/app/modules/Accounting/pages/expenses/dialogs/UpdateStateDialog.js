import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/expenses/Actions";
import { useUIContext } from "../UIContext";

//expense
//Expense

const selectedExpenses = (entities, ids) => {
  const _expenses = [];
  ids.forEach((id) => {
    const expense = entities.find((el) => el.id === id);
    if (expense) {
      _expenses.push(expense);
    }
  });
  return _expenses;
};

export function UpdateStateDialog({ show, onHide }) {
  // Expenses UI Context
  const expensesUIContext = useUIContext();
  const expensesUIProps = useMemo(() => {
    return {
      ids: expensesUIContext.ids,
      setIds: expensesUIContext.setIds,
      queryParams: expensesUIContext.queryParams,
    };
  }, [expensesUIContext]);

  // Expenses Redux state
  const { expenses, isLoading } = useSelector(
    (state) => ({
      expenses: selectedExpenses(
        state.expenses.entities,
        expensesUIProps.ids
      ),
      isLoading: state.expenses.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!expensesUIProps.ids || expensesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expensesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update expenses status by selected ids
    dispatch(actions.updateExpensesStatus(expensesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchExpenses(expensesUIProps.queryParams)).then(
          () => {
            // clear selections list
            expensesUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected expenses
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>CUSTOMER</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={`id${expense.id}`}>
                <td>{expense.id}</td>
                
                <td>
                  <span className="ml-3">
                    {expense.lastName}, {expense.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

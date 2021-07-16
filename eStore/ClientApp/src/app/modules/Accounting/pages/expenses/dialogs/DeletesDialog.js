import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/expenses/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//expense
//Expense


export function DeletesDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.expenses.actionsLoading }),
    shallowEqual
  );

  // if expenses weren't selected we should close modal
  useEffect(() => {
    if (!expensesUIProps.ids || expensesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expensesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteExpenses = () => {
    // server request for deleting expense by selected ids
    dispatch(actions.deleteExpenses(expensesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchExpenses(expensesUIProps.queryParams)).then(
        () => {
          // clear selections list
          expensesUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Expenses Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected expenses?</span>
        )}
        {isLoading && <span>Expense are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteExpenses}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

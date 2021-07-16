import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/salaryPayments/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//salaryPayment
//SalaryPayment


export function DeletesDialog({ show, onHide }) {
  // SalaryPayments UI Context
  const salaryPaymentsUIContext = useUIContext();
  const salaryPaymentsUIProps = useMemo(() => {
    return {
      ids: salaryPaymentsUIContext.ids,
      setIds: salaryPaymentsUIContext.setIds,
      queryParams: salaryPaymentsUIContext.queryParams,
    };
  }, [salaryPaymentsUIContext]);

  // SalaryPayments Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.salaryPayments.actionsLoading }),
    shallowEqual
  );

  // if salaryPayments weren't selected we should close modal
  useEffect(() => {
    if (!salaryPaymentsUIProps.ids || salaryPaymentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryPaymentsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteSalaryPayments = () => {
    // server request for deleting salaryPayment by selected ids
    dispatch(actions.deleteSalaryPayments(salaryPaymentsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchSalaryPayments(salaryPaymentsUIProps.queryParams)).then(
        () => {
          // clear selections list
          salaryPaymentsUIProps.setIds([]);
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
          SalaryPayments Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected salaryPayments?</span>
        )}
        {isLoading && <span>SalaryPayment are deleting...</span>}
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
            onClick={deleteSalaryPayments}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

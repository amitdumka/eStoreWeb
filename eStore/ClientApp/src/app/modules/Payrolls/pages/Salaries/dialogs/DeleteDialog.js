import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/Salaries/Actions";
import {useUIContext} from "../UIContext";

//salary
//Salary

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // Salaries UI Context
  const salariesUIContext = useUIContext();
  const salariesUIProps = useMemo(() => {
    return {
      setIds: salariesUIContext.setIds,
      queryParams: salariesUIContext.queryParams
    };
  }, [salariesUIContext]);

  // Salaries Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.salaries.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteSalary = () => {
    // server request for deleting salary by id
    dispatch(actions.deleteSalary(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchSalaries(salariesUIProps.queryParams));
      // clear selections list
      salariesUIProps.setIds([]);
      // closing delete modal
      onHide();
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
          Salary Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this salary?</span>
        )}
        {isLoading && <span>Salary is deleting...</span>}
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
            onClick={deleteSalary}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

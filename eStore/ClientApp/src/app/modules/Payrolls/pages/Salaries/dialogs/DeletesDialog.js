import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Salaries/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//salary
//Salary


export function DeletesDialog({ show, onHide }) {
  // Salaries UI Context
  const salariesUIContext = useUIContext();
  const salariesUIProps = useMemo(() => {
    return {
      ids: salariesUIContext.ids,
      setIds: salariesUIContext.setIds,
      queryParams: salariesUIContext.queryParams,
    };
  }, [salariesUIContext]);

  // Salaries Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.salaries.actionsLoading }),
    shallowEqual
  );

  // if salaries weren't selected we should close modal
  useEffect(() => {
    if (!salariesUIProps.ids || salariesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salariesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteSalaries = () => {
    // server request for deleting salary by selected ids
    dispatch(actions.deleteSalaries(salariesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchSalaries(salariesUIProps.queryParams)).then(
        () => {
          // clear selections list
          salariesUIProps.setIds([]);
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
          Salaries Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected salaries?</span>
        )}
        {isLoading && <span>Salary are deleting...</span>}
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
            onClick={deleteSalaries}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

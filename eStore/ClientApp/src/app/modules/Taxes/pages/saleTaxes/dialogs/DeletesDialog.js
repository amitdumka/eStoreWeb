import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/saleTaxes/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//SaleTaxes
//saleTaxes
//SaleTax
//saleTax


export function DeletesDialog({ show, onHide }) {
  // SaleTaxes UI Context
  const saleTaxesUIContext = useUIContext();
  const saleTaxesUIProps = useMemo(() => {
    return {
      ids: saleTaxesUIContext.ids,
      setIds: saleTaxesUIContext.setIds,
      queryParams: saleTaxesUIContext.queryParams,
    };
  }, [saleTaxesUIContext]);

  // SaleTaxes Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.saleTaxes.actionsLoading }),
    shallowEqual
  );

  // if saleTaxes weren't selected we should close modal
  useEffect(() => {
    if (!saleTaxesUIProps.ids || saleTaxesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleTaxesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteSaleTaxes = () => {
    // server request for deleting saleTax by selected ids
    dispatch(actions.deleteSaleTaxes(saleTaxesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchSaleTaxes(saleTaxesUIProps.queryParams)).then(
        () => {
          // clear selections list
          saleTaxesUIProps.setIds([]);
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
          SaleTaxes Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected saleTaxes?</span>
        )}
        {isLoading && <span>SaleTax are deleting...</span>}
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
            onClick={deleteSaleTaxes}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

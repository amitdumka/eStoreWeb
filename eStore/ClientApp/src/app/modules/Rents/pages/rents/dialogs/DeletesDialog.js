import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rents/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//rent
//Rent


export function DeletesDialog({ show, onHide }) {
  // Rents UI Context
  const rentsUIContext = useUIContext();
  const rentsUIProps = useMemo(() => {
    return {
      ids: rentsUIContext.ids,
      setIds: rentsUIContext.setIds,
      queryParams: rentsUIContext.queryParams,
    };
  }, [rentsUIContext]);

  // Rents Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.rents.actionsLoading }),
    shallowEqual
  );

  // if rents weren't selected we should close modal
  useEffect(() => {
    if (!rentsUIProps.ids || rentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteRents = () => {
    // server request for deleting rent by selected ids
    dispatch(actions.deleteRents(rentsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchRents(rentsUIProps.queryParams)).then(
        () => {
          // clear selections list
          rentsUIProps.setIds([]);
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
          Rents Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected rents?</span>
        )}
        {isLoading && <span>Rent are deleting...</span>}
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
            onClick={deleteRents}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

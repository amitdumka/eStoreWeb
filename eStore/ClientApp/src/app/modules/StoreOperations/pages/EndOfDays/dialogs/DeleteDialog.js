import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/endOfDays/Actions";
import {useUIContext} from "../UIContext";

//endOfDay
//EndOfDay

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // EndOfDays UI Context
  const endOfDaysUIContext = useUIContext();
  const endOfDaysUIProps = useMemo(() => {
    return {
      setIds: endOfDaysUIContext.setIds,
      queryParams: endOfDaysUIContext.queryParams
    };
  }, [endOfDaysUIContext]);

  // EndOfDays Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.endOfDays.actionsLoading }),
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

  const deleteEndOfDay = () => {
    // server request for deleting endOfDay by id
    dispatch(actions.deleteEndOfDay(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchEndOfDays(endOfDaysUIProps.queryParams));
      // clear selections list
      endOfDaysUIProps.setIds([]);
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
          EndOfDay Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this endOfDay?</span>
        )}
        {isLoading && <span>EndOfDay is deleting...</span>}
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
            onClick={deleteEndOfDay}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

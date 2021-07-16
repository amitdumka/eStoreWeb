import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/endOfDays/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//endOfDay
//EndOfDay


export function DeletesDialog({ show, onHide }) {
  // EndOfDays UI Context
  const endOfDaysUIContext = useUIContext();
  const endOfDaysUIProps = useMemo(() => {
    return {
      ids: endOfDaysUIContext.ids,
      setIds: endOfDaysUIContext.setIds,
      queryParams: endOfDaysUIContext.queryParams,
    };
  }, [endOfDaysUIContext]);

  // EndOfDays Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.endOfDays.actionsLoading }),
    shallowEqual
  );

  // if endOfDays weren't selected we should close modal
  useEffect(() => {
    if (!endOfDaysUIProps.ids || endOfDaysUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endOfDaysUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteEndOfDays = () => {
    // server request for deleting endOfDay by selected ids
    dispatch(actions.deleteEndOfDays(endOfDaysUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchEndOfDays(endOfDaysUIProps.queryParams)).then(
        () => {
          // clear selections list
          endOfDaysUIProps.setIds([]);
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
          EndOfDays Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected endOfDays?</span>
        )}
        {isLoading && <span>EndOfDay are deleting...</span>}
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
            onClick={deleteEndOfDays}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

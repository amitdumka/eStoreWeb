import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/TranscationModes/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//transcationMode
//TranscationMode


export function DeletesDialog({ show, onHide }) {
  // TranscationModes UI Context
  const transcationModesUIContext = useUIContext();
  const transcationModesUIProps = useMemo(() => {
    return {
      ids: transcationModesUIContext.ids,
      setIds: transcationModesUIContext.setIds,
      queryParams: transcationModesUIContext.queryParams,
    };
  }, [transcationModesUIContext]);

  // TranscationModes Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.transcationModes.actionsLoading }),
    shallowEqual
  );

  // if transcationModes weren't selected we should close modal
  useEffect(() => {
    if (!transcationModesUIProps.ids || transcationModesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcationModesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteTranscationModes = () => {
    // server request for deleting transcationMode by selected ids
    dispatch(actions.deleteTranscationModes(transcationModesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchTranscationModes(transcationModesUIProps.queryParams)).then(
        () => {
          // clear selections list
          transcationModesUIProps.setIds([]);
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
          TranscationModes Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected transcationModes?</span>
        )}
        {isLoading && <span>TranscationMode are deleting...</span>}
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
            onClick={deleteTranscationModes}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

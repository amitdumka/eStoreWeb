import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/dueRecovereds/Actions";
import { useUIContext } from "../UIContext";

//dueRecovered
//DueRecovered

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // DueRecovereds UI Context
  const dueRecoveredsUIContext = useUIContext();
  const dueRecoveredsUIProps = useMemo(() => {
    return {
      setIds: dueRecoveredsUIContext.setIds,
      queryParams: dueRecoveredsUIContext.queryParams,
    };
  }, [dueRecoveredsUIContext]);

  // DueRecovereds Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.dueRecovereds.actionsLoading }),
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

  const deleteDueRecovered = () => {
    // server request for deleting dueRecovered by id
    dispatch(actions.deleteDueRecovered(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDueRecovereds(dueRecoveredsUIProps.queryParams));
      // clear selections list
      dueRecoveredsUIProps.setIds([]);
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
          DueRecovered Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this dueRecovered?</span>
        )}
        {isLoading && <span>DueRecovered is deleting...</span>}
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
            onClick={deleteDueRecovered}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

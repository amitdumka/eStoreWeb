import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dueRecovereds/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//dueRecovered
//DueRecovered


export function DeletesDialog({ show, onHide }) {
  // DueRecovereds UI Context
  const dueRecoveredsUIContext = useUIContext();
  const dueRecoveredsUIProps = useMemo(() => {
    return {
      ids: dueRecoveredsUIContext.ids,
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

  // if dueRecovereds weren't selected we should close modal
  useEffect(() => {
    if (!dueRecoveredsUIProps.ids || dueRecoveredsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dueRecoveredsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDueRecovereds = () => {
    // server request for deleting dueRecovered by selected ids
    dispatch(actions.deleteDueRecovereds(dueRecoveredsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDueRecovereds(dueRecoveredsUIProps.queryParams)).then(
        () => {
          // clear selections list
          dueRecoveredsUIProps.setIds([]);
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
          DueRecovereds Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected dueRecovereds?</span>
        )}
        {isLoading && <span>DueRecovered are deleting...</span>}
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
            onClick={deleteDueRecovereds}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

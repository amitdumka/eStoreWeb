import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/attendances/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//attendance
//Attendance


export function DeletesDialog({ show, onHide }) {
  // Attendances UI Context
  const attendancesUIContext = useUIContext();
  const attendancesUIProps = useMemo(() => {
    return {
      ids: attendancesUIContext.ids,
      setIds: attendancesUIContext.setIds,
      queryParams: attendancesUIContext.queryParams,
    };
  }, [attendancesUIContext]);

  // Attendances Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.attendances.actionsLoading }),
    shallowEqual
  );

  // if attendances weren't selected we should close modal
  useEffect(() => {
    if (!attendancesUIProps.ids || attendancesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendancesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteAttendances = () => {
    // server request for deleting attendance by selected ids
    dispatch(actions.deleteAttendances(attendancesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAttendances(attendancesUIProps.queryParams)).then(
        () => {
          // clear selections list
          attendancesUIProps.setIds([]);
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
          Attendances Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected attendances?</span>
        )}
        {isLoading && <span>Attendance are deleting...</span>}
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
            onClick={deleteAttendances}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

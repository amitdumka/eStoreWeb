import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/dayClosings/Actions";
import {useUIContext} from "../UIContext";

//dayClosing
//DayClosing

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // DayClosings UI Context
  const dayClosingsUIContext = useUIContext();
  const dayClosingsUIProps = useMemo(() => {
    return {
      setIds: dayClosingsUIContext.setIds,
      queryParams: dayClosingsUIContext.queryParams
    };
  }, [dayClosingsUIContext]);

  // DayClosings Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.dayClosings.actionsLoading }),
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

  const deleteDayClosing = () => {
    // server request for deleting dayClosing by id
    dispatch(actions.deleteDayClosing(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDayClosings(dayClosingsUIProps.queryParams));
      // clear selections list
      dayClosingsUIProps.setIds([]);
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
          DayClosing Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this dayClosing?</span>
        )}
        {isLoading && <span>DayClosing is deleting...</span>}
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
            onClick={deleteDayClosing}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

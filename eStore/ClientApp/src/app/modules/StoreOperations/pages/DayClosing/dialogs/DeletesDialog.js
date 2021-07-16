import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dayClosings/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//dayClosing
//DayClosing


export function DeletesDialog({ show, onHide }) {
  // DayClosings UI Context
  const dayClosingsUIContext = useUIContext();
  const dayClosingsUIProps = useMemo(() => {
    return {
      ids: dayClosingsUIContext.ids,
      setIds: dayClosingsUIContext.setIds,
      queryParams: dayClosingsUIContext.queryParams,
    };
  }, [dayClosingsUIContext]);

  // DayClosings Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.dayClosings.actionsLoading }),
    shallowEqual
  );

  // if dayClosings weren't selected we should close modal
  useEffect(() => {
    if (!dayClosingsUIProps.ids || dayClosingsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayClosingsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDayClosings = () => {
    // server request for deleting dayClosing by selected ids
    dispatch(actions.deleteDayClosings(dayClosingsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDayClosings(dayClosingsUIProps.queryParams)).then(
        () => {
          // clear selections list
          dayClosingsUIProps.setIds([]);
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
          DayClosings Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected dayClosings?</span>
        )}
        {isLoading && <span>DayClosing are deleting...</span>}
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
            onClick={deleteDayClosings}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

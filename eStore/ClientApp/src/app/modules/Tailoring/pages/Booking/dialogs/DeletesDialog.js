import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Booking/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records

//booking
//Booking


export function DeletesDialog({ show, onHide }) {
  // Bookings UI Context
  const bookingsUIContext = useUIContext();
  const bookingsUIProps = useMemo(() => {
    return {
      ids: bookingsUIContext.ids,
      setIds: bookingsUIContext.setIds,
      queryParams: bookingsUIContext.queryParams,
    };
  }, [bookingsUIContext]);

  // Bookings Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bookings.actionsLoading }),
    shallowEqual
  );

  // if bookings weren't selected we should close modal
  useEffect(() => {
    if (!bookingsUIProps.ids || bookingsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteBookings = () => {
    // server request for deleting booking by selected ids
    dispatch(actions.deleteBookings(bookingsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBookings(bookingsUIProps.queryParams)).then(
        () => {
          // clear selections list
          bookingsUIProps.setIds([]);
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
          Bookings Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected bookings?</span>
        )}
        {isLoading && <span>Booking are deleting...</span>}
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
            onClick={deleteBookings}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

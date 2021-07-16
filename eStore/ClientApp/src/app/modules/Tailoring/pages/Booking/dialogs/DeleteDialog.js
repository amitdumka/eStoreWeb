import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/Booking/Actions";
import {useUIContext} from "../UIContext";


//booking
//Booking

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // Bookings UI Context
  const bookingsUIContext = useUIContext();
  const bookingsUIProps = useMemo(() => {
    return {
      setIds: bookingsUIContext.setIds,
      queryParams: bookingsUIContext.queryParams
    };
  }, [bookingsUIContext]);

  // Bookings Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bookings.actionsLoading }),
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

  const deleteBooking = () => {
    // server request for deleting booking by id
    dispatch(actions.deleteBooking(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBookings(bookingsUIProps.queryParams));
      // clear selections list
      bookingsUIProps.setIds([]);
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
          Booking Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this booking?</span>
        )}
        {isLoading && <span>Booking is deleting...</span>}
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
            onClick={deleteBooking}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

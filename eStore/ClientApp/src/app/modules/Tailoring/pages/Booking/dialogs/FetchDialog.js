import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
// import {
//   BookingstatusCssClasses,
//   BookingstatusTitles,
// } from "../UIHelpers";
import { useUIContext } from "../UIContext";

//booking
//Booking


const selectedBookings = (entities, ids) => {
  const _bookings = [];
  ids.forEach((id) => {
    const booking = entities.find((el) => el.id === id);
    if (booking) {
      _bookings.push(booking);
    }
  });
  return _bookings;
};

export function FetchDialog({ show, onHide }) {
  // Bookings UI Context
  const bookingsUIContext = useUIContext();
  const bookingsUIProps = useMemo(() => {
    return {
      ids: bookingsUIContext.ids,
    };
  }, [bookingsUIContext]);

  // Bookings Redux state
  const { bookings } = useSelector(
    (state) => ({
      bookings: selectedBookings(
        state.bookings.entities,
        bookingsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if bookings weren't selected we should close modal
  useEffect(() => {
    if (!bookingsUIProps.ids || bookingsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>CUSTOMER</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={`id${booking.id}`}>
                <td>{booking.id}</td>
                <td>
                  <span className="ml-3">
                    {booking.lastName}, {booking.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

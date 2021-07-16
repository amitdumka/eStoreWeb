import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Booking/Actions";
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

export function UpdateStateDialog({ show, onHide }) {
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
  const { bookings, isLoading } = useSelector(
    (state) => ({
      bookings: selectedBookings(
        state.bookings.entities,
        bookingsUIProps.ids
      ),
      isLoading: state.bookings.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!bookingsUIProps.ids || bookingsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update bookings status by selected ids
    dispatch(actions.updateBookingsStatus(bookingsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchBookings(bookingsUIProps.queryParams)).then(
          () => {
            // clear selections list
            bookingsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected bookings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
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
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

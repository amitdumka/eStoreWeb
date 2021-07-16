import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";


//booking
//Booking

export function EditDialogHeader({ id }) {
  // Bookings Redux state
  const { bookingForEdit, actionsLoading } = useSelector(
    (state) => ({
      bookingForEdit: state.bookings.bookingForEdit,
      actionsLoading: state.bookings.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Booking";
    if (bookingForEdit && id) {
      _title = `Edit booking  No ${bookingForEdit.bookingSlipNo}`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [bookingForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}

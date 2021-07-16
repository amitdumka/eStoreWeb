import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//Deliveries
//deliveries
//Delivery
//delivery


export function EditDialogHeader({ id }) {
  // Deliveries Redux state
  const { deliveryForEdit, actionsLoading } = useSelector(
    (state) => ({
      deliveryForEdit: state.deliveries.deliveryForEdit,
      actionsLoading: state.deliveries.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Delivery";
    if (deliveryForEdit && id) {
      _title = `Edit delivery '${deliveryForEdit.deliveryName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [deliveryForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}

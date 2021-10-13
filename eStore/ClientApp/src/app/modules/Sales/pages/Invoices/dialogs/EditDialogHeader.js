import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//invoice
//Invoice

export function EditDialogHeader({ id }) {
  // Invoices Redux state
  const { invoiceForEdit, actionsLoading } = useSelector(
    (state) => ({
      invoiceForEdit: state.invoices.invoiceForEdit,
      actionsLoading: state.invoices.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Invoice";
    if (invoiceForEdit && id) {
      _title = `Edit Invoice '${invoiceForEdit.invoiceNumber} ${invoiceForEdit.onDate}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [invoiceForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}

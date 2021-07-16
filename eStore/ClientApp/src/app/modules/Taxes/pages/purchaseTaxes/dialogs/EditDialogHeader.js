import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";


//purchaseTax
//PurchaseTax

export function EditDialogHeader({ id }) {
  // PurchaseTaxes Redux state
  const { purchaseTaxForEdit, actionsLoading } = useSelector(
    (state) => ({
      purchaseTaxForEdit: state.purchaseTaxes.purchaseTaxForEdit,
      actionsLoading: state.purchaseTaxes.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New PurchaseTax";
    if (purchaseTaxForEdit && id) {
      _title = `Edit purchaseTax '${purchaseTaxForEdit.purchaseTaxName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [purchaseTaxForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}

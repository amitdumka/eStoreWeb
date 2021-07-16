import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/banks/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";


//Bank
//bank

export function EditDialog({ id, show, onHide }) {
  // Banks UI Context
  const banksUIContext = useUIContext();
  const banksUIProps = useMemo(() => {
    return {
      initBank: banksUIContext.initBank,
    };
  }, [banksUIContext]);

  // Banks Redux state
  const dispatch = useDispatch();
  const { actionsLoading, bankForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.banks.actionsLoading,
      bankForEdit: state.banks.bankForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Bank by id
    dispatch(actions.fetchBank(id));
  }, [id, dispatch]);

  // server request for saving bank
  const saveBank = (bank) => {
    if (!id) {
      // server request for creating bank
      dispatch(actions.createBank(bank)).then(() => onHide());
    } else {
      // server request for updating bank
      dispatch(actions.updateBank(bank)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <EditDialogHeader id={id} />
      <EditForm
        saveBank={saveBank}
        actionsLoading={actionsLoading}
        bank={bankForEdit || banksUIProps.initBank}
        onHide={onHide}
      />
    </Modal>
  );
}

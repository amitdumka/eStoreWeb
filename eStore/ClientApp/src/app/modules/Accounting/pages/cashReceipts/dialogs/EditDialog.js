import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashReceipts/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";

//cashReceipt
//CashReceipt

export function EditDialog({ id, show, onHide }) {
  // CashReceipts UI Context
  const cashReceiptsUIContext = useUIContext();
  const cashReceiptsUIProps = useMemo(() => {
    return {
      initCashReceipt: cashReceiptsUIContext.initCashReceipt,
    };
  }, [cashReceiptsUIContext]);

  // CashReceipts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, cashReceiptForEdit ,transcationList} = useSelector(
    (state) => ({
      actionsLoading: state.cashReceipts.actionsLoading,
      cashReceiptForEdit: state.cashReceipts.cashReceiptForEdit,
      transcationList:state.cashReceipts.transcationEntities,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting CashReceipt by id
    dispatch(actions.fetchCashReceipt(id));
    dispatch(actions.fetchTranscations());
  }, [id, dispatch]);

  // server request for saving cashReceipt
  const saveCashReceipt = (cashReceipt) => {
    if (!id) {
      // server request for creating cashReceipt
      dispatch(actions.createCashReceipt(cashReceipt)).then(() => onHide());
    } else {
      // server request for updating cashReceipt
      dispatch(actions.updateCashReceipt(cashReceipt)).then(() => onHide());
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
        saveCashReceipt={saveCashReceipt}
        actionsLoading={actionsLoading}
        cashReceipt={cashReceiptForEdit || cashReceiptsUIProps.initCashReceipt}
        onHide={onHide}
        transcationList={transcationList}
      />
    </Modal>
  );
}

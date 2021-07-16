import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashPayments/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";

//cashPayment
//CashPayment

export function EditDialog({ id, show, onHide }) {
  // CashPayments UI Context
  const cashPaymentsUIContext = useUIContext();
  const cashPaymentsUIProps = useMemo(() => {
    return {
      initCashPayment: cashPaymentsUIContext.initCashPayment,
    };
  }, [cashPaymentsUIContext]);

  // CashPayments Redux state
  const dispatch = useDispatch();
  const { actionsLoading, cashPaymentForEdit ,transcationList} = useSelector(
    (state) => ({
      actionsLoading: state.cashPayments.actionsLoading,
      cashPaymentForEdit: state.cashPayments.cashPaymentForEdit,
      transcationList:state.cashPayments.transcationEntities,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting CashPayment by id
    dispatch(actions.fetchCashPayment(id));
    dispatch(actions.fetchTranscations());
  }, [id, dispatch]);

  // server request for saving cashPayment
  const saveCashPayment = (cashPayment) => {
    if (!id) {
      // server request for creating cashPayment
      dispatch(actions.createCashPayment(cashPayment)).then(() => onHide());
    } else {
      // server request for updating cashPayment
      dispatch(actions.updateCashPayment(cashPayment)).then(() => onHide());
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
        saveCashPayment={saveCashPayment}
        actionsLoading={actionsLoading}
        cashPayment={cashPaymentForEdit || cashPaymentsUIProps.initCashPayment}
        onHide={onHide}
        transcationList={transcationList}
      />
    </Modal>
  );
}

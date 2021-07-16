import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/payments/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
import * as commonActions from "../../../../_redux/Actions";

//payment
//Payment

export function EditDialog({ id, show, onHide }) {
  // Payments UI Context
  const paymentsUIContext = useUIContext();
  const paymentsUIProps = useMemo(() => {
    return {
      initPayment: paymentsUIContext.initPayment,
    };
  }, [paymentsUIContext]);

  // Payments Redux state
  const dispatch = useDispatch();
  const { actionsLoading, paymentForEdit ,employeeList, partiesList, bankAccountsList,payModes} = useSelector(
    (state) => ({
      actionsLoading: state.payments.actionsLoading,
      paymentForEdit: state.payments.paymentForEdit,
      employeeList:state.payments.employeeEntities,
      partiesList:state.payments.partiesEntities, 
      bankAccountsList:state.payments.bankaccEntities, 
      payModes:state.commonTypes.payModes
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Payment by id
    dispatch(actions.fetchPayment(id));
    dispatch(actions.fetchParties());
    dispatch(actions.fetchBankAccounts());
    dispatch(actions.fetchEmployees());
    dispatch(commonActions.fetchEnumValue("payMode"));
  }, [id, dispatch]);

  // server request for saving payment
  const savePayment = (payment) => {
    payment.payMode=parseInt(payment.payMode);
    if (!id) {
      // server request for creating payment
      dispatch(actions.createPayment(payment)).then(() => onHide());
    } else {
      // server request for updating payment
      dispatch(actions.updatePayment(payment)).then(() => onHide());
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
        savePayment={savePayment}
        actionsLoading={actionsLoading}
        payment={paymentForEdit || paymentsUIProps.initPayment}
        onHide={onHide}
        employeeList={employeeList}
        partiesList={partiesList}
        bankAccountsList={bankAccountsList}
        payModes={payModes}
      />
    </Modal>
  );
}

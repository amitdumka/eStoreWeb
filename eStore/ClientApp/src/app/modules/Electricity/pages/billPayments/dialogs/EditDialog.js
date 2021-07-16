import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/billPayments/Actions";
import * as commonActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//billPayment
//BillPayment

export function EditDialog({ id, show, onHide }) {
  // BillPayments UI Context
  const billPaymentsUIContext = useUIContext();
  const billPaymentsUIProps = useMemo(() => {
    return {
      initBillPayment: billPaymentsUIContext.initBillPayment,
    };
  }, [billPaymentsUIContext]);

  // BillPayments Redux state
  const dispatch = useDispatch();
  const { actionsLoading, billPaymentForEdit ,billList,  payModes} = useSelector(
    (state) => ({
      actionsLoading: state.billPayments.actionsLoading,
      billPaymentForEdit: state.billPayments.billPaymentForEdit,
     // connectionList: state.billPayments.connectionList,
      billList:state.billPayments.billList,
      payModes: state.commonTypes.payModes,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting BillPayment by id
    dispatch(actions.fetchBillPayment(id));
   // dispatch(actions.fetchConnections());
    dispatch(actions.fetchBills());
    dispatch(commonActions.fetchEnumValue("payMode"));

  }, [id, dispatch]);

  // server request for saving billPayment
  const saveBillPayment = (billPayment) => {
    
    billPayment.accountType=parseInt(billPayment.accountType);
    billPayment.modes=parseInt(billPayment.modes);

    if (!id) {
      // server request for creating billPayment
      dispatch(actions.createBillPayment(billPayment)).then(() => onHide());
    } else {
      // server request for updating billPayment
      dispatch(actions.updateBillPayment(billPayment)).then(() => onHide());
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
        saveBillPayment={saveBillPayment}
        actionsLoading={actionsLoading}
        billPayment={billPaymentForEdit || billPaymentsUIProps.initBillPayment}
        onHide={onHide}
       // connectionList={connectionList}
        billList={billList}
        payModes={payModes}
        
      />
    </Modal>
  );
}

import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bills/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//bill
//Bill

export function EditDialog({ id, show, onHide }) {
  // Bills UI Context
  const billsUIContext = useUIContext();
  const billsUIProps = useMemo(() => {
    return {
      initBill: billsUIContext.initBill,
    };
  }, [billsUIContext]);

  // Bills Redux state
  const dispatch = useDispatch();
  const { actionsLoading, billForEdit , connectionList} = useSelector(
    (state) => ({
      actionsLoading: state.bills.actionsLoading,
      billForEdit: state.bills.billForEdit,
      connectionList: state.bills.connectionList,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Bill by id
    dispatch(actions.fetchBill(id));
    dispatch(actions.fetchConnections());
   
  }, [id, dispatch]);

  // server request for saving bill
  const saveBill = (bill) => {
    
    bill.accountType=parseInt(bill.accountType);

    if (!id) {
      // server request for creating bill
      dispatch(actions.createBill(bill)).then(() => onHide());
    } else {
      // server request for updating bill
      dispatch(actions.updateBill(bill)).then(() => onHide());
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
        saveBill={saveBill}
        actionsLoading={actionsLoading}
        bill={billForEdit || billsUIProps.initBill}
        onHide={onHide}    
       connectionList={connectionList}
      />
    </Modal>
  );
}

import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/receipts/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
import * as commonActions from "../../../../_redux/Actions";

//receipt
//Receipt

export function EditDialog({ id, show, onHide }) {
  // Receipts UI Context
  const receiptsUIContext = useUIContext();
  const receiptsUIProps = useMemo(() => {
    return {
      initReceipt: receiptsUIContext.initReceipt,
    };
  }, [receiptsUIContext]);

  // Receipts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, receiptForEdit , partiesList, bankAccountsList,payModes} = useSelector(
    (state) => ({
      actionsLoading: state.receipts.actionsLoading,
      receiptForEdit: state.receipts.receiptForEdit,
      partiesList:state.receipts.partiesEntities, 
      bankAccountsList:state.receipts.bankaccEntities, 
      payModes:state.commonTypes.payModes
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Receipt by id
    dispatch(actions.fetchReceipt(id));
    dispatch(actions.fetchParties());
    dispatch(actions.fetchBankAccounts());
    dispatch(commonActions.fetchEnumValue("payMode"));
  }, [id, dispatch]);

  // server request for saving receipt
  const saveReceipt = (receipt) => {
    receipt.payMode=parseInt(receipt.payMode);
    console.log(receipt);
    
    if (!id) {
      // server request for creating receipt
      dispatch(actions.createReceipt(receipt)).then(() => onHide());
    } else {
      // server request for updating receipt
      dispatch(actions.updateReceipt(receipt)).then(() => onHide());
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
        saveReceipt={saveReceipt}
        actionsLoading={actionsLoading}
        receipt={receiptForEdit || receiptsUIProps.initReceipt}
        onHide={onHide}
        partiesList={partiesList}
        bankAccountsList={bankAccountsList}
        payModes={payModes}
      />
    </Modal>
  );
}

import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankDeposits/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//bankDeposit
//BankDeposit

export function EditDialog({ id, show, onHide }) {
  // BankDeposits UI Context
  const bankDepositsUIContext = useUIContext();
  const bankDepositsUIProps = useMemo(() => {
    return {
      initBankDeposit: bankDepositsUIContext.initBankDeposit,
    };
  }, [bankDepositsUIContext]);

  // BankDeposits Redux state
  const dispatch = useDispatch();
  const { actionsLoading, bankDepositForEdit ,bankList} = useSelector(
    (state) => ({
      actionsLoading: state.bankDeposits.actionsLoading,
      bankDepositForEdit: state.bankDeposits.bankDepositForEdit,
      bankList:state.bankDeposits.bankEntities
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting BankDeposit by id
    dispatch(actions.fetchBankDeposit(id));
    dispatch(actions.fetchBanks());
  }, [id, dispatch]);

  // server request for saving bankDeposit
  const saveBankDeposit = (bankDeposit) => {
    bankDeposit.payMode=parseInt(bankDeposit.payMode);
    if (!id) {
      // server request for creating bankDeposit
      dispatch(actions.createBankDeposit(bankDeposit)).then(() => onHide());
    } else {
      // server request for updating bankDeposit
      dispatch(actions.updateBankDeposit(bankDeposit)).then(() => onHide());
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
        saveBankDeposit={saveBankDeposit}
        actionsLoading={actionsLoading}
        bankDeposit={bankDepositForEdit || bankDepositsUIProps.initBankDeposit}
        onHide={onHide}
        bankList={bankList}
      />
    </Modal>
  );
}

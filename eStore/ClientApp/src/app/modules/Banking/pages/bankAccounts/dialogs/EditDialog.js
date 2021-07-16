import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankAccounts/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//bankAccount
//BankAccount

export function EditDialog({ id, show, onHide }) {
  // BankAccounts UI Context
  const bankAccountsUIContext = useUIContext();
  const bankAccountsUIProps = useMemo(() => {
    return {
      initBankAccount: bankAccountsUIContext.initBankAccount,
    };
  }, [bankAccountsUIContext]);

  // BankAccounts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, bankAccountForEdit ,bankList} = useSelector(
    (state) => ({
      actionsLoading: state.bankAccounts.actionsLoading,
      bankAccountForEdit: state.bankAccounts.bankAccountForEdit,
      bankList:state.bankAccounts.bankEntities
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting BankAccount by id
    dispatch(actions.fetchBankAccount(id));
    dispatch(actions.fetchBanks());
  }, [id, dispatch]);

  // server request for saving bankAccount
  const saveBankAccount = (bankAccount) => {
    
    bankAccount.accountType=parseInt(bankAccount.accountType);

    if (!id) {
      // server request for creating bankAccount
      dispatch(actions.createBankAccount(bankAccount)).then(() => onHide());
    } else {
      // server request for updating bankAccount
      dispatch(actions.updateBankAccount(bankAccount)).then(() => onHide());
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
        saveBankAccount={saveBankAccount}
        actionsLoading={actionsLoading}
        bankAccount={bankAccountForEdit || bankAccountsUIProps.initBankAccount}
        onHide={onHide}
        bankList={bankList}
      />
    </Modal>
  );
}

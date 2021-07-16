import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankWithdrawals/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
import * as commonActions from "../../../../_redux/Actions";
//bankWithdrawal
//BankWithdrawal

export function EditDialog({ id, show, onHide }) {
  // BankWithdrawals UI Context
  const bankWithdrawalsUIContext = useUIContext();
  const bankWithdrawalsUIProps = useMemo(() => {
    return {
      initBankWithdrawal: bankWithdrawalsUIContext.initBankWithdrawal,
    };
  }, [bankWithdrawalsUIContext]);

  // BankWithdrawals Redux state
  const dispatch = useDispatch();
  const { actionsLoading, bankWithdrawalForEdit ,bankList,payModes} = useSelector(
    (state) => ({
      actionsLoading: state.bankWithdrawals.actionsLoading,
      bankWithdrawalForEdit: state.bankWithdrawals.bankWithdrawalForEdit,
      bankList:state.bankWithdrawals.bankEntities,
      payModes: state.commonTypes.payModes
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting BankWithdrawal by id
    dispatch(actions.fetchBankWithdrawal(id));
    dispatch(actions.fetchBanks());
    dispatch(commonActions.fetchEnumValue("payMode"));
  }, [id, dispatch]);

  // server request for saving bankWithdrawal
  const saveBankWithdrawal = (bankWithdrawal) => {
    bankWithdrawal.payMode=parseInt(bankWithdrawal.payMode);
    if (!id) {
      // server request for creating bankWithdrawal
      dispatch(actions.createBankWithdrawal(bankWithdrawal)).then(() => onHide());
    } else {
      // server request for updating bankWithdrawal
      dispatch(actions.updateBankWithdrawal(bankWithdrawal)).then(() => onHide());
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
        saveBankWithdrawal={saveBankWithdrawal}
        actionsLoading={actionsLoading}
        bankWithdrawal={bankWithdrawalForEdit || bankWithdrawalsUIProps.initBankWithdrawal}
        onHide={onHide}
        bankList={bankList}
        payModes={payModes}
      />
    </Modal>
  );
}

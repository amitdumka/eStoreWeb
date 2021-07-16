import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ledgerTypes/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
import * as commonActions from "../../../../_redux/Actions";

//ledgerType
//LedgerType

export function EditDialog({ id, show, onHide }) {
  // LedgerTypes UI Context
  const ledgerTypesUIContext = useUIContext();
  const ledgerTypesUIProps = useMemo(() => {
    return {
      initLedgerType: ledgerTypesUIContext.initLedgerType,
    };
  }, [ledgerTypesUIContext]);

  // LedgerTypes Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ledgerTypeForEdit, ledgerCategory } = useSelector(
    (state) => ({
      actionsLoading: state.ledgerTypes.actionsLoading,
      ledgerTypeForEdit: state.ledgerTypes.ledgerTypeForEdit,
      ledgerCategory: state.commonTypes.ledgerCategoryType,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting LedgerType by id
    dispatch(actions.fetchLedgerType(id));
    dispatch(commonActions.fetchEnumValue("ledgerCategoryType"));
  }, [id, dispatch]);

  // server request for saving ledgerType
  const saveLedgerType = (ledgerType) => {
    ledgerType.category = parseInt(ledgerType.category);

    if (!id) {
      // server request for creating ledgerType
      dispatch(actions.createLedgerType(ledgerType)).then(() => onHide());
    } else {
      // server request for updating ledgerType
      dispatch(actions.updateLedgerType(ledgerType)).then(() => onHide());
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
        saveLedgerType={saveLedgerType}
        actionsLoading={actionsLoading}
        ledgerType={ledgerTypeForEdit || ledgerTypesUIProps.initLedgerType}
        onHide={onHide}
        ledgerCategory={ledgerCategory}
      />
    </Modal>
  );
}

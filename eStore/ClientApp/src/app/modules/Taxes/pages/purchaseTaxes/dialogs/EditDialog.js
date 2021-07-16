import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/purchaseTaxes/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
import * as cActions from "../../../../_redux/Actions";

//purchaseTax
//PurchaseTax

export function EditDialog({ id, show, onHide }) {
  // PurchaseTaxes UI Context
  const purchaseTaxesUIContext = useUIContext();
  const purchaseTaxesUIProps = useMemo(() => {
    return {
      initPurchaseTax: purchaseTaxesUIContext.initPurchaseTax,
    };
  }, [purchaseTaxesUIContext]);

  // PurchaseTaxes Redux state
  const dispatch = useDispatch();
  const { actionsLoading, purchaseTaxForEdit, taxTypes } = useSelector(
    (state) => ({
      actionsLoading: state.purchaseTaxes.actionsLoading,
      purchaseTaxForEdit: state.purchaseTaxes.purchaseTaxForEdit,
      taxTypes: state.purchaseTaxes.taxType,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting PurchaseTax by id
    dispatch(actions.fetchPurchaseTax(id));
    dispatch(cActions.fetchEnumValue("taxType"));
  }, [id, dispatch]);

  // server request for saving purchaseTax
  const savePurchaseTax = (purchaseTax) => {
    purchaseTax.category = parseInt(purchaseTax.category);

    if (!id) {
      // server request for creating purchaseTax
      dispatch(actions.createPurchaseTax(purchaseTax)).then(() => onHide());
    } else {
      // server request for updating purchaseTax
      dispatch(actions.updatePurchaseTax(purchaseTax)).then(() => onHide());
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
        savePurchaseTax={savePurchaseTax}
        actionsLoading={actionsLoading}
        purchaseTax={purchaseTaxForEdit || purchaseTaxesUIProps.initPurchaseTax}
        onHide={onHide}
        taxTypes={taxTypes}
      />
    </Modal>
  );
}

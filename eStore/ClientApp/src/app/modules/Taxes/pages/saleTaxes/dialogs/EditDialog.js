import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/saleTaxes/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
import * as cActions from "../../../../_redux/Actions";

//SaleTaxes
//saleTaxes
//SaleTax
//saleTax

export function EditDialog({ id, show, onHide }) {
  // SaleTaxes UI Context
  const saleTaxesUIContext = useUIContext();
  const saleTaxesUIProps = useMemo(() => {
    return {
      initSaleTax: saleTaxesUIContext.initSaleTax,
    };
  }, [saleTaxesUIContext]);

  // SaleTaxes Redux state
  const dispatch = useDispatch();
  const { actionsLoading, saleTaxForEdit ,taxTypes} = useSelector(
    (state) => ({
      actionsLoading: state.saleTaxes.actionsLoading,
      saleTaxForEdit: state.saleTaxes.saleTaxForEdit,
      taxTypes:state.commonTypes.taxType
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting SaleTax by id
    dispatch(actions.fetchSaleTax(id));
    dispatch(cActions.fetchEnumValue("taxType"));
  }, [id, dispatch]);

  // server request for saving saleTax
  const saveSaleTax = (saleTax) => {
    
    saleTax.accountType=parseInt(saleTax.accountType);

    if (!id) {
      // server request for creating saleTax
      dispatch(actions.createSaleTax(saleTax)).then(() => onHide());
    } else {
      // server request for updating saleTax
      dispatch(actions.updateSaleTax(saleTax)).then(() => onHide());
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
        saveSaleTax={saveSaleTax}
        actionsLoading={actionsLoading}
        saleTax={saleTaxForEdit || saleTaxesUIProps.initSaleTax}
        onHide={onHide}
        taxTypes={taxTypes}
      />
    </Modal>
  );
}

import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Invoices/Actions";
import * as cActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";

//invoice
//Invoice

export function EditDialog({ id, show, onHide }) {
  // Invoices UI Context
  const invoicesUIContext = useUIContext();
  const invoicesUIProps = useMemo(() => {
    return {
      initInvoice: invoicesUIContext.initData,
    };
  }, [invoicesUIContext]);

  // Invoices Redux state
  const dispatch = useDispatch();
  const {
    actionsLoading,
    invoiceForEdit,
    salesmanList,payModes,storeList
  } = useSelector(
    (state) => ({
      actionsLoading: state.invoices.actionsLoading,
      invoiceForEdit: state.invoices.invoiceForEdit,
      salesmanList: state.invoices.employeeEntities,
      payModes: state.commonTypes.payModes,
      storeList: state.commonTypes.storeList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Invoice by id
    dispatch(actions.fetchInvoice(id));
    dispatch(actions.fetchEmployees());
    dispatch(cActions.fetchEnumValue("payMode"));
    dispatch(cActions.fetchStores());
    
  }, [id, dispatch]);

  // server request for saving invoice
  const saveInvoice = (invoice) => {
    invoice.payMode = parseInt(invoice.payMode);
    if (!id) {
      // server request for creating invoice
      dispatch(actions.createInvoice(invoice)).then(() => onHide());
    } else {
      // server request for updating invoice
      dispatch(actions.updateInvoice(invoice)).then(() => onHide());
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
        saveInvoice={saveInvoice}
        actionsLoading={actionsLoading}
        invoice={invoiceForEdit || invoicesUIProps.initInvoice}
        onHide={onHide}
        salesmanList={salesmanList}
        payModes={payModes}
        storeList={storeList}
      />
    </Modal>
  );
}

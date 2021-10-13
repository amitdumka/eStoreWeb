import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/Invoices/Actions";
import {useUIContext} from "../UIContext";


//Invoice
//invoice

// Delete particular record.
export function PrintDialog({ id, show, onHide }) {
  // Invoices UI Context
  const invoicesUIContext = useUIContext();
  const invoicesUIProps = useMemo(() => {
    return {
      setIds: invoicesUIContext.setIds,
      queryParams: invoicesUIContext.queryParams
    };
  }, [invoicesUIContext]);

  // Invoices Redux state
  const dispatch = useDispatch();
  const { isLoading,invoiceForEdit } = useSelector(
    (state) => ({ isLoading: state.invoices.actionsLoading,invoiceForEdit:state.invoices.invoiceForEdit }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

//   const deleteInvoice = () => {
//     // server request for deleting invoice by id
//     dispatch(actions.deleteInvoice(id)).then(() => {
//       // refresh list after deletion
//       dispatch(actions.fetchInvoices(invoicesUIProps.queryParams));
//       // clear selections list
//       invoicesUIProps.setIds([]);
//       // closing delete modal
//       onHide();
//     });
//   };

  const printInvoice=()=>{
    dispatch(actions.fetchInvoice(id)).then(() => {
        // Do printing Work here.
        alert(invoiceForEdit &&invoiceForEdit);
        onHide();
      });
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Invoice Printing
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Do You want to Print Invoice?</span>
        )}
        {isLoading && <span>Invoice is Printing...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteInvoice}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

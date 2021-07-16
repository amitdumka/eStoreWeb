import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/purchaseTaxes/Actions";
import {useUIContext} from "../UIContext";


//purchaseTax
//PurchaseTax

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // PurchaseTaxes UI Context
  const purchaseTaxesUIContext = useUIContext();
  const purchaseTaxesUIProps = useMemo(() => {
    return {
      setIds: purchaseTaxesUIContext.setIds,
      queryParams: purchaseTaxesUIContext.queryParams
    };
  }, [purchaseTaxesUIContext]);

  // PurchaseTaxes Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.purchaseTaxes.actionsLoading }),
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

  const deletePurchaseTax = () => {
    // server request for deleting purchaseTax by id
    dispatch(actions.deletePurchaseTax(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPurchaseTaxes(purchaseTaxesUIProps.queryParams));
      // clear selections list
      purchaseTaxesUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

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
          PurchaseTax Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this purchaseTax?</span>
        )}
        {isLoading && <span>PurchaseTax is deleting...</span>}
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
            onClick={deletePurchaseTax}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

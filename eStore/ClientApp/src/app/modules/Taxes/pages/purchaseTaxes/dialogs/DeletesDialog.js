import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/purchaseTaxes/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records

//purchaseTax
//PurchaseTax


export function DeletesDialog({ show, onHide }) {
  // PurchaseTaxes UI Context
  const purchaseTaxesUIContext = useUIContext();
  const purchaseTaxesUIProps = useMemo(() => {
    return {
      ids: purchaseTaxesUIContext.ids,
      setIds: purchaseTaxesUIContext.setIds,
      queryParams: purchaseTaxesUIContext.queryParams,
    };
  }, [purchaseTaxesUIContext]);

  // PurchaseTaxes Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.purchaseTaxes.actionsLoading }),
    shallowEqual
  );

  // if purchaseTaxes weren't selected we should close modal
  useEffect(() => {
    if (!purchaseTaxesUIProps.ids || purchaseTaxesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseTaxesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePurchaseTaxes = () => {
    // server request for deleting purchaseTax by selected ids
    dispatch(actions.deletePurchaseTaxes(purchaseTaxesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPurchaseTaxes(purchaseTaxesUIProps.queryParams)).then(
        () => {
          // clear selections list
          purchaseTaxesUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          PurchaseTaxes Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected purchaseTaxes?</span>
        )}
        {isLoading && <span>PurchaseTax are deleting...</span>}
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
            onClick={deletePurchaseTaxes}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

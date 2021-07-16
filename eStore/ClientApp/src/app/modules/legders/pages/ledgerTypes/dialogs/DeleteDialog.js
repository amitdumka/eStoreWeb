import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/ledgerTypes/Actions";
import {useUIContext} from "../UIContext";


//ledgerType
//LedgerType

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // LedgerTypes UI Context
  const ledgerTypesUIContext = useUIContext();
  const ledgerTypesUIProps = useMemo(() => {
    return {
      setIds: ledgerTypesUIContext.setIds,
      queryParams: ledgerTypesUIContext.queryParams
    };
  }, [ledgerTypesUIContext]);

  // LedgerTypes Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ledgerTypes.actionsLoading }),
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

  const deleteLedgerType = () => {
    // server request for deleting ledgerType by id
    dispatch(actions.deleteLedgerType(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchLedgerTypes(ledgerTypesUIProps.queryParams));
      // clear selections list
      ledgerTypesUIProps.setIds([]);
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
          LedgerType Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this ledgerType?</span>
        )}
        {isLoading && <span>LedgerType is deleting...</span>}
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
            onClick={deleteLedgerType}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

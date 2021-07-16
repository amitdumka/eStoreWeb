import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ledgerTypes/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records

//ledgerType
//LedgerType


export function DeletesDialog({ show, onHide }) {
  // LedgerTypes UI Context
  const ledgerTypesUIContext = useUIContext();
  const ledgerTypesUIProps = useMemo(() => {
    return {
      ids: ledgerTypesUIContext.ids,
      setIds: ledgerTypesUIContext.setIds,
      queryParams: ledgerTypesUIContext.queryParams,
    };
  }, [ledgerTypesUIContext]);

  // LedgerTypes Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ledgerTypes.actionsLoading }),
    shallowEqual
  );

  // if ledgerTypes weren't selected we should close modal
  useEffect(() => {
    if (!ledgerTypesUIProps.ids || ledgerTypesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ledgerTypesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteLedgerTypes = () => {
    // server request for deleting ledgerType by selected ids
    dispatch(actions.deleteLedgerTypes(ledgerTypesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchLedgerTypes(ledgerTypesUIProps.queryParams)).then(
        () => {
          // clear selections list
          ledgerTypesUIProps.setIds([]);
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
          LedgerTypes Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected ledgerTypes?</span>
        )}
        {isLoading && <span>LedgerType are deleting...</span>}
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
            onClick={deleteLedgerTypes}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

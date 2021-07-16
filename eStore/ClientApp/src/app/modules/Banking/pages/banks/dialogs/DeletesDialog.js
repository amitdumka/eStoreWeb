import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/banks/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records

//Bank
//bank

export function DeletesDialog({ show, onHide }) {
  // Banks UI Context
  const banksUIContext = useUIContext();
  const banksUIProps = useMemo(() => {
    return {
      ids: banksUIContext.ids,
      setIds: banksUIContext.setIds,
      queryParams: banksUIContext.queryParams,
    };
  }, [banksUIContext]);

  // Banks Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.banks.actionsLoading }),
    shallowEqual
  );

  // if banks weren't selected we should close modal
  useEffect(() => {
    if (!banksUIProps.ids || banksUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banksUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteBanks = () => {
    // server request for deleting bank by selected ids
    dispatch(actions.deleteBanks(banksUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBanks(banksUIProps.queryParams)).then(
        () => {
          // clear selections list
          banksUIProps.setIds([]);
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
          Banks Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected banks?</span>
        )}
        {isLoading && <span>Bank are deleting...</span>}
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
            onClick={deleteBanks}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/PettyCashBooks/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//pettyCashBook
//PettyCashBook


export function DeletesDialog({ show, onHide }) {
  // PettyCashBooks UI Context
  const pettyCashBooksUIContext = useUIContext();
  const pettyCashBooksUIProps = useMemo(() => {
    return {
      ids: pettyCashBooksUIContext.ids,
      setIds: pettyCashBooksUIContext.setIds,
      queryParams: pettyCashBooksUIContext.queryParams,
    };
  }, [pettyCashBooksUIContext]);

  // PettyCashBooks Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.pettyCashBooks.actionsLoading }),
    shallowEqual
  );

  // if pettyCashBooks weren't selected we should close modal
  useEffect(() => {
    if (!pettyCashBooksUIProps.ids || pettyCashBooksUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pettyCashBooksUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePettyCashBooks = () => {
    // server request for deleting pettyCashBook by selected ids
    dispatch(actions.deletePettyCashBooks(pettyCashBooksUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPettyCashBooks(pettyCashBooksUIProps.queryParams)).then(
        () => {
          // clear selections list
          pettyCashBooksUIProps.setIds([]);
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
          PettyCashBooks Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected pettyCashBooks?</span>
        )}
        {isLoading && <span>PettyCashBook are deleting...</span>}
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
            onClick={deletePettyCashBooks}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

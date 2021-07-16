import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/duesLists/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//duesList
//DuesList


export function DeletesDialog({ show, onHide }) {
  // DuesLists UI Context
  const duesListsUIContext = useUIContext();
  const duesListsUIProps = useMemo(() => {
    return {
      ids: duesListsUIContext.ids,
      setIds: duesListsUIContext.setIds,
      queryParams: duesListsUIContext.queryParams,
    };
  }, [duesListsUIContext]);

  // DuesLists Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.duesLists.actionsLoading }),
    shallowEqual
  );

  // if duesLists weren't selected we should close modal
  useEffect(() => {
    if (!duesListsUIProps.ids || duesListsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duesListsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDuesLists = () => {
    // server request for deleting duesList by selected ids
    dispatch(actions.deleteDuesLists(duesListsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDuesLists(duesListsUIProps.queryParams)).then(
        () => {
          // clear selections list
          duesListsUIProps.setIds([]);
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
          DuesLists Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected duesLists?</span>
        )}
        {isLoading && <span>DuesList are deleting...</span>}
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
            onClick={deleteDuesLists}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

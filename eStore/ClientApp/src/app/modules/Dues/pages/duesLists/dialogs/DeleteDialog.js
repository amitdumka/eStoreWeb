import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/duesLists/Actions";
import { useUIContext } from "../UIContext";

//duesList
//DuesList

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // DuesLists UI Context
  const duesListsUIContext = useUIContext();
  const duesListsUIProps = useMemo(() => {
    return {
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

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDuesList = () => {
    // server request for deleting duesList by id
    dispatch(actions.deleteDuesList(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDuesLists(duesListsUIProps.queryParams));
      // clear selections list
      duesListsUIProps.setIds([]);
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
          DuesList Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this duesList?</span>
        )}
        {isLoading && <span>DuesList is deleting...</span>}
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
            onClick={deleteDuesList}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

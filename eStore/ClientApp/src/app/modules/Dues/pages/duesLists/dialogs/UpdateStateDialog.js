import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/duesLists/Actions";
import { useUIContext } from "../UIContext";

//duesList
//DuesList

const selectedDuesLists = (entities, ids) => {
  const _duesLists = [];
  ids.forEach((id) => {
    const duesList = entities.find((el) => el.id === id);
    if (duesList) {
      _duesLists.push(duesList);
    }
  });
  return _duesLists;
};

export function UpdateStateDialog({ show, onHide }) {
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
  const { duesLists, isLoading } = useSelector(
    (state) => ({
      duesLists: selectedDuesLists(
        state.duesLists.entities,
        duesListsUIProps.ids
      ),
      isLoading: state.duesLists.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!duesListsUIProps.ids || duesListsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duesListsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update duesLists status by selected ids
    dispatch(actions.updateDuesListsStatus(duesListsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchDuesLists(duesListsUIProps.queryParams)).then(
          () => {
            // clear selections list
            duesListsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected duesLists
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>CUSTOMER</th>
            </tr>
          </thead>
          <tbody>
            {duesLists.map((duesList) => (
              <tr key={`id${duesList.id}`}>
                <td>{duesList.id}</td>
                
                <td>
                  <span className="ml-3">
                    {duesList.lastName}, {duesList.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

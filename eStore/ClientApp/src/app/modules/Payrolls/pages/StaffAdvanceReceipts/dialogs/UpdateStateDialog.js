import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StaffAdvanceReceipts/Actions";
import { useUIContext } from "../UIContext";

//staffAdvanceReceipt
//StaffAdvanceReceipt

const selectedStaffAdvanceReceipts = (entities, ids) => {
  const _staffAdvanceReceipts = [];
  ids.forEach((id) => {
    const staffAdvanceReceipt = entities.find((el) => el.id === id);
    if (staffAdvanceReceipt) {
      _staffAdvanceReceipts.push(staffAdvanceReceipt);
    }
  });
  return _staffAdvanceReceipts;
};

export function UpdateStateDialog({ show, onHide }) {
  // StaffAdvanceReceipts UI Context
  const staffAdvanceReceiptsUIContext = useUIContext();
  const staffAdvanceReceiptsUIProps = useMemo(() => {
    return {
      ids: staffAdvanceReceiptsUIContext.ids,
      setIds: staffAdvanceReceiptsUIContext.setIds,
      queryParams: staffAdvanceReceiptsUIContext.queryParams,
    };
  }, [staffAdvanceReceiptsUIContext]);

  // StaffAdvanceReceipts Redux state
  const { staffAdvanceReceipts, isLoading } = useSelector(
    (state) => ({
      staffAdvanceReceipts: selectedStaffAdvanceReceipts(
        state.staffAdvanceReceipts.entities,
        staffAdvanceReceiptsUIProps.ids
      ),
      isLoading: state.staffAdvanceReceipts.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!staffAdvanceReceiptsUIProps.ids || staffAdvanceReceiptsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffAdvanceReceiptsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update staffAdvanceReceipts status by selected ids
    dispatch(actions.updateStaffAdvanceReceiptsStatus(staffAdvanceReceiptsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchStaffAdvanceReceipts(staffAdvanceReceiptsUIProps.queryParams)).then(
          () => {
            // clear selections list
            staffAdvanceReceiptsUIProps.setIds([]);
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
          Status has been updated for selected staffAdvanceReceipts
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
            {staffAdvanceReceipts.map((staffAdvanceReceipt) => (
              <tr key={`id${staffAdvanceReceipt.id}`}>
                <td>{staffAdvanceReceipt.id}</td>
                
                <td>
                  <span className="ml-3">
                    {staffAdvanceReceipt.lastName}, {staffAdvanceReceipt.firstName}
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

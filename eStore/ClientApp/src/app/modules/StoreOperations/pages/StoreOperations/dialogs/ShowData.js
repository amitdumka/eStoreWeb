import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StoreOperations/Actions";
import * as commonActions from "../../../../_redux/Actions";
import BootstrapTable from "react-bootstrap-table-next";
import * as uiHelpers from "../UIHelpers";
import { useUIContext } from "../UIContext";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";

//rent
//Rent

export function ShowData({ id, show, onHide }) {
  // Rents UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      initRent: uiContext.initRent,
    };
  }, [uiContext]);

  // Rents Redux state
  const dispatch = useDispatch();
  const { actionsLoading, attendance, storeList } = useSelector(
    (state) => ({
      actionsLoading: state.storeOperations.actionsLoading,
      attendance: state.storeOperations.attendance,
      storeList: state.commonTypes.storeList,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Rent by id
    dispatch(commonActions.fetchStores());
  }, [id, dispatch]);
  const columns = [
    {
      dataField: "attendanceId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "onDate",
      text: "Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cellContent, row) => (
        <span>{new Date(cellContent).toLocaleDateString()}</span>
      ),
    },
    {
      dataField: "employee.StaffName",
      text: "Staff Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cellContent, row, rowIndex) => (
        <span>{storeList && cellContent && storeList[rowIndex].storeName}</span>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
  ];

  let totalCount = 0;

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {attendance && attendance
        ? (totalCount = attendance.length)
        : (totalCount = 0)}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Attendance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BootstrapTable
          wrapperClasses="table-responsive"
          bordered={true}
          classes="table table-head-custom table-vertical-center overflow-hidden"
          bootstrap4
          //remote
          noDataIndication="No Record Found now.."
          keyField="attendanceId"
          data={attendance === null ? [] : totalCount ? attendance : []}
          columns={columns}
          defaultSorted={uiHelpers.defaultSorted}
          onTableChange={getHandlerTableChange(uiProps.setQueryParams)}     
        >
          <PleaseWaitMessage entities={attendance} />
          <NoRecordsFoundMessage entities={attendance} />
        </BootstrapTable>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={onHide}
          className="btn btn-light btn-elevate"
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

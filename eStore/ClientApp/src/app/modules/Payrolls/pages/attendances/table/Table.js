// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {  PaginationProvider} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/attendances/Actions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUIContext } from "../UIContext";
import FieldDateFormater from "../../../../../../_estore/formaters/FieldDateFormater";
import  *  as commonActions from "../../../../_redux/Actions";


export function AttendancesTable({yesterday}) {
  // Attendances UI Context
  const attendancesUIContext = useUIContext();
  const attendancesUIProps = useMemo(() => {
    return {
      ids: attendancesUIContext.ids,
      setIds: attendancesUIContext.setIds,
      queryParams: attendancesUIContext.queryParams,
      setQueryParams: attendancesUIContext.setQueryParams,
      openEditAttendanceDialog: attendancesUIContext.openEditAttendanceDialog,
      openDeleteAttendanceDialog: attendancesUIContext.openDeleteAttendanceDialog,
    };
  }, [attendancesUIContext]);

  attendancesUIProps.queryParams.yesterday=yesterday;

  // Getting current state of attendances list from store (Redux)
  const { currentState,commonState } = useSelector(
    (state) => ({ currentState: state.attendances,commonState: state.commonTypes }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const {storeList}= commonState;

  // Attendances Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    attendancesUIProps.setIds([]);
    console.log(attendancesUIProps.queryParams);
    // server call by queryParams
    dispatch(actions.fetchAttendances(attendancesUIProps.queryParams));
    dispatch(commonActions.fetchStores());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendancesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "attendanceId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "employee.staffName",
      text: "Employee",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "attDate",
      text: "Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: FieldDateFormater,
    },
    {
      dataField: "entryTime",
      text: "Entry Time",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "remarks",
      text: "Remarks",
      sort: false,
      sortCaret: sortCaret,
    },
    
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: columnFormatters.StatusColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "employee.storeId",
      text: "Store",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter:(cellContent, row)=>storeList &&   storeList[cellContent-1]?storeList[cellContent-1].storeName:cellContent
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAttendanceDialog: attendancesUIProps.openEditAttendanceDialog,
        openDeleteAttendanceDialog: attendancesUIProps.openDeleteAttendanceDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: attendancesUIProps.queryParams.pageSize,
    page: attendancesUIProps.queryParams.pageNumber,
  };
 
  
  return (
    <>
       <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return ( 
             <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            > 
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={true}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                //remote
                noDataIndication="No Record Found now.."
                keyField="attendanceId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  attendancesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: attendancesUIProps.ids,
                  setIds: attendancesUIProps.setIds,
                  idName:"attendanceId",
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
             </Pagination>
          );
        }}
      </PaginationProvider> 
    </>
  );
}

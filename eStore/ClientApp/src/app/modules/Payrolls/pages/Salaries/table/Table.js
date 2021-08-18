// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Salaries/Actions";
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


export function SalariesTable() {
  // Salaries UI Context
  const salariesUIContext = useUIContext();
  const salariesUIProps = useMemo(() => {
    return {
      ids: salariesUIContext.ids,
      setIds: salariesUIContext.setIds,
      queryParams: salariesUIContext.queryParams,
      setQueryParams: salariesUIContext.setQueryParams,
      openEditSalaryDialog: salariesUIContext.openEditSalaryDialog,
      openDeleteSalaryDialog: salariesUIContext.openDeleteSalaryDialog,
    };
  }, [salariesUIContext]);

  // Getting current state of salaries list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.salaries }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Salaries Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    salariesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchSalaries(salariesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salariesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "currentSalaryId",
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
      dataField: "employee.store.storeName",
      text: "Store",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSalaryDialog: salariesUIProps.openEditSalaryDialog,
        openDeleteSalaryDialog: salariesUIProps.openDeleteSalaryDialog,
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
    sizePerPage: salariesUIProps.queryParams.pageSize,
    page: salariesUIProps.queryParams.pageNumber,
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
                keyField="currentSalaryId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  salariesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: salariesUIProps.ids,
                  setIds: salariesUIProps.setIds,
                  idName:"currentSalaryId",
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

// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/TranscationModes/Actions";
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

//TranscationMode
//transcationMode



export function TranscationModesTable() {
  // TranscationModes UI Context
  const transcationModesUIContext = useUIContext();
  const transcationModesUIProps = useMemo(() => {
    return {
      ids: transcationModesUIContext.ids,
      setIds: transcationModesUIContext.setIds,
      queryParams: transcationModesUIContext.queryParams,
      setQueryParams: transcationModesUIContext.setQueryParams,
      openEditTranscationModeDialog: transcationModesUIContext.openEditTranscationModeDialog,
      openDeleteTranscationModeDialog: transcationModesUIContext.openDeleteTranscationModeDialog,
    };
  }, [transcationModesUIContext]);

  // Getting curret state of transcationModes list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.transcationModes }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // TranscationModes Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    transcationModesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchTranscationModes(transcationModesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcationModesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "transcationModeId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, {
      dataField: "transcation",
      text: "transcation",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    
   
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditTranscationModeDialog: transcationModesUIProps.openEditTranscationModeDialog,
        openDeleteTranscationModeDialog: transcationModesUIProps.openDeleteTranscationModeDialog,
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
    sizePerPage: transcationModesUIProps.queryParams.pageSize,
    page: transcationModesUIProps.queryParams.pageNumber,
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
                classes="table table-head-custom table-vertical-center overflow-hidden table-sm"
                bootstrap4
                //remote
                noDataIndication="No Record Found now.."
                keyField="transcationModeId"
                data={entities === null ? []: totalCount ?entities:[]}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  transcationModesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: transcationModesUIProps.ids,
                  setIds: transcationModesUIProps.setIds,
                  idName:"transcationModeId",
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

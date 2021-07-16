// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rentedLocations/Actions";
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

//RentedLocation
//rentedLocation

export function RentedLocationsTable() {
  // RentedLocations UI Context
  const rentedLocationsUIContext = useUIContext();
  const rentedLocationsUIProps = useMemo(() => {
    return {
      ids: rentedLocationsUIContext.ids,
      setIds: rentedLocationsUIContext.setIds,
      queryParams: rentedLocationsUIContext.queryParams,
      setQueryParams: rentedLocationsUIContext.setQueryParams,
      openEditRentedLocationDialog:
        rentedLocationsUIContext.openEditRentedLocationDialog,
      openDeleteRentedLocationDialog:
        rentedLocationsUIContext.openDeleteRentedLocationDialog,
    };
  }, [rentedLocationsUIContext]);

  // Getting curret state of rentedLocations list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.rentedLocations }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // RentedLocations Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    rentedLocationsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchRentedLocations(rentedLocationsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentedLocationsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "rentedLocationId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "placeName",
      text: "Place Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "address",
      text: "Address",
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
    },
    {
      dataField: "vacatedDate",
      text: "Vacated Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "city",
      text: "City",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "ownerName",
      text: "Owner Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "mobileNo",
      text: "Mobile No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "rentAmount",
      text: "Rent Amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "advanceAmount",
      text: "Advance Amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },{
      dataField: "isRented",
      text: "Occupied",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },{
      dataField: "rentType",
      text: "Rent Type",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRentedLocationDialog:
          rentedLocationsUIProps.openEditRentedLocationDialog,
        openDeleteRentedLocationDialog:
          rentedLocationsUIProps.openDeleteRentedLocationDialog,
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
    sizePerPage: rentedLocationsUIProps.queryParams.pageSize,
    page: rentedLocationsUIProps.queryParams.pageNumber,
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
                keyField="rentedLocationId"
                data={entities === null ? [] : totalCount ? entities : []}
                //data={[]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  rentedLocationsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: rentedLocationsUIProps.ids,
                  setIds: rentedLocationsUIProps.setIds,
                  idName: "rentedLocationId",
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

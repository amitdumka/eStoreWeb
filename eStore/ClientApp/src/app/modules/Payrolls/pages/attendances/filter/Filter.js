import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useUIContext } from "../UIContext";

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText,yesterday } = values;
  const newQueryParams = { ...queryParams };
    const filter = {};
    console.log(filter);

  // Filter by status
    filter.status = parseInt(status);//>-1 ? +status : -1;
  // Filter by type
    filter.type = parseInt(type);// >-1 ? +type : -1;
  // Filter by all fields
  filter.searchText = searchText;
  filter.yesterday=yesterday;

    if (searchText) {
    filter.employeeId = 0;
    filter.staffName = null;
    }
    console.log(filter);
    console.log(newQueryParams);
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function AttendancesFilter({ listLoading }) {
  // Attendances UI Context
  const attendancesUIContext = useUIContext();
  const attendancesUIProps = useMemo(() => {
    return {
      queryParams: attendancesUIContext.queryParams,
      setQueryParams: attendancesUIContext.setQueryParams,
    };
  }, [attendancesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(attendancesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, attendancesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      attendancesUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: -1, // values => All=""/Susspended=0/Active=1/Pending=2
          type: -1, // values => All=""/Business=0/Individual=1
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  name="status"
                  placeholder="Filter by Status"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="-1">All</option>
                  <option value="0">Present</option>
                  <option value="1">Absent</option>
                  <option value="2">HalfDay</option>
                  <option value="3">On Leaves</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Status
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Type"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="-1">All</option>
                  <option value="0">Salesmen</option>
                  <option value="1">Store Manager</option>
                  <option value="2">HouseKeeping</option>
                  <option value="3">Tailoring</option>
                  <option value="4">Others</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Category
                </small>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
              {/* <div className="col-lg--2"><input className="btn btn-success" type="button" value="Yesterday"/></div> */}
            </div>
            
          </form>
        )}
      </Formik>
    </>
  );
}

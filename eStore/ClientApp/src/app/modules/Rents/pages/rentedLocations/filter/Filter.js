import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useUIContext } from "../UIContext";

//RentedLocation
//rentedLocation

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by all fields
  if (searchText) {
    filter.rentedLocationName = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function RentedLocationsFilter({ listLoading }) {
  // RentedLocations UI Context
  const rentedLocationsUIContext = useUIContext();
  const rentedLocationsUIProps = useMemo(() => {
    return {
      queryParams: rentedLocationsUIContext.queryParams,
      setQueryParams: rentedLocationsUIContext.setQueryParams,
    };
  }, [rentedLocationsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(rentedLocationsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, rentedLocationsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      rentedLocationsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
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
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

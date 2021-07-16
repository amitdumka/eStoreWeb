import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

//attendance
//Attendance


export function AttendancesLoadingDialog() {
  // Attendances Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.attendances.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

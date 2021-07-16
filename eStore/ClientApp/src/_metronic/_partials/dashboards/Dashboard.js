//import React, { useMemo } from "react";
//import objectPath from "object-path";
//import { useHtmlClassService } from "../../layout";
import React, { useEffect } from "react";
import { EStoreDashboard } from "./EStoreDashboard";

import * as actions from "../../../redux/dashboard/Action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export function Dashboard() {
  //const uiService = useHtmlClassService();
  // const layoutProps = useMemo(() => {return {demo: objectPath.get(uiService.config, "demo"),};}, [uiService]);
  // Getting current state of dashboard from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.dashboard }),
    shallowEqual
  );
  const {
    totalCashBook,
    cashBookEntities,
    masterReportEntities,dailySaleEntities,totalDailySale,
  } = currentState;

  // CashPayments Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchMasterReport());
    dispatch(actions.fetchCashBook());
    dispatch(actions.fetchDailySales(7));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [null, dispatch]);

  
  return (
    <>
     <EStoreDashboard
          totalCashBook={totalCashBook}
          masterReports={masterReportEntities}
          cashBook={cashBookEntities}
          dailySaleList={dailySaleEntities}
          totalDailySale={totalDailySale}
        />
      {/* {layoutProps.demo === "demo1" && ()} */}
    </>
  );
}

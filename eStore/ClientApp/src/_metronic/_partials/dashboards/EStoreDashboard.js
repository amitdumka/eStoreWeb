import React from "react";
import {
  CashBookTablePageWidget,OverDueTablesWidget,
  SaleListWidget,
  TailoringWidget,
  EmpInfoWidget,DailySaleTableWidget
} from "../widgets";
import { NoticeBoardWidget } from "../widgets/advance-tables/NoticeBoardWidget";

export function EStoreDashboard({ totalCashBook, cashBook, masterReports, totalDailySale,dailySaleList  }) {
  return (
    <>
      {/* <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <MixedWidget1 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6 col-xxl-4 ">
          <ListsWidget9 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6 col-xxl-4 ">
          <ListsWidget4 className="card-stretch gutter-b" />
        </div> 
        <div className="col-xl-4 ">
          <TilesWidget1 className="gutter-b card-stretch" chartColor="danger" />
        </div>
        <div className="col-lg-6 col-xxl-4 ">
          <MixedWidget6 className="gutter-b card-stretch" chartColor="danger" />
        </div>
        <div className="col-lg-6 col-xxl-4">
          <StatsWidget11
            className="card-stretch card-stretch-half gutter-b"
            symbolShape="circle"
            baseColor="success"
          />
          <StatsWidget12 className="card-stretch card-stretch-half gutter-b" />
        </div>
        <div className="row order-1 order-xxl-2 ">
          <div className="col-xl-6">
            <TilesWidget11
              className="gutter-b"
              baseColor="primary"
              widgetHeight="150px"
            />
          </div>
          <div className="col-xl-6">
            <TilesWidget12
              className="gutter-b"
              iconColor="success"
              widgetHeight="150px"
            />
          </div>
        </div>
      </div>
       */}
       {/* begin::Row */}
      <div className="row">
        <div className="col-lg-6">
          {masterReports && masterReports.empInfoList && (
            <EmpInfoWidget
              className="card-stretch gutter-b"
              empInfo={masterReports.empInfoList}
              topSalesman={masterReports.leadingSalesman}
            />
          )}
        </div>
        <div className="col-lg-6">
          {masterReports && masterReports.tailoringReport && (
            <TailoringWidget
              className="card-stretch gutter-b"
              tReport={masterReports.tailoringReport}
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-xxl-8 order-2 order-xxl-1">
          <CashBookTablePageWidget
            className="card-stretch gutter-b"
            cashBook={cashBook}
            totalCount={totalCashBook}
          />
        </div>
        <div className="col-lg-6 col-xxl-4">
          {masterReports && masterReports.saleReport && (
            <SaleListWidget
              className="card-stretch gutter-b"
              saleReport={masterReports.saleReport}
            />
          )}
        </div>
      </div>
      {/* end::Row */}
      {/**Begin Row */}
      <div className="row">
        <div className="col-xxl-6 order-2 order-xxl-1">
         {masterReports && masterReports.bookingOverDues &&
          <OverDueTablesWidget
            className="card-stretch gutter-b"
            overDue={masterReports.bookingOverDues}
          />}
        </div>

        <div className="col-xxl-6 order-2 order-xxl-1">
          <DailySaleTableWidget
            className="card-stretch gutter-b"
            dailySaleList={dailySaleList}
            totalCount={totalDailySale}
          />
        </div>
      </div>
      {/**end Row */}
       {/**Begin Row */}
       <div className="row">
       <div className="col-xxl-6 order-2 order-xxl-1">
          <NoticeBoardWidget
            className="card-stretch gutter-b"
            dailySaleList={dailySaleList}
            totalCount={totalDailySale}
          />
        </div>
       </div>
       {/**end Row */}
    </>
  );
}

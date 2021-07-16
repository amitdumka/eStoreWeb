// Excel Data Exporter
// This JS will be help to export data to excel file and download at client site
// Author: Amit Kumar

import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const today = new Date().toLocaleDateString();
export function ToMultiPart() {
  const dData = [
    { name: "amit", age: 12 },
    { name: "kumar", age: 12 },
    { name: "shalini", age: 21 },
  ];
  const dC = dData.map((item) => [{ value: item.name }, { value: item.age }]);

  const colName = Object.keys(dData[0]).map((key, i) => ({ title: key }));

  const mData = { columns: colName, data: dC };

  return mData;
}

export function JsonToDataSet(jsonData) {
  //Getting Columns names
  if (jsonData !== null) {
    const columnNames = Object.keys(jsonData[0]).map((key, i) => ({
      title: key,
    }));

    const rows = jsonData.map((item) => [
      // eslint-disable-next-line no-labels
      // eslint-disable-next-line array-callback-return
      item.map((col) => {col.toString() }),
    ]);
    //TODO: Either get data by name or colIndex value.

    const mData={ columns:columnNames, data:rows};
    return mData;
  } else return {};
}

export default function ExportToExcel() {
  const mDS = ToMultiPart();
  const dataD = {
    columns: [
      { title: "" }, //pixels width
      { title: "" }, //char width
      { title: "" },
    ],
    data: [
      [{ value: "" }, { value: "Aprajita Retails" }],

      [{ value: "" }, { value: "Dumka Jharkhand 814101" }],
      [{ vale: "Date:" }, { value: today }, { value: "by web" }],
    ],
  };
  const multiDataSet = [
    {
      columns: [
        { title: "" }, //pixels width
        { title: "" }, //char width
        { title: "" },
      ],
      data: [
        [{ value: "" }, { value: "Aprajita Retails" }],

        [{ value: "" }, { value: "Dumka" }, { value: "Jharkhand" }],
        [{ vale: "Date:" }, { value: today }, { value: "by web" }],
      ],
    },
    {
      xSteps: 1, // Will start putting cell with 1 empty cell on left most
      ySteps: 3, //will put space of 5 rows,
      columns: [
        { title: "Employee" }, //pixels width
        { title: "Status" },
      ],
      data: [
        ["Johnson", "Finance"],
        ["Monika", "IT"],
        ["Konstantina", "IT Billing"],
        ["John", "HR"],
        ["Josef", "Testing"],
      ],
    },
    dataD,
    mDS,
  ];

  return (
    <div>
      <ExcelFile
        filename="testmefile.xls"
        element={
          <button className="btn btn-warning btn-sm">Export Excel</button>
        }
      >
        <ExcelSheet dataSet={multiDataSet} name="Organization"></ExcelSheet>
      </ExcelFile>
    </div>
  );
}

export function ToExcel(sheetName, formatedData, reportName) {
  const sName = "" + sheetName;
  const filename = "" + reportName;
  const dataSet = [
    {
      columns: [{ title: "" }, { title: "" }, { title: "" }, { title: "" }],
      data: [
        [{ value: "" }, { value: "" }, { value: "Aprajita Retails" }],
        [
          { value: "" },
          { value: "Dumka" },
          { value: "Jharkhand" },
          { value: "814101" },
        ],
        [{ vale: "Date:" }, { value: today }, { value: "" }],
        [{ value: "" }],
        [{ value: "" }, { value: "Report" }, { value: reportName }],
      ],
    },
    { ySteps: 3 },
    formatedData,
  ];

  return (
    <div>
      <ExcelFile
        filename={filename}
        element={
          <button className="btn btn-warning btn-sm">Export Excel</button>
        }
      >
        <ExcelSheet dataSet={dataSet} name={sName}></ExcelSheet>
      </ExcelFile>
    </div>
  );
}

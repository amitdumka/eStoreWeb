import { Button, Select, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");
/* generate an array of column objects */
export const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

export default function ExcelToJson() {
  const [startRow, setStartRow] = useState(0);
  const [sheetName, setSheetName] = useState("");
  const [file, setFile] = useState();
  const [uploadMode, setUploadMode] = useState("");
  const [uploadVoyMode, setUploadVoyMode] = useState("");

  const handleSheetName = (e) => {
    setSheetName(e.target.value);
  };
  const handleStartRow = (e) => {
    setStartRow(e.target.value);
  };
  const handleClick = (e) => {
    console.log(sheetName);
    console.log(startRow);
    console.log(file);

    readExcelFile("all");
  };
  const handleVoyClick = (e) => {
    console.log(sheetName);
    console.log(startRow);
    console.log(file);

    readExcelFile("voy");
  };
  const handleMode = (e) => {
    setUploadMode(e.target.value);
  };
  const handleVoyMode = (e) => {
    setUploadVoyMode(e.target.value);
  };
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) setFile(files[0]);
  };

  const readExcelFile = (uMode) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    alert("Fetching.....");
    reader.onload = (e) => {
      console.log(startRow);
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        cellDates: true,
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws =
        sheetName && sheetName !== ""
          ? wb.Sheets[sheetName]
          : wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {
        blankRows: false,
        dateNF: 'yyyy-MM-ddThh:mm:ss.000Z"',
      });
      console.log(JSON.stringify(data, null, 1));

      if (uMode === "voy") {
        if (uploadVoyMode !== "") {
          const jData = {
            CommandMode: uploadVoyMode,
            JsonData: data,
            EmailId: "amitnarayansah@gmail.com",
            CallBackUrl: "https://estores.aprajitaretails.in/notification/upload",
          };

          UploadVoyData(jData);
          alert("Uploading...");
        } else alert("Kindly Select upload Mode");
      } else {
        if (uploadMode !== "") UploadData(data, uploadMode);
        else alert("Kindly Select upload Mode");
      }

      /* Update state */
      // this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
      //   console.log(JSON.stringify(this.state.data, null, 2));
      // });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <div className="h2 text-primary">Excel File Uploader</div>
      <div className="h5 text-info">
        Select File{" "}
        <input type="file" accept={SheetJSFT} onChange={handleFileSelect} />
      </div>
      <div className="h5">
        Sheet name{" "}
        <input type="text" id="sheetName" onChange={handleSheetName} />
      </div>
      {/* <div className="h5">
        Start Row{" "}
        <input type="numeric" id="startRow" onChange={handleStartRow} />
      </div> */}
      <div>
        <hr />
        <span className="h5 text-primary mr-1">Select Upload Type</span>
        <Select displayEmpty value={uploadMode} onChange={handleMode}>
          <MenuItem value="">Select Upload Mode</MenuItem>
          {UploadType.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Button className="btn btn-primary" onClick={handleClick}>
        Upload
      </Button>

      <div className="h6 text-danger">
        <br />
        *Note: First row of sheet must be header row. Any other Data on First
        row will give wrong data.
      </div>
      <div className="h6 text-danger ">
        <hr />
      </div>

      <div>
        <span className="h5 text-primary mr-1">Select Voyager Upload Type</span>
        <Select displayEmpty value={uploadVoyMode} onChange={handleVoyMode}>
          <MenuItem value="">Select Upload Mode</MenuItem>
          {UploadVoyType.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Button className="btn btn-primary" onClick={handleVoyClick}>
        Upload Voy
      </Button>
    </>
  );
}

const UploadType = [
  "BankAccountInfo",
  "BankDeposits",
  "BankWithdrawal",
  "AccountNumber",
  "ChequeLogs",
  "Bank",
  "DailySales",
  "DueRecovereds",
  "DueLists",
  "CardTranscations",
  "CardMachine",
  "Salesmans",
  "Expenses",
  "Payments",
  "Receipts",
  "CashReceipts",
  "CashPayments",
  "PettyCashExpenses",
  "ArvindPayments",
  "Rent",
  "RentedLocation",
  "ElectricityConnection",
  "EletricityBill",
  "BillPayments",
  "ImportInWards",
  "ImportPurchases",
  "ImportSaleItemWises",
  "ImportSaleRegisters",
  "ImportBookEntries",
  "BankStatements",
  "ImportSearches",
  "Employees",
  "CurrentSalaries",
  "PaySlip",
  "StaffAdvancePayments",
  "Attendace",
  "Salary Payment",
  "Brand",
  "Category",
  "ProductItem",
  "Supplier",
  "newStoreButtonClick",
  "PurchaseItem",
  "PurchaseTaxType",
  "Stores",
  "EndOfDays",
  "Customers",
  "Contacts",
  "CashDetails",
  "Bookings",
  "Deliveries",
];
const UploadVoyType = [
  "VoyBrandName",
  "ProductMaster",
  "ProductList",
  "TaxRegister",
  "VoySaleInvoice",
  "VoySaleInvoiceSum",
  "VoyPurchaseInward",
  "InwardSummary",
  "SaleWithCustomer",
  "ItemCategory","ItemData"
];
export const API_URL = "https://www.aprajitaretails.in/api/Importer";

export async function UploadData(jsonData, mode) {
  //const api = "https://localhost:44385/api/Importer";
  await axios
    .post(`${API_URL}?uploadMode=${mode}`, jsonData, {
      method: "POST",
      responseType: "json", //Force to receive data in a Blob Format
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
    .then((response) => {
      console.log("Response from server");
      console.log(response);
      alert(
        "Your data has been, uploaded to server, It will inform after processing data via Email."
      );
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}

export async function UploadVoyData(jsonData) {
  const api = "https://www.aprajitaretails.in/api/Importer/voyagerImport";
  const localApi="https://localhost:44385/api/Importer/voyagerImport";
  await axios
    .post(`${localApi}`, jsonData, {
      method: "POST",
      responseType: "json", //Force to receive data in a Blob Format
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
    .then((response) => {
      console.log("Response from server");
      console.log(response);
      alert(
        "Your data has been, uploaded to server, It will inform after processing data via Email."
      );
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}

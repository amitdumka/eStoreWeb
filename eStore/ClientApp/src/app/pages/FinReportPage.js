import {
  Select,
  Table,
  TableCell,
  TableRow,
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSubheader } from "../../_metronic/layout";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../_metronic/_partials/controls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as EmpAcction from "../modules/Payrolls/_redux/employees/Actions";
import axios from "axios";
import { BASE_URL } from "../../_estore/URLConstants";

//export const API_URL = BASE_URL + "/api/Reports";
export const API_URL = BASE_URL + "/api/Reports";

export async function GetMonthlyReport(MonthlyDto) {
  var url = API_URL;
  switch (MonthlyDto.mode) {
    case 8:
      url = url + "/monthlySaleReport";
      break;
    case 9:
      url = url + "/monthlyPaymentReceiptReport";
      break;
    case 10:
      url = url + "/monthlySalaryReport";
      break;
    case 7:
      url = url + "/monthlyTailoringReport";
      break;
    case 5:
      url = url + "/monthlyBankReport";
      break;
    case 11:
      url = url + "/monthlyDuesReport";
      break;
    case 12:
      url = url + "/monthlySaleSummaryReport";
      break;
    default:
      if (MonthlyDto.mode < 5) {
        url = url + "/voucherReport";
      } else url = "";

      break;
  }
  if (url !== "") {
    await axios
      .post(url, MonthlyDto, {
        method: "POST",
        responseType: "blob", //Force to receive data in a Blob Format
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Some error occurred while creating the report file!, Kindly try again!"
        );
      });
  } else {
    alert("Invalid Report Option selected!, Kindly select proper option!");
  }
}
export async function GetReport(FinReportDto) {
  await axios
    .post(`${API_URL}/FinReport`, FinReportDto, {
      method: "POST",
      responseType: "blob", //Force to receive data in a Blob Format
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
    .then((response) => {
      //Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: "application/pdf" });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function GetAttReport(RequestData) {
  console.log(RequestData);
  await axios
    .post(`${API_URL}/AttReport`, RequestData, {
      method: "POST",
      responseType: "blob", //Force to receive data in a Blob Format
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
    .then((response) => {
      //Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: "application/pdf" });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    })
    .catch((error) => {
      console.log(error);
    });
  alert("Kindly wait , Data is Downloading....");
}
export async function GetSalReport(RequestData) {
  console.log(RequestData);
  await axios
    .post(`${API_URL}/SalaryReport`, RequestData, {
      method: "POST",
      responseType: "blob", //Force to receive data in a Blob Format
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
    .then((response) => {
      //Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: "application/pdf" });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    })
    .catch((error) => {
      console.log(error);
    });
  alert("Kindly wait , Data is Downloading....");
}
export async function GetSalCalReport(RequestData) {
  console.log(RequestData);

  if (RequestData.finYear === "All") {
    if (RequestData.month === "0") {
      await axios
        .post(`${API_URL}/SalaryCalReport`, RequestData, {
          method: "POST",
          responseType: "blob", //Force to receive data in a Blob Format
          headers: { "Content-Type": "application/json; charset=utf-8" },
        })
        .then((response) => {
          // Create a Blob from the PDF Stream
          const file = new Blob([response.data], { type: "application/pdf" });
          // Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          // Open the URL on new Window
          window.open(fileURL);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Feature is not available");
    }
  } else {
    if (RequestData.month > 0)
      await axios
        .post(`${API_URL}/MonthlySalaryCalReport_new`, RequestData, {
          method: "POST",
          responseType: "blob", //Force to receive data in a Blob Format
          headers: { "Content-Type": "application/json; charset=utf-8" },
        })
        .then((response) => {
          // Create a Blob from the PDF Stream
          const file = new Blob([response.data], { type: "application/pdf" });
          // Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          // Open the URL on new Window
          window.open(fileURL);
        })
        .catch((error) => {
          console.log(error);
        });
    else {
      alert("Feature is not available!");
    }
  }
}

export const FinReportPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Fin Year Report");
  return (
    <>
      <Table>
        <TableRow>
          <TableCell>
            {" "}
            <RequestCard />
          </TableCell>
          <TableCell>
            <AttendaceReportCard />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            {" "}
            <MonthlyReportCard />
          </TableCell>
        </TableRow>
      </Table>
    </>
  );
};

export const RequestCard = () => {
  const curYear = new Date().getFullYear() + 1;
  const [yearArray] = useState([]);
  const [finYear, setFinYear] = useState("");
  const [repoMode, setRepoMode] = useState(2);
  const [store, setStore] = useState(1);
  const [startDate, setStartDate] = useState(4);
  const [endDate, setEndDate] = useState(3);
  const [refreshData, setRefreshData] = useState(false);
  let count = 0;
  for (let index = 2015; index < curYear; index++) {
    yearArray[count++] = "" + index + "-" + (index + 1);
  }
  const handleYearChange = (event) => {
    setFinYear(event.target.value);
  };
  const handleModeChange = (event) => {
    setRepoMode(event.target.value);
  };
  const handleRefreshChange = (event) => {
    setRefreshData(event.target.checked);
  };
  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDate = (event) => {
    setEndDate(event.target.value);
  };

  const handleButton = (event) => {
    const yrs = finYear.split("-");
    const finReq = {
      storeId: store,
      startYear: parseInt(yrs[0]),
      endYear: parseInt(yrs[1]),
      startMonth: parseInt(startDate),
      endMonth: parseInt(endDate),
      mode: parseInt(repoMode),
      forcedRefresh: refreshData,
      isPdf: true,
    };
    console.log(finReq);
    GetReport(finReq);
  };

  return (
    <Card>
      <CardHeader title="Financial  Year Report Download">
        <CardHeaderToolbar></CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* {loading ? <LoadingSpinner /> : <ResultsTable results={data} />} */}
        <Table>
          <TableRow>
            <TableCell className="text-primary">Store</TableCell>
            <TableCell>
              <Select
                value={store}
                onChange={handleStoreChange}
                id="storeIdSelect"
              >
                <MenuItem value={1}>Dumka</MenuItem>
                <MenuItem value={2}>Jamshedpur</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-danger">Financial Year</TableCell>
            <TableCell>
              <Select
                value={finYear}
                displayEmpty
                onChange={handleYearChange}
                id="finYearSelect"
              >
                <MenuItem value="" disabled>
                  Select Fin Year
                </MenuItem>
                {yearArray.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell className="text-info">Report</TableCell>
            <TableCell>
              <Select
                value={repoMode}
                onChange={handleModeChange}
                id="modeSelect"
              >
                <MenuItem value={1}>Sale Data</MenuItem>
                <MenuItem value={2}>Cash Book</MenuItem>
                <MenuItem value={3}>Salary Data</MenuItem>
                <MenuItem value={4}>Expenses Data</MenuItem>
                <MenuItem value={5}>Payment Data</MenuItem>
                <MenuItem value={6}>Receipts Data</MenuItem>
                <MenuItem value={7}>Bank Data</MenuItem>
                <MenuItem value={8} disabled>
                  Purchase Data
                </MenuItem>
              </Select>
            </TableCell>
            <TableCell className="text-danger">Refreshed Data</TableCell>
            <TableCell>
              <Checkbox
                value={refreshData}
                onChange={handleRefreshChange}
                id="refreshDataCB"
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />{" "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-danger">Start Month: </TableCell>
            <TableCell>
              <Select
                value={startDate}
                displayEmpty
                onChange={handleStartDate}
                id="startDateSelect"
              >
                <MenuItem value={1}>Jan</MenuItem>
                <MenuItem value={2}>Feb</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>Aug</MenuItem>
                <MenuItem value={9}>Sept</MenuItem>
                <MenuItem value={10}>Oct</MenuItem>
                <MenuItem value={11}>Nov</MenuItem>
                <MenuItem value={12}>Dec</MenuItem>
              </Select>
            </TableCell>
            <TableCell className="text-danger">End Month:</TableCell>
            <TableCell>
              <Select
                value={endDate}
                displayEmpty
                onChange={handleEndDate}
                id="endDateSelect"
              >
                <MenuItem value={1}>Jan</MenuItem>
                <MenuItem value={2}>Feb</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>Aug</MenuItem>
                <MenuItem value={9}>Sept</MenuItem>
                <MenuItem value={10}>Oct</MenuItem>
                <MenuItem value={11}>Nov</MenuItem>
                <MenuItem value={12}>Dec</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleButton}
              >
                Generate
              </button>
            </TableCell>
          </TableRow>
        </Table>
        <label className="text-danger">
          *Note: Kindly wait for few mins to open PDF file in new windows!.
        </label>
      </CardBody>
    </Card>
  );
};

export const AttendaceReportCard = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.employees }),
    shallowEqual
  );
  const { entities } = currentState;

  // Employees Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    // clear selections list
    // server call by queryParams
    dispatch(EmpAcction.fetchEmployees(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const curYear = new Date().getFullYear() + 1;
  const [yearArray] = useState([]);
  const [emp, setEmp] = useState(0);
  // const [repoMode, setRepoMode] = useState(2);
  const [store, setStore] = useState(1);
  const [refreshData, setRefreshData] = useState(false);
  const [finYear, setFinYear] = useState("");
  const [forMonth, setForMonth] = useState(0);
  const handleYearChange = (event) => {
    setFinYear(event.target.value);
  };
  const handleForMonth = (event) => {
    setForMonth(event.target.value);
  };
  let count = 0;
  for (let index = 2015; index < curYear; index++) {
    yearArray[count++] = "" + index + "-" + (index + 1);
  }
  const handleEmpChange = (event) => {
    setEmp(event.target.value);
  };
  // const handleModeChange = (event) => {
  //   setRepoMode(event.target.value);
  // };
  const handleRefreshChange = (event) => {
    setRefreshData(event.target.checked);
  };
  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };
  const handleButton = (event) => {
    const ReqData = {
      storeId: store,
      employeeId: emp,
      finYear: finYear,
      month: parseInt(forMonth),
      forcedRefresh: refreshData,
    };
    GetAttReport(ReqData);
  };
  const handleButtonSalaryPayment = (event) => {
    const ReqData = {
      storeId: store,
      employeeId: emp,
      finYear: finYear,
      month: parseInt(forMonth),
      forcedRefresh: refreshData,
    };
    GetSalReport(ReqData);
  };
  const handleButtonSalaryCal = (event) => {
    const ReqData = {
      storeId: store,
      employeeId: emp,
      finYear: finYear,
      month: parseInt(forMonth),
      forcedRefresh: refreshData,
    };
    GetSalCalReport(ReqData);
  };
  return (
    <Card>
      <CardHeader title="Attendance Report Download">
        <CardHeaderToolbar></CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* {loading ? <LoadingSpinner /> : <ResultsTable results={data} />} */}
        <Table>
          <TableRow>
            <TableCell className="text-primary">Store</TableCell>
            <TableCell>
              <Select
                value={store}
                onChange={handleStoreChange}
                id="storeIdSelect"
              >
                <MenuItem value={1}>Dumka</MenuItem>
                <MenuItem value={2}>Jamshedpur</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-danger">Employee</TableCell>
            <TableCell>
              <Select
                value={emp}
                displayEmpty
                onChange={handleEmpChange}
                id="empSelect"
              >
                <MenuItem value="" disabled>
                  Select Employee
                </MenuItem>
                {/* <MenuItem value={0}>All</MenuItem> */}
                {entities &&
                  entities.map((item) => (
                    <MenuItem key={item.employeeId} value={item.employeeId}>
                      {item.staffName}
                    </MenuItem>
                  ))}
              </Select>
            </TableCell>
            <TableCell className="text-danger">Refreshed Data</TableCell>
            <TableCell>
              <Checkbox
                value={refreshData}
                onChange={handleRefreshChange}
                id="refreshDataCB"
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />{" "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-danger">Financial Year</TableCell>
            <TableCell>
              <Select
                value={finYear}
                displayEmpty
                onChange={handleYearChange}
                id="finYearSelect"
              >
                <MenuItem value="" disabled>
                  Select Fin Year
                </MenuItem>
                <MenuItem value={"All"}>All</MenuItem>
                {yearArray.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell className="text-danger">Start Month: </TableCell>
            <TableCell>
              <Select
                value={forMonth}
                displayEmpty
                onChange={handleForMonth}
                id="forMonthSelect"
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>Aug</MenuItem>
                <MenuItem value={9}>Sept</MenuItem>
                <MenuItem value={10}>Oct</MenuItem>
                <MenuItem value={11}>Nov</MenuItem>
                <MenuItem value={12}>Dec</MenuItem>
                <MenuItem value={1}>Jan</MenuItem>
                <MenuItem value={2}>Feb</MenuItem>
                <MenuItem value={3}>March</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleButton}
              >
                Attendance
              </button>
            </TableCell>
            <TableCell>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleButtonSalaryPayment}
              >
                Salary Payment
              </button>
            </TableCell>
            <TableCell>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleButtonSalaryCal}
              >
                Salary
              </button>
            </TableCell>
          </TableRow>
        </Table>
        <label className="text-danger">
          *Note: Kindly wait for few mins to open PDF file in new windows!.
        </label>
      </CardBody>
    </Card>
  );
};

export const MonthlyReportCard = () => {
  const curYear = new Date().getFullYear() + 1;

  const [yearArray] = useState([]);

  const [repoMode, setRepoMode] = useState(1);
  const [store, setStore] = useState(1);
  const [startDate, setStartDate] = useState(new Date().getMonth());
  //const [endDate, setEndDate] = useState(3);
  const [refreshData, setRefreshData] = useState(false);
  let count = 0;
  for (let index = 2015; index < curYear; index++) {
    yearArray[count++] = "" + index + "-" + (index + 1);
  }
  const [finYear, setFinYear] = useState(yearArray[count - 1]);
  const handleYearChange = (event) => {
    setFinYear(event.target.value);
  };
  const handleModeChange = (event) => {
    setRepoMode(event.target.value);
  };
  const handleRefreshChange = (event) => {
    setRefreshData(event.target.checked);
  };
  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  };
  // const handleEndDate = (event) => {
  //     setEndDate(event.target.value);
  // };

  const handleButton = (event) => {
    const yrs = finYear.split("-");
    const finReq = {
      storeId: store,
      Year: parseInt(startDate) > 3 ? parseInt(yrs[0], 10) : parseInt(yrs[1]),
      Month: parseInt(startDate),
      mode: parseInt(repoMode),
      forcedRefresh: refreshData,
      finYear: finYear,
      isPdf: true,
    };
    console.log(finReq);
    GetMonthlyReport(finReq);
  };

  return (
    <Card>
      <CardHeader title="Monthly Report Download">
        <CardHeaderToolbar>{new Date().toDateString()}</CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Table>
          <TableRow>
            <TableCell className="text-primary">Store</TableCell>
            <TableCell>
              <Select
                value={store}
                onChange={handleStoreChange}
                id="storeIdSelect"
              >
                <MenuItem value={1}>Dumka</MenuItem>
                <MenuItem value={2}>Jamshedpur</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-danger">Financial Year</TableCell>
            <TableCell>
              <Select
                value={finYear}
                displayEmpty
                onChange={handleYearChange}
                id="finYearSelect"
              >
                <MenuItem value="" disabled>
                  Select Financial Year
                </MenuItem>
                {yearArray.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell className="text-info">Report</TableCell>
            <TableCell>
              <Select
                value={repoMode}
                onChange={handleModeChange}
                id="modeSelect"
              >
                <MenuItem value={8}>Sale Report</MenuItem>
                <MenuItem value={9}>Payment Receipt Report </MenuItem>
                <MenuItem value={10}>Salary Report</MenuItem>

                <MenuItem value={0}>Payment Data</MenuItem>
                <MenuItem value={1}>Expenses Data</MenuItem>
                <MenuItem value={2}>Receipts Data</MenuItem>
                <MenuItem value={3}>Cash Expenses</MenuItem>
                <MenuItem value={4}>Cash Reciept</MenuItem>

                <MenuItem value={5}>Bank Data</MenuItem>
                <MenuItem value={6} disabled>
                  Purchase Report
                </MenuItem>
                <MenuItem value={7}>Tailoring Report</MenuItem>
                <MenuItem value={11}>Dues Report</MenuItem>
                <MenuItem value={12}>Card/Cash Sale Report</MenuItem>
              </Select>
            </TableCell>
            <TableCell className="text-danger">Refreshed Data</TableCell>
            <TableCell>
              <Checkbox
                value={refreshData}
                onChange={handleRefreshChange}
                id="refreshDataCB"
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />{" "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-danger"> Month: </TableCell>
            <TableCell>
              <Select
                value={startDate}
                displayEmpty
                onChange={handleStartDate}
                id="startDateSelect"
              >
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>Aug</MenuItem>
                <MenuItem value={9}>Sept</MenuItem>
                <MenuItem value={10}>Oct</MenuItem>
                <MenuItem value={11}>Nov</MenuItem>
                <MenuItem value={12}>Dec</MenuItem>
                <MenuItem value={1}>Jan</MenuItem>
                <MenuItem value={2}>Feb</MenuItem>
                <MenuItem value={3}>March</MenuItem>
              </Select>
            </TableCell>
            {/* <TableCell className="text-danger">End Month:</TableCell>
                        <TableCell >
                            <Select value={endDate} displayEmpty onChange={handleEndDate} id="endDateSelect">
                                <MenuItem value={1} >Jan</MenuItem>
                                <MenuItem value={2} >Feb</MenuItem>
                                <MenuItem value={3} >March</MenuItem>
                                <MenuItem value={4} >April</MenuItem>
                                <MenuItem value={5} >May</MenuItem>
                                <MenuItem value={6} >June</MenuItem>
                                <MenuItem value={7} >July</MenuItem>
                                <MenuItem value={8} >Aug</MenuItem>
                                <MenuItem value={9} >Sept</MenuItem>
                                <MenuItem value={10} >Oct</MenuItem>
                                <MenuItem value={11} >Nov</MenuItem>
                                <MenuItem value={12} >Dec</MenuItem>

                            </Select>
                        </TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleButton}
              >
                Generate
              </button>
            </TableCell>
          </TableRow>
        </Table>
        <label className="text-danger">
          *Note: Kindly wait for few mins to open PDF file in new windows!.
        </label>
      </CardBody>
    </Card>
  );
};

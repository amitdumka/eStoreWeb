import { useSubheader } from "../../_metronic/layout";
import * as actions from "./_redux/Actions";
import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import { useReactToPrint } from "react-to-print";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  CardFooter,
} from "../../_metronic/_partials/controls";

import {
  Select,
  MenuItem,
  Typography,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
export const pageStyle = `  @media all {    .page-break {      display: none;    }  }
    @media print {    html, body {      height: initial !important;      overflow: initial !important;      -webkit-print-color-adjust: exact;    }}
  @media print {.page-break { margin-top: 1rem; display: block; page-break-before: auto;    }  }
   @page {    size: auto;    margin: 20mm;  }`;

export const SaleInfoPage = () => {
  // const subHeader = useSubheader();
  // subHeader.setTitle("Sale Info");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => pageStyle,
  });
  const { currentState } = useSelector(
    (state) => ({ currentState: state.commonPageTypes }),
    shallowEqual
  );
  const [store, setStore] = useState(1);
  const { invoiceList } = currentState;

  const handleReset = (event) => {
    dispatch(actions.resetSaleList());
  };
  //  Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchSaleList(store));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleButton = () => {
    if (store == null) alert("Kindly Select Store First");
    else {
      // server call by queryParams
      dispatch(actions.fetchSaleList(store));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      alert(
        "Please wait while processing your request.... Please ok to continue..."
      );
    }
    //return( <AlertDismissible msg="Please wait while processing your request.... Please ok to continue..."/>);
  };
  return (
    <>
      <div>
        <Card>
          <CardHeader title="Sale Invoice List">
            <Select
              className="text-center center-align text-primary"
              value={store}
              displayEmpty
              onChange={(event) => setStore(event.target.value)}
              id="storeSelect"
            >
              <MenuItem>Select Store</MenuItem>
              <MenuItem key={1} value={1}>
                Dumka
              </MenuItem>
              <MenuItem key={2} value={2}>
                Jamshedpur
              </MenuItem>
            </Select>
            <CardHeaderToolbar>
              <IconButton
                className="btn btn-success mr-3"
                onClick={handlePrint}
              >
                <LocalPrintshopIcon />
              </IconButton>
              <Button
                type="button"
                className="mr-3 btn btn-info"
                value="Reset"
                onClick={() => {
                  handleReset();
                }}
              >
                Reset
              </Button>
              <Button
                type="button"
                onClick={() => handleButton()}
                className="btn btn-primary"
                value="Slip Check"
              >
                Slip Check
              </Button>
              {/* <ReactToPrint trigger={() => <button>Print</button>}content={() => componentRef.current} /> */}
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody ref={componentRef} pageStyle={pageStyle}>
            <DataList data={invoiceList && invoiceList} />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

const DataList = ({ data }) => {
  if (data == null) return null;
  //console.log(data);
  //console.log(data.regular);
  const cols = [
    { field: "id", headerName: " # ", width: 60 },
    { field: "date", headerName: "Date", minWidth: 100, type: "date" },
    { field: "invNo", headerName: "Invoice", minWidth: 150 },
    { field: "amount", headerName: "Amount", minWidth: 150 },
  ];

  const regular = data.regular.map((r, index) => {
    const row = {
      id: index + 1,
      invNo: r.invNo,
      date: r.date,
      amount: r.amount,
    };
    return row;
  });
  const tailoring = data.tailoring.map((r, index) => {
    const row = {
      id: index + 1,
      invNo: r.invNo,
      date: r.date,
      amount: r.amount,
    };
    return row;
  });
  const due = data.due.map((r, index) => {
    const row = {
      id: index + 1,
      invNo: r.invNo,
      date: r.date,
      amount: r.amount,
    };
    return row;
  });
  const saleReturn = data.saleReturn.map((r, index) => {
    const row = {
      id: index + 1,
      invNo: r.invNo,
      date: r.date,
      amount: r.amount,
    };
    return row;
  });
  const manual = data.manual.map((r, index) => {
    const row = {
      id: index + 1,
      invNo: r.invNo,
      date: r.date,
      amount: r.amount,
    };
    return row;
  });

  return (
    <>
      <div className="border border-success rounded m-4 p-3">
        <Typography variant="h4" gutterBottom className="text-info text-italic">
          Sale Invoice
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            density="compact"
            rows={regular && regular}
            columns={cols}
            pageSize={8}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </div>
      <div className="border border-success rounded m-4 p-3">
        <Typography variant="h4" gutterBottom className="text-info text-italic">
          Tailoring Invoice List
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            density="compact"
            rows={tailoring && tailoring}
            columns={cols}
            pageSize={8}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </div>
      <div className="border border-success rounded m-4 p-3">
        <Typography variant="h4" gutterBottom className="text-info text-italic">
          Manual Invoice List
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            density="compact"
            rows={manual && manual}
            columns={cols}
            pageSize={8}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </div>
      <div className="border border-success rounded m-4 p-3">
        <Typography variant="h4" gutterBottom className="text-info text-italic">
          Sales Return List
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            density="compact"
            rows={saleReturn && saleReturn}
            columns={cols}
            pageSize={8}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </div>
      <div className="border border-success rounded m-4 p-3">
        <Typography variant="h4" gutterBottom className="text-info text-italic">
          Due Invoice List
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            density="compact"
            rows={due && due}
            columns={cols}
            pageSize={8}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </div>
    </>
  );
};

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../_metronic/_helpers"; //"../../../../../_metronic/_helpers";
import { BrowserRouter, useHistory } from "react-router-dom";
import { useSubheader } from "../../_metronic/layout";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  CardFooter,
} from "../../_metronic/_partials/controls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "./_redux/Actions";
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
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  Table,
  TableHead,
  TableCell,
} from "@material-ui/core";
// import {
//   DataGrid,
//   GridToolbar,
//   //GridToolbarContainer,
//  // GridToolbarExport,
// } from "@mui/x-data-grid";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
//import { useDemoData } from '@mui/x-data-grid-generator';
//import {PrintIcon} from "@material-ui/icons";

import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";

//import { Alert } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { withStyles } from "@material-ui/core";

import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";

export const pageStyle = `  @media all {    .page-break {      display: none;    }  }
    @media print {    html, body {      height: initial !important;      overflow: initial !important;      -webkit-print-color-adjust: exact;    }}
  @media print {.page-break { margin-top: 1rem; display: block; page-break-before: auto;    }  }
   @page {    size: auto;    margin: 20mm;  }`;

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    "&$checked": {
      color: red[500],
    },
    "&$checked + $track": {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

export const SystemCheckPage = () => {
  const subHeader = useSubheader();
  subHeader.setTitle("eStore System Check");

  return (
    <>
      <div>
        <TailoringError />
      </div>
      <div>
        <TailoringCheck />
      </div>
      <div>
        <DuplicateInvoiceCheck />
      </div>
      <div>
        <TailoringDuplicateCheck />
      </div>
    </>
  );
};

export function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
export function AItem({ text }) {
  console.log(text);
  if (text != null && text.length > 0) {
    return (
      <ListItem>
        <ListItemText primary={text} secondary={null} />
      </ListItem>
    );
  }
  return null;
}

export function LItem({ items }) {
  console.log(items);
  return (
    <List dense={true}>
      {items.map((value) => (
        <AItem text={value} />
      ))}
    </List>
  );
}
export const TailoringError = () => {
  // Getting current state of  list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({
      currentState: state.commonPageTypes,
    }),
    shallowEqual
  );
  const [store, setStore] = useState(1);
  const history = useHistory(); // example from react-router
  const { tailoringErrors } = currentState;
  const [bOn, setBOn] = useState(true);
  const [delivery, setDelivery] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => pageStyle,
  });
  const [RData, setRData] = useState("{ storeId:1, delivery:false }");

  //  Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchTailoringError(RData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const handleButton = () => {
    const rData = {
      storeId: store,
      delivery: delivery,
    };
    console.log(rData);
    console.log(store);
    console.log(delivery);
    setRData(rData);

    if (store == null) alert("Kindly Select Store First");
    else {
      // server call by queryParams
      dispatch(actions.fetchTailoringError(rData));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      alert(
        "Please wait while processing your request.... Please ok to continue..."
      );
    }
  };

  const openSale = (id) => {
    history.push(`/sales/dailySales/${id}/edit`);
  };
  const openBooking = (id) => {
    history.push(`/tailoring/booking/${id}/edit`);
  };
  const openDelivery = (id) => {
    history.push(`/tailoring/delivery/${id}/edit`);
  };

  const DList = ({ listData }) => {
    console.log(listData);
    const columns = [
      {
        field: "id",
        headerName: "BookID",
        width: 90,
        identity: true,
        renderCell: (row) => {
          return <div className="rowItem text-danger">{row.row.bookingId}</div>;
        },
      },
      { field: "saleId", headerName: "SaleID", width: 90, hide: true },
      { field: "deliveryId", headerName: "DelID", width: 90, hide: true },
      { field: "custName", headerName: "Customer", minWidth: 150, hide: true },
      { field: "bookingSlip", headerName: "Slip", minWidth: 150 },
      { field: "invNo", headerName: "Inv", minWidth: 100 },
      { field: "bookingDate", headerName: "Date", minWidth: 100, type: "date" },
      {
        field: "deliveryDate",
        headerName: "Delivery",
        minWidth: 100,
        type: "date",
      },
      {
        field: "saleDate",
        headerName: "InvoiceDate",
        minWidth: 100,
        type: "date",
        hide: true,
      },
      {
        field: "proposeDate",
        headerName: "Propose",
        minWidth: 100,
        type: "date",
        hide: true,
      },
      {
        field: "bookingAmount",
        headerName: "Amount",
        minWidth: 90,
        hide: true,
      },
      { field: "deliveryAmount", headerName: "Amount", minWidth: 90 },
      { field: "saleAmount", headerName: "Amount", minWidth: 90, hide: true },
      {
        field: "errors",
        headerName: "Error(s)",
        minWidth: 250,
        renderCell: (params) => {
          return (
            <div className="rowItem text-danger">
              {params.row.lateDelivery && "Late Deliver,"}
              {params.row.invNotFound && "Invoice Missing,"}
              {params.row.saleAmtError && "Invoice Amount Mistach,"}
              {params.row.deliveryAmtError && "Late Deliver,"}
              {params.row.saleDateError && "Late Deliver,"}
              {params.row.msg && params.row.msg.length > 0
                ? params.row.msg
                : ""}
            </div>
          );
        }
        ,
      },
      {
        field: "actions",
        headerName: "Actions (S/B/D)",
        minWidth: 190,
        renderCell: (params) => {
          return (
            <div className="rowItem">
              <a
                title="Sale"
                tips="Sale Edit"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => openSale(params.row.saleId)}
              >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Write.svg"
                    )}
                  />
                </span>
              </a>
              <> </>
              <a
                title="Booking"
                hint="Booking"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => openBooking(params.row.bookingId)}
              >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Write.svg"
                    )}
                  />
                </span>
              </a>
              <> </>
              <a
                title="Delivery"
                hint="Delivery"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => openDelivery(params.row.deliveryId)}
              >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Write.svg"
                    )}
                  />
                </span>
              </a>
            </div>
          );
        },
      },
    ];

    return (
      <div>
        <div style={{ height: 800, width: "100%" }}>
          <DataGrid
            key="bookingId"
            id={Math.random()}
            getRowId={(row) => row.bookingId}
            rowHeight={76}
            rows={listData && listData}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </div>
    );
  };
  const handleReset = (event) => {
    dispatch(actions.resetTailor());
  };
  return (
    <Card>
      <CardHeader title="Tailoring Error">
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
        <FormControlLabel
          control={
            <PurpleSwitch
              checked={delivery}
              size="small"
              onChange={(event) => setDelivery(event.target.checked)}
              name="lateDelivery"
            />
          }
          label="Late Delivery"
        />
        <CardHeaderToolbar>
          <IconButton
            className="btn btn-success mr-3"
            onClick={handlePrint}
            disabled={bOn}
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
            value="Invoice Check"
          >
            Tailoring Check
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody ref={componentRef}>
        {tailoringErrors && (
          <DList
            listData={tailoringErrors.errorList && tailoringErrors.errorList}
          />
        )}
      </CardBody>
    </Card>
  );
};

export const TailoringCheck = () => {
  // Getting current state of  list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({
      currentState: state.commonPageTypes,
    }),
    shallowEqual
  );
  const [store, setStore] = useState(1);

  const { tailoringCheckList } = currentState;
  const [bOn, setBOn] = useState(true);
  const [delivery, setDelivery] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => pageStyle,
  });
  const [RData, setRData] = useState("{ storeId:1, delivery:false }");

  //  Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchTailoringCheck(RData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const handleButton = () => {
    const rData = {
      storeId: store,
      delivery: delivery,
    };
    console.log(rData);
    console.log(store);
    console.log(delivery);
    setRData(rData);

    if (store == null) alert("Kindly Select Store First");
    else {
      // server call by queryParams
      dispatch(actions.fetchTailoringCheck(rData));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      alert(
        "Please wait while processing your request.... Please ok to continue..."
      );
    }
  };

  const DList = ({ listData }) => {
    const columns = [
      { field: "id", headerName: "ID", width: 90 },
      { field: "invNo", headerName: "Inv", minWidth: 150 },
      { field: "slipNo", headerName: "Slip", minWidth: 100 },
      { field: "bookingDate", headerName: "Date", minWidth: 100, type: "date" },
      {
        field: "deliveryDate",
        headerName: "Delivery",
        minWidth: 100,
        type: "date",
      },
      {
        field: "proposeDate",
        headerName: "Propose",
        minWidth: 100,
        type: "date",
      },
      { field: "amount", headerName: "Amount/Paid", minWidth: 150 },
      {
        field: "errors",
        headerName: "Error(s)",
        minWidth: 290,
        renderCell: (params) => {
          return (
            <div className="rowItem text-danger">
              {params.row.errors && <LItem items={params.row.errors} />}
            </div>
          );
        },
      },
    ];
    //{generate(<ListItem><ListItemText primary={im}/></ListItem>,)}
    const itemList = Object.keys(listData).map(function(keyName, keyIndex) {
      return sM(listData[keyName]);
    });
    console.log(itemList);
    return (
      <div>
        <div style={{ height: 800, width: "100%" }}>
          <DataGrid
            rowHeight={76}
            rows={itemList && itemList}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
              //Toolbar: CustomToolbar,
            }}
          />
        </div>
      </div>
    );
  };

  // eslint-disable-next-line no-unused-vars
  const HandleInvLists = ({ listData }) => {
    // console.log(listData);
    // var itemList;
    if (listData != null) {
      setBOn(false);
      //listData.map((item,index)=>itemList+=stringMessage(item));
      const itemList = Object.keys(listData).map(function(keyName, keyIndex) {
        return stringMessage(listData[keyName]);
      });
      return (
        <>
          <h2 className="text-info text-center">
            {" "}
            List of Error(s) found in Tailoring entries.
          </h2>
          <ol className="list list-primary border border-primary rounded  pr-4 pl-5">
            {itemList &&
              itemList.map((item) => <li className="ml-5 p-4">{item}</li>)}
          </ol>
        </>
      );
    } else setBOn(true);
  };

  const sM = (msg) => {
    if (msg !== "") {
      var dMsg = msg.split("#");
      var error = dMsg[dMsg.length - 1].split(";");
      const row = {
        invNo: dMsg[1],
        id: dMsg[2] + "/" + dMsg[6],
        slipNo: dMsg[3],
        bookingDate: dMsg[4],
        deliveryDate: dMsg[5],
        proposeDate: dMsg[7],
        amount: dMsg[9] + "/" + dMsg[8],
        errors: error,
      };
      return row;
    } else return null;
  };

  const stringMessage = (msg) => {
    console.log(msg);
    if (msg !== "") {
      var dMsg = msg.split("#");
      var error = dMsg[dMsg.length - 1].split(";");
      return (
        <>
          <ul className=" border border-warning rounded row pl-4">
            <li className="text-success mt-2 ml-4 col-md-2">
              InvNo : {dMsg[1]}
            </li>
            <li className="text-warning ml-4 col-md-2">
              Booking/Delivery ID : {dMsg[2]}/{dMsg[6]}
            </li>
            <li className="text-success ml-4 col-md-2">Slip No: {dMsg[3]}</li>
            <li className="text-primary ml-4 col">Booking Date: {dMsg[4]}</li>
            <li className="text-info ml-4 col">Deliver Date: {dMsg[5]}</li>
            <li className="text-primary ml-4 col">Propose Date: {dMsg[7]}</li>
            <li className="text-info ml-4 col">
              Amount/Paid : Rs. {dMsg[9]} / Rs. {dMsg[8]}
            </li>

            <li className="text-danger mb-2 ml-4 col-md-4">
              Error(s)
              <ol>
                {error.map((e) =>
                  e && e !== "" ? <li className="p-1">{e}</li> : ""
                )}
              </ol>
            </li>
          </ul>
        </>
      );
    }
  };
  const handleReset = (event) => {
    dispatch(actions.resetTailor());
  };
  return (
    <Card>
      <CardHeader title="Tailoring Verification">
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
        <FormControlLabel
          control={
            <PurpleSwitch
              checked={delivery}
              size="small"
              onChange={(event) => setDelivery(event.target.checked)}
              name="lateDelivery"
            />
          }
          label="Late Delivery"
        />
        <CardHeaderToolbar>
          <IconButton
            className="btn btn-success mr-3"
            onClick={handlePrint}
            disabled={bOn}
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
            value="Invoice Check"
          >
            Tailoring Check
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody ref={componentRef}>
        {tailoringCheckList && (
          <DList listData={tailoringCheckList.invErrorList} />
        )}
      </CardBody>
    </Card>
  );
};
export const DuplicateInvoiceCheck = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.commonPageTypes }),
    shallowEqual
  );

  const [store, setStore] = useState();
  const [bOn, setBOn] = useState(true);

  const { duplicateInvCheckList } = currentState;
  const history = useHistory(); // example from react-router
  // Rents Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchDuplicateInvCheck(store));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const handleButton = () => {
    if (store == null) alert("Kindly Select Store First");
    else {
      // server call by queryParams
      dispatch(actions.fetchDuplicateInvCheck(store));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      alert(
        "Please wait while processing your request.... Please ok to continue..."
      );
    }
    //return( <AlertDismissible msg="Please wait while processing your request.... Please ok to continue..."/>);
  };

  // const handleStoreChange = (event) => {
  //   setStore(event.target.value);
  // };
  const openEditDialog = (id) => {
    history.push("/sales/dailySales/" + `${id}/edit`);
  };
  const openDeleteDialog = (id) => {
    history.push("/sales/dailySales/" + `${id}/delete`);
  };
  const PMode = ["Cash", "Card", ""];
  const DisplayInvList = ({ invList }) => {
    console.log(invList);
    if (invList == null) return <></>;
    return (
      <>
        <h3 className="text-info text-center">Duplicate Invoice Listing</h3>
        <h5 className="text-warning text-right">Count: {invList.length}</h5>
        <TableContainer
          component={Paper}
          className="border rounded border-success"
        >
          <Table x={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-light text-success text-center">
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>InvNo</TableCell>

                <TableCell>Mode</TableCell>
                <TableCell>Inv Types</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>CashAmount</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invList &&
                invList.map((inv) => (
                  <TableRow
                    key={inv.dailySaleId}
                    sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <TableCell>{inv.dailySaleId}</TableCell>
                    <TableCell>{inv.saleDate}</TableCell>
                    <TableCell>{inv.invNo}</TableCell>

                    <TableCell>{PMode[inv.payMode]}</TableCell>
                    <TableCell>
                      {inv.isDue && (
                        <span className="font-weight-bold label label-lg label-light-danger  label-inline ml-2">
                          Due Bill
                        </span>
                      )}
                      {inv.isTailoringBill && (
                        <span className="font-weight-bold label label-lg label-light-info  label-inline ml-2">
                          Tailoring
                        </span>
                      )}
                      {inv.isManualBill && (
                        <span className="font-weight-bold label label-lg label-light-primary  label-inline ml-2">
                          Manual Bill
                        </span>
                      )}
                      {inv.isSaleReturn && (
                        <span className="font-weight-bold label label-lg label-light-warning  label-inline ml-2">
                          Sale Return
                        </span>
                      )}
                      {inv.isMatchedWithVOy && (
                        <span className="font-weight-bold label label-lg label-light-success  label-inline ml-2">
                          Matched
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{inv.amount}</TableCell>
                    <TableCell>{inv.cashAmount}</TableCell>
                    <TableCell>{inv.remarks}</TableCell>
                    <TableCell>
                      <a
                        onClick={() => openEditDialog(inv.dailySaleId)}
                        title="Edit "
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Write.svg"
                            )}
                          />
                        </span>
                      </a>
                      <> </>

                      <a
                        onClick={() => openDeleteDialog(inv.dailySaleId)}
                        title="Delete "
                        className="btn btn-icon btn-light btn-hover-danger btn-sm"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/General/Trash.svg"
                            )}
                          />
                        </span>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const ErrorList = ({ eList }) => {
    // console.log(eList);
    if (eList != null) setBOn(false);
    else setBOn(true);
    return (
      <>
        {eList && (
          <h3 className="h3 text-center text-danger display-4">
            Duplicate Invoice Entry found
            <span className="badge badge-pill badge-success ml-5 small">
              {eList.length}
            </span>
          </h3>
        )}
        {eList && (
          <h5 className="h5 text-left text-info">
            Duplicate Invoice List below.
            <br />
            <hr className="text-danger" />
          </h5>
        )}
        {eList && (
          <ul className="border border-primary rounded  row">
            {eList &&
              eList.map((e) => (
                <li className="text-warning ml-3 col-lg-3">
                  Invoice No:{" "}
                  <span className="text-primary  ml-2">
                    <em>{e}</em>
                  </span>
                </li>
              ))}
          </ul>
        )}
      </>
    );
  };
  const handleReset = (event) => {
    dispatch(actions.resetDupInv());
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => pageStyle,
  });

  return (
    <Card>
      <CardHeader title="Invoice Duplicate Verification" className="text-info">
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
            disabled={bOn}
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
            value="Invoice Check"
          >
            Invoice Check
          </Button>
          {/* <ReactToPrint trigger={() => <button>Print</button>}content={() => componentRef.current} /> */}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody ref={componentRef} pageStyle={pageStyle}>
        {duplicateInvCheckList && duplicateInvCheckList.isOk ? (
          <div className=" text-center text-warning h2">
            No Duplicate Invoice found!
          </div>
        ) : (
          <ErrorList
            eList={
              duplicateInvCheckList &&
              duplicateInvCheckList.dupInv &&
              duplicateInvCheckList.dupInv
            }
          />
        )}

        {duplicateInvCheckList &&
        duplicateInvCheckList.invList &&
        duplicateInvCheckList.invList.length > 0 ? (
          <>
            <DisplayInvList
              invList={duplicateInvCheckList && duplicateInvCheckList.invList}
            />
          </>
        ) : (
          <></>
        )}
      </CardBody>
      <CardFooter>
        <div className="text-danger text-italic">
          Note:Kindly verify with sale list for further details.
        </div>
      </CardFooter>
    </Card>
  );
};

export const TailoringDuplicateCheck = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => pageStyle,
  });
  const history = useHistory(); // example from react-router
  const { currentState } = useSelector(
    (state) => ({ currentState: state.commonPageTypes }),
    shallowEqual
  );
  const [store, setStore] = useState(1);
  const [bOn, setBOn] = useState(true);

  const { slipCheck } = currentState;
  const handleReset = (event) => {
    dispatch(actions.resetSlip());
  };
  // Rents Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchSlipCheck(store));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const handleButton = () => {
    if (store == null) alert("Kindly Select Store First");
    else {
      // server call by queryParams
      dispatch(actions.fetchSlipCheck(store));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      alert(
        "Please wait while processing your request.... Please ok to continue..."
      );
    }
    //return( <AlertDismissible msg="Please wait while processing your request.... Please ok to continue..."/>);
  };
  const openEditDialog = (id) => {
    history.push("/tailoring/delivery/" + `${id}/edit`);
  };
  const openDeleteDialog = (id) => {
    history.push("/tailoring/delivery/" + `${id}/delete`);
  };
  const ListDuplicateDelivery = ({ dupList }) => {
    if (dupList != null && dupList.length == 0) return <></>;
    return (
      <>
        <h3 className="text-info text-center">Duplicate Delivery Listing</h3>
        <h5 className="text-warning text-right">Count: {dupList.length}</h5>
        <TableContainer
          component={Paper}
          className="border rounded border-success"
        >
          <Table x={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-light">
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>BookingSlip</TableCell>
                <TableCell>InvNo</TableCell>
                <TableCell>BookingId</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dupList &&
                dupList.map((inv) => (
                  <TableRow
                    key={inv.dailySaleId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{inv.talioringDeliveryId}</TableCell>
                    <TableCell>{inv.deliveryDate}</TableCell>
                    <TableCell>{inv.booking.bookingSlipNo}</TableCell>
                    <TableCell>{inv.invNo}</TableCell>
                    <TableCell>{inv.talioringBookingId}</TableCell>

                    <TableCell>{inv.amount}</TableCell>
                    <TableCell>{inv.remarks}</TableCell>

                    <TableCell>
                      <a
                        onClick={() => openEditDialog(inv.talioringDeliveryId)}
                        title="Edit "
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Write.svg"
                            )}
                          />
                        </span>
                      </a>
                      <> </>

                      <a
                        onClick={() =>
                          openDeleteDialog(inv.talioringDeliveryId)
                        }
                        title="Delete "
                        className="btn btn-icon btn-light btn-hover-danger btn-sm"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/General/Trash.svg"
                            )}
                          />
                        </span>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const DuplicateList = ({ eList }) => {
    if (eList === null || eList.length === 0)
      return (
        <Typography
          gutterBottom
          variant="h4"
          className="text-success text-center text-italic"
        >
          No Duplicate Entry found!
        </Typography>
      );
    if (eList != null) setBOn(false);
    else setBOn(true);
    return (
      <>
        {eList && (
          <Typography
            gutterBottom
            variant="h4"
            className="h3 text-center text-danger display-4"
          >
            Duplicate Invoice/Booking Slip Entry found
            <span className="badge badge-pill badge-success ml-5">
              {eList.length}
            </span>
          </Typography>
        )}
        {eList && (
          <Typography
            variant="h5"
            gutterBottom
            className="h5 text-left text-info"
          >
            Duplicate Invoice/Booking Slip List below.
            <br />
            <hr className="text-danger" />
          </Typography>
        )}
        {eList && (
          <ul className="border border-primary rounded  row">
            {eList &&
              eList.map((e) => (
                <li className="text-warning ml-3 col-lg-3">
                  Invoice No:{" "}
                  <span className="text-primary  ml-2">
                    <em>{e}</em>
                  </span>
                </li>
              ))}
          </ul>
        )}
      </>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "onDate", headerName: "Date", minWidth: 150, type: "date" },
    { field: "custName", headerName: "Customer", minWidth: 150 },
    { field: "slipNo", headerName: "Slip No", minWidth: 150 },
    { field: "amount", headerName: "Amount", minWidth: 150 },
    { field: "qty", headerName: "Qty", minWidth: 150 },
    {
      field: "slipNos",
      headerName: "Slips",
      minWidth: 150,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value[1]).toLocaleString();
        return `${valueFormatted}`;
      },
    },
  ];

  const BookingData = ({ lData }) => {
    //console.log(lData)
    return (
      <>
        <div className="border rounded m-5 p-3 border-primary">
          <div className="mr-4">
            <Typography
              variant="h4"
              gutterBottom
              className="text-info text-italic"
            >
              List of Booking Data after 04/08/2020{" "}
            </Typography>
          </div>
          <div style={{ height: 650, width: "100%" }}>
            <DataGrid
              className="text-primary"
              rows={lData && lData}
              columns={columns}
              pageSize={10}
              checkboxSelection
              disableSelectionOnClick
              components={{
                Toolbar: GridToolbar,
                //Toolbar: CustomToolbar,
              }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <Card>
      <CardHeader title="Tailoring Duplicate Verification">
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
            disabled={bOn}
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
        {slipCheck && slipCheck.IsDuplicate ? (
          <div className=" text-center text-warning h2">
            No Duplicate Slip found!
          </div>
        ) : (
          <DuplicateList
            eList={slipCheck && slipCheck.duplicates && slipCheck.duplicates}
          />
        )}

        {slipCheck && slipCheck.data && (
          <BookingData lData={slipCheck && slipCheck.data && slipCheck.data} />
        )}

        {slipCheck &&
        slipCheck.duplicateDelivery &&
        slipCheck.duplicateDelivery.length > 0 ? (
          <ListDuplicateDelivery
            dupList={
              slipCheck &&
              slipCheck.duplicateDelivery &&
              slipCheck.duplicateDelivery
            }
          />
        ) : (
          <></>
        )}
      </CardBody>
      <CardFooter>
        <div className="text-danger text-italic">
          Note:Kindly verify with Slip list for further details.
        </div>
      </CardFooter>
    </Card>
  );
};

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

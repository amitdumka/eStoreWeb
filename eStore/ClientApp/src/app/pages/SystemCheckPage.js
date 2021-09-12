import React, { useEffect, useState, useRef } from "react";
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
  Button,
  IconButton,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
//import {PrintIcon} from "@material-ui/icons";

import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";

import { Alert } from "react-bootstrap";
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
  const suhbeader = useSubheader();
  suhbeader.setTitle("eStore System Check");

  return (
    <>
      <div>
        <TailoringCheck />
      </div>
      <div>
        <DuplicateInvoiceCheck />
      </div>
    </>
  );
};

export const TailoringCheck = () => {
  // Getting curret state of  list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({
      currentState: state.commonPageTypes,
    }),
    shallowEqual
  );
  const [store, setStore] = useState();

  const { tailoringCheckList } = currentState;
  const [bOn, setBOn] = useState(true);
  const [delivery, setDelivery] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => pageStyle,
  });
  const [RData,setRData]= useState("{store:0,delivery:false}");
  

  //  Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchTailoringCheck(RData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const handleButton = () => {
    const rData={
      storeId:{store},
      delivery:{delivery}
    };
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
                  e && e != "" ? <li className="p-1">{e}</li> : ""
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
          <HandleInvLists listData={tailoringCheckList.invErrorList} />
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

  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };
  const ErrorList = ({ eList }) => {
    console.log(eList);
    if (eList != null) setBOn(false);
    else setBOn(true);
    return (
      <>
        {eList && (
          <h3 className="h3 text-center text-danger display-4">
            Duplicate Invoice Entry found
            <span className="badge badge-pill badge-success ml-5">
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
      </CardBody>
      <CardFooter>
        <div className="text-danger text-italic">
          Note:Kindly verify with sale list for further details.
        </div>
      </CardFooter>
    </Card>
  );
};

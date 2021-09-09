import React, { useEffect, useState } from "react";
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
import { Select, MenuItem, Button } from "@material-ui/core";
import { Alert } from "react-bootstrap";

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

  //  Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchTailoringCheck(store));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const handleButton = () => {
    if (store == null) alert("Kindly Select Store First");
    else {
      // server call by queryParams
      dispatch(actions.fetchTailoringCheck(store));
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
      //listData.map((item,index)=>itemList+=stringMessage(item));
      const itemList = Object.keys(listData).map(function(keyName, keyIndex) {
        return stringMessage(listData[keyName]);
      });
      return <ol>{itemList && itemList.map((item) => <li>{item}</li>)}</ol>;
    }
  };
  const stringMessage = (msg) => {
    console.log(msg);
    if (msg !== "") {
      var dMsg = msg.split("#");
      var error = dMsg[dMsg.length - 1].split(";");
      return (
        <>
          <ul className="mb-2 mt-3 border border-warning rounded">
            <li className="text-success mt-2">InvNo : {dMsg[1]}</li>
            <li className="text-warning">
              Booking/Delivery ID : {dMsg[2]}/{dMsg[6]}
            </li>
            <li className="text-success">Slip No: {dMsg[3]}</li>
            <li className="text-primary">Booking Date: {dMsg[4]}</li>
            <li className="text-info">Deliver Date: {dMsg[5]}</li>
            <li className="text-primary">Propose Date: {dMsg[7]}</li>
            <li className="text-info">
              Amount/Paid : Rs. {dMsg[9]} / Rs. {dMsg[8]}
            </li>

            <li className="text-danger mb-2">
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
      <CardHeader title="Tailoring Verification" className="text-success">
        <Select className="text-center center-align text-primary"
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
          <input
            type="button"
            class="mr-3 btn btn-info"
            value="Reset"
            onClick={() => {
              handleReset();
            }}
          />
          <input
            type="button"
            onClick={() => handleButton()}
            class="btn btn-primary"
            value="Tailoring Check"
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
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
    return (
      <>
        {eList && (
          <div className="h3 text-center text-danger">
            Duplicate Invoice Entry found
            <span class="badge badge-pill badge-success ml-5">
              {eList.length}
            </span>
          </div>
        )}
        {eList && (
          <div className="h5 text-left text-info">
            Duplicate Invoice List below.
          </div>
        )}
        {eList && (
          <ul className="border border-primary rounded">
            {eList &&
              eList.map((e) => (
                <li className="text-warning">Invoice No: {e}</li>
              ))}
          </ul>
        )}
      </>
    );
  };
  const handleReset = (event) => {
    dispatch(actions.resetDupInv());
  };
  return (
    <Card>
      <CardHeader title="Invoice Duplicate Verification" className="text-info">
        <Select className="text-center center-align text-primary"
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
          <input
            type="button"
            class="mr-3 btn btn-info"
            value="Reset"
            onClick={() => {
              handleReset();
            }}
          />
          <input
            type="button"
            onClick={() => handleButton()}
            class="btn btn-primary"
            value="Invoice Check"
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
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

function AlertDismissible({ msg }) {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>{msg}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me!
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}

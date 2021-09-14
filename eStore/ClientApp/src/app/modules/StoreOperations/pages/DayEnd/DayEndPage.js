import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as MUI from "../../../../../_estore/controls/Mui";
//import { useSubheader } from "../../../../../_metronic/layout"; //"../../_metronic/layout";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "../../../../../_metronic/_partials/controls";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import { BASE_URL } from "../../../../../_estore/URLConstants";
import { SweetAlert } from "./CControls";
//Day end Entry form.
export const API_URL = BASE_URL + "api/endOfDays";
export function DayEndPage() {
  //const UIContext = createContext();
  //const subHeader = useSubheader();
  // subHeader.setTitle("Day End");

  //const { control, register, handleSubmit, reset } = useForm();
  const schema = yup.object().shape({
    cashInHand: yup.number().required("Cash at Store is required!"),
    totalAmount: yup
      .number()
      .required("Total Cash and Count of currency is required!"),
    coin1: yup.number().required("Coin 1"),
    coin2: yup.number().required("Coin 2"),
    coin5: yup.number().required("Coin 5"),
    coin10: yup.number().required("Coin 10"),
    c2000: yup.number().required("2000"),
    c500: yup.number().required("500"),
    c10: yup.number().required("10"),
    c100: yup.number().required("100"),
    c200: yup.number().required("200"),
    c20: yup.number().required("20"),
    c50: yup.number().required(" 50"),
    c5: yup.number().required(" 5"),
    shirting: yup.number().required(" "),
    suiting: yup.number().required(" "),
    uspa: yup.number().required(" "),
    fm_Arrow: yup.number().required(" "),
    rtw: yup.number().required(" "),
    access: yup.number().required(" "),
    onDate: yup.date().required(" "),
    storeId: yup
      .number()
      .positive()
      .required("Select One Store"),
  });
  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) });

  //const onSubmit = data => console.log(data);
  const onSubmit = (data, e) => {
    e.target.reset();
    data.totalAmount = calCash(data);
    saveDayEnd(generateData(data));
    const strmsg =
      "Day End process is started for Date: " +
      data.onDate +
      ". Cash In Hand:" +
      data.cashInHand +
      ". Click Ok to continue...";
    alert(strmsg);
  };

  const generateData = (data) => {
    console.log(data);
    const returnData = {
      cashDetail: {
        storeId: data.storeId,
        isReadOnly: false,
        entryStatus: 0,
        userId: "webUI",
        coin1: data.coin1,
        coin2: data.coin2,
        coin5: data.coin5,
        coin10: data.coin10,
        totalAmount: data.totalAmount,
        c5: data.c5,
        c10: data.c10,
        c20: data.c20,
        c100: data.c100,
        c50: data.c50,
        c200: data.c200,
        c500: data.c500,
        c1000: 0,
        c2000: data.c2000,
        onDate: data.onDate,
      },
      endOfDay: {
        storeId: data.storeId,
        isReadOnly: false,
        entryStatus: 0,
        userId: "webUI",
        cashInHand: data.cashInHand,
        shirting: data.shirting,
        suiting: data.suiting,
        eod_Date: data.onDate,
        uspa: data.uspa,
        fm_Arrow: data.fm_Arrow,
        rtw: data.rtw,
        access: data.access,
        tailoringBooking: data.tailoringBooking,
        tailoringDelivery: data.tailoringDelivery,
      },
    };
    return returnData;
  };

  const calCash = (data) => {
    var tAmt = 0;
    tAmt += data.coin1 + 2 * data.coin2 + 5 * data.coin5 + 10 * data.coin10;
    tAmt +=
      data.c5 * 5 +
      data.c10 * 10 +
      data.c20 * 20 +
      data.c50 * 50 +
      data.c100 * 100 +
      data.c200 * 200;
    tAmt += data.c2000 * 2000 + data.c500 * 500; //+(data.c1000*1000);
    return tAmt;
  };

  // const getSaleData = () => {
  //   const { onDate } = getValues();
  //   if (onDate != null) {
  //     getSaleData(onDate);
  //   }
  // };
  const handleFetchData = () => {
    console.log("handle");
    SweetAlert({ title: "success", text: "Testing Message", icon: "success" });
  };
  const handleCalculateButton = () => {
    const data = getValues();
    var tAmt = 0;
    tAmt =
      0 +
      parseInt(data.coin1) +
      2 * parseInt(data.coin2) +
      5 * parseInt(data.coin5) +
      10 * parseInt(data.coin10) +
      parseInt(data.c5) * 5 +
      parseInt(data.c10) * 10 +
      parseInt(data.c20) * 20 +
      parseInt(data.c50) * 50 +
      parseInt(data.c100) * 100 +
      parseInt(data.c200) * 200 +
      parseInt(data.c2000) * 2000 +
      parseInt(data.c500) * 500;
    console.log(tAmt);
    setValue("totalAmount", tAmt);
  };

  //   useEffect(() => {
  //     // you can do async server request and fill up form
  //     setTimeout(() => {
  //       reset({
  //         firstName: "bill2",
  //         lastName: "luo2"
  //       });
  //     }, 2000);
  //   }, [reset]);

  const stores = [
    { label: "Dumka", value: 1 },
    { label: "Jamshedur", value: 2 },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="Day End" />
        <CardBody>
          <section className="p-5">
            <div className="row">
              <div className="col-lg-3">
                <h3>Sale Details</h3>
              </div>
              <div className="col-lg-3">{new Date().toLocaleString()}</div>
              <div className="col-lg-3 p-2">
                <MUI.MUISelect
                  control={control}
                  label="Store"
                  name="storeId"
                  options={stores}
                  defaultValue={1}
                />
              </div>
              <div className="col-lg-3 p-2">
                <input
                  onClick={() => handleFetchData()}
                  type="button"
                  value="Fetch Details"
                  className="btn btn-success"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <MUI.MUIRDatePicker
                  control={control}
                  label="Date"
                  name="onDate"
                  errors={errors}
                  defaultValue={new Date()}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Cash In Hand"
                  name="cashInHand"
                  errors={errors}
                  defaultValue={0}
                />
              </div>
              <div className="col-lg-3">Total Sale: 0</div>
              <div className="col-lg-3">Total Sale Qyt: 0</div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Shirting"
                  name="shirting"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Suiting"
                  name="suiting"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="USPA"
                  name="uspa"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Arrow"
                  name="fm_Arrow"
                  errors={errors}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="RTW"
                  name="rtw"
                  dValue={0}
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Accessory"
                  name="access"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Tailoring Booking"
                  name="tailoringBooking"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Tailoring Delivery"
                  name="tailoringDelivery"
                  errors={errors}
                />
              </div>
            </div>
          </section>

          <section className="bg-success p-5">
            <div className="row">
              <div className="col-lg-4 ">
                <h3>Cash Details</h3>
              </div>
              <div className="col-lg-4 p-2">
                <input
                  onClick={() => handleCalculateButton()}
                  type="button"
                  value="Calculate"
                  className="btn btn-info"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Total"
                  name="totalAmount"
                  errors={errors}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="2000"
                  name="c2000"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="200"
                  name="c200"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="500"
                  name="c500"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="100"
                  name="c100"
                  errors={errors}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="50"
                  name="c50"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="20"
                  name="c20"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="10"
                  name="c10"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="5"
                  name="c5"
                  errors={errors}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Coin 1"
                  name="coin1"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Coin 2"
                  name="coin2"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Coin 5"
                  name="coin5"
                  errors={errors}
                />
              </div>
              <div className="col-lg-3">
                <MUI.MUINumber
                  control={control}
                  label="Coin 10"
                  name="coin10"
                  errors={errors}
                />
              </div>
            </div>
          </section>
          {/* <section>
              <MUI.CashDetail control={control} errors={errors} name="cashDetail" label="Cash Details"/>
          </section> */}
        </CardBody>
        <CardFooter className="text-center">
          <input
            type="button"
            value="Reset"
            onClick={() => reset()}
            className="btn btn-light btn-elevate float-right"
          />
          <input
            type="submit"
            value="Save"
            className="btn btn-primary btn-elevate float-right"
          />
        </CardFooter>
      </Card>
    </form>
  );
}

export default DayEndPage;

export async function saveDayEnd(data) {
  await axios
    .post(`${API_URL}/dayend`, data, {
      method: "POST",
      responseType: "json", //Force to receive data in a Blob Format
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
    .then((response) => {
      console.log(response);
      if (response.status === 201)
        SweetAlert({
          title: "success",
          text: "Day End is processed for \t" + data.cashDetail.onDate,
          icon: "success",
        });
      else
        SweetAlert({
          title: "Error",
          text: "Day end is not processed for \t" + data.cashDetail.onDate,
          icon: "error",
        });
    })
    .catch((error) => {
      console.log(error);
      //alert("It failed to save data!, Kindly try again...");
      SweetAlert({
        title: "Error",
        text:
          "It failed to save data!, Kindly try again...\t" +
          data.cashDetail.onDate,
        icon: "error",
      });
    });
}
// update rest data
export async function getSaleData(data) {
  await axios
    .get(`${API_URL}${data}`)
    .then((response) => {
      console.log(response);
      alert(response);
    })
    .catch((error) => {
      console.log(error);
      alert("It failed to GET data!, Kindly try again...");
    });
}

export function ShowAlert(msg) {
  return (
    <>
      <Alert severity="success">
        {" "}
        <AlertTitle>Success</AlertTitle>
        {msg}
      </Alert>
    </>
  );
}

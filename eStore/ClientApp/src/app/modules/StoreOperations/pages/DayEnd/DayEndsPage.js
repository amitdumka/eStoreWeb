import React, { createContext, useContext, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as MUI from "../../../../../_estore/controls/Mui";
import { useSubheader } from "../../../../../_metronic/layout"; //"../../_metronic/layout";
import {
  Card,
  CardHeaderToolbar,
  CardBody,
  CardFooter,
  CardHeader,
} from "../../../../../_metronic/_partials/controls";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import { BASE_URL } from "../../../../../_estore/URLConstants";
import { KeyboardReturnRounded } from "@material-ui/icons";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}
export const UIConsumer = UIContext.Consumer;
export function UIProvider({ UIEvents, children }) {
    const [ids, setIds] = useState([]);
    const value = {
      ids,
      setIds,
    };
    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
  }
  



//Day end Entry form.
export const API_URL = BASE_URL + "api/endOfDays";
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
    storeId:yup.number().positive().required("Select One Store")
  });
export function DayEndPage({ history }) {
  return (<UIContext><DayEndCard/></UIContext>);
}

export function DayEndCard() {
    const {
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: { errors, dirtyFields },
        control,
      } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data, e) => {
    e.target.reset();
    //data.totalAmount = calCash(data);
    //saveDayEnd(generateData(data));
    const strmsg="Day End process is started for Date: "+data.onDate+". Cash In Hand:"+ data.cashInHand+". Click Ok to continue...";
    alert(strmsg);


  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="Day End">
          <CardHeaderToolbar>
            <button type="button" className="btn btn-primary">
              Refresh
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <section className="p-5">
            <div className="row">
              <div className="col-lg-3">
                <h3>Sale Details</h3>
              </div>
              <div className="col-lg-3">{new Date().toLocaleString()}</div>
              <div className="col-lg-3 p-2">
                <MUI.MUISelect control={control} label="Store" name="storeId" options={stores} defaultValue={1}/>
              </div>
              <div className="col-lg-3 p-2">
                <input
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

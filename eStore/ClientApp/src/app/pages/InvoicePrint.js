import React from "react";
import { useSubheader } from "../../_metronic/layout";

const inv = {
  onDate: "12 / 12 / 2021",
  invNo: "C33IN2010001",
  custName: "Amit Kumarr",
  mobile: "9831213339",
  cgst: 125,
  sgst: 125,
  roundOff: 0,
  tQty: 6.4,
  subTotal: 6000,
  tDisc: 600,
  total: 5400,
  netTotal: 5650,
  mode: "Cash",
  items: [
    { barcode: "1212121", hsn: "456123", qty: 1.2, basic: 2000, disc: 200 },
    { barcode: "1212121", hsn: "456123", qty: 1.2, basic: 2000, disc: 200 },
    { barcode: "1212121", hsn: "456123", qty: 1.2, basic: 2000, disc: 200 },
  ],
};

export default function Print() {
  return (
    <>
      <InvoicePrint inv={inv} />
    </>
  );
}

export const InvoicePrint = ({ inv }) => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Invoice Print");

  const printReceipt = () => {
    window.print();
  };
  return (
    <>
      <div>
        <h2 align="center">Aprajita Retails</h2>
        <h4 align="center">
          {" "}
          Bhagalpur Road Dumka
          <br />
          Phone:06434-224461
          <br />
          GSTIN: 20AJHPA7396P1ZV
        </h4>
        <h4 align="center">
          Retail Invoice cum Receipt
          <br />
          Customer Copy
        </h4>
        <h4 align="center">
          Invoice : {inv.invNo} <br /> Date : {inv.onDate} <br />
          Customer : {inv.custName} <br /> MobileNo : {inv.mobile}
        </h4>
        <table class="print-receipt ">
          <tr>
            <th>Item</th>
            <th>HSN</th>
            <th>Qty</th>
            <th>BasicRate</th>
            <th>Disc</th>
          </tr>
          {inv.items &&
            inv.items.map((item) => (
              <tr>
                <td>{item.barcode}</td>
                <td>{item.hsn}</td>
                <td>{item.qty}</td>
                <td>{item.basic}</td>
                <td>{inv.disc}</td>
              </tr>
            ))}

          <tr>
            <td align="center"></td>
            <td>Sub Total: </td>
            <td>{inv.tQty} </td>
            <td>{inv.subTotal}</td>
            <td>{inv.tDisc}</td>
          </tr>
          <tr>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td align="center">
              CGST: {inv.cgst} SGST: {inv.sgst}
            </td>
            <td></td>
            <td colspan="2" align="right">
              {" "}
              Amount
            </td>
            <td>Rs. {inv.total}</td>
          </tr>
          <tr>
            <td></td>
            <td colspan="2"> Net Amount</td>
            <td></td>
            <td>Rs. {inv.netTotal}/-</td>
          </tr>
          <tr>
            <td colspan="5">
              Paid by {inv.mode} Rupees Five Thousand Six hundred Fifty only
            </td>
          </tr>
        </table>
        <h4 align="center">
          {" "}
          Thanks for purchasing with The Arvind Store, Dumka
        </h4>
        <button class="hide-on-print" onClick={printReceipt}>
          Print
        </button>
      </div>
    </>
  );
};

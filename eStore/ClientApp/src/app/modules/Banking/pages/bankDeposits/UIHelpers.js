export const StatusCssClasses = ["success","danger", "warning","info",""];
export const StatusTitles = ["Present", "Absent", "HalfDay","Sunday" ,""];
export const PayModeCssClasses = ["success", "primary","danger","warning","info", "default","warning","info", "default","warning","info", "default","primary",""];
export const PayModeTitles = ["Cash", "Card", "RTGS", "NEFT", "IMPS", "Wallets", "Cheques", "DemandDraft", "Points", "Others", "Coupons", "MixPayments", "UPI", ""];
export const defaultSorted = [{ dataField: "firstName", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    lastName: "",
    firstName: "",
    email: "",
    purchaseAmount: ""
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};

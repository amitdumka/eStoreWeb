export const SalaryComponentsCssClasses = ["success", "warning","info","default", "warning","info","danger","danger","danger",""];
export const SalaryComponentsTitles = ["NetSalary", "LastPcs", "WOWBill", "SundaySalary", "Incentive", "Others", "Advance", "PaidLeave", "SickLeave",""];
export const PayModeCssClasses = ["success", "primary","danger","warning","info", "default","warning","info", "default","warning","info", "default","primary",""];
export const PayModeTitles = ["Cash", "Card", "RTGS", "NEFT", "IMPS", "Wallets", "Cheques", "DemandDraft", "Points", "Others", "Coupons", "MixDueRecovereds", "UPI", ""];
export const defaultSorted = [{ dataField: "dueRecoveredDate", order: "desc" }];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "25", value: 25 },
  { text: "50", value: 50 }
];
export const initialFilter = {
  filter: {
    staffName: "",
    dueRecoveredDate: "",
    salaryMonth: "",
    salaryComponet: ""
  },
  sortOrder: "desc", // asc||desc
  sortField: "dueRecoveredDate",
  pageNumber: 1,
  pageSize: 10
};

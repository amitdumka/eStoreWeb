export const StatusCssClasses = ["success","danger", "warning","info",""];
export const StatusTitles = ["Present", "Absent", "HalfDay","Sunday" ,""];
export const AccountTypeCssClasses = ["success", "primary", "danger","warning","info",""];
export const AccountTypeTitles = ["Saving", "CurpettyCashBook", "CC","OD","Other",""];
export const defaultSorted = [{ dataField: "onDate", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    onDate: "",
    storeId: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};

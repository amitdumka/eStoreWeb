export const StatusCssClasses = ["success","danger", "warning","info",""];
export const StatusTitles = ["Present", "Absent", "HalfDay","Sunday" ,""];
//export const CustomerTypeCssClasses = ["success", "primary", ""];
//export const CustomerTypeTitles = ["Business", "Individual", ""];
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

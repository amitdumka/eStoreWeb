export const defaultSorted = [{ dataField: "onDate", order: "asc" }];
export const sizePerPageList = [
  { text: "5", value: 5 },
  { text: "7", value: 7 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    onDate: "",
    invNo: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};

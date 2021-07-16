export const defaultSorted = [{ dataField: "connectionName", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    connectionName: ""
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};

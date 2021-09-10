//Setting.js
// This is setting and configuration file for creating Modules component.
// All Changes are need to made here so it will be reflected at whole module component level. 
import {
    sortCaret,
    headerSortingClasses,
  } from "../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import * as Yup from "yup";

//Data Model need to be defined here for module component
export const initDataModel = {
    rentId: 0,
    rentedLocationId: 0,
    location: null,
    rentType: 0,
    onDate: new Date(),
    period: "",
    amount: 0.0,
    mode: 0,
    paymentDetails: "",
    remarks: "",
    storeId: 1,
    store: null,
    userId: "WebUI",
    entryStatus: 0,
    isReadOnly: false,
  };

  export const Settings={
    componentName:"Rent",
    defaultSorted:"bankName",
    filter: {account: "", branchName: "", bankName: "", accountType: ""},
    basePath:"/renting", 
    comPath:"/rents",
    tableSettings:{
        // Table columns
        columns:{columns},
      keyField:"rentId",
      noDataIndication:"No Record Found now.."
    },
    actionColSetting: {
        editTitle: "Edit rent",
        deleteTitle: "Delete rent",
        id: "rentId",
      },
      baseFilter:{
        initialValues:{status: "",type: "",searchText: "" },
        status:{
          name:"status",placeholder:"Filter by status",
          options:[{label:"All",value:""},{label:"Suspended",value:"0"},{label:"Active",value:"1"},{label:"Pending",value:"2"}],
          label:" <b>Filter</b> by Status"
        },
        type:{
          name:"type",placeholder:"Filter by type",
          options:[{label:"All",value:""},{label:"Business",value:"0"},{label:"Individual",value:"1"}],
          label:"<b>Filter</b> by Type"
        }, 
        searchText:{
          name:"SearchText",placeholder:"Search",label:"<b>Search</b> in all fields"
        }
      
      },
      deleteSetting : {
        title: "Rent Delete",
        deleteMessage: "Are you sure to permanently delete this rent?",
        loadingMessage: "Rent is deleting...",
        deletesMessage:"Are you sure to permanently delete selected rents?"
      },
      headerSetting:{
        title:" Rent Payment",
        editColumnData:"",
      },
      editSchema:{EditSchema}

  };//end of Settings


 export const columns=[
    {
      dataField: "rentId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "location.placeName",
      text: "Rented Location",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "rentType",
      text: "Rent Type",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "onDate",
      text: "Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "period",
      text: "Period",
      sort: false,
      
      sortCaret: sortCaret,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "mode",
      text: "Mode",
      sort: true,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "paymentDetails",
      text: "Payment Details",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "remarks",
      text: "Remarks",
      sort: false,
      //formatter:columnFormatters.TypeColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {openEditDialog:uiProps.openEditDialog,openDeleteDialog:uiProps.openDeleteDialog,},
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const uiProps={};
  const EditSchema = Yup.object().shape({
    onDate: Yup.date().required("Date is required"),
    period: Yup.string().required("Period is required"),
    rentType: Yup.number().required("Select Rent Type , is required"),
    rentedLocationId: Yup.number()
      .moreThan(0)
      .required("Select Rent Location , is required"),
    mode: Yup.number().required("Select mode is required"),
    amount: Yup.number()
      .moreThan(0)
      .required("Amount is required"),
    remarks: Yup.string().required("Remarks is required"),
    paymentDetails: Yup.string().required("Payment Details is required"),
  });
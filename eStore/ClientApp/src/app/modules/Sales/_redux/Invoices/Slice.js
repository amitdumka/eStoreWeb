import {createSlice} from "@reduxjs/toolkit";

//Invoice
//invoice

const initialInvoicesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  invoiceForEdit: undefined,
  lastError: null, 
  employeeEntities: null, 
  invoiceItems: null,
  invoicePayment: null,
  totalCountEmp:0,
  lastInvoiceNumber:'', 
  productStockViews:null, 
  productStock:null,
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState: initialInvoicesState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // get All employee List 
    employeesListFetched: function(state,action){
      const{totalCount,entities}=action.payload;
     state.actionsLoading=false;
     state.listLoading =false;
     state.error=null;
     state.employeeEntities=entities;
     state.totalCountEmp=totalCount;

    },
   
    // getInvoiceById
    invoiceFetched: (state, action) => {
      state.actionsLoading = false;
      state.invoiceForEdit = action.payload.invoiceForEdit;
      state.error = null;
  //    console.log(state.invoiceForEdit);
    },
    
    invoiceGenFetched: (state, action) => {
      state.actionsLoading = false;
      state.lastInvoiceNumber = action.payload.lastInvoiceNumber;
      state.error = null;
  //    console.log(state.invoiceForEdit);
    },
    // findInvoices
    invoicesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createInvoice
    invoiceCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.invoice);
    },
    // updateInvoice
    invoiceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.invoiceId === action.payload.invoice.invoiceId) {
          return action.payload.invoice;
        }
        return entity;
      });
    },
    // deleteInvoice
    invoiceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.invoiceId !== action.payload.invoiceId);
    },
    // deleteInvoices
    invoicesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.invoiceId)
      );
    },

    
    // invoicesUpdateState
    invoicesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.invoiceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});

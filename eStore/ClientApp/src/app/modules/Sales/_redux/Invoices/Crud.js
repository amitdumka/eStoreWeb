import axios from 'axios'
import { BASE_URL } from '../../../../../_estore/URLConstants'

//Invoice
//invoice

export const API_URL = BASE_URL + '/api/invoices'
export const API_URL_Product = BASE_URL + '/api/productItems'
export const API_URL_Item = BASE_URL + '/api/invoiceItems'
export const API_URL_Payment = BASE_URL + '/api/invoicePayments'

// CREATE =>  POST: add a new invoice to the server
export async function createInvoice(invoice) {
  return await axios.post(API_URL, invoice, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

// READ
export function getAllInvoices() {
  return axios.get(API_URL) //.catch(function (error){console.log(error)});
}
export function GetProductStockViews(){
  return axios.get(API_URL_Product+"/productStockViews");
}
export function GetProductStockView(id){
  return axios.get(API_URL_Product+"/productStockView?id="+id);
}
export function getAllInvoiceItem()
{
  return axios.get(API_URL_Item);
}
export function getAllInvoicePayments()
{
  return axios.get(API_URL_Payment);
}

export async function getInvoiceById(invoiceId) {
  return await axios.get(`${API_URL}/${invoiceId}`)
}
export async function getGenerateInvoice(invoiceType) {
  return await axios.get(`${API_URL}/genInv/${invoiceType}`)
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findInvoices(queryParams) {
  return await axios.get(`${API_URL}`)
}
// find?mode=999`); find`, { queryParams });

// function to get all list of employees
export async function getAllEmployees() {
  return await axios.get(BASE_URL + '/api/salesmen')
}

// UPDATE => PUT: update the invoice on the server
export async function updateInvoice(invoice) {
  return await axios.put(
    `${API_URL}/${invoice.invoiceId}`,
    JSON.stringify(invoice),
    {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    },
  )
}

// UPDATE Status
export async function updateStatusForInvoices(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForInvoices`, {
    ids,
    status,
  })
}

// DELETE => delete the invoice from the server
export async function deleteInvoice(invoiceId) {
  return await axios.delete(`${API_URL}/${invoiceId}`)
}

// DELETE Invoices by ids
export async function deleteInvoices(ids) {
  return await axios.post(`${API_URL}/deleteInvoices`, { ids })
}

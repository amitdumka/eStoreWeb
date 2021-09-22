import axios from "axios";
import { BASE_URL } from "../../../../../_estore/URLConstants";

//bookings
//Bookings
//booking
//Booking

export const API_BASE_URL = BASE_URL + "api/";
export const API_URL = BASE_URL + "api/tailoringbookings";
// CREATE =>  POST: add a new booking to the server
export async function createBooking(booking) {
  return await axios.post(API_URL, booking, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllBookings() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}
export async function getPendingDelivery() {
  return await axios.get(`${API_BASE_URL}masterReport/pendingdeliver`);
}
export async function getDuplicateBookings(id) {
  return await axios.get(`${API_URL}/duplicateBooking?StoreID=1`);
}
export async function getBookingById(bookingId) {
  return await axios.get(`${API_URL}/${bookingId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findBookings(queryParams) {
  console.log(queryParams.filter.type);
  if (queryParams.filter.type === 1) { console.log("duplicate");
    return await axios.get(`${API_URL}/duplicateBooking?StoreId=1`);
  } 
  else if(queryParams.filter.type===2){
    console.log("pending");
    return await axios.get(`${API_URL}/pending`);
  }
  else {
    return await axios.get(`${API_URL}`); //find`, { queryParams });
  }
}


// UPDATE => PUT: update the booking on the server
export async function updateBooking(booking) {
  return await axios.put(
    `${API_URL}/${booking.talioringBookingId}`,
    JSON.stringify(booking),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForBookings(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForBookings`, {
    ids,
    status,
  });
}

// DELETE => delete the booking from the server
export async function deleteBooking(bookingId) {
  return await axios.delete(`${API_URL}/${bookingId}`);
}

// DELETE Bookings by ids
export async function deleteBookings(ids) {
  return await axios.post(`${API_URL}/deleteBookings`, { ids });
}

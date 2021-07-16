import axios from "axios";

//Delivery
//delivery
//Deliveries
//deliveries

export const API_URL = "https://www.aprajitaretails.in/api/TalioringDeliverys";


// CREATE =>  POST: add a new delivery to the server
export async function createDelivery(delivery) {
  return await axios.post(API_URL, delivery, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllDeliveries() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getDeliveryById(deliveryId) {
  return await axios.get(`${API_URL}/${deliveryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findDeliveries(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllBookings() {
  return await axios.get("https://www.aprajitaretails.in/api/selectData/bookingList/false");
}

// UPDATE => PUT: update the delivery on the server
export async function updateDelivery(delivery) {
  return await axios.put(
    `${API_URL}/${delivery.deliveryId}`,
    JSON.stringify(delivery),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForDeliveries(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForDeliveries`, {
    ids,
    status,
  });
}

// DELETE => delete the delivery from the server
export async function deleteDelivery(deliveryId) {
  return await axios.delete(`${API_URL}/${deliveryId}`);
}

// DELETE Deliveries by ids
export async function deleteDeliveries(ids) {
  return await axios.post(`${API_URL}/deleteDeliveries`, { ids });
}

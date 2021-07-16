import axios from "axios";

export const APIBASE_URL = "https://www.aprajitaretails.in/api/";

export async function getStoreStatus(storeId) {
  return axios.get(APIBASE_URL + "StoreOperations/storestatus/" + storeId);
}
export async function getStoreOperations(storeId, onDate) {
  return axios.get(APIBASE_URL + "storeOperations");
}

export async function getAllStoreOpens() {
  return axios.get(APIBASE_URL + "storeOpens");
}

export async function getStoreOpens(id) {
  return axios.get(APIBASE_URL + "storeOpens/forStore/" + id);
}

export async function getAllStoreCloses() {
  return axios.get(APIBASE_URL + "storeCloses");
}

export async function getStoreCloses(id) {
  return axios.get(APIBASE_URL + "storeCloses/forStore/" + id);
}

export async function getAllStoreHolidays() {
  return axios.get(APIBASE_URL + "storeHolidays");
}

export async function getStoreHolidays(id) {
  return axios.get(APIBASE_URL + "storeHolidays/forStore/" + id);
}

export async function getStoreOpenById(id) {
  return axios.get(APIBASE_URL + "storeOpens/" + id);
}

export async function getStoreCloseById(id) {
  return axios.get(APIBASE_URL + "storeCloses/" + id);
}
export async function getStoreHolidayById(id) {
  return axios.get(APIBASE_URL + "storeHolidays/" + id);
}

export async function createStoreOpen(storeOpens) {
  return await axios.post(APIBASE_URL + "storeOpens", storeOpens, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
export async function createStoreClose(storeClose) {
  console.log(storeClose);
  return await axios.post(APIBASE_URL + "storeCloses", storeClose, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
export async function createStoreHoliday(storeHoliday) {
  return await axios.post(APIBASE_URL + "storeHolidays", storeHoliday, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
export async function createStoreClosed(storeHoliday) {
  ///api/StoreOperations/storeClosed
  return await axios.post(
    APIBASE_URL + "/StoreOperations/storeClosed",
    storeHoliday,
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}
export async function createStoreClosedForNDays(storeHoliday) {
  ///api/StoreOperations/storeClosedNDays
  return await axios.post(
    APIBASE_URL + "StoreOperations/storeClosedNDays",
    storeHoliday,
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}
//Update

// UPDATE => PUT: update the attendance on the server
export async function updateStoreOpen(obj) {
  return await axios.put(
    `${APIBASE_URL}storeOpens/${obj.storeOpenId}`,
    JSON.stringify(obj),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE => PUT: update the attendance on the server
export async function updateStoreClose(obj) {
  return await axios.put(
    `${APIBASE_URL}storeCloses/${obj.storeCloseId}`,
    JSON.stringify(obj),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}
// UPDATE => PUT: update the attendance on the server
export async function updateStoreHoliday(obj) {
  return await axios.put(
    `${APIBASE_URL}storeHolidays/${obj.storeHolidayId}`,
    JSON.stringify(obj),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

//Delete

// DELETE => delete the attendance from the server
export async function deleteStoreOpen(id) {
  return await axios.delete(`${APIBASE_URL}storeOpens/${id}`);
}

// DELETE Attendances by ids
export async function deleteStoreOpens(ids) {
  return await axios.post(`${APIBASE_URL}/storeOpens/deleteSelected`, { ids });
}
// DELETE => delete the attendance from the server
export async function deleteStoreClose(id) {
  return await axios.delete(`${APIBASE_URL}storeCloses/${id}`);
}

// DELETE Attendances by ids
export async function deleteStoreCloses(ids) {
  return await axios.post(`${APIBASE_URL}/storeCloses/deleteSelected`, { ids });
}

// DELETE => delete the attendance from the server
export async function deleteStoreHoliday(id) {
  return await axios.delete(`${APIBASE_URL}storeHolidays/${id}`);
}

// DELETE Attendances by ids
export async function deleteStoreHolidays(ids) {
  return await axios.post(`${APIBASE_URL}/storeHolidays/deleteSelected`, {
    ids,
  });
}

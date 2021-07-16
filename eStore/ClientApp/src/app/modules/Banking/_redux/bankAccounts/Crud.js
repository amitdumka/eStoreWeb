import axios from "axios";

//BankAccount
//bankAccount

export const API_URL = "https://www.aprajitaretails.in/api/bankAccounts";

export async function doLogin() {
  axios
    .post("https://www.aprajitaretails.in/api/login")
    .then((res) => {
      return res.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}

export async function verifyLogin() {
  axios
    .get("https://www.aprajitaretails.in/api/login")
    .then((res) => {
      const isLogin = res.data;
      if (!isLogin) return doLogin();
    })
    .catch(function(error) {
      console.log(error);
    });
}
// CREATE =>  POST: add a new bankAccount to the server
export async function createBankAccount(bankAccount) {
  return await axios.post(API_URL, bankAccount, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllBankAccounts() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getBankAccountById(bankAccountId) {
  return await axios.get(`${API_URL}/${bankAccountId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findBankAccounts(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllBanks() {
  return await axios.get("https://www.aprajitaretails.in/api/banks");
}

// UPDATE => PUT: update the bankAccount on the server
export async function updateBankAccount(bankAccount) {
  return await axios.put(
    `${API_URL}/${bankAccount.bankAccountId}`,
    JSON.stringify(bankAccount),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForBankAccounts(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForBankAccounts`, {
    ids,
    status,
  });
}

// DELETE => delete the bankAccount from the server
export async function deleteBankAccount(bankAccountId) {
  return await axios.delete(`${API_URL}/${bankAccountId}`);
}

// DELETE BankAccounts by ids
export async function deleteBankAccounts(ids) {
  return await axios.post(`${API_URL}/deleteBankAccounts`, { ids });
}

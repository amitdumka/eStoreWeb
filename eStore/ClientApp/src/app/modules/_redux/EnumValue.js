export function setEnumValue(state, actionName, entities) {
  switch (actionName) {
    case "payModes":
      state.payModes = entities;
      break;
    case "rentTypes":
      state.rentTypes = entities;
      break;
    case "accountType":
      state.accountType = entities;
      break;
    case "paymentMode":
      state.paymentMode = entities;
      break;
    case "attendanceUnits":
      state.attendanceUnits = entities;
      break;
    case "employeeType":
      state.employeeType = entities;
      break;
    case "ledgerEntryType":
      state.employeeType = entities;
      break;
    case "ledgerCategoryType":
      state.ledgerCategoryType = entities;
      break;
    case "taxType":
      state.taxType = entities;
      break;
    case "gender":
      state.gender= entities;
      break;
    case "connectionType":
      state.connectionType = entities;
      break;
    case "units":
      state.units = entities;
      break;
    case "sizes":
      state.sizes = entities;
      break;
    case "productCategory":
      state.productCategory = entities;
      break;
    case "entryStatus":
      state.entryStatus = entities;
      break;
    case "cardType":
      state.cardType = entities;
      break;
    case "cardMode":
      state.cardMode = entities;
      break;
    case "vPayMode":
      state.vPayMode = entities;
      break;
    case "salaryComponet":
      state.salaryComponet = entities;
      break;
    case "bankPayMode":
      state.bankPayMode = entities;
      break;
    case "voucherType":
      state.voucherType = entities;
      break;
    case "loginRole":
      state.loginRole = entities;
      break;
    case "arvindAccounts":
      state.arvindAccounts = entities;
      break;
    case "storeList":
      state.storeList = entities;
      break;
    default:
      return;
  }
}

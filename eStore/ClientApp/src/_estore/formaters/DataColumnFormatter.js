import React from "react";
import DateFormater from "../dates/DateFormater";
export function EnumColumnFormatter(value, row, rowIndex, { dataList, n }) {
  const enumval = dataList ? dataList[value].name : value;

  return (
    <>
      <span className={`label label-dot label-primary`}></span>
      &nbsp;
      <span className="font-bold font-primary text-success">{enumval}</span>
    </>
  );
}
export function StoreNameColumnFormatter(
  cellContent,
  row,
  rowIndex,
  storeList
) {
  const name = storeList ? storeList[row.storeId - 1].name : row.storeId;
  return (
    <>
      <span className="font-bold font-primary text-primary">{name}</span>
    </>
  );
}

export function DateColumnFormatter(value, row, index) {
  return DateFormater(value);
}

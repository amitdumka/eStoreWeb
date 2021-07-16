import React from "react";

export function CategoryColumnFormatter(cellContent, row,ledgerCategory) {
    return (
      <>
        
        &nbsp;
        <span className={`font-bold `}>
          {ledgerCategory[row.category].name}/{row.category}
        </span>
      </>
    );
  }
  
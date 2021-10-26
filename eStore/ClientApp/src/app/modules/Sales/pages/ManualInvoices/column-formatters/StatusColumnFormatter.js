// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";

const StatusCssClasses=["danger","success","primary","warning",""];

// export function StatusColumnFormatter(cellContent, row) {
//   const getLabelCssClasses = () => {
//     return `label label-lg label-light-${
//       StatusCssClasses[row.status]
//     } label-inline`;
//   };
//   return (
//     <span className={getLabelCssClasses()}>{StatusTitles[row.status]}</span>
//   );
// }


export function TagGeneratorColumnFormatter(cellContent, row) {
  const getLabelCssClasses = (ele) => {
    return ` font-weight-bold label label-lg label-light-${
      StatusCssClasses[ele]
    } label-inline ml-2`;
  };

  return (
    <> 
     
      {row && row.invoiceType === 0 &&  <span className={getLabelCssClasses(1)}>"Regular"</span>}
      {row && row.invoiceType === 1 &&  <span className={getLabelCssClasses(2)}>"Sales Return"</span>}
      {row && row.invoiceType === 2 &&  <span className={getLabelCssClasses(3)}>"Manual"</span>}
      {row && row.invoiceType === 3 &&  <span className={getLabelCssClasses(3)}>"Manual Sales Return"</span>}
    </>
  );
}

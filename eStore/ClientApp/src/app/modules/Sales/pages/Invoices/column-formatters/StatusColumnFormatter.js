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
      {row && row.isDue === true &&<span className={getLabelCssClasses(0)}> "Due"</span>}
      {row && row.isManualBill === true &&  <span className={getLabelCssClasses(1)}>"Manual Bill"</span>}
      {row && row.isTailoringBill === true &&  <span className={getLabelCssClasses(2)}>"Tailoring"</span>}
      {row && row.isSaleReturn === true &&  <span className={getLabelCssClasses(3)}>"Sales Return"</span>}
    </>
  );
}

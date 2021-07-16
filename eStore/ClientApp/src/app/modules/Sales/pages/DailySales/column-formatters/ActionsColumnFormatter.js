// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers"  ; //"../../../../../_metronic/_helpers";

//dailySale

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditDialog, openDeleteDialog, openPaymentDialog, keyFieldValue }
) {
  keyFieldValue =
    keyFieldValue && keyFieldValue ? keyFieldValue : row.dailySaleId;
   const payMode= row.payMode;  
  return (
    <>
      <a
        title="Edit "
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditDialog(keyFieldValue)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
      <> </>

      <a
        title="Delete "
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeleteDialog(keyFieldValue)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
        </span>
      </a>
      <> </>
    {payMode!=0 &&
      <a
        title="Payment "
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openPaymentDialog({keyFieldValue,payMode})}
      >
        <span className="svg-icon svg-icon-md svg-icon-success">
          <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Money.svg")} />
        </span>
      </a>
      }
    </>
  );
}

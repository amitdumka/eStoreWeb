import React, { useState } from 'react'
import { Button, Select, MenuItem } from '@material-ui/core'
import * as XLSX from 'xlsx'
import axios from 'axios'
import { useSubheader } from '../../../_metronic/layout'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop'

export default function StockVerify() {
  const suhbeader = useSubheader()
  suhbeader.setTitle('Stock Verification')
  return (
    <div>
      <ReadExcelFile />
    </div>
  )
}

export function ReadExcelFile() {
  const [sheetName, setSheetName] = useState('')
  const [file, setFile] = useState()
  const [stockData, setStock] = useState([])
  const [col, setCol] = useState([])

  const handleSheetName = (e) => {
    setSheetName(e.target.value)
  }
  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files && files[0]) setFile(files[0])
  }
  const handleClick = (e) => {
    if (file != null && file != '') {
      console.log(sheetName)
      console.log(file)

      processExcelFile()
    } else {
      alert('Please select a file')
    }
  }
//   const readExcelFile = (uMode) => {
//     const reader = new FileReader()
//     const rABS = !!reader.readAsBinaryString

//     reader.onload = (e) => {
//       //console.log(startRow);
//       /* Parse data */
//       const bstr = e.target.result
//       const wb = XLSX.read(bstr, {
//         type: rABS ? 'binary' : 'array',
//         cellDates: true,
//         bookVBA: true,
//       })

//       const ws_Manual = wb.Sheets['Manual']
//       const ws_System = wb.Sheets['System']
//       const ws_Current = wb.Sheets['Current']

//       /* Convert array of arrays */

//       const dataSystem = XLSX.utils.sheet_to_json(ws_System, {
//         blankRows: false,
//         dateNF: 'yyyy-MM-ddThh:mm:ss.000Z"',
//       })
//       const dataCurrent = XLSX.utils.sheet_to_json(ws_Current, {
//         blankRows: false,
//         dateNF: 'yyyy-MM-ddThh:mm:ss.000Z"',
//       })
//       const dataManual = XLSX.utils.sheet_to_json(ws_Manual, {
//         blankRows: false,
//         dateNF: 'yyyy-MM-ddThh:mm:ss.000Z"',
//       })

//       let Stocks = []
//       let count = 0

//       if (dataSystem != null) {
//         dataSystem.map((item) => {
//           count = count + 1
//           let nStock = {
//             id: count,
//             barcode: item.BarCode,
//             qty: item.Quantity,
//             soldQty: 0,
//             currentQty: item.CurrentStock ? parseInt(item.CurrentStock) : 0,
//           }
//           Stocks.push(nStock)
//         })
//       }

//       if (dataCurrent != null) {
//         dataCurrent.map((item) => {
//           var stock = Stocks.find((stock) => stock.barcode == item.BarCode)

//           if (stock != null) {
//             let qty = parseInt(stock.currentQty) + 1
//             stock.currentQty = qty
//           } else {
//             count = count + 1
//             let stock = {
//               id: count,
//               barcode: item.BarCode,
//               qty: 0,
//               soldQty: 0,
//               currentQty: 1,
//             }
//             Stocks.push(stock)
//           }
//         })
//       }

//       if (dataManual != null) {
//         let found = 0
//         let notFound = 0
//         dataManual.map((item) => {
//           var stock = Stocks.find((stock) => stock.barcode == item.BarCode)
//           if (stock != null) {
//             let qty = parseInt(stock.soldQty) + parseInt(item.Qty)
//             stock.soldQty = qty
//             // Stocks.push(stock)
//             found = found + 1
//           } else {
//             // console.log(item.BarCode + ' is not found')
//             notFound = notFound + 1
//           }
//         })

//         console.log('Found:  ' + found + '\t Not Found:  ' + notFound)
//       }
//       console.log(Stocks)
//       setStock(Stocks)
//     }

//     if (rABS) {
//       reader.readAsBinaryString(file)
//     } else {
//       reader.readAsArrayBuffer(file)
//     }
//   }

  const processExcelFile = () => {
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString

    reader.onload = (e) => {
      //console.log(startRow);
      /* Parse data */
      const bstr = e.target.result
      const wb = XLSX.read(bstr, {
        type: rABS ? 'binary' : 'array',
        cellDates: true,
        bookVBA: true,
      })

      const ws_StockInHand = wb.Sheets['StockInHand']
      const ws_StockOutOfSystem = wb.Sheets['StockOff']
      const ws_ManualSale = wb.Sheets['ManualSale']

      /* Convert array of arrays */

      const stockInHand = XLSX.utils.sheet_to_json(ws_StockInHand, {
        blankRows: false,
        dateNF: 'yyyy-MM-ddThh:mm:ss.000Z"',
      })
      const stockOutOfSystem = XLSX.utils.sheet_to_json(ws_StockOutOfSystem, {
        blankRows: false,
        dateNF: 'yyyy-MM-ddThh:mm:ss.000Z"',
      })
      const manualSale = XLSX.utils.sheet_to_json(ws_ManualSale, {
        blankRows: false,
        dateNF: 'yyyy-MM-ddThh:mm:ss.000Z"',
      })

      let Stocks = []
      let count = 0
      console.log(stockOutOfSystem);
      if (stockInHand != null) {
        stockInHand.map((item) => {
          //Brand Name	Product Name	Item Description	BarCode	Current Stock	Quantity	Cost	MRP
          count = count + 1
          let nStock = {
            id: count,
            barcode: item.BarCode,
            product:item.ProductName,
            brand: item.BrandName,
            item: item.Item,
            qty: item.Quantity,
            soldQty: 0,
            cost: item.Cost,
            mrp: item.MRP,
            currentQty: item.CurrentStock ? parseInt(item.CurrentStock) : 0,
          }
          Stocks.push(nStock)
        })
      }
      if (stockOutOfSystem != null) {
        stockOutOfSystem.map((item) => {
          var stock = Stocks.find((stock) => stock.barcode == item.Barcode)
          if (stock != null) {
            let qty = parseInt(stock.currentQty) + 1
            stock.currentQty = qty
          } else {
            count = count + 1
            let nStock = {
              id: count,
              barcode: item.Barcode,
              product: "Off System",
              brand: 'NA',
              item: 'NA',
              qty: 0,
              soldQty: 0,
              cost: 0,
              mrp: 0,
              currentQty: 1,
            }
            Stocks.push(nStock)
          }
        })
      }
      if (manualSale != null) {
        let found = 0
        let notFound = 0
        manualSale.map((item) => {
          var stock = Stocks.find((stock) => stock.barcode == item.BarCode)
          if (stock != null) {
            let qty = parseInt(stock.soldQty) + parseInt(item.Qty)
            stock.soldQty = qty
            // Stocks.push(stock)
            found = found + 1
          } else {
            // console.log(item.BarCode + ' is not found')
            notFound = notFound + 1
          }
        })

        console.log('Found:  ' + found + '\t Not Found:  ' + notFound)
      }
      console.log(Stocks);
      setStock(Stocks)
    }
    if (rABS) {
      reader.readAsBinaryString(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  }

  const ShowData = () => {
    const columns = [
      { field: 'id', headerName: 'ID', width: 90, identity: true },
      { field: 'barcode', headerName: 'Barcode', minWidth: 180 },
      { field: 'brand', headerName: 'Brand', minWidth: 160 },
      { field: 'product', headerName: 'Name', minWidth: 180 },
      { field: 'item', headerName: 'Desc', minWidth: 180 },
      { field: 'qty', headerName: 'Stock', minWidth: 110 },
      { field: 'soldQty', headerName: 'Sold', minWidth: 110 },
      { field: 'currentQty', headerName: 'Current', minWidth: 110 },
      {
        field: 'diffQty',
        headerName: 'Diff Qty',
        minWidth: 160,
        renderCell: (params) => {
          return (
            <div className="rowItem text-center text-danger">
              {parseInt(params.row.soldQty) +
                parseInt(params.row.currentQty) -
                parseInt(params.row.qty)}
            </div>
          )
        },
      },
    ]
    return (
      <div>
        <div style={{ height: 800, width: '100%' }}>
          <DataGrid
            rowHeight={76}
            rows={stockData && stockData}
            columns={columns}
            pageSize={15}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="h2 text-primary">Read Stock Files</div>
      <div className="h5 text-info">
        Select File{' '}
        <input type="file" accept={SheetJSFT} onChange={handleFileSelect} />
      </div>
      <div className="h5">
        Sheet name{' '}
        <input type="text" id="sheetName" onChange={handleSheetName} />
        <Button className="btn btn-primary" onClick={handleClick}>
          Upload
        </Button>
      </div>

      <div className="border rounded border-primary">
        <h2 className="text-danger align-center text-center">Data</h2>
        {stockData && <ShowData />}
      </div>
    </>
  )
}

const SheetJSFT = [
  'xlsx',
  'xlsb',
  'xlsm',
  'xls',
  'xml',
  'csv',
  'txt',
  'ods',
  'fods',
  'uos',
  'sylk',
  'dif',
  'dbf',
  'prn',
  'qpw',
  '123',
  'wb*',
  'wq*',
  'html',
  'htm',
]
  .map(function (x) {
    return '.' + x
  })
  .join(',')
/* generate an array of column objects */
export const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
  return o
}

import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { MyDocument }from './MyDocument';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

function Viewer() {
   // ReactPDF.renderToStream(<MyDocument />);
  //  ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);

    return (
        <>
          <PDFViewer>
                <MyDocument />
          </PDFViewer>  
        </>
    )
}

export default Viewer

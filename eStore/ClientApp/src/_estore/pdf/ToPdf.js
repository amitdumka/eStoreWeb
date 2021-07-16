import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  ReactPDF,
} from "@react-pdf/renderer";
// Site: https://react-pdf.org/styling
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  textHeader: {
    color: "red",
    textAlign: "center",
    margin: 30,
  },
  textSubHeader: {
    color: "blue",
    textAlign: "center",
    margin: 30,
  },
});

// Create Document Component
const PdfDocument = ({ Header, Footer, Content, title, orientation }) => {
  orientation = orientation ? orientation : "portrait"; //landscape

  return (
    <Document
      title={title}
      author="eStore:WebApp"
      creator="eStore:WebApp"
      language="eng"
    >
      <Page size="A4" style={styles.page} orientation={orientation} wrap={true}>
        <View style={styles.section}>
          <Text styles={styles.textHeader}>Aprajita Retails</Text>
          <Text styles={styles.textSubHeader}>Bhagalpur Road, Dumka</Text>
          <Header />
        </View>
        <View style={styles.section}>
          <Content />
        </View>
        <View style={styles.section}>
          <Footer />
        </View>
      </Page>
    </Document>
  );
};

const SavePDf = ({ Document, dirName, fileName }) => {
  fileName = fileName
    ? fileName
    : "report_" + new Date().getMilliseconds() + ".pdf";
  return ReactPDF.render(<Document />, `${dirName}/${fileName}`);
};
const ToStream = ({ Document }) => {
  return ReactPDF.renderToStream(<Document />);
};

const OnScreen = ({ Document }) => {
  return (
    <PDFViewer>
      <Document />
    </PDFViewer>
  );
};

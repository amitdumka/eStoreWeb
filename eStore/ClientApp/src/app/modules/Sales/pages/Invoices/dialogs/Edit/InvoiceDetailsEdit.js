import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { data } from './data';
//import { SampleBase } from '../common/sample-base';
import * as ReactDOM from 'react-dom';
import { DialogEditEventArgs } from '@syncfusion/ej2-react-grids';
import { data as orderData } from './data';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataUtil } from '@syncfusion/ej2-data';
import { Browser, extend } from '@syncfusion/ej2-base';
import './dialog-temp.css';
export class DialogEdit extends SampleBase {
    constructor() {
        super(...arguments);
        this.toolbarOptions = ['Add', 'Edit', 'Delete'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.editparams = { params: { popupHeight: '300px' } };
        this.validationRules = { required: true };
        this.orderidRules = { required: true, number: true };
        this.pageSettings = { pageCount: 5 };
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={data} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRules}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' editType='numericedit'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' editType='datepickeredit' format='yMd' width='170'></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams}></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]}/>
          </GridComponent>
        </div>
      </div>);
    }
}
export class SampleBase extends React.PureComponent {
  rendereComplete() {
      /**custom render complete function */
  }
  componentDidMount() {
      setTimeout(() => {
      this.rendereComplete();
  });
    }
  }
//import * as React from 'react';
//import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Edit, Inject } from '@syncfusion/ej2-react-grids';
//import { SampleBase } from '../common/sample-base';
//import { data as orderData } from './data';
//import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
//import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
//import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
//import { DataUtil } from '@syncfusion/ej2-data';
//import { Browser, extend } from '@syncfusion/ej2-base';
//import './dialog-temp.css';
export class DialogTemplate extends SampleBase {
    constructor() {
        super(...arguments);
        this.toolbarOptions = ['Add', 'Edit', 'Delete'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: this.dialogTemplate };
        this.validationRules = { required: true };
        this.orderidRules = { required: true, number: true };
        this.pageSettings = { pageCount: 5 };
    }
    dialogTemplate(props) {
        return (<DialogFormTemplate {...props}/>);
    }
    actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            if (Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                args.dialog.dataBind();
            }
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={orderData} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings} actionComplete={this.actionComplete.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRules}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' format='yMd' width='170'></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]}/>
          </GridComponent>

        </div>
      </div>);
    }
}
export class DialogFormTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.shipCityDistinctData = DataUtil.distinct(orderData, 'ShipCity', true);
        this.shipCountryDistinctData = DataUtil.distinct(orderData, 'ShipCountry', true);
        this.state = extend({}, {}, props, true);
    }
    onChange(args) {
        let key = args.target.name;
        let value = args.target.value;
        this.setState({ [key]: value });
    }
    componentDidMount() {
        let state = this.state;
        // Set initail Focus
        state.isAdd ? this.orderID.focus() : this.customerName.focus();
    }
    render() {
        let data = this.state;
        return (<div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <div className="e-float-input e-control-wrapper">
                        <input ref={input => this.orderID = input} id="OrderID" name="OrderID" type="text" disabled={!data.isAdd} value={data.OrderID} onChange={this.onChange.bind(this)}/>
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top"> Order ID</label>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <div className="e-float-input e-control-wrapper">
                        <input ref={input => this.customerName = input} value={data.CustomerName} id="CustomerName" name="CustomerName" type="text" onChange={this.onChange.bind(this)}/>
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top">Customer Name</label>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent id="Freight" format='C2' value={data.Freight} placeholder="Freight" floatLabelType='Always'></NumericTextBoxComponent>
                </div>
                <div className="form-group col-md-6">
                    <DatePickerComponent id="OrderDate" value={data.OrderDate} placeholder="Order Date" floatLabelType='Always'></DatePickerComponent>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <DropDownListComponent id="ShipCountry" value={data.ShipCountry} dataSource={this.shipCountryDistinctData} fields={{ text: 'ShipCountry', value: 'ShipCountry' }} placeholder="Ship Country" popupHeight='300px' floatLabelType='Always'></DropDownListComponent>
                </div>
                <div className="form-group col-md-6">
                    <DropDownListComponent id="ShipCity" value={data.ShipCity} dataSource={this.shipCityDistinctData} fields={{ text: 'ShipCity', value: 'ShipCity' }} placeholder="Ship City" popupHeight='300px' floatLabelType='Always'></DropDownListComponent>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <div className="e-float-input e-control-wrapper">
                        <textarea id="ShipAddress" name="ShipAddress" value={data.ShipAddress} onChange={this.onChange.bind(this)}></textarea>
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top">Ship Address</label>
                    </div>
                </div>
            </div>
        </div>);
    }
}
export class DialogTemplate2 extends SampleBase {
    constructor() {
        super(...arguments);
        this.toolbarOptions = ['Add', 'Edit', 'Delete'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: this.dialogTemplate };
        this.validationRules = { required: true };
        this.orderidRules = { required: true, number: true };
        this.pageSettings = { pageCount: 5 };
    }
    dialogTemplate(props) {
        return (<DialogFormTemplate {...props}/>);
    }
    actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            if (Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                args.dialog.dataBind();
            }
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={orderData} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings} actionComplete={this.actionComplete.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRules}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' format='yMd' width='170'></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]}/>
          </GridComponent>

        </div>
      </div>);
    }
}
export class DialogFormTemplate2 extends React.Component {
    constructor(props) {
        super(props);
        this.shipCityDistinctData = DataUtil.distinct(orderData, 'ShipCity', true);
        this.shipCountryDistinctData = DataUtil.distinct(orderData, 'ShipCountry', true);
        this.state = extend({}, {}, props, true);
    }
    onChange(args) {
        let key = args.target.name;
        let value = args.target.value;
        this.setState({ [key]: value });
    }
    componentDidMount() {
        let state = this.state;
        // Set initail Focus
        state.isAdd ? this.orderID.focus() : this.customerName.focus();
    }
    render() {
        let data = this.state;
        return (<div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <div className="e-float-input e-control-wrapper">
                        <input ref={input => this.orderID = input} id="OrderID" name="OrderID" type="text" disabled={!data.isAdd} value={data.OrderID} onChange={this.onChange.bind(this)}/>
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top"> Order ID</label>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <div className="e-float-input e-control-wrapper">
                        <input ref={input => this.customerName = input} value={data.CustomerName} id="CustomerName" name="CustomerName" type="text" onChange={this.onChange.bind(this)}/>
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top">Customer Name</label>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent id="Freight" format='C2' value={data.Freight} placeholder="Freight" floatLabelType='Always'></NumericTextBoxComponent>
                </div>
                <div className="form-group col-md-6">
                    <DatePickerComponent id="OrderDate" value={data.OrderDate} placeholder="Order Date" floatLabelType='Always'></DatePickerComponent>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <DropDownListComponent id="ShipCountry" value={data.ShipCountry} dataSource={this.shipCountryDistinctData} fields={{ text: 'ShipCountry', value: 'ShipCountry' }} placeholder="Ship Country" popupHeight='300px' floatLabelType='Always'></DropDownListComponent>
                </div>
                <div className="form-group col-md-6">
                    <DropDownListComponent id="ShipCity" value={data.ShipCity} dataSource={this.shipCityDistinctData} fields={{ text: 'ShipCity', value: 'ShipCity' }} placeholder="Ship City" popupHeight='300px' floatLabelType='Always'></DropDownListComponent>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <div className="e-float-input e-control-wrapper">
                        <textarea id="ShipAddress" name="ShipAddress" value={data.ShipAddress} onChange={this.onChange.bind(this)}></textarea>
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top">Ship Address</label>
                    </div>
                </div>
            </div>
        </div>);
    }
}

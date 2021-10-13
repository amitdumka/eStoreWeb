import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';
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
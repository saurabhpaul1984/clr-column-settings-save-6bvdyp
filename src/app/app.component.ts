import { Component, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ClrDatagridColumn, ClrDatagridFilterInterface, ClrDatagridStateInterface } from '@clr/angular';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnToggleSettingsModel } from './column-toggle-settings/column-toggle-settings-model';

@Component({
  selector: 'my-app',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChildren(ClrDatagridColumn) columns: QueryList<ClrDatagridColumn>;
  rows = [];
  columnToggleSettingsModel = new ColumnToggleSettingsModel();

  constructor() {

  }

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.rows.push({ a: 'data' });
    }

    this.columnToggleSettingsModel.setDefaultTemplate({
      name: 'Default',
      selectedColumns: ['col1', 'col2', 'col3'],
      gridId: null
    });

    this.columnToggleSettingsModel.setColumnTemplates([{
      name: 'Template 1',
      selectedColumns: ['col1', 'col5', 'col6'],
      gridId: null
    }, {
      name: 'Template 2',
      selectedColumns: ['col2', 'col4', 'col6'],
      gridId: null
    }]);
  }

  onSubmit() {
  }

  isColumnHidden(name: string) {
    return this.columnToggleSettingsModel.selectedTemplate.selectedColumns.every(r => r != name);
  }

  deleteTemplate() {
    let templates = this.columnToggleSettingsModel.getColumnTemplates();
    const indexOfItem = templates.findIndex(r => r.name === this.columnToggleSettingsModel.selectedTemplate.name);
    templates.splice(indexOfItem, 1);
    this.columnToggleSettingsModel.setColumnTemplates(templates);
  }

  saveTemplate() {
    let templates = this.columnToggleSettingsModel.getColumnTemplates();
    let templateToCreate = {
      gridId: null,
      name: this.columnToggleSettingsModel.newTemplateName,
      selectedColumns: this.columns.filter(column => !column.hidden).map(r => r.field)
    };
    templates.push(templateToCreate);

    this.columnToggleSettingsModel.setColumnTemplates(templates);
    this.columnToggleSettingsModel.saveNewTemplate = false;
    this.columnToggleSettingsModel.newTemplateName = '';
    this.columnToggleSettingsModel.selectedTemplate = templateToCreate;
  }
}

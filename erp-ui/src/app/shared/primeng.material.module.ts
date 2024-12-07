import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { BadgeModule } from 'primeng/badge';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    imports: [
        CommonModule,
        ConfirmDialogModule,
        
    ],
    exports: [
        CardModule,
        CheckboxModule,
        DropdownModule,
        PaginatorModule,
        SelectButtonModule,
        CalendarModule,
        TableModule,
        ButtonModule,
        FileUploadModule,
        DialogModule,
        ProgressBarModule,
        ToastModule,
        StepsModule,
        TabMenuModule,
        ChipsModule,
        AutoCompleteModule,
        InputTextModule,
        RadioButtonModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextareaModule,
        MultiSelectModule,
        ToggleButtonModule,
        ReactiveFormsModule,
        ChartModule,
        TabViewModule,
        PanelMenuModule,
        OrganizationChartModule,
        BadgeModule,
        TieredMenuModule,
        ScrollPanelModule,
        KeyFilterModule,
        InputNumberModule,
        FieldsetModule,
        // ConfirmDialogModule
        // BrowserAnimationsModule,
        // BrowserModule
        // NoopAnimationsModule
        
    ],
    declarations: [  ],
    providers: [
        MessageService,
        ConfirmationService
    ]
  })
  export class PrimengMaterialUiModule { }
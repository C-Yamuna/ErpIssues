import { Component, ViewChild } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SbFormType } from './shared/sb-form-type.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SbFormTypeService } from './shared/sb-form-type.service';
import { SavingsBankConfigConstants } from '../sb-config-constants';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-sb-form-type',
  templateUrl: './sb-form-type.component.html',
  styleUrls: ['./sb-form-type.component.css']
})
export class SbFormTypeComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  sbFormTypeModel: SbFormType = new SbFormType();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId:any;
  @ViewChild('dt', { static: false })
  datatable!: Table;
  constructor(private router: Router, private sbFormTypeService: SbFormTypeService,
    private encryptDecryptService: EncryptDecryptService,
  ) {
    this.columns = [
      { field: 'name', header: 'DEMANDDEPOSITS.NAME' },
      { field: 'pacsCode', header: 'DEMANDDEPOSITS.PACS_CODE' },
      { field: 'templatepath', header: 'DEMANDDEPOSITS.TEMPLATE_PATH' },
      { field: 'description', header: 'DEMANDDEPOSITS.DESCRIPTION' },
      { field: 'statusName', header: 'DEMANDDEPOSITS.STATUS' },
    ];
  }
    ngOnInit(): void {
      this.getAll();
    }
    addsbformtypes() {
      this.router.navigate([SavingsBankConfigConstants.ADD_FORM_TYPE]);
    }
    getAll() {
      this.sbFormTypeService.getAllSbFormType().subscribe((data: any) => {
        this.responseModel = data;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.gridListData = this.responseModel.data;
        } else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        }
      });
    }
  
    editformtypes(rowData: any) {
      this.router.navigate([SavingsBankConfigConstants.ADD_FORM_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
  
    deleteData(rowData: any) {
      this.displayDialog = true;
      this.deleteId = rowData.id;
    }
  
    submit() {
      // this.commonComponent.startSpinner();
      this.sbFormTypeService.deleteSbFormType(this.deleteId).subscribe(response => {
        this.responseModel = response;
        this.msgs = [];
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          // this.commonComponent.stopSpinner();
          this.displayDialog = false;
          this.msgs = [];
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.getAll();
          }, 2000);
        } else {
          this.displayDialog = false;
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        // this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
    }
    cancel() {
      this.displayDialog = false;
    }
}

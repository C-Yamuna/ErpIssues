import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { BorrowingConfigConstants } from '../../borrowing-config/borrowing-config-constants';
import { DailyDepositConfigConstants } from '../daily-deposit-config-constants';
import { DocumentTypes } from './shared/document-types.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { DocumentTypesService } from './shared/document-types.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  DocumentTypeModel: DocumentTypes = new DocumentTypes();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId: any;
  constructor(private router: Router, 
    private commonComponent: CommonComponent,
    private documentTypeService: DocumentTypesService,
    private encryptDecryptService: EncryptDecryptService,
  ) {
    this.columns = [
      { field: 'name', header: 'DAILYDEPOSITSCONFIG.NAME' },
      { field: 'description', header: 'DAILYDEPOSITSCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'DAILYDEPOSITSCONFIG.STATUS' },
    ];
  }
  ngOnInit(): void {
    this.getAll();
  }
  addkycdoctype() {
    this.router.navigate([DailyDepositConfigConstants.ADD_DOCUMENT_TYPE]);
  }
  getAll() {
    // this.commonComponent.startSpinner();
    this.documentTypeService.getAllDocumentType().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        // this.commonComponent.stopSpinner();
      } else {
        // this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      // this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

  editkycdoctype(rowData: any) {
    this.router.navigate([DailyDepositConfigConstants.ADD_DOCUMENT_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  submit() {
    // this.commonComponent.startSpinner();
    this.documentTypeService.deleteDocumentType(this.deleteId).subscribe(response => {
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

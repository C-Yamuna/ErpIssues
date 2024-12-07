import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { KycDocumentTypes } from './shared/kyc-document-types.model';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { KycDocumentTypesService } from './shared/kyc-document-types.service';
import { CommonConfigConstants } from '../common-config-constants';

@Component({
  selector: 'app-kyc-document-types',
  templateUrl: './kyc-document-types.component.html',
  styleUrls: ['./kyc-document-types.component.css']
})
export class KycDocumentTypesComponent {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[]=[];
  kycDcoumentTypeModel: KycDocumentTypes = new KycDocumentTypes();
  displayDialog: boolean = false;
  deleteId: any;

  constructor(private router: Router, 
    private encryptDecryptService :EncryptDecryptService,
    private commonComponent: CommonComponent,
    private kycDocumentTypeService:KycDocumentTypesService){ }

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'ERP.NAME' },
      { field: 'description', header: 'ERP.DESCRIPTION' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];
    this.getAll();
  }


  getAll(){
    this.commonComponent.startSpinner();
    this.kycDocumentTypeService.getAllKycDocumentType().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }
  addData(){
    this.router.navigate([CommonConfigConstants.ADD_KYC_DOCUMENT_TYPE]);
  }

  editData(rowData: any) {
    this.router.navigate([CommonConfigConstants.ADD_KYC_DOCUMENT_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteKycDocument(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  delete() {
    this.commonComponent.startSpinner();
    this.kycDocumentTypeService.deleteKycDocumentType(this.deleteId).subscribe(response => {
      this.responseModel = response;
      this.msgs = [];
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.displayDialog = false;
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getAll();
        }, 2000);
      } else {
        this.displayDialog = false;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.commonComponent.stopSpinner();
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

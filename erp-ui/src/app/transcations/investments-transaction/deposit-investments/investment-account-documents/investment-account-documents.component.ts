import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { InvestmentApplicationDetailsService } from '../investments-application-details/shared/investment-application-details.service';
import { InvestmentApplicationDetails } from '../investments-application-details/shared/investment-application-details.model';
import { InvestmentAccountDocuments } from './shared/investment-account-documents.model';
import { InvestmentAccountDocumentsService } from './shared/investment-account-documents.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FileUpload } from 'primeng/fileupload';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { DocumentTypesService } from 'src/app/configurations/investments-config/document-types/shared/document-types.service';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';


@Component({
  selector: 'app-investment-account-documents',
  templateUrl: './investment-account-documents.component.html',
  styleUrls: ['./investment-account-documents.component.css']
})
export class InvestmentAccountDocumentsComponent implements OnInit {
  @ViewChild('dt', { static: false })
  private dt!: Table;

  investmentApplicationDetailsModel: InvestmentApplicationDetails = new InvestmentApplicationDetails();
  investmentAccountDocumentsModel: InvestmentAccountDocuments = new InvestmentAccountDocuments();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: boolean = false;
  investmentAccountDocumentsForm: FormGroup;
  buttonDisabled: boolean = false;
  investmentAccountDocumentsList: any[] = [];
  termAccId: any;
  orgnizationSetting: any;
  documentTypeList: any[] = [];
  isFileUploaded: boolean = false;
  multipleFilesList: any[] = [];
  uploadFileData: any;
  statusList: any[] = [];
  editButtonDisable: boolean = applicationConstants.FALSE;
  addButton: boolean = applicationConstants.FALSE;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;

  showAddButton: boolean = false;
  addDocumentOfKycFalg: boolean = false;
  editDocumentOfKycFalg: boolean = false;
  veiwCardHide: boolean = false;
  landFlag: boolean = false;
  buttonsFlag: boolean = true;
  editIndex: any;
  fileName: any;
  displayPosition: boolean = false;
  uploadFlag: boolean = true;
  submitFlag: boolean = false;
  displayDialog: boolean = false;
  deleteId: any;
  filesDTOList: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private fileUploadService: FileUploadService,
    private documentTypeService: DocumentTypesService,
    private investmentApplicationDetailsService: InvestmentApplicationDetailsService,
    private investmentAccountDocumentsService: InvestmentAccountDocumentsService) {

    this.investmentAccountDocumentsForm = this.formBuilder.group({
      'requiredDocTypeName': new FormControl(''),
      'requiredDocNumber': new FormControl(''),
      'requiredDocPath': new FormControl(''),
      'nameAsPerDocument': new FormControl('')
      // 'statusName': new FormControl(''),
    });

  }
  ngOnInit(): void {
    this.statusList = this.commonComponent.status();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        this.termAccId = Number(this.encryptDecryptService.decrypt(params['id']));
        this.isEdit = true;
        this.getInvestmentApplicationDetailsById(this.termAccId);
        // this.getAllByTermAccountId(this.termAccId);
      } else {
        this.isEdit = false;
      }
    })
    this.investmentAccountDocumentsForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.investmentAccountDocumentsForm.valid) {
        this.save();
      }
    });
    this.getAllDocumentType();
    this.save();
  }
  updateData() {
    if (this.investmentAccountDocumentsList != null && this.investmentAccountDocumentsList != undefined &&
      this.investmentAccountDocumentsList.length > 0 && this.buttonsFlag) {
      this.landFlag = true;
    }
    this.investmentAccountDocumentsModel.termAccId = this.termAccId;
    this.investmentApplicationDetailsService.changeData({
      formValid: this.investmentAccountDocumentsForm.valid ? true : false,
      data: this.investmentAccountDocumentsModel,
      stepperIndex: 1,
      isDisable: !this.landFlag ? true : false,
    });
  }
  save() {
    this.updateData();
  }

  //get investment application details by  term account id @bhargavi
  getInvestmentApplicationDetailsById(termAccId: any) {
    this.isEdit = true;
    this.investmentApplicationDetailsService.getInvestmentApplicationDetailsById(termAccId).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.showAddButton = false;
        this.investmentApplicationDetailsModel = this.responseModel.data[0];
        if (this.investmentApplicationDetailsModel && this.investmentApplicationDetailsModel.investmentAccountDocumentsDTO != null && this.investmentApplicationDetailsModel.investmentAccountDocumentsDTO != undefined &&
          this.investmentApplicationDetailsModel.investmentAccountDocumentsDTO.length > 0) {
          this.investmentAccountDocumentsList = this.investmentApplicationDetailsModel.investmentAccountDocumentsDTO;
          this.investmentAccountDocumentsList = this.investmentAccountDocumentsList.filter(obj => null != obj && null != obj.status && obj.status === applicationConstants.ACTIVE).map((document: any) => {
            document.multipleFilesList = this.fileUploadService.getFile(document.requiredDocPath, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + document.requiredDocPath);
            this.showAddButton = true;
            return document;
          });
          if (0 == this.investmentAccountDocumentsList.length) {
            this.investmentAccountDocumentsModel = new InvestmentAccountDocuments()
            this.addDocumentOfKycFalg = true;
            this.buttonDisabled = true;
            this.buttonsFlag = false;
            this.landFlag = false;
          }
        }
        else {
          this.showAddButton = false;
          this.addDocumentOfKycFalg = true;
          this.buttonDisabled = true;
        }

      } else {
        this.commonComponent.stopSpinner();
        // this.buttonDisabled = applicationConstants.FALSE;
        this.showAddButton = false;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
      this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  //get all account document details by term account id
  getAllByTermAccountId(termAccId: any) {
    this.investmentAccountDocumentsService.getAllByTermAccountId(termAccId).subscribe((res: Responsemodel) => {
      this.responseModel = res;
      this.commonComponent.stopSpinner(); 
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
          this.investmentAccountDocumentsModel = this.responseModel.data[0];
          if (this.investmentAccountDocumentsModel.requiredDocPath != null && this.investmentAccountDocumentsModel.requiredDocPath != undefined) {
            this.investmentAccountDocumentsModel.multipleFilesList = this.fileUploadService.getFile(this.investmentAccountDocumentsModel.requiredDocPath, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.investmentAccountDocumentsModel.requiredDocPath);
          }
        }
      } else {
        this.commonComponent.stopSpinner();
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }

  getAllDocumentType() {
    // this.commonComponent.startSpinner();
    this.documentTypeService.getAllDocumentType().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.documentTypeList = this.responseModel.data;
        this.documentTypeList = this.documentTypeList.filter((documentType: any) => documentType != null).map((document: { name: any; id: any; }) => {
          return { label: document.name, value: document.id };
        });
      } else {
        // this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      //this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

  saveAccountDocuments(row: any) {
    if (this.investmentAccountDocumentsModel.status == null && this.investmentAccountDocumentsModel.status == undefined)
      this.investmentAccountDocumentsModel.status = applicationConstants.ACTIVE;
    // this.investmentAccountDocumentsModel = row;
    this.investmentAccountDocumentsModel.termAccId = this.termAccId;
    this.investmentAccountDocumentsService.addInvestmentAccountDocuments(row).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.buttonsFlag = true;
        this.landFlag = true;;
        this.updateData();
        this.investmentAccountDocumentsModel = this.responseModel.data[0];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1200);
      } else {
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
      this.addButton = false;
      this.buttonDisabled = false;
      this.getInvestmentApplicationDetailsById(this.termAccId);
      this.updateData();

    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
    this.addDocumentOfKycFalg = false;
    this.editButtonDisable = false;
    this.updateData();
  }

  editSaveAccountDocuments(row: any) {
      if(this.investmentAccountDocumentsModel.status == null && this.investmentAccountDocumentsModel.status == undefined)
      this.investmentAccountDocumentsModel.status = applicationConstants.ACTIVE;
      this.editDocumentOfKycFalg = true;
      this.buttonDisabled = false;
      this.editButtonDisable  = false;
    this.investmentAccountDocumentsService.updateInvestmentAccountDocuments(row).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.editButtonDisable  = false;
        this.buttonsFlag = true;
        this.landFlag = true;
        this.updateData();
        this.investmentAccountDocumentsModel = this.responseModel.data;
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1200);
      }
      else {
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
      this.addButton = false;
      this.buttonDisabled = false;
      this.getInvestmentApplicationDetailsById(this.termAccId);
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  addAccountDocuments(event: any) {
    // this.getAllDocumnetsTypes();
    this.multipleFilesList = [];
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = true;
    this.buttonsFlag = false;
    this.landFlag = false;
    this.updateData();
    this.editButtonDisable = true;
    this.investmentAccountDocumentsModel = new InvestmentAccountDocuments();
  }

  toggleEditForm(index: number, modelData: any): void {
    if (this.editIndex === index) {
      this.editIndex = index;
    } else {
      this.editIndex = index;
    }
    this.editButtonDisable = true;
    this.buttonDisabled = true;
    this.buttonsFlag = false;
    this.landFlag = false;
    this.updateData();
    this.veiwCardHide = false;
    this.editDocumentOfKycFalg = false;
    this.addDocumentOfKycFalg = false;
    this.getAllByTermAccountId(modelData.termAccId);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
    }
  }
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
    }
  }
  cancel() {
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.buttonsFlag = true;
    this.landFlag = true;
    this.updateData();
    this.getInvestmentApplicationDetailsById(this.termAccId);
  }
  editCancel() {
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.buttonsFlag  = true;
    this.landFlag =true;
    this.updateData();
    this.getInvestmentApplicationDetailsById(this.termAccId);
  }
  backToAccountDocuments() {
    this.displayPosition = false;
    this.uploadFlag = false;
    this.submitFlag = false;
    this.updateData();
  }
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.investmentAccountDocumentsModel.multipleFilesList = [];
    this.multipleFilesList = [];
    this.investmentAccountDocumentsModel.filesDTOList = null; // Initialize as a single object
    this.investmentAccountDocumentsModel.requiredDocPath = null;
    let file = event.files[0]; // Only one file
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let filesDTO = new FileUploadModel();
      this.uploadFileData = e.target as FileReader;
      filesDTO.fileName = "INVESTMENT_ACCOUNT_DOCUMENT_" + this.termAccId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      this.filesDTOList = [filesDTO];
      this.investmentAccountDocumentsModel.filesDTOList = this.filesDTOList;
      this.investmentAccountDocumentsModel.requiredDocPath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      fileUpload.clear();
    };

    reader.readAsDataURL(file);
  }


  fileRemoveEvent() {
    this.investmentAccountDocumentsModel.multipleFilesList = [];
    if (this.investmentAccountDocumentsModel.filesDTOList != null && this.investmentAccountDocumentsModel.filesDTOList != undefined) {
      this.investmentAccountDocumentsModel.requiredDocPath = null;
      this.investmentAccountDocumentsModel.filesDTOList = null;
    }
  }
  documentDuplicateCheck(id: any) {
    if (this.investmentAccountDocumentsList != null && this.investmentAccountDocumentsList != undefined && this.investmentAccountDocumentsList.length > 0) {
      let duplicate = this.investmentAccountDocumentsList.find((obj: any) => obj && obj.requiredDocTypeId === id);
      if (duplicate != null && duplicate != undefined) {
        this.investmentAccountDocumentsForm.reset();
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: "duplicate Account Documents Types" }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
    }
  }
  delete(rowDataId: any) {
    this.investmentAccountDocumentsService.deleteInvestmentAccountDocuments(rowDataId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.investmentAccountDocumentsList = this.responseModel.data;
        this.getInvestmentApplicationDetailsById(this.termAccId);
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
      else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.data.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  deletDilogBox(rowData: any) {
    this.displayDialog = true;
    if (rowData.id != null && rowData.id != undefined) {
      this.deleteId = rowData.id;
    }
  }
  cancelForDialogBox() {
    this.displayDialog = false;
  }
  submitDelete() {
    if (this.deleteId != null && this.deleteId != undefined) {
      this.delete(this.deleteId);
    }

    this.displayDialog = false;
  }

}

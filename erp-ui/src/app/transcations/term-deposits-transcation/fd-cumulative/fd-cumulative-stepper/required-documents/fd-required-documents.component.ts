import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';

import { DatePipe } from '@angular/common';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { FileUpload } from 'primeng/fileupload';
import { Responsemodel } from 'src/app/shared/responsemodel';

import { FileUploadService } from 'src/app/shared/file-upload.service';
import { FdCumulativeApplicationService } from '../fd-cumulative-application/shared/fd-cumulative-application.service';
import { FdCummulativeAccountCommunicationService } from '../../../shared/fd-cummulative-account-communication.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FdRequiredDocuments } from './shared/fd-required-documents';
import { FdRequiredDocumentsService } from './shared/fd-required-documents.service';

@Component({
  selector: 'app-required-documents',
  templateUrl: './fd-required-documents.component.html',
  styleUrls: ['./fd-required-documents.component.css']
})
export class FdRequiredDocumentsComponent implements OnInit {
  requiredForm: any;
  orgnizationSetting: any;
  showForm: any;
  documentsData: any [] =[];
  fdAccId: any;
  isEdit: boolean = false;
  buttonDisabled: boolean = false;
  columns: any[] = [];
  uploadFlag: boolean = false;
  editIndex: any;
  deleteId: any;
;
  kyc: any;
  checked: any;
  accountType: any;
  applicationType: any;
  msgs: any[] = [];
  responseModel!: Responsemodel;
  minBalence: any;
  accountOpeningDateVal: any;

  documentTypeList: any[] = [];
  requiredDocumentsModel: FdRequiredDocuments = new FdRequiredDocuments();
  fileName: any;
  kycModelList: any[] = [];
  adhaarFilesList: any[] = [];
  signFilesList: any[] = [];
  panFilesList: any[] = [];
  uploadFileData: any;
  isFileUploaded: boolean = false;
  
  submitFlag: boolean = false;
 
  
  displayPosition: boolean = false;
  documentNameList: any[] = [];
  position: any;
  docFilesList: any[] = [];
  
  

  filesList: any[] = [];
  
  exerciseFileList: any[] = [];
  lastDot = applicationConstants.LAST_DOT;
  memberId: any;
  kycListByMemberId: any[] = [];
  typeFlag: boolean = false;
  addKycButton: boolean = false;

  addDocumentOfKycFalg: boolean = false;

  editDocumentOfKycFalg: boolean = false;

  veiwCardHide: boolean = false;


  
  afterEditCancleFalg: boolean = false;

  editButtonDisable: boolean = false;

  multipleFilesList: any[] = [];
  filesDTOList: any[] = [];
  productName: any;
  admissionNumber: any;
 
  individualFlag : boolean = false;
  groupFlag : boolean = false;
  institutionFlag : boolean = false;
  memberTypeName: any;
  promoterDetails: any[]= [];
  institutionPromoter: any[]= [];
  memberName: any;
  mobileNumer: any;
  aadharNumber: any;
  qualificationName: any;
  panNumber: any;
  memberTypeId: any;
  displayDialog: boolean = false;


  constructor(private router: Router, private formBuilder: FormBuilder, private fdCumulativeApplicationService: FdCumulativeApplicationService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private fdCummulativeAccountCommunicationService: FdCummulativeAccountCommunicationService,
     private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe , private fdRequiredDocumentsService : FdRequiredDocumentsService , private fileUploadService : FileUploadService) {
    this.requiredForm = this.formBuilder.group({
      'docNumber': new FormControl('', [Validators.required, Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'docTypeName': new FormControl('', Validators.required),
      'fileUpload': new FormControl(''),
    });
  }
  
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    if (this.documentsData.length >= 1) {
      this.uploadFlag = true;
    }
    this.getAllKycTypes();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined ) {
        let queryParams = this.encryptDecryptService.decrypt(params['id']);
        this. fdAccId = Number(queryParams);
        this.getSbAccountDetailsById(this.fdAccId);
        this.isEdit = true;
        
      } else {
        this.isEdit = false;
      }
    });
    this.buttonDisabled = false;
    this.columns = [
      { field: 'docTypeName', header: 'MEMBERSHIP.KYC_DOCUMENT_NAME' },
      { field: 'docNumber', header: 'MEMBERSHIP.KYC_DOCUMENT_NUMBER' },
      { field: 'docPath', header: 'MEMBERSHIP.KYC_DOCUMENT' }
    ];
    
    this.updateData();
  }
  
  /**
   * @author k.yamuna
   * @implements get kyc types List 
   */
  getAllKycTypes() {
    this.fdRequiredDocumentsService.getAllKycTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.documentNameList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
        
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

 
/**
   * @author k.yamuna
   * @implements document upload 
   */
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    this.requiredDocumentsModel.filesDTOList = [];
    this.requiredDocumentsModel.requiredDocumentFilePath = null;
    let files: FileUploadModel = new FileUploadModel();
    for (let file of event.files) {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        let files = new FileUploadModel();
        this.uploadFileData = e.currentTarget;
        files.fileName = file.name;
        files.fileType = file.type.split('/')[1];
        files.value = this.uploadFileData.result.split(',')[1];
        files.imageValue = this.uploadFileData.result;

        let index = this.multipleFilesList.findIndex(x => x.fileName == files.fileName);
        if (index === -1) {
          this.multipleFilesList.push(files);
          this.requiredDocumentsModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.requiredDocumentsModel.filesDTOList[0].fileName = "SB_REQUIRED_DOCUMENTS" + this. fdAccId + "_" +timeStamp+ "_"+ file.name ;
        this.requiredDocumentsModel.requiredDocumentFilePath = "SB_REQUIRED_DOCUMENTS" + this. fdAccId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
        let index1 = event.files.findIndex((x: any) => x === file);
        fileUpload.remove(event, index1);
        fileUpload.clear();
      }
      reader.readAsDataURL(file);
    }
  }

  /**
   * @author k.yamuna
   * @implements from data updation to stepper component
   */
  save() {
    this.updateData();
  }
  /**
   * @author k.yamuna
   * @implements set values for data updation to stepper component
   */
  updateData() {
    this.requiredDocumentsModel.accId = this. fdAccId;
    this.requiredDocumentsModel.admissionNumber = this.admissionNumber;
    this.requiredDocumentsModel.memberTypeName  = this.memberTypeName;
    this.requiredDocumentsModel.memberType  = this.memberTypeId;
    this.requiredDocumentsModel.memberId  = this.memberId;
    this.fdCumulativeApplicationService.changeData({
      formValid: !this.requiredForm.valid ? true : false,
      data: this.requiredDocumentsModel,
      // isDisable: this.documentsData.length <= 0 ? true : false || this.uploadFlag,
      isDisable: this.buttonDisabled,
      stepperIndex: 5,
    });
  }

  /**
   * @author k.yamuna
   * @implements remove documents
   */
  delete(rowDataId: any) {
    this.fdRequiredDocumentsService.deleteDocuments(rowDataId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.kycModelList = this.responseModel.data;
          this.getAllSbDocumentDetailsSbAccId(this. fdAccId);
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

  /**
   * @author k.yamuna
   * @implements get all documents by savings accoun application
   * @argument  fdAccId:Number
   */
  getAllSbDocumentDetailsSbAccId( fdAccId : any) {
    this.fdRequiredDocumentsService.getDocumentsBySbAccId(this. fdAccId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.kycModelList = this.responseModel.data;
            if (this.kycModelList.length > 0 &&  this.kycModelList != null && this.kycModelList != undefined) {
              this.editDocumentOfKycFalg = true;
              for (let kyc of this.kycModelList) {
                this.buttonDisabled = false;
                if(kyc.requiredDocumentFilePath != null && kyc.requiredDocumentFilePath != undefined){
                  kyc.multipartFileList  = this.fileUploadService.getFile(kyc.requiredDocumentFilePath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.requiredDocumentFilePath);
                }
                this.updateData();
              }
            }
            else{
              this.addDocumentOfKycFalg = true;
              this.buttonDisabled = true;
              this.updateData();
            }
          }
        }
      }
      // this.getSbAccountDetailsById( fdAccId);
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  /**
   * @author k.yamuna
   * @implements save docment
   * @argument requiredDocumentsModel
   */
  saveDocument(row: any) {
    this.requiredDocumentsModel.accId = this.fdAccId;
    this.requiredDocumentsModel.admissionNumber = this.admissionNumber;
    this.requiredDocumentsModel.memberTypeName  = this.memberTypeName;
    this.requiredDocumentsModel.memberType  = this.memberTypeId;
    this.requiredDocumentsModel.memberId  = this.memberId;
    this.requiredDocumentsModel.status  = applicationConstants.ACTIVE;
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
      let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == this.requiredDocumentsModel.requiredDocumentTypeId);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
        this.requiredDocumentsModel.requiredDocumentTypeName = filteredObj.label;
      }
    }
    this.fdRequiredDocumentsService.addDocuments(this.requiredDocumentsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.requiredDocumentsModel = this.responseModel.data[0];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1200);
      }else {
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
      this.addKycButton = false;
      this.buttonDisabled = false;
      this.getAllSbDocumentDetailsSbAccId(this. fdAccId);
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
  }
 
  /**
   * @author k.yamuna
   * @implements get sbAccount details by  fdAccId
   * @argument  fdAccId
   */
  getSbAccountDetailsById(id: any) {
    this.fdCumulativeApplicationService.getFdCummApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            if (this.responseModel.data[0].accountOpenDate != null && this.responseModel.data[0].accountOpenDate != undefined) {
              this.accountOpeningDateVal = this.datePipe.transform(this.responseModel.data[0].accountOpenDate, this.orgnizationSetting.datePipe);
            }
            if (this.responseModel.data[0].productName != null && this.responseModel.data[0].productName != undefined) {
              this.productName = this.responseModel.data[0].productName;
            }
            if (this.responseModel.data[0].accountTypeName != null && this.responseModel.data[0].accountTypeName != undefined) {
              this.accountType = this.responseModel.data[0].accountTypeName;
            }
            if (this.responseModel.data[0].minBalance != null && this.responseModel.data[0].minBalance != undefined) {
              this.minBalence = this.responseModel.data[0].minBalance;
            } 
            if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
              this.admissionNumber = this.responseModel.data[0].admissionNumber;
            }
            if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
              this.admissionNumber = this.responseModel.data[0].admissionNumber;
            }
            if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined)
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
            if(this.responseModel.data[0].requiredDocumentDetailsDTOList != null && this.responseModel.data[0].requiredDocumentDetailsDTOList != undefined){
              this.kycModelList = this.responseModel.data[0].requiredDocumentDetailsDTOList;
              for (let kyc of this.kycModelList) {
                if(kyc.requiredDocumentFilePath != null && kyc.requiredDocumentFilePath != undefined){
                  kyc.multipartFileList  = this.fileUploadService.getFile(kyc.requiredDocumentFilePath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.requiredDocumentFilePath);
                }
              }
            }
            else{
              this.addDocumentOfKycFalg = true;
              this.buttonDisabled = true;
            }
             
            this.updateData();
            
          }
        }else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }

      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

    /**
   * @author k.yamuna
   * @implements get sbAccount details by  fdAccId
   * @argument  fdAccId
   */
  addDocument(event: any) {
    this.getAllKycTypes();
    this.multipleFilesList = [];
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = true;
    this.editButtonDisable = true;
    this.requiredDocumentsModel = new FdRequiredDocuments();
    this.updateData();
  }

   /**
   * @author k.yamuna
   * @implements cancle document add/update
   */
  cancel() {
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.getAllSbDocumentDetailsSbAccId(this. fdAccId);
    this.updateData();
  }
  
  /**
   * @author k.yamuna
   * @implements onclick event for add document
   */
  onClick() {
    this.addDocumentOfKycFalg = true;
  }

 /**
   * @author k.yamuna
   * @implements edit document
   * @argument index(position of document card),requiredDocumentModel
   */
  toggleEditForm(index: number, modelData: any): void {
    if (this.editIndex === index) {
      this.editIndex = index;
    } else {
      this.editIndex = index;
    }
    this.editButtonDisable = true;
    this.buttonDisabled = true;
    this.veiwCardHide = false;
    this.editDocumentOfKycFalg = false;
    this.addDocumentOfKycFalg = false;
    this.getDocumentsById(modelData.id);
    this.updateData();

  }
  /**
   * @author k.yamuna
   * @implements edit  document cancel
   */
  editCancle() {
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
      this.getAllSbDocumentDetailsSbAccId(this. fdAccId);
    
    this.updateData();
  }

   /**
   * @author k.yamuna
   * @implements edit document save
   */
  editsave(row: any) {
    this.getAllKycTypes();
    this.requiredDocumentsModel.accId = this. fdAccId;
    this.requiredDocumentsModel.admissionNumber = this.admissionNumber;
    this.requiredDocumentsModel.memberTypeName  = this.memberTypeName;
    this.requiredDocumentsModel.memberType  = this.memberTypeId;
    this.requiredDocumentsModel.memberId  = this.memberId;
    this.editDocumentOfKycFalg = true;
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
      let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == this.requiredDocumentsModel.requiredDocumentTypeId);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
        this.requiredDocumentsModel.requiredDocumentTypeName = filteredObj.label;
      }
    }
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.fdRequiredDocumentsService.updateDocuments(this.requiredDocumentsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
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
      this.addKycButton = false;
      this.buttonDisabled = false;
      this.getAllSbDocumentDetailsSbAccId(this. fdAccId);
      this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });

  }

/**
   * @author k.yamuna
   * @implements get document by  fdAccId 
   * @argument  fdAccId (Number)
   */
  getDocumentsById(id: any) {
    this.fdRequiredDocumentsService.getDocuments(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.requiredDocumentsModel = this.responseModel.data[0];
              if (this.requiredDocumentsModel.requiredDocumentFilePath != undefined) {
                if(this.requiredDocumentsModel.requiredDocumentFilePath != null && this.requiredDocumentsModel.requiredDocumentFilePath != undefined){
                  this.requiredDocumentsModel.multipartFileList  = this.fileUploadService.getFile(this.requiredDocumentsModel.requiredDocumentFilePath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.requiredDocumentsModel.requiredDocumentFilePath);

                }
              }
            }
          }
        }
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  /**
   * @author k.yamuna
   * @implements on click delete
   */
  deletDilogBox(rowData:any){
    this.displayDialog = true;
    if(rowData.id != null && rowData.id != undefined){
      this.deleteId = rowData.id;
    }
  }

  /**
   * @author k.yamuna
   * @implements cancle delete dialog box
   */
  cancelForDialogBox() {
    this.displayDialog = false;
  }

  /**
   * @author k.yamuna
   * @implements submit delete diloge 
   */
  submitDelete(){
    if(this.deleteId != null && this.deleteId != undefined){
      this.delete(this.deleteId);
    }
    
    this.displayDialog = false;
  }

  /**
   * @implements onFile remove
   * @author k.yamuna
   */
  fileRemoeEvent(){
   if(this.requiredDocumentsModel.filesDTOList != null && this.requiredDocumentsModel.filesDTOList != undefined && this.requiredDocumentsModel.filesDTOList.length > 0){
    let removeFileIndex = this.requiredDocumentsModel.filesDTOList.findIndex((obj:any) => obj && obj.fileName === this.requiredDocumentsModel.requiredDocumentFilePath);
    if(removeFileIndex != null && removeFileIndex != undefined){
      this.requiredDocumentsModel.filesDTOList[removeFileIndex] = null;
      this.requiredDocumentsModel.requiredDocumentFilePath = null;
    }
   }
  }

}

import { SiLoanDocumentsDetailsService } from './../../../shared/si-loans/si-loan-documents-details.service';
import { SiLoanDocuments } from './../../../shared/si-loans/si-loan-documents.model';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { SiLoanApplicationService } from '../../../shared/si-loans/si-loan-application.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { SbRequiredDocuments } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/required-documents/shared/sb-required-documents';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-si-loan-documents',
  templateUrl: './si-loan-documents.component.html',
  styleUrls: ['./si-loan-documents.component.css']
})
export class SiLoanDocumentsComponent {

  siLoanDocumentsList: any[] = [];
  siDocumentDetailsForm: FormGroup;

  carrats: any[] = [];
  gender: any[] | undefined;
  maritalstatus: any[] | undefined;
  checked: boolean = false;
  responseModel!: Responsemodel;
  productsList: any[] = [];
  operationTypesList: any[] = [];
  schemeTypesList: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];
  columns: any[] = [];
  insuranceVendorDetailsList: any[] = [];
  occupationTypesList: any[] = [];
  gendersList: any[] = [];
  relationshipTypesList: any[] = [];

  isMemberCreation: boolean = false;
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  siLoanDocumentsModel: SiLoanDocuments = new SiLoanDocuments();

  memberTypeName: any;
  loanAccId: any;
  isEdit: boolean = false;
  admissionNumber: any;
  siLoanDocumentsModelList: any[] = [];
  institutionPromoter: any[] = [];
  visible: boolean = false;
  isFormValid: Boolean = false;

  @ViewChild('document', { static: false }) private document!: Table;

  addButton: boolean = false;
  newRow: any;
  EditDeleteDisable: boolean = false;
  documentDetails: any[] = [];
  collateralType: any;
  tempDocumentDetailsList: any[] = [];
  mainDocumentDetailsList: any[] = [];
  updatedDocumentDetailsList: any[] = [];
  documentsList: any[] = [];
  addButtonService: boolean = false;
  editDeleteDisable: boolean = false;
  showForm: any;
  documentsData: any[] = [];
  buttonDisabled: boolean = false;
  uploadFlag: boolean = false;
  editIndex: any;
  deleteId: any;
  kyc: any;
  accountType: any;
  applicationType: any;
  minBalence: any;
  accountOpeningDateVal: any;
  documentTypeList: any[] = [];
  fileName: any;
  documentModelList: any[] = [];
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
  individualFlag: boolean = false;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  promoterDetails: any[] = [];
  memberName: any;
  mobileNumer: any;
  aadharNumber: any;
  qualificationName: any;
  panNumber: any;
  memberTypeId: any;
  displayDialog: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private translate: TranslateService, private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent: CommonComponent,
    private datePipe: DatePipe,
    private commonFunction: CommonFunctionsService,
    private activateRoute: ActivatedRoute,
    private siLoanApplicationService: SiLoanApplicationService,
    private siLoanDocumentsDetailsService: SiLoanDocumentsDetailsService,
    private fileUploadService: FileUploadService) {

    this.siDocumentDetailsForm = this.formBuilder.group({
      documentType: new FormControl('', Validators.required),
      documentNo: new FormControl('', Validators.required),
      fileUpload: new FormControl(''),
    })
  }

  ngOnInit(): void {

    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');

    if (this.documentsData.length >= 1) {
      this.uploadFlag = true;
    }
    this.getAllDocumentTypes();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let queryParams = this.encryptDecryptService.decrypt(params['id']);
        this.loanAccId = Number(queryParams);
        this.getSILoanAccountDetailsById(this.loanAccId);
        this.isEdit = true;

      } else {
        this.isEdit = false;
      }
    });
    this.buttonDisabled = false;
    this.columns = [
      { field: 'documentType', header: 'MEMBERSHIP.DOCUMENT_NAME' },
      { field: 'documentNo', header: 'MEMBERSHIP.DOCUMENT_NUMBER' },
      { field: 'filePath', header: 'MEMBERSHIP.DOCUMENT' }
    ];

    this.updateData();
  }

  getAllDocumentTypes() {
    this.siLoanDocumentsDetailsService.getAllDocuments().subscribe((res: any) => {
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

  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    this.siLoanDocumentsModel.filesDTOList = [];
    this.siLoanDocumentsModel.filePath = null;
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
          this.siLoanDocumentsModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.siLoanDocumentsModel.filesDTOList[0].fileName = "SI_LOAN_DOCUMENT_" + this.loanAccId + "_" + timeStamp + "_" + file.name;
        this.siLoanDocumentsModel.filePath = "SI_LOAN_DOCUMENT_" + this.loanAccId + "_" + timeStamp + "_" + file.name; // This will set the last file's name as filePath
        let index1 = event.files.findIndex((x: any) => x === file);
        fileUpload.remove(event, index1);
        fileUpload.clear();
      }
      reader.readAsDataURL(file);
    }
  }


  save() {
    this.updateData();
  }

  updateData() {
    this.siLoanDocumentsModel.siLoanApplicationId = this.loanAccId;
    this.siLoanDocumentsModel.admissionNumber = this.admissionNumber;
    this.siLoanDocumentsModel.memberTypeName = this.memberTypeName;
    this.siLoanDocumentsModel.memberType = this.memberTypeId;
    this.siLoanDocumentsModel.memberId = this.memberId;
    this.siLoanApplicationService.changeData({
      formValid: this.siDocumentDetailsForm.valid,
      data: this.siLoanDocumentsModel,
      isDisable: this.buttonDisabled,
      stepperIndex: 8,
    });
  }

  delete(rowDataId: any) {
    this.siLoanDocumentsDetailsService.deleteSILoanDocumentsDetails(rowDataId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.documentModelList = this.responseModel.data;
        this.getAllSILoanDocumentDetailsLoanAccId(this.loanAccId);
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

  getAllSILoanDocumentDetailsLoanAccId(loanAccId: any) {
    this.siLoanDocumentsDetailsService.getSILoanDocumentsDetailsByLoanAccId(this.loanAccId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.documentModelList = this.responseModel.data;
            if (this.documentModelList != null && this.documentModelList != undefined) {
              this.editDocumentOfKycFalg = true;
              for (let document of this.documentModelList) {
                if (document.filePath != null && document.filePath != undefined) {
                  if (document.filePath != null && document.filePath != undefined) {
                    document.multipartFileList = this.fileUploadService.getFile(document.filePath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + document.filePath);

                  }
                }
              }
            }
            this.buttonDisabled = false;
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

  saveDocument(row: any) {
    this.siLoanDocumentsModel.siLoanApplicationId = this.loanAccId;
    this.siLoanDocumentsModel.admissionNumber = this.admissionNumber;
    this.siLoanDocumentsModel.memberTypeName = this.memberTypeName;
    this.siLoanDocumentsModel.memberType = this.memberTypeId;
    this.siLoanDocumentsModel.memberId = this.memberId;
    this.siLoanDocumentsModel.status = applicationConstants.ACTIVE;
    if (this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0) {
      let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == this.siLoanDocumentsModel.documentType);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined) {
        this.siLoanDocumentsModel.documentTypeName = filteredObj.label;
      }
    }
    this.siLoanDocumentsDetailsService.addSILoanDocumentsDetails(this.siLoanDocumentsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siLoanDocumentsModel = this.responseModel.data[0];
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
      this.addKycButton = false;
      this.buttonDisabled = false;
      this.getAllSILoanDocumentDetailsLoanAccId(this.loanAccId);
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

  getSILoanAccountDetailsById(id: any) {
    this.siLoanApplicationService.getSILoanApplicationById(id).subscribe((data: any) => {
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
            if (this.responseModel.data[0].admissionNo != null && this.responseModel.data[0].admissionNo != undefined) {
              this.admissionNumber = this.responseModel.data[0].admissionNo;
            }
            if (this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined)
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
            if (this.responseModel.data[0].siLoanDocumentsDetailsDTOList != null && this.responseModel.data[0].siLoanDocumentsDetailsDTOList != undefined) {
              this.documentModelList = this.responseModel.data[0].siLoanDocumentsDetailsDTOList;

              if (this.documentModelList != null && this.documentModelList != undefined) {
                this.editDocumentOfKycFalg = true;
                for (let document of this.documentModelList) {
                  if (document.filePath != null && document.filePath != undefined) {
                    if (document.filePath != null && document.filePath != undefined) {
                      document.multipartFileList = this.fileUploadService.getFile(document.filePath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + document.filePath);

                    }
                  }
                }
              }

            }
            else {
              this.addDocumentOfKycFalg = true;
              this.buttonDisabled = true;
            }
            this.updateData();

          }
        } else {
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


  addDocument(event: any) {
    this.getAllDocumentTypes();
    this.multipleFilesList = [];
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = true;
    this.editButtonDisable = true;
    this.siLoanDocumentsModel = new SbRequiredDocuments();
    this.updateData();
  }

  cancel() {
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.getAllSILoanDocumentDetailsLoanAccId(this.loanAccId);
    this.updateData();
  }

  onClick() {
    this.addDocumentOfKycFalg = true;
  }

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

  editCancle() {
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.getAllSILoanDocumentDetailsLoanAccId(this.loanAccId);
    this.updateData();
  }

  editsave(row: any) {
    this.getAllDocumentTypes();
    this.siLoanDocumentsModel.siLoanApplicationId = this.loanAccId;
    this.siLoanDocumentsModel.admissionNumber = this.admissionNumber;
    this.siLoanDocumentsModel.memberTypeName = this.memberTypeName;
    this.siLoanDocumentsModel.memberType = this.memberTypeId;
    this.siLoanDocumentsModel.memberId = this.memberId;
    this.editDocumentOfKycFalg = true;
    if (this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0) {
      let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == this.siLoanDocumentsModel.documentType);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined) {
        this.siLoanDocumentsModel.documentTypeName = filteredObj.label;
      }
    }
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.siLoanDocumentsDetailsService.updateSILoanDocumentsDetails(this.siLoanDocumentsModel).subscribe((response: any) => {
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
      this.getAllSILoanDocumentDetailsLoanAccId(this.loanAccId);
      this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  getDocumentsById(id: any) {
    this.siLoanDocumentsDetailsService.getSILoanDocumentsDetailsById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siLoanDocumentsModel = this.responseModel.data[0];
              if (this.siLoanDocumentsModel.filePath != undefined && this.siLoanDocumentsModel.filePath != null) {
                this.siLoanDocumentsModel.multipartFileList = this.fileUploadService.getFile(this.siLoanDocumentsModel.filePath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.siLoanDocumentsModel.filePath);
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

  fileRemoveEvent(){
    if(this.siLoanDocumentsModel.filesDTOList != null && this.siLoanDocumentsModel.filesDTOList != undefined && this.siLoanDocumentsModel.filesDTOList.length > 0){
     let removeFileIndex = this.siLoanDocumentsModel.filesDTOList.findIndex((obj:any) => obj && obj.fileName === this.siLoanDocumentsModel.requiredDocumentFilePath);
     if(removeFileIndex != null && removeFileIndex != undefined){
       this.siLoanDocumentsModel.filesDTOList[removeFileIndex] = null;
       this.siLoanDocumentsModel.requiredDocumentFilePath = null;
     }
    }
   }

}
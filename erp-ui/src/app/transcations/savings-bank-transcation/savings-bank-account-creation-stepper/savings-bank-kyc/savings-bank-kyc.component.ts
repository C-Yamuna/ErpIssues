import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingBankApplicationService } from '../savings-bank-application/shared/saving-bank-application.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SavingsBankCommunicationService } from '../savings-bank-communication/shared/savings-bank-communication.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SavingsBankKycModel } from './shared/savings-bank-kyc-model';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { SavingsBankKycService } from './shared/savings-bank-kyc.service';
import { FileUpload } from 'primeng/fileupload';
import { Table } from 'primeng/table';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel } from '../membership-basic-required-details/shared/membership-basic-required-details';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-savings-bank-kyc',
  templateUrl: './savings-bank-kyc.component.html',
  styleUrls: ['./savings-bank-kyc.component.css']
})
export class SavingsBankKycComponent implements OnInit {

  kycForm: FormGroup;
  kyc: any;
  checked: any;
  sbAccId: any;
  accountType: any;
  applicationType: any;
  msgs: any[] = [];
  responseModel!: Responsemodel;
  minBalence: any;
  accountOpeningDateVal: any;

  documentTypeList: any[] = [];

  savingsBankKycModel: SavingsBankKycModel = new SavingsBankKycModel();
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  fileName: any;

  kycModelList: any[] = [];
  adhaarFilesList: any[] = [];
  signFilesList: any[] = [];
  panFilesList: any[] = [];
  uploadFileData: any;
  isFileUploaded: boolean = false;
  uploadFlag: boolean = true;
  submitFlag: boolean = false;
  columns: any[] = [];

  documentsData: any[] = [];
  displayPosition: boolean = false;
  documentNameList: any[] = [];
  position: any;
  docFilesList: any[] = [];
  buttonDisabled: boolean = false;
  isEdit: any;

  filesList: any[] = [];
  orgnizationSetting: any;
  exerciseFileList: any[] = [];
  lastDot = applicationConstants.LAST_DOT;
  memberId: any;
  kycListByMemberId: any[] = [];
  typeFlag: boolean = false;
  addKycButton: boolean = false;

  addDocumentOfKycFalg: boolean = false;

  editDocumentOfKycFalg: boolean = false;

  veiwCardHide: boolean = false;
  noKYCData: boolean = false;
  isMemberCreation: any;


  @ViewChild('cv', { static: false })
  private cv!: Table;
  editIndex: any;
  afterEditCancleFalg: boolean = false;

  editButtonDisable: boolean = false;

  multipleFilesList: any[] = [];
  filesDTOList: any[] = [];
  productName: any;
  admissionNumber: any;
  showForm: any;
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
  deleteId: any;



  constructor(private router: Router, private formBuilder: FormBuilder, private savingBankApplicationService: SavingBankApplicationService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private savingsBankCommunicationService: SavingsBankCommunicationService, private savingsBankKycService: SavingsBankKycService, private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe , private fileUploadService :FileUploadService) {
    this.kycForm = this.formBuilder.group({
      'docNumber': ['', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY), Validators.compose([Validators.required])]],
      'docTypeName': ['',  Validators.compose([Validators.required])],
      'fileUpload': ['', ],
    });
  }
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    if (this.documentsData.length >= 1) {
      this.uploadFlag = true;
    }
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined ) {
        let queryParams = this.encryptDecryptService.decrypt(params['id']);
        this.sbAccId = Number(queryParams);
        this.getSbAccountDetailsById(this.sbAccId);
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
    // this.getAllKycsDetailsBySbId(this.sbAccId);
    this.getAllKycTypes();
    this.updateData();
  }
  
  //get all kyc types 
  //@jyothi.naidana
  getAllKycTypes() {
    this.savingsBankKycService.getAllKycTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.documentNameList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
        let filteredObj = this.documentNameList.find((data: any) => null != data && this.savingsBankKycModel.kycDocumentTypeId != null && data.value == this.savingsBankKycModel.kycDocumentTypeId);
            if (filteredObj != null && undefined != filteredObj)
              this.savingsBankKycModel.kycDocumentTypeName = filteredObj.label;
      }
    });
  }

 
//image upload and document path save
//@jyothi.naidana
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    this.savingsBankKycModel.filesDTOList = [];
    this.savingsBankKycModel.kycFilePath = null;
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
          this.savingsBankKycModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.savingsBankKycModel.filesDTOList[0].fileName = "SB_KYC_" + this.sbAccId + "_" +timeStamp+ "_"+ file.name ;
        this.savingsBankKycModel.kycFilePath = "SB_KYC_" + this.sbAccId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
        let index1 = event.files.findIndex((x: any) => x === file);
        fileUpload.remove(event, index1);
        fileUpload.clear();
      }
      reader.readAsDataURL(file);
    }
  }

  //update save
  // @jyothi.naidana
  save() {
    this.updateData();
  }
  //update data to main stepper component
  // @jyothi.naidana
  updateData() {
    this.savingsBankKycModel.sbAccId = this.sbAccId;
    this.savingsBankKycModel.admissionNumber = this.admissionNumber;
    this.savingsBankKycModel.memberTypeName  = this.memberTypeName;
    this.savingsBankKycModel.memberType  = this.memberTypeId;
    this.savingsBankKycModel.memberId  = this.memberId;
    this.savingBankApplicationService.changeData({
      formValid: !this.kycForm.valid ? true : false,
      data: this.savingsBankKycModel,
      // isDisable: this.documentsData.length <= 0 ? true : false || this.uploadFlag,
      isDisable: this.buttonDisabled,
      stepperIndex: 1,
    });
  }

  //delete kyc 
  // @jyothi.naidana
  delete(rowDataId: any) {
    debugger
    this.savingsBankKycService.deleteSbKyc(rowDataId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.kycModelList = this.responseModel.data;
           this.getAllKycsDetailsSbKycDetails(this.sbAccId);
          this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
      else{
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
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

  //get all kyc details by sb acc id
  // @jyothi.naidana
  getAllKycsDetailsSbKycDetails(id: any) {
    this.savingsBankKycService.getSbKycBySbAccId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.savingsBankKycModel = this.responseModel.data;
            // if (this.kycModelList != null && this.kycModelList != undefined) {
            //   this.editDocumentOfKycFalg = true;
            //   for (let kyc of this.kycModelList) {
            //     if(kyc.kycFilePath != null && kyc.kycFilePath != undefined){
            //       if(kyc.kycFilePath != null && kyc.kycFilePath != undefined){
            //         kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);

            //       }
            //     }  
            //   }
            //   this.buttonDisabled = false;
            //   this.updateData();
            // }

            if (this.savingsBankKycModel.kycList != undefined && this.savingsBankKycModel.kycList != null) {
              this.kycModelList = this.savingsBankKycModel.kycList;
          
              if (this.kycModelList != null && this.kycModelList != undefined) {
                this.editDocumentOfKycFalg = true;
                for (let kyc of this.kycModelList) {
                  if (kyc.kycFilePath != null && kyc.kycFilePath != undefined) {
                    kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                  }
                }
              }
              this.buttonDisabled = applicationConstants.FALSE;
              this.noKYCData = false;
            } else {
              this.buttonDisabled = applicationConstants.TRUE;
              this.noKYCData = true;
              if (this.isMemberCreation)
                this.addKyc();
            }
            this.updateData();
          }
          else{
            this.addDocumentOfKycFalg = true;
            this.buttonDisabled = true;
            this.updateData();
          }
        }
      }
      // this.getSbAccountDetailsById(sbAccId);
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
 
  //add save
  // @jyothi.naidana
  saveKyc(row: any) {
    this.savingsBankKycModel.sbAccId = this.sbAccId;
    this.savingsBankKycModel.admissionNumber = this.admissionNumber;
    this.savingsBankKycModel.memberTypeName  = this.memberTypeName;
    this.savingsBankKycModel.memberType  = this.memberTypeId;
    this.savingsBankKycModel.memberId  = this.memberId;
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
      let filteredObj = this.documentNameList.find((data: any) => null != data && this.savingsBankKycModel.kycDocumentTypeId != null && data.value == this.savingsBankKycModel.kycDocumentTypeId);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
        this.savingsBankKycModel.kycDocumentTypeName = filteredObj.label;
      }
    }
    this.savingsBankKycModel.status  = applicationConstants.ACTIVE;
    this.savingsBankKycService.addSbKyc(this.savingsBankKycModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.savingsBankKycModel = this.responseModel.data[0];
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
      this.getAllKycsDetailsSbKycDetails(this.sbAccId);
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
  //add kyc cancle
  // @jyothi.naidana
  cancelKyc() {
    this.kycModelList = [];
    this.addKycButton = false;
    this.editButtonDisable = false;
   
      this.getAllKycsDetailsSbKycDetails(this.sbAccId);
   
  }
  
   //sb account details  
  // @jyothi.naidana
  getSbAccountDetailsById(id: any) {
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((data: any) => {
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
            if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
              /**
               * get required member details for kyc
               */
              this.membershipDataFromSbModule();
            }
              
            if(this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined)
              this.memberTypeId = this.responseModel.data[0].memberTypeId;
            this.getAllKycsDetailsSbKycDetails(this.sbAccId);
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

  //add kyc 
  // @jyothi.naidana
  addKyc() {
    this.getAllKycTypes();
    this.multipleFilesList = [];
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = true;
    this.editButtonDisable = true;
    this.savingsBankKycModel = new SavingsBankKycModel;
    this.updateData();
  }

   //add cancle 
  // @jyothi.naidana
  cancel() {
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.getAllKycsDetailsSbKycDetails(this.sbAccId);
    this.updateData();
  }
  
  onClick() {
    this.addDocumentOfKycFalg = true;
  }
  //click on edit and populate data on form and save & next disable purpose
  // @jyothi.naidana
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
    this.getKycById(modelData.id);
    this.updateData();

  }
  //edit cancle
  // @jyothi.naidana
  editCancle() {
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
      this.getAllKycsDetailsSbKycDetails(this.sbAccId);
    
    this.updateData();
  }

   //edit kyc save
  // @jyothi.naidana
  editsave(row: any) {
    this.savingsBankKycModel.sbAccId = this.sbAccId;
    this.savingsBankKycModel.admissionNumber = this.admissionNumber;
    this.savingsBankKycModel.memberTypeName  = this.memberTypeName;
    this.savingsBankKycModel.memberType  = this.memberTypeId;
    this.savingsBankKycModel.memberId  = this.memberId;
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
      let filteredObj = this.documentNameList.find((data: any) => null != data && this.savingsBankKycModel.kycDocumentTypeId != null && data.value == this.savingsBankKycModel.kycDocumentTypeId);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
        this.savingsBankKycModel.kycDocumentTypeName = filteredObj.label;
      }
    }
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.savingsBankKycService.updateSbKyc(this.savingsBankKycModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        // this.kycModelList = this.responseModel.data;
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
      this.getAllKycsDetailsSbKycDetails(this.sbAccId);
      this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });

  }

  //get kyc details by kyc id for edit purpose
  // @jyothi.naidana
  getKycById(id: any) {
    this.savingsBankKycService.getSbKyc(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.savingsBankKycModel = this.responseModel.data[0];
              if (this.savingsBankKycModel.kycFilePath != undefined) {
                if(this.savingsBankKycModel.kycFilePath != null && this.savingsBankKycModel.kycFilePath != undefined){
                  this.savingsBankKycModel.multipartFileList = this.fileUploadService.getFile(this.savingsBankKycModel.kycFilePath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.savingsBankKycModel.kycFilePath);

                }
              }
            }
          }
        }
      }
    });
  }

  getMemberDetailsByAdmissionNumber(admisionNumber: any) {
    this.savingBankApplicationService.getMemberByAdmissionNumber(admisionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipBasicRequiredDetails = this.responseModel.data[0];
            if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
              this.membershipBasicRequiredDetails.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
            }
            if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
              this.membershipBasicRequiredDetails.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
            }
            this.memberId = this.membershipBasicRequiredDetails.id;
            
          }
        }
        else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }
  //get group details
  //@jyothi.naidana
  getGroupByAdmissionNumber(admissionNumber: any) {
    this.savingBankApplicationService.getGroupByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.memberGroupDetailsModel = this.responseModel.data[0];
            if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
              this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDateVal, this.orgnizationSetting.datePipe);
            }
            if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
              this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
            }
              this.memberId = this.memberGroupDetailsModel.id;
          }
        }
        else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }
  //get institution details
  //@jyothi.naidana
  getInstitutionByAdmissionNumber(admissionNumber: any) {
    this.savingBankApplicationService.getInstitutionDetails(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipInstitutionDetailsModel = this.responseModel.data[0];
            if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
              this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDateVal, this.orgnizationSetting.datePipe);
            }
            if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
              this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
            }
            if (this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0)
              this.institutionPromoter = this.membershipInstitutionDetailsModel.institutionPromoterList;
            this.memberId = this.membershipInstitutionDetailsModel.id;
          }
        } else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }

  membershipDataFromSbModule(){
    if (this.memberTypeName == "Individual") {
      this.individualFlag = true;
      this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
    } else if (this.memberTypeName == "Group") {
      this.groupFlag = true;
      this.getGroupByAdmissionNumber(this.admissionNumber);
    } else if (this.memberTypeName == "Institution") {
      this.institutionFlag = true;
      this.getInstitutionByAdmissionNumber(this.admissionNumber);
    }
    
  }

  
  kycModelDuplicateCheck(kycDocTypeId:any){
    if(this.kycModelList != null && this.kycModelList != undefined && this.kycModelList.length > 0){
    let duplicate = this.kycModelList.find((obj:any) => obj && obj.kycDocumentTypeId === kycDocTypeId );
    if (duplicate != null && duplicate != undefined) {
      this.kycForm.reset();
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: "duplicate Kyc Types"}];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    } 
  }
  }

   /**
   * @author jyothi.naidana
   * @implements on click delete
   */
   deletDilogBox(rowData:any){
    this.displayDialog = true;
    if(rowData.id != null && rowData.id != undefined){
      this.deleteId = rowData.id;
    }
   
  }

  /**
   * @author jyothi.naidana
   * @implements cancle delete dialog box
   */
  cancelForDialogBox() {
    this.displayDialog = false;
  }

  /**
   * @author jyothi.naidana
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
   * @author jyothi.naidana
   */
  fileRemoeEvent(){
    if(this.savingsBankKycModel.filesDTOList != null && this.savingsBankKycModel.filesDTOList != undefined && this.savingsBankKycModel.filesDTOList.length > 0){
     let removeFileIndex = this.savingsBankKycModel.filesDTOList.findIndex((obj:any) => obj && obj.fileName === this.savingsBankKycModel.kycFilePath);
     if(removeFileIndex != null && removeFileIndex != undefined){
       this.savingsBankKycModel.filesDTOList[removeFileIndex] = null;
       this.savingsBankKycModel.kycFilePath = null;
     }
    }
   }


}

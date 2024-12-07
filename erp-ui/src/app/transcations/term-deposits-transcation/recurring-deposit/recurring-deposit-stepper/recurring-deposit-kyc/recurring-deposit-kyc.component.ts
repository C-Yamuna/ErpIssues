import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RdAccountKycService } from '../../../shared/rd-account-kyc.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { MemberGroupDetailsModel, MembershipBasicDetail, MembershipInstitutionDetailsModel, RdKycModel } from '../../../shared/membership-basic-detail.model';
import { RdAccountsService } from '../../../shared/rd-accounts.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUpload } from 'primeng/fileupload';
import { termdeposittransactionconstant } from '../../../term-deposit-transaction-constant';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { RdAccountsModel } from '../../../shared/term-depost-model.model';

@Component({
  selector: 'app-recurring-deposit-kyc',
  templateUrl: './recurring-deposit-kyc.component.html',
  styleUrls: ['./recurring-deposit-kyc.component.css']
})
export class RecurringDepositKycComponent {

  kycForm: FormGroup;
  orgnizationSetting:any;
  accountId:any;
  isEdit:Boolean = false;
  membershipBasicDetail:MembershipBasicDetail = new MembershipBasicDetail();
  memberGroupDetailsModel:MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel:MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  rdAccountsModel:RdAccountsModel = new RdAccountsModel();
  rdKycModel:RdKycModel = new RdKycModel();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  kycModelList: any[] = [];
  isKycEdit:Boolean = false;
  addButtonDisabled:boolean = false;
  admissionNumber:any;
  multipartFileList: any[] = [];
  uploadFileData: any;
  documentNameList: any[] = [];
  editDocIndex:any;
  addNewKycDoc:Boolean = false;
  memberTypeName: any;
  rdAccId: any;
  memberTypeId: any;
  isMemberCreation: any;
  documentsData: any[] = [];
  uploadFlag: boolean = true;
  createLoan: any;
  buttonDisabled: boolean = false;
  editDocumentOfKycFalg: boolean = false;
  noKYCData: boolean = false;
  isFileUploaded: boolean = false;
  displayDialog: boolean = false;
  deleteId: any;
  addKycButton: boolean = false;
  addDocumentOfKycFalg: boolean = false;
  editButtonDisable: boolean = false;
  veiwCardHide: boolean = false;
  editIndex: any;
  showForm: any;
  memberId: any;
  institutionPromoter: any[]= [];
  individualFlag : boolean = false;
  groupFlag : boolean = false;
  institutionFlag : boolean = false;


  constructor(private router: Router, private formBuilder: FormBuilder, private rdAccountsService: RdAccountsService,
    private rdAccountKycService: RdAccountKycService, private commonComponent: CommonComponent,
     private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
     private fileUploadService : FileUploadService,
     private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe) {
    this.kycForm = this.formBuilder.group({
      'documentNumber': new FormControl('', [Validators.required, Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'kycDocumentTypeName': new FormControl('', Validators.required),
      'kycFilePath': new FormControl(''),
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
        this.rdAccId = Number(queryParams);
        this.getRdAccountById(this.rdAccId);
        this.isEdit = true;
        
      } else {
        this.isEdit = false;
      }
    });
    this.buttonDisabled = false;
    // this.columns = [
    //   { field: 'docTypeName', header: 'MEMBERSHIP.KYC_DOCUMENT_NAME' },
    //   { field: 'docNumber', header: 'MEMBERSHIP.KYC_DOCUMENT_NUMBER' },
    //   { field: 'docPath', header: 'MEMBERSHIP.KYC_DOCUMENT' }
    // ];
    this.getAllKycTypes();
    this.updateData();
  }
  
  //get all kyc types 
  //@Bhargavi
  getAllKycTypes() {
    this.rdAccountKycService.getAllKycTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.documentNameList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
        let filteredObj = this.documentNameList.find((data: any) => null != data && this.rdKycModel.kycDocumentTypeId != null && data.value == this.rdKycModel.kycDocumentTypeId);
            if (filteredObj != null && undefined != filteredObj)
              this.rdKycModel.kycDocumentTypeName = filteredObj.label;
      }
    });
  }

 
//image upload and document path save
//@Bhargavi
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipartFileList = [];
    this.rdKycModel.filesDTOList = [];
    this.rdKycModel.kycFilePath = null;
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
        let index = this.multipartFileList.findIndex(x => x.fileName == files.fileName);
        if (index === -1) {
          this.multipartFileList.push(files);
          this.rdKycModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.rdKycModel.filesDTOList[0].fileName = "RD_KYC_" + this.rdAccId + "_" +timeStamp+ "_"+ file.name ;
        this.rdKycModel.kycFilePath = "RD_KYC_" + this.rdAccId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
        let index1 = event.files.findIndex((x: any) => x === file);
        fileUpload.remove(event, index1);
        fileUpload.clear();
      }
      reader.readAsDataURL(file);
    }
  }

  //update save
  // @Bhargavi
  save() {
    this.updateData();
  }
  //update data to main stepper component
  // @Bhargavi
  updateData() {
    this.rdKycModel.rdAccId = this.rdAccId;
    this.rdKycModel.admissionNumber = this.admissionNumber;
    this.rdKycModel.memberTypeName  = this.memberTypeName;
    this.rdKycModel.memberType  = this.memberTypeId;
    this.rdKycModel.memberId  = this.memberId;
    this.rdAccountsService.changeData({
      formValid: !this.kycForm.valid ? true : false,
      data: this.rdKycModel,
      isDisable: this.buttonDisabled,
      stepperIndex: 1,
    });
  }

  //delete kyc 
  // @Bhargavi
  delete(rowDataId: any) {
    this.rdAccountKycService.deleteRdAccountKyc(rowDataId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.kycModelList = this.responseModel.data;
          this.getAllKycsDetailsRdKycDetails(this.rdAccId);
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

  //get all kyc details by rd acc id
  // @Bhargavi
  getAllKycsDetailsRdKycDetails(id: any) {
    this.rdAccountKycService.getKycDetailsByTermAccountId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.kycModelList = this.responseModel.data;
            if (this.kycModelList != null && this.kycModelList != undefined) {
              this.editDocumentOfKycFalg = true;
              for (let kyc of this.kycModelList) {
                if(kyc.kycFilePath != null && kyc.kycFilePath != undefined){
                  if(kyc.kycFilePath != null && kyc.kycFilePath != undefined){
                    kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                  }
                }  
              }
              this.buttonDisabled = false;
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
      // this.getRdAccountById(rdAccId);
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  //add save
  // @Bhargavi
  saveKyc(row: any) {
    this.rdKycModel.rdAccId = this.rdAccId;
    this.rdKycModel.admissionNumber = this.admissionNumber;
    this.rdKycModel.memberTypeName  = this.memberTypeName;
    this.rdKycModel.memberType  = this.memberTypeId;
    this.rdKycModel.memberId  = this.memberId;
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
      let filteredObj = this.documentNameList.find((data: any) => null != data && this.rdKycModel.kycDocumentTypeId != null && data.value == this.rdKycModel.kycDocumentTypeId);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
        this.rdKycModel.kycDocumentTypeName = filteredObj.label;
      }
    }
    this.rdKycModel.status  = applicationConstants.ACTIVE;
    this.rdAccountKycService.addRdAccountKyc(this.rdKycModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.rdKycModel = this.responseModel.data[0];
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
      this.getAllKycsDetailsRdKycDetails(this.rdAccId);
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
  // @Bhargavi
  cancelKyc() {
    this.kycModelList = [];
    this.addKycButton = false;
    this.editButtonDisable = false;
   
      this.getAllKycsDetailsRdKycDetails(this.rdAccId);
   
  }
  
   //rd account details  
  // @Bhargavi
  getRdAccountById(id: any) {
    this.rdAccountsService.getRdAccounts(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            if(this.responseModel.data[0].adminssionNumber != null && this.responseModel.data[0].adminssionNumber != undefined){
              this.admissionNumber = this.responseModel.data[0].adminssionNumber;
            }
            if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
              this.membershipDataFromRdModule();
            }
              
            if(this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined)
              this.memberTypeId = this.responseModel.data[0].memberTypeId;
            this.getAllKycsDetailsRdKycDetails(this.rdAccId);
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
  // @Bhargavi
  addKyc(event: any) {
    this.getAllKycTypes();
    this.multipartFileList = [];
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = true;
    this.editButtonDisable = true;
    this.rdKycModel = new RdKycModel;
    this.getAllKycsDetailsRdKycDetails(this.rdAccId);
    this.updateData();
  }

   //add cancle 
  // @Bhargavi
  cancel() {
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.getAllKycsDetailsRdKycDetails(this.rdAccId);
    this.updateData();
  }
  
  onClick() {
    this.addDocumentOfKycFalg = true;
  }
  //click on edit and populate data on form and save & next disable purpose
  // @Bhargavi
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
  // @Bhargavi
  editCancle() {
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.getAllKycsDetailsRdKycDetails(this.rdAccId);
    this.updateData();
  }

   //edit kyc save
  // @Bhargavi
  editsave(row: any) {
    this.rdKycModel.rdAccId = this.rdAccId;
    this.rdKycModel.admissionNumber = this.admissionNumber;
    this.rdKycModel.memberTypeName  = this.memberTypeName;
    this.rdKycModel.memberType  = this.memberTypeId;
    this.rdKycModel.memberId  = this.memberId;
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
      let filteredObj = this.documentNameList.find((data: any) => null != data && this.rdKycModel.kycDocumentTypeId != null && data.value == this.rdKycModel.kycDocumentTypeId);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
        this.rdKycModel.kycDocumentTypeName = filteredObj.label;
      }
    }
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.rdAccountKycService.updateRdAccountKyc(this.rdKycModel).subscribe((response: any) => {
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
      this.getAllKycsDetailsRdKycDetails(this.rdAccId);
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
  // @Bhargavi
  getKycById(id: any) {
    this.rdAccountKycService.getRdAccountKyc(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.rdKycModel = this.responseModel.data[0];
              if (this.rdKycModel.kycFilePath != undefined) {
                if(this.rdKycModel.kycFilePath != null && this.rdKycModel.kycFilePath != undefined){
                  this.rdKycModel.multipartFileList = this.fileUploadService.getFile(this.rdKycModel.kycFilePath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.rdKycModel.kycFilePath);

                }
              }
            }
          }
        }
      }
    });
  }

  getMemberDetailsByAdmissionNumber(admisionNumber: any) {
    this.rdAccountsService.getMembershipBasicDetailsByAdmissionNumber(admisionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipBasicDetail = this.responseModel.data[0];
            if (this.membershipBasicDetail.dob != null && this.membershipBasicDetail.dob != undefined) {
              this.membershipBasicDetail.dobVal = this.datePipe.transform(this.membershipBasicDetail.dob, this.orgnizationSetting.datePipe);
            }
            if (this.membershipBasicDetail.admissionDate != null && this.membershipBasicDetail.admissionDate != undefined) {
              this.membershipBasicDetail.admissionDateVal = this.datePipe.transform(this.membershipBasicDetail.admissionDate, this.orgnizationSetting.datePipe);
            }
            this.memberId = this.membershipBasicDetail.id;
            
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
  //@Bhargavi
  getGroupByAdmissionNumber(admissionNumber: any) {
    this.rdAccountsService.getMemberGroupByAdmissionNumber(admissionNumber).subscribe((response: any) => {
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
  //@Bhargavi
  getInstitutionByAdmissionNumber(admissionNumber: any) {
    this.rdAccountsService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((response: any) => {
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
            if (this.membershipInstitutionDetailsModel.institutionPromoterDetailsDTOList.length > 0)
              this.institutionPromoter = this.membershipInstitutionDetailsModel.institutionPromoterDetailsDTOList;
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

  membershipDataFromRdModule(){
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
   * @author Bhargavi
   * @implements on click delete
   */
   deletDilogBox(rowData:any){
    this.displayDialog = true;
    if(rowData.id != null && rowData.id != undefined){
      this.deleteId = rowData.id;
    }
   
  }

  /**
   * @author Bhargavi
   * @implements cancle delete dialog box
   */
  cancelForDialogBox() {
    this.displayDialog = false;
  }

  /**
   * @author Bhargavi
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
   * @author Bhargavi
   */
  fileRemoeEvent(){
    if(this.rdKycModel.filesDTOList != null && this.rdKycModel.filesDTOList != undefined && this.rdKycModel.filesDTOList.length > 0){
     let removeFileIndex = this.rdKycModel.filesDTOList.findIndex((obj:any) => obj && obj.fileName === this.rdKycModel.kycFilePath);
     if(removeFileIndex != null && removeFileIndex != undefined){
       this.rdKycModel.filesDTOList[removeFileIndex] = null;
       this.rdKycModel.kycFilePath = null;
     }
    }
   }
}

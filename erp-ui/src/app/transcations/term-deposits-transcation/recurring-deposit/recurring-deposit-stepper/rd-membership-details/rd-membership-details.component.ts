import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MemberGroupDetailsModel, MembershipBasicDetail, MembershipInstitutionDetailsModel, RdKycModel } from '../../../shared/membership-basic-detail.model';
import { RdAccountCommunication, RdAccountsModel } from '../../../shared/term-depost-model.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RdAccountsService } from '../../../shared/rd-accounts.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { RdAccountKycService } from '../../../shared/rd-account-kyc.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-rd-membership-details',
  templateUrl: './rd-membership-details.component.html',
  styleUrls: ['./rd-membership-details.component.css']
})
export class RdMembershipDetailsComponent {
  msgs: any[] = [];
  kycForm: any;
  rdKycModelList: any[] = [];
  pacsId: any;
  branchId: any;
  orgnizationSetting: any;
  documentsData: any[] = [];
  uploadFlag: boolean = true;
  rdAccId: any;
  admissionNumber: any;
  disableMemberType: boolean = false;
  isEdit: boolean = false;
  showForm: Boolean = false;
  individualFlag: boolean = false;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  responseModel!: Responsemodel;
  memberTypeName: any;
  memberTypeId: any;
  isDisableFlag: boolean = false;
  documentNameList: any[] = [];
  editIndex: any;
  isFileUploaded: boolean = false;
  uploadFileData: any;
  rdAccountsModel: RdAccountsModel = new RdAccountsModel();
  rdKycModel: RdKycModel = new RdKycModel();
  membershipBasicRequiredDetailsModel: MembershipBasicDetail = new MembershipBasicDetail();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  rdAccountCommunication:RdAccountCommunication = new RdAccountCommunication();

  editButtonDisable: boolean = false;
  buttonDisabled: boolean = false;
  kycDuplicate: boolean = false;
  multipleFilesList:any[]=[]
;
  editDocumentOfKycFalg: boolean = false;;
  veiwCardHide: boolean = false;;



  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private rdAccountsService: RdAccountsService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,
    private commonFunctionsService: CommonFunctionsService,
    private datePipe: DatePipe,
    private fileUploadService : FileUploadService,
    private rdAccountKycService:RdAccountKycService,
    ) {
    this.kycForm = this.formBuilder.group({
      'docNumber': new FormControl('', [Validators.required, Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'kycDocumentTypeName': new FormControl('', Validators.required),
      'fileUpload': new FormControl('')
    });
  }

   //author bhargavi
   ngOnInit(): void {
    this.rdKycModelList =[] ;
    this.pacsId = 1;
    this.branchId = 1;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    if (this.documentsData.length >= 1) {
      this.uploadFlag = true;
    }
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['admissionNo'] ) {
        this.commonComponent.startSpinner();
        
        if(params['admissionNo'] != undefined){
            this.admissionNumber = this.encryptDecryptService.decrypt(params['admissionNo']);
        }
        
      if(this.admissionNumber != null && this.admissionNumber != undefined){
          this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
          this.getGroupDetailsByAdmissionNumber(this.admissionNumber);
          this.getInstitutionDetailsByAdmissionNumber(this.admissionNumber);
      }
      else {
        if(params['id'] != undefined){
          this.rdAccId = Number(this.encryptDecryptService.decrypt(params['id']));
            this.getRdAccountById(this.rdAccId);
        }
      }
        this.disableMemberType = true;
        this.isEdit = true;
      }
      else {
        let val = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
        this.updateData();
        if(!this.showForm){
          this.individualFlag = true;
        }
      }
    });
      this.kycForm.valueChanges.subscribe((data: any) => {
        this.updateData();
        if (this.kycForm.valid) {
          this.save();
        }
      });
      this.getAllKycTypes();
  }

  /**
   * @implements getfdAccountApplicationdetails By AccountId
   * @param id 
   * @author bhargavi
   */
  getRdAccountById(id:any) {
    this.rdAccountsService.getRdAccounts(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.admissionNumber = this.responseModel.data[0].adminssionNumber;
                this.memberTypeName = this.responseModel.data[0].memberTypeName;;
                this.rdAccountsModel = this.responseModel.data[0];
                if(this.rdAccountsModel.rdAccountKycList != null &&  this.rdAccountsModel.rdAccountKycList != undefined && this.rdAccountsModel.rdAccountKycList.length>0 ){
                    this.rdKycModelList = this.rdAccountsModel.rdAccountKycList;
                    // this.rdKycModelList  = this.rdKycModelList.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE ).map((kyc:any)=>{
                    //   kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                    //   return kyc;
                    // });
                    for(let kyc of this.rdKycModelList){
                      kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                      if(kyc.multipartFileList != null && kyc.multipartFileList != undefined){
                        kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                      }
                    }
                }
                this.updateData();
              }
            }
        }
        else{
            this.commonComponent.stopSpinner();
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
  * @implements updateData To parent component'
  * @author bhargavi
  */
  updateData() {
    if(this.rdKycModelList != null && this.rdKycModelList != undefined && this.rdKycModelList.length > 0){
      this.kycDuplicate = this.rdKycModelDuplicateCheck(this.rdKycModelList);
      if(this.kycDuplicate){
        this.isDisableFlag = true;
      }
      else{
        this.isDisableFlag = false;
      }
    }else{
      this.isDisableFlag = true;
    }
    this.rdAccountsService.changeData({
      formValid: !this.kycForm.valid ? true : false ,
      data: this.rdAccountsModel,
      isDisable: this.isDisableFlag,
      stepperIndex: 0,
    });
  }
  save() {
    this.updateData();
  }

 
  //get member module institution details
  //author bhargavi
  getInstitutionDetailsByAdmissionNumber(admissionNumber: any) {
    this.rdKycModelList = [];
    this.rdAccountsService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipInstitutionDetailsModel = this.responseModel.data[0];
            this.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
            this.rdAccountsModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
            this.rdAccountsModel.memInstitutionDTO  = this.membershipInstitutionDetailsModel;
            if(this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList != null && this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList != undefined && this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList.length > 0){
              this.rdKycModelList = this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList;
              this.rdKycModelDuplicateCheck(this.rdKycModelList);
              for(let kyc of this.rdKycModelList){
                this.rdKycModel.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
              }
              this.rdAccountsModel.rdAccountKycList = this.memberGroupDetailsModel.groupKycList;
            }
            if (this.membershipInstitutionDetailsModel.memberTypeId == null ||  this.membershipInstitutionDetailsModel.memberTypeId == undefined) {
              this.membershipInstitutionDetailsModel.memberTypeId = applicationConstants.INSTITUTION_MEMBER_TYPE_ID;
            }
            this.admissionNumber = this.membershipInstitutionDetailsModel.admissionNumber;
            this.rdAccountsModel.memberType = this.membershipInstitutionDetailsModel.memberTypeId;
            this.membershipInstitutionDetailsModel.isNewMember = this.showForm;
            this.rdAccountsModel.memInstitutionDTO = this.membershipInstitutionDetailsModel;
            this.updateData();
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
  //get group details from member module
  //author bhargavi
  getGroupDetailsByAdmissionNumber(admissionNUmber: any) {
    this.rdKycModelList = [];
    this.rdAccountsService.getMemberGroupByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.memberGroupDetailsModel = this.responseModel.data[0];
            this.memberTypeName = this.responseModel.data[0].memberTypeName;
            if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
              this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
            }
            if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
              this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
            }
            if (this.memberGroupDetailsModel.memberTypeId == null ||  this.memberGroupDetailsModel.memberTypeId == undefined) {
              this.memberGroupDetailsModel.memberTypeId = applicationConstants.GROUP_MEMBER_TYPE_ID;
            }
            if(this.memberGroupDetailsModel.groupKycList != null && this.memberGroupDetailsModel. groupKycList != undefined){
              this.rdKycModelList = this.memberGroupDetailsModel. groupKycList;
              for(let kyc of this.rdKycModelList){
                this. rdKycModel.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
              }              
               this.rdAccountsModel.rdAccountKycList = this.memberGroupDetailsModel. groupKycList;
            }
            this.admissionNumber = this.memberGroupDetailsModel.admissionNumber;
            this.memberGroupDetailsModel.isNewMember = this.showForm;
            this.rdAccountsModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
            this.rdAccountsModel.memberType = this.memberGroupDetailsModel.memberTypeId;
            this.rdAccountsModel.memberShipGroupDetailsDTO  = this.memberGroupDetailsModel;
            this.updateData();
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

  
  //member module data by member admission Number
  getMemberDetailsByAdmissionNumber(admissionNumber: any) {
    this.rdKycModelList = [];
    this.rdAccountsService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicRequiredDetailsModel = this.responseModel.data[0];
          this.membershipBasicRequiredDetailsModel.rdAccountCommunicationDTO = this.responseModel.data[0].rdAccountCommunicationDTO;
         
          if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined) {
            this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicRequiredDetailsModel.admissionNumber != null && this.membershipBasicRequiredDetailsModel.admissionNumber != undefined) {
            this.admissionNumber = this.membershipBasicRequiredDetailsModel.admissionNumber;
          }
          if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined) {
            this.membershipBasicRequiredDetailsModel.admissionDate = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if(this.membershipBasicRequiredDetailsModel.rdAccountCommunicationDTO!= null && this.membershipBasicRequiredDetailsModel. rdAccountCommunicationDTO != undefined){
            this.rdAccountCommunication = this.membershipBasicRequiredDetailsModel. rdAccountCommunicationDTO;
            this.rdAccountsModel.rdAccountCommunicationDTO = this.membershipBasicRequiredDetailsModel. rdAccountCommunicationDTO;
          }
          if (this.membershipBasicRequiredDetailsModel.memberTypeId == null ||  this.membershipBasicRequiredDetailsModel.memberTypeId == undefined) {
            this.membershipBasicRequiredDetailsModel.memberTypeId = applicationConstants.INDIVIDUAL_MEMBER_TYPE_ID;
          }
          if (this.membershipBasicRequiredDetailsModel.photoCopyPath != null && this.membershipBasicRequiredDetailsModel.photoCopyPath != undefined) {
            this.membershipBasicRequiredDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.photoCopyPath  );
          }
          if (this.membershipBasicRequiredDetailsModel.signatureCopyPath != null && this.membershipBasicRequiredDetailsModel.signatureCopyPath != undefined) {
            this.membershipBasicRequiredDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.signatureCopyPath  );
          }
          if(this.membershipBasicRequiredDetailsModel.memberShipKycDetailsDTOList != null && this.membershipBasicRequiredDetailsModel.memberShipKycDetailsDTOList != undefined && this.membershipBasicRequiredDetailsModel.memberShipKycDetailsDTOList.length > 0){
            this.rdKycModelList = this.membershipBasicRequiredDetailsModel.memberShipKycDetailsDTOList;
           this.rdKycModelList  = this.rdKycModelList.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE ).map((kyc:any)=>{
            kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
            return kyc;
          });
            this.rdAccountsModel.rdAccountKycList = this.membershipBasicRequiredDetailsModel.memberShipKycDetailsDTOList;
          }
          this.rdAccountsModel.memberTypeName = this.membershipBasicRequiredDetailsModel.memberTypeName;
          this.membershipBasicRequiredDetailsModel.isNewMember = this.showForm;
          this.rdAccountsModel.memberShipBasicDetailsDTO  = this.membershipBasicRequiredDetailsModel;
          this.updateData();
          // this.savingCommuncationDetailsSet(this.membershipBasicRequiredDetailsModel. rdAccountCommunicationDTO[0]);
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

  //get all kyc types 
  //@bhargavi
  getAllKycTypes() {
    this.rdAccountKycService.getAllKycTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.documentNameList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
        let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == this. rdKycModel.kycDocumentTypeId);
            if (filteredObj != null && undefined != filteredObj)
              this. rdKycModel.kycDocumentTypeName = filteredObj.label;
      }
    });
  }

  OnChangeMemberType(documentTypeId :any){
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
    let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == documentTypeId);
    if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
          this. rdKycModel.kycDocumentTypeName = filteredObj.label;
    }
  }
  if(this.rdKycModelList != null && this.rdKycModelList != undefined && this.rdKycModelList.length > 0){
    this.kycDuplicate = this.rdKycModelDuplicateCheck(this.rdKycModelList);
  }
    this.updateData();
  }
  //image upload and document path save
  //@bhargavi
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
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

        let index = this.multipleFilesList.findIndex(x => x.fileName == files.fileName);
        if (index === -1) {
          this.multipleFilesList.push(files);
          this.rdKycModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.rdKycModel.filesDTOList[0].fileName = "Rd_KYC_" + this.rdAccId + "_" +timeStamp+ "_"+ file.name ;
        this.rdKycModel.kycFilePath = "Rd_KYC_" + this.rdAccId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as kycFilePath
        let index1 = event.files.findIndex((x: any) => x === file);
        fileUpload.remove(event, index1);
        fileUpload.clear();
      }
      reader.readAsDataURL(file);
    }
  }
fileRemoveEvent() {
  this.rdKycModel.multipartFileList = [];
  if (this.rdKycModel.filesDTOList != null && this.rdKycModel.filesDTOList != undefined) {
    this.rdKycModel.kycFilePath = null;
    this.rdKycModel.filesDTOList = null;
  }
}

//delete kyc 
  // @bhargavi
  delete(rowData: any) {
    this.rdAccountKycService.deleteRdAccountKyc(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.rdKycModelList = this.responseModel.data;
          this.getAllKycsDetailsRdKycDetails(this.admissionNumber);
      }
    });
  }

  //get all kyc details by fd acc id
  // @bhargavi
  getAllKycsDetailsRdKycDetails(admissionNumber: any) {
    this.rdKycModelList = [];
    this.rdAccountKycService.getKycDetailsByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.rdKycModelList = this.responseModel.data;

            if(this.rdKycModel.kycFilePath != null && this.rdKycModel.kycFilePath != undefined){
              this.rdKycModel.multipartFileList = this.fileUploadService.getFile(this.rdKycModel.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.rdKycModel.kycFilePath);
  
            }
            if (this.rdKycModelList != null && this.rdKycModelList != undefined) {
              this.editDocumentOfKycFalg = true;
              for (let kyc of this.rdKycModelList) {
                let multipleFilesList = [];
                let file = new FileUploadModel();
                file.imageValue = ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath;
                let objects = kyc.kycFilePath.split('.');
                file.fileType = objects[objects.length - 1];
                let name = kyc.kycFilePath.replace(/ /g, "_");
                file.fileName = name
                multipleFilesList.push(file);
                kyc.multipartFileList = multipleFilesList;
              }
            }
          }
        }
      }
      // this.getSbAccountDetailsById(rdAccId);
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  
  //add kyc cancle
  // @bhargavi
  cancelKyc() {
    this.rdKycModelList = [];
    // this.addKycButton = false;
    this.editButtonDisable = false;
    this.getAllKycsDetailsRdKycDetails(this.admissionNumber);
  }

   //add cancle 
  // @bhargavi
  cancel() {
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.updateData();
  }
  //click on edit and populate data on form and save & next disable purpose
  // @bhargavi
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
    this.getAllKycTypes();
    this.addOrEditKycTempList(modelData);
    this.updateData();
  }
  //edit cancle
  // @bhargavi
  editCancle() {
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.updateData();
  }
 
  editsave(row: any) {
      this.rdKycModel.rdAccId = this.rdAccId;
      this.rdKycModel.admissionNumber = this.admissionNumber;
      this.rdKycModel.memberTypeName = this.memberTypeName;
      this.rdKycModel.memberType = this.memberTypeId;
      // this.rdKycModel.memberId = this.m;
      if (this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0) {
        let filteredObj = this.documentNameList.find((data: any) => null != data && this.rdKycModel.kycDocumentTypeId != null && data.value == this.rdKycModel.kycDocumentTypeId);
        if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined) {
          this.rdKycModel.kycDocumentTypeName = filteredObj.label;
        }
      }
      this.editDocumentOfKycFalg = true;
      this.buttonDisabled = false;
      this.editButtonDisable = false;
      this.rdAccountKycService.updateRdAccountKyc(this.rdKycModel).subscribe((response: any) => {
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
        // this.addKycButton = false;
        this.buttonDisabled = false;
        if(this.rdAccId != null && this.rdAccId != undefined)
        {
          this.getRdAccountById(this.rdAccId);

        }
        this.updateData();
      }, error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    // }
    
  }

  //get kyc details by kyc id for edit purpose
  // @bhargavi
  getKycById(id: any) {
    this.rdKycModelList = [];
    this.rdAccountKycService.getKycDetailsByTermAccountId(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this. rdKycModel = this.responseModel.data[0];
              if (this. rdKycModel.kycFilePath != undefined) {
                for(let kyc of this.rdKycModelList){
                  this. rdKycModel.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                 }
              }
            }
          }
        }
      }
    });
  }

  addOrEditKycTempList(rowData : any){
    const kyc = this.rdKycModelList.find(obj => obj && obj.kycDocumentTypeId === rowData.kycDocumentTypeId );
    this. rdKycModel = kyc;
  }

  rdKycModelDuplicateCheck(rdKycModelList: any) {
    let duplicate = false;
    const uniqueIds = new Set<number>();
    const duplicateIds = new Set<number>();
    if (this.rdKycModelList != null && this.rdKycModelList != undefined && this.rdKycModelList.length > 0) {
      for (let item of this.rdKycModelList) {
        if (item != null && item != undefined && item.kycDocumentTypeId != null && item.kycDocumentTypeId != undefined) {
          if (uniqueIds.has(item.kycDocumentTypeId)) {
            duplicateIds.add(item.kycDocumentTypeId);
          } else {
            uniqueIds.add(item.kycDocumentTypeId);
          }
        }
        if (duplicateIds.size > 0) {
          duplicate = true;
          this.kycForm.reset();
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: "duplicate Kyc Types" }];
          setTimeout(() => {
            this.msgs = [];
          }, 1500);
        }
      }
    }
    return duplicate;
  }
}

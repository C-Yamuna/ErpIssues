import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingBankApplicationService } from '../savings-bank-application/shared/saving-bank-application.service';
import { SavingBankApplicationModel } from '../savings-bank-application/shared/saving-bank-application-model';
import { InstitutionPromoterDetailsModel, MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel, promoterDetailsModel } from './shared/membership-basic-required-details';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { formatDate } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { SavingsBankCommunicationModel } from '../savings-bank-communication/shared/savings-bank-communication-model';
import { SavingsBankCommunicationService } from '../savings-bank-communication/shared/savings-bank-communication.service';
import { MembershipServiceService } from './shared/membership-service.service';
import { SavingsBankKycModel } from '../savings-bank-kyc/shared/savings-bank-kyc-model';
import { SavingsBankKycService } from '../savings-bank-kyc/shared/savings-bank-kyc.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';
@Component({
  selector: 'app-membership-basic-required-details',
  templateUrl: './membership-basic-required-details.component.html',
  styleUrls: ['./membership-basic-required-details.component.css']
})
export class MembershipBasicRequiredDetailsComponent {

  applicationList: any[] = [];
  accountList: any[] = [];
  genderList: any[] = [];
  maritalstatusList: any[] = [];
  
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  promoterDetailsModel: promoterDetailsModel = new promoterDetailsModel();
  institutionPromoterDetailsModel: InstitutionPromoterDetailsModel = new InstitutionPromoterDetailsModel();
  savingBankApplicationModel: SavingBankApplicationModel = new SavingBankApplicationModel();

  relationTypesList: any[] = [];
  occupationTypeList: any[] = [];
  qualificationTypes: any[] = [];
  admissionNumberList: any[] = [];
  castesList: any[] = [];
  checked: Boolean = false;
  showForm: Boolean = false;
  id: any;
  isEdit: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
  fileName: any;
  responseModel!: Responsemodel;
  orgnizationSetting: any;
  docFilesList: any[] = [];
  submitFlag: boolean = false;
  maritalStatusList: any[] = [];

  memberTypeList: any[] = [];
  memberTypeName: any;
  individualFlag: boolean = false;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  isDisableFlag: boolean = false;
  disableMemberType: boolean = false;
  promoterDetailsForm: any;
  institutionPromoter: any[] = [];
  addButton: boolean = false;
  EditDeleteDisable: boolean = false;
  newRow: any;
  promoterDetails: any[] = [];
  memberTypeId : any;
  msgs: any[] = [];
  operatorTypeList: any[] = [];
  admisionNumber: any;
  kycForm: any;

  // memberCommunication fields
  savingsBankCommunicationModel: SavingsBankCommunicationModel = new SavingsBankCommunicationModel();
  sameAsPermanentAddress: boolean = false;
  statesList: any[] = [];
  districtsList: any[] = [];
  mandalsList: any[] = [];
  villageList: any[] = [];

  //member module fields
  allTypesOfmembershipList: any;
  pacsId: any;
  branchId: any;
  admissionNUmber: any;
  permenentAllTypesOfmembershipList: any;
  sbAccId: any;
  documentsData: any[] = [];
  uploadFlag: boolean = true;

  //kyc feilds
  kyc: any;
  accountType: any;
  applicationType: any;
  minBalence: any;
  accountOpeningDateVal: any;
  documentTypeList: any[] = [];

  savingsBankKycModel: SavingsBankKycModel = new SavingsBankKycModel();
  kycModelList: any[] = [];
  adhaarFilesList: any[] = [];
  signFilesList: any[] = [];
  panFilesList: any[] = [];
  uploadFileData: any;
  isFileUploaded: boolean = false;
  columns: any[] = [];
  
  displayPosition: boolean = false;
  documentNameList: any[] = [];
  position: any;
  buttonDisabled: boolean = false;

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

  @ViewChild('cv', { static: false })
  private cv!: Table;
  editIndex: any;
  afterEditCancleFalg: boolean = false;
  editButtonDisable: boolean = false;

  multipleFilesList: any[] = [];
  filesDTOList: any[] = [];
  productName: any;
  admissionNumber: any;
  memberName: any;
  mobileNumer: any;
  aadharNumber: any;
  qualificationName: any;
  panNumber: any;
  editFlag: any;
  kycDuplicate: boolean = false;
  
  
  constructor(private router: Router, private formBuilder: FormBuilder, private savingBankApplicationService: SavingBankApplicationService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe, private savingsBankCommunicationService: SavingsBankCommunicationService, private membershipServiceService: MembershipServiceService,private savingsBankKycService: SavingsBankKycService , private fileUploadService : FileUploadService) {
    this.kycForm = this.formBuilder.group({
      'docNumber': ['', [Validators.required]],
      'docTypeName': ['', [Validators.required]],
      'fileUpload': new FormControl(''),
    });
  }
  
  //author jyothi.naidana
  ngOnInit(): void {
    this.kycModelList =[] ;
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
          this.getMemberDetailsByMemberId(this.admissionNumber);
          this.getGroupDetailsById(this.admissionNumber);
          this.getInstitutionDetailsById(this.admissionNumber);
      }
      else {
        if(params['id'] != undefined){
          this.sbAccId = Number(this.encryptDecryptService.decrypt(params['id']));
            this.getSbAccountDetailsById(this.sbAccId );
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
   * @implements getsbAccountApplicationdetails By AccountId
   * @param id 
   * @author jyothi.naidana
   */
  getSbAccountDetailsById(id: any) {
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.admissionNumber = this.responseModel.data[0].admissionNumber;
                this.memberTypeName = this.responseModel.data[0].memberTypeName;
                this.savingBankApplicationModel = this.responseModel.data[0];
                if(this.savingBankApplicationModel.kycList != null &&  this.savingBankApplicationModel.kycList != undefined && this.savingBankApplicationModel.kycList.length>0 ){
                    this.kycModelList = this.savingBankApplicationModel.kycList;
                    for(let kyc of this.kycModelList){
                      kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
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
  * @author jyothi.naidana
  */
  updateData() {
    if(this.kycModelList != null && this.kycModelList != undefined && this.kycModelList.length > 0){
      this.kycDuplicate = this.kycModelDuplicateCheck(this.kycModelList);
      if(this.kycDuplicate){
        this.isDisableFlag = true;
      }
      else{
        this.isDisableFlag = false;
      }
    }else{
      this.isDisableFlag = true;
    }
    this.savingBankApplicationService.changeData({
      formValid: !this.kycForm.valid ? true : false ,
      data: this.savingBankApplicationModel,
      isDisable: this.isDisableFlag,
      stepperIndex: 0,
    });
  }
  save() {
    this.updateData();
  }

 
  //get member module institution details
  //author @jyothi
  getInstitutionDetailsById(admissionNumber: any) {
    this.kycModelList = [];
    this.membershipServiceService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipInstitutionDetailsModel = this.responseModel.data[0];
            this.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
            this.savingBankApplicationModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
            this.savingBankApplicationModel.institutionDTO  = this.membershipInstitutionDetailsModel;
            if(this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList != null && this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList != undefined && this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList.length > 0){
              this.kycModelList = this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList;
              this.kycModelDuplicateCheck(this.kycModelList);
              for(let kyc of this.kycModelList){
                this.savingsBankKycModel.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                // kyc.filesDTOList[0] = this.savingsBankKycModel.multipartFileList;
              }
              this.savingBankApplicationModel.kycList = this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList;
            }
            if (this.membershipInstitutionDetailsModel.memberTypeId == null ||  this.membershipInstitutionDetailsModel.memberTypeId == undefined) {
              this.membershipInstitutionDetailsModel.memberTypeId = applicationConstants.INSTITUTION_MEMBER_TYPE_ID;
            }
            this.admissionNumber = this.membershipInstitutionDetailsModel.admissionNumber;
            this.savingBankApplicationModel.memberTypeId = this.membershipInstitutionDetailsModel.memberTypeId;
            this.membershipInstitutionDetailsModel.isNewMember = this.showForm;
            this.savingBankApplicationModel.institutionDTO = this.membershipInstitutionDetailsModel;
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
  //author @jyothi
  getGroupDetailsById(admissionNUmber: any) {
    this.kycModelList = [];
    this.membershipServiceService.getMemberGroupByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
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
            if(this.memberGroupDetailsModel.groupKycList != null && this.memberGroupDetailsModel.groupKycList != undefined){
              this.kycModelList = this.memberGroupDetailsModel.groupKycList;
              this.kycModelDuplicateCheck(this.kycModelList);
              for(let kyc of this.kycModelList){
                this.savingsBankKycModel.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
              }              
               this.savingBankApplicationModel.kycList = this.memberGroupDetailsModel.groupKycList;
            }
            this.admissionNumber = this.memberGroupDetailsModel.admissionNumber;
            this.memberGroupDetailsModel.isNewMember = this.showForm;
            this.savingBankApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
            this.savingBankApplicationModel.memberTypeId = this.memberGroupDetailsModel.memberTypeId;
            this.savingBankApplicationModel.groupDetailsDTO  = this.memberGroupDetailsModel;
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
  getMemberDetailsByMemberId(admissionNumber: any) {
    this.kycModelList = [];
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicRequiredDetails = this.responseModel.data[0];
          this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList = this.responseModel.data[0].memberShipCommunicationDetailsDTOList;
         
          if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
            this.membershipBasicRequiredDetails.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicRequiredDetails.admissionNumber != null && this.membershipBasicRequiredDetails.admissionNumber != undefined) {
            this.admissionNumber = this.membershipBasicRequiredDetails.admissionNumber;
          }
          if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
            this.membershipBasicRequiredDetails.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
          }
          if(this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList[0] != null && this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList[0] != undefined){
            this.savingsBankCommunicationModel = this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList[0];
            this.savingBankApplicationModel.sbCommunicationDTOList = this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList;
          }
          if (this.membershipBasicRequiredDetails.memberTypeId == null ||  this.membershipBasicRequiredDetails.memberTypeId == undefined) {
            this.membershipBasicRequiredDetails.memberTypeId = applicationConstants.INDIVIDUAL_MEMBER_TYPE_ID;
          }
          if (this.membershipBasicRequiredDetails.photoCopyPath != null && this.membershipBasicRequiredDetails.photoCopyPath != undefined) {
            this.membershipBasicRequiredDetails.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.photoCopyPath  );
          }
          if (this.membershipBasicRequiredDetails.signatureCopyPath != null && this.membershipBasicRequiredDetails.signatureCopyPath != undefined) {
            this.membershipBasicRequiredDetails.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.signatureCopyPath  );
          }
          if(this.membershipBasicRequiredDetails.memberShipKycDetailsDTOList != null && this.membershipBasicRequiredDetails.memberShipKycDetailsDTOList != undefined && this.membershipBasicRequiredDetails.memberShipKycDetailsDTOList.length > 0){
            this.kycModelList = this.membershipBasicRequiredDetails.memberShipKycDetailsDTOList;
            this.kycModelDuplicateCheck(this.kycModelList);
           for(let kyc of this.kycModelList){
            kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
            kyc.filesDTOList = [];
          }
            this.savingBankApplicationModel.kycList = this.membershipBasicRequiredDetails.memberShipKycDetailsDTOList;
          }
          this.savingBankApplicationModel.memberTypeName = this.membershipBasicRequiredDetails.memberTypeName;
          this.membershipBasicRequiredDetails.isNewMember = this.showForm;
          this.savingBankApplicationModel.memberShipBasicDetailsDTO  = this.membershipBasicRequiredDetails;
          this.updateData();
          // this.savingCommuncationDetailsSet(this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList[0]);
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
  addKyc(event: any) {
    this.getAllKycTypes();
    this.multipleFilesList = [];
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = true;
    this.editButtonDisable = true;
    this.savingsBankKycModel = new SavingsBankKycModel;
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
        let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == this.savingsBankKycModel.kycDocumentTypeId);
            if (filteredObj != null && undefined != filteredObj)
              this.savingsBankKycModel.kycDocumentTypeName = filteredObj.label;
      }
    });
  }

  OnChangeMemberType(documentTypeId :any){
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
    let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == documentTypeId);
    if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
          this.savingsBankKycModel.kycDocumentTypeName = filteredObj.label;
    }
  }
  if(this.kycModelList != null && this.kycModelList != undefined && this.kycModelList.length > 0){
    this.kycDuplicate = this.kycModelDuplicateCheck(this.kycModelList);
  }
    this.updateData();
  }
  //image upload and document path save
  //@jyothi.naidana
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    this.savingsBankKycModel.filesDTOList = [];
    this.savingsBankKycModel.multipartFileList =[];
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
          this.savingsBankKycModel.multipartFileList = this.savingsBankKycModel.filesDTOList;
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

//delete kyc 
  // @jyothi.naidana
  delete(rowData: any) {
    this.savingsBankKycService.deleteSbKyc(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.kycModelList = this.responseModel.data;
          this.getAllKycsDetailsSbKycDetails(this.admissionNumber);
      }
    });
  }

  //get all kyc details by sb acc id
  // @jyothi.naidana
  getAllKycsDetailsSbKycDetails(admissionNumber: any) {
    this.kycModelList = [];
    this.savingsBankKycService.getMemberKycBySbKyc(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.kycModelList = this.responseModel.data;
            if (this.kycModelList != null && this.kycModelList != undefined) {
              this.editDocumentOfKycFalg = true;
              for (let kyc of this.kycModelList) {
                let multipleFilesList = [];
                let file = new FileUploadModel();
                file.imageValue = ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath;
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
      // this.getSbAccountDetailsById(sbAccId);
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  
  //add kyc cancle
  // @jyothi.naidana
  cancelKyc() {
    this.kycModelList = [];
    this.addKycButton = false;
    this.editButtonDisable = false;
    this.getAllKycsDetailsSbKycDetails(this.admissionNumber);
  }

   //add cancle 
  // @jyothi.naidana
  cancel() {
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    // this.getAllKycsDetailsSbKycDetails(this.admissionNumber);
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
    this.getAllKycTypes();
    this.addOrEditKycTempList(modelData);
    // this.getKycById(modelData.id);
    this.updateData();
  }
  //edit cancle
  // @jyothi.naidana
  editCancle() {
    // this.kycModelList = [];
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    // this.getAllKycsDetailsSbKycDetails(this.admissionNumber);
    this.updateData();
  }

  //edit kyc save
  // @jyothi.naidana
  editsave(row: any) {
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    const existingIndex = this.kycModelList.findIndex(
    promoter => promoter.kycDocumentTypeId === row.kycDocumentTypeId);
    this.kycModelList[existingIndex]= null;
    this.kycModelList[existingIndex] = row;
    // this.kycModelList[existingIndex].push(row);
    this.addKycButton = false;
    this.buttonDisabled = false;
  }

  //get kyc details by kyc id for edit purpose
  // @jyothi.naidana
  getKycById(id: any) {
    this.kycModelList = [];
    this.savingsBankKycService.getSbKyc(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.savingsBankKycModel = this.responseModel.data[0];
              if (this.savingsBankKycModel.kycFilePath != undefined) {
                for(let kyc of this.kycModelList){
                  this.savingsBankKycModel.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                 }
              }
            }
          }
        }
      }
    });
  }

  addOrEditKycTempList(rowData : any){
    const kyc = this.kycModelList.findIndex(obj => obj && obj.kycDocumentTypeId === rowData.kycDocumentTypeId );
    this.kycModelList[kyc] = rowData;
    let kycObj = this.kycModelList.find(obj => obj && obj.kycDocumentTypeId === rowData.kycDocumentTypeId );
    this.savingsBankKycModel = kycObj;
  }

  kycModelDuplicateCheck(kycModelList: any) {
    let duplicate = false;
    const uniqueIds = new Set<number>();
    const duplicateIds = new Set<number>();
    if (this.kycModelList != null && this.kycModelList != undefined && this.kycModelList.length > 0) {
      for (let item of this.kycModelList) {
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

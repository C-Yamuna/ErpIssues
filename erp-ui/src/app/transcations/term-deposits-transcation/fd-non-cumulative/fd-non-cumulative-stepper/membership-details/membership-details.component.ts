import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FdNonCummulativeAccountKycService } from '../../../shared/fd-non-cummulative-account-kyc.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { FdNonCumulativeApplicationService } from '../fd-non-cumulative-application/shared/fd-non-cumulative-application.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FdNonCumulativeApplication } from '../fd-non-cumulative-application/shared/fd-non-cumulative-application.model';
import { NewMembershipAddService } from '../new-membership-add/shared/new-membership-add.service';
import { MemberGroupDetailsModel, MembershipInstitutionDetailsModel, NewMembershipAdd } from '../new-membership-add/shared/new-membership-add.model';
import { FdNonCumulativeKyc } from '../fd-non-cumulative-kyc/shared/fd-non-cumulative-kyc.model';
import { FileUpload } from 'primeng/fileupload';
import { FdNonCumulativeCommunication } from '../fd-non-cumulative-communication/shared/fd-non-cumulative-communication.model';
import { Table } from 'primeng/table';
import { FdNonCumulativeKycService } from '../fd-non-cumulative-kyc/shared/fd-non-cumulative-kyc.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';

@Component({
  selector: 'app-membership-details',
  templateUrl: './membership-details.component.html',
  styleUrls: ['./membership-details.component.css']
})
export class MembershipDetailsComponent {


  applicationList: any[] = [];
  accountList: any[] = [];
  genderList: any[] = [];
  maritalstatusList: any[] = [];
  fdNonCumulativeApplicationModel: FdNonCumulativeApplication = new FdNonCumulativeApplication();
  fdNonCumulativeKycModel: FdNonCumulativeKyc = new FdNonCumulativeKyc();
  membershipBasicRequiredDetails: NewMembershipAdd = new NewMembershipAdd();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  fdNonCumulativeCommunicationModel: FdNonCumulativeCommunication = new FdNonCumulativeCommunication();
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
  sameAsPermanentAddress: boolean = false;
  statesList: any[] = [];
  districtsList: any[] = [];
  mandalsList: any[] = [];
  villageList: any[] = [];
  allTypesOfmembershipList: any;
  pacsId: any;
  branchId: any;
  admissionNUmber: any;
  permenentAllTypesOfmembershipList: any;
  fdNonCummulativeAccId: any;
  documentsData: any[] = [];
  uploadFlag: boolean = true;
  kyc: any;
  accountType: any;
  applicationType: any;
  minBalence: any;
  accountOpeningDateVal: any;
  documentTypeList: any[] = [];
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



  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private fdNonCumulativeApplicationService: FdNonCumulativeApplicationService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,
    private commonFunctionsService: CommonFunctionsService,
    private datePipe: DatePipe,
    private membershipServiceService: NewMembershipAddService,
    private fdNonCumulativeKycService:FdNonCumulativeKycService,
    private fileUploadService : FileUploadService) {
      this.kycForm = this.formBuilder.group({
        'docNumber': ['', [Validators.required]],
        'docTypeName': ['', [Validators.required]],
        'fileUpload': new FormControl(''),
      });
  }

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
          this.fdNonCummulativeAccId = Number(this.encryptDecryptService.decrypt(params['id']));
            this.getFdNonCummApplicationById(this.fdNonCummulativeAccId );
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
   * @implements getFdNonCummAccountApplicationdetails By AccountId
   * @param id 
   */
  getFdNonCummApplicationById(id: any) {
    this.fdNonCumulativeApplicationService.getFdNonCummApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.admissionNumber = this.responseModel.data[0].admissionNumber;
                this.memberTypeName = this.responseModel.data[0].memberTypeName;
                this.fdNonCumulativeApplicationModel = this.responseModel.data[0];
                if(this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountKycList != null &&  this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountKycList != undefined && this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountKycList.length>0 ){
                    this.kycModelList = this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountKycList;
                    for(let kyc of this.kycModelList){
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
    this.fdNonCumulativeApplicationService.changeData({
      formValid: !this.kycForm.valid ? true : false ,
      data: this.fdNonCumulativeApplicationModel,
      isDisable: this.isDisableFlag,
      stepperIndex: 0,
    });
  }
  save() {
    this.updateData();
  }

 
  //get member module institution details
  getInstitutionDetailsById(admissionNumber: any) {
    this.kycModelList = [];
    this.membershipServiceService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipInstitutionDetailsModel = this.responseModel.data[0];
            this.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
            this.fdNonCumulativeApplicationModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
            this.fdNonCumulativeApplicationModel.memInstitutionDTO  = this.membershipInstitutionDetailsModel;
            if(this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList != null && this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList != undefined && this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList.length > 0){
              this.kycModelList = this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList;
              for(let kyc of this.kycModelList){
                this.fdNonCumulativeKycModel.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
              }
              this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountKycList = this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList;
            }
            if (this.membershipInstitutionDetailsModel.memberTypeId == null ||  this.membershipInstitutionDetailsModel.memberTypeId == undefined) {
              this.membershipInstitutionDetailsModel.memberTypeId = applicationConstants.INSTITUTION_MEMBER_TYPE_ID;
            }
            this.admissionNumber = this.membershipInstitutionDetailsModel.admissionNumber;
            this.fdNonCumulativeApplicationModel.memberType = this.membershipInstitutionDetailsModel.memberTypeId;
            this.membershipInstitutionDetailsModel.isNewMember = this.showForm;
            this.fdNonCumulativeApplicationModel.memInstitutionDTO = this.membershipInstitutionDetailsModel;
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
            if(this.memberGroupDetailsModel.groupKycList != null && this.memberGroupDetailsModel. groupKycList != undefined){
              this.kycModelList = this.memberGroupDetailsModel. groupKycList;
              for(let kyc of this.kycModelList){
                this. fdNonCumulativeKycModel.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
              }              
               this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountKycList = this.memberGroupDetailsModel. groupKycList;
            }
            this.admissionNumber = this.memberGroupDetailsModel.admissionNumber;
            this.memberGroupDetailsModel.isNewMember = this.showForm;
            this.fdNonCumulativeApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
            this.fdNonCumulativeApplicationModel.memberType = this.memberGroupDetailsModel.memberTypeId;
            this.fdNonCumulativeApplicationModel.memberShipGroupDetailsDTO  = this.memberGroupDetailsModel;
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
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicRequiredDetails = this.responseModel.data[0];
          this.fdNonCumulativeApplicationModel.memberShipBasicDetailsDTO = this.membershipBasicRequiredDetails;
          this.memberTypeName = this.membershipBasicRequiredDetails.memberTypeName;
          this.memberTypeId = this.membershipBasicRequiredDetails.memberTypeId;
          if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
            this.membershipBasicRequiredDetails.dob = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
            this.membershipBasicRequiredDetails.admissionDate = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
          }
          // if (this.responseModel.data[0].memberShipCommunicationDetailsDTOList != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList != undefined)
          //   this.membershipBasicRequiredDetails.fdNonCummCommunicationDto = this.responseModel.data[0].memberShipCommunicationDetailsDTOList;
          if (this.membershipBasicRequiredDetails.photoPath != null && this.membershipBasicRequiredDetails.photoPath != undefined) {
            this.membershipBasicRequiredDetails.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.photoPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.photoPath  );
          }
          if (this.membershipBasicRequiredDetails.signaturePath != null && this.membershipBasicRequiredDetails.signaturePath != undefined) {
            this.membershipBasicRequiredDetails.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.signaturePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.signaturePath  );
          }
          if(this.membershipBasicRequiredDetails.memberShipKycDetailsDTOList != null && this.membershipBasicRequiredDetails.memberShipKycDetailsDTOList != undefined && this.membershipBasicRequiredDetails.memberShipKycDetailsDTOList.length > 0){
            this.kycModelList = this.membershipBasicRequiredDetails.memberShipKycDetailsDTOList;
            this.kycModelDuplicateCheck(this.kycModelList);
           for(let kyc of this.kycModelList){
            kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
            kyc.filesDTOList = [];
          }
            this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountKycList = this.membershipBasicRequiredDetails.memberShipKycDetailsDTOList;
          }
          if (this.responseModel.data[0].memberShipKycDetailsDTOList != null && this.responseModel.data[0].memberShipKycDetailsDTOList != undefined) {
            this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountKycList = this.responseModel.data[0].memberShipKycDetailsDTOList;
            this.kycModelList = this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountKycList;
          }
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

  //add kyc 
  addKyc(event: any) {
    this.getAllKycTypes();
    this.multipleFilesList = [];
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = true;
    this.editButtonDisable = true;
    this.fdNonCumulativeKycModel = new FdNonCumulativeKyc;
    this.updateData();
  }
 
  //get all kyc types 

  getAllKycTypes() {
    this.fdNonCumulativeKycService.getAllKycTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.documentNameList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
        let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == this.fdNonCumulativeKycModel.kycDocumentTypeId);
            if (filteredObj != null && undefined != filteredObj)
              this.fdNonCumulativeKycModel.kycDocumentTypeName = filteredObj.label;
      }
    });
  }

  OnChangeMemberType(documentTypeId :any){
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
    let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == documentTypeId);
    if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
          this.fdNonCumulativeKycModel.kycDocumentTypeName = filteredObj.label;
    }
  }
  if(this.kycModelList != null && this.kycModelList != undefined && this.kycModelList.length > 0){
    this.kycDuplicate = this.kycModelDuplicateCheck(this.kycModelList);
  }
    this.updateData();
  }
  //image upload and document path save
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    this.fdNonCumulativeKycModel.filesDTOList = [];
    this.fdNonCumulativeKycModel.kycFilePath = null;
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
          this.fdNonCumulativeKycModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.fdNonCumulativeKycModel.filesDTOList[0].fileName = "FD_NON_CUMM_KYC" + this.fdNonCummulativeAccId + "_" +timeStamp+ "_"+ file.name ;
        this.fdNonCumulativeKycModel.kycFilePath = "FD_NON_CUMM_KYC_" + this.fdNonCummulativeAccId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
        let index1 = event.files.findIndex((x: any) => x === file);
        fileUpload.remove(event, index1);
        fileUpload.clear();
      }
      reader.readAsDataURL(file);
    }
  }
  fileRemoveEvent() {
    this.fdNonCumulativeKycModel.multipartFileList = [];
    if (this.fdNonCumulativeKycModel.filesDTOList != null && this.fdNonCumulativeKycModel.filesDTOList != undefined) {
      this.fdNonCumulativeKycModel.kycFilePath = null;
      this.fdNonCumulativeKycModel.filesDTOList = null;
    }
  }
//delete kyc 

  delete(rowData: any) {
    this.fdNonCumulativeKycService.deleteKyc(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.kycModelList = this.responseModel.data;
          this.getAllKycsDetailsFdKycDetails(this.admissionNumber);
      }
    });
  }

  //get all kyc details by fd acc id

  getAllKycsDetailsFdKycDetails(admissionNumber: any) {
    this.kycModelList = [];
    this.fdNonCumulativeKycService.getMemberKycByAddmissionNumber(admissionNumber).subscribe((response: any) => {
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
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  
  //add kyc cancle
  cancelKyc() {
    this.kycModelList = [];
    this.addKycButton = false;
    this.editButtonDisable = false;
    this.getAllKycsDetailsFdKycDetails(this.admissionNumber);
  }

   //add cancle 
  cancel() {
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;

    this.updateData();
  }
  
  onClick() {
    this.addDocumentOfKycFalg = true;
  }
  //click on edit and populate data on form and save & next disable purpose
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
  editCancle() {
    // this.kycModelList = [];
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.updateData();
  }

  //edit kyc save
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
  getKycById(id: any) {
    this.kycModelList = [];
    this.fdNonCumulativeKycService.getKycById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.fdNonCumulativeKycModel = this.responseModel.data[0];
              if (this.fdNonCumulativeKycModel.kycFilePath != undefined) {
                for(let kyc of this.kycModelList){
                  this.fdNonCumulativeKycModel.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                 }
              }
            }
          }
        }
      }
    });
  }

  addOrEditKycTempList(rowData : any){
    const kyc = this.kycModelList.find(obj => obj && obj.kycDocumentTypeId === rowData.kycDocumentTypeId );
    this.fdNonCumulativeKycModel = kyc;
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

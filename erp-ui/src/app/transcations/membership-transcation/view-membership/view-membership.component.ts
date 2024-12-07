import { GroupCommunicationModel, GroupKycDeatilsModel, MemberGroupBasicDetails, promoterDetailsModel } from './../shared/member-group-details-model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membershiptransactionconstant } from '../membership-transaction-constant';
import { CommonComponent } from 'src/app/shared/common.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MemberBasicDetails, MemberCommunicationDeatilsModel, MemberGuardianDetailsModel, MemberKycDetailsModel, MemberLandDetailsModel, MemberNomineeDetails, MembershipAssetsDetailsModel, MembershipFamilyDetailsModel } from '../shared/member-basic-details.model';
import { MembershipBasicDetailsService } from '../shared/membership-basic-details.service';
import { DatePipe } from '@angular/common';
import { InstitutionBasicDetailsModel, InstituteCommunicationModel, InstiteKycDetailsModel, InstitutePromoterDetails } from '../shared/institution-details.model';
import { MembershipGroupDetailsService } from '../shared/membership-group-details.service';
import { MembershipInstitutionDetailsModel } from '../../savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { MemInstitutionService } from '../shared/mem-institution.service';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-membership',
  templateUrl: './view-membership.component.html',
  styleUrls: ['./view-membership.component.css']
})
export class ViewMembershipComponent {
  memberBasicDetailsModel: MemberBasicDetails = new MemberBasicDetails();
  memberNomineeDetailsModel: MemberNomineeDetails = new MemberNomineeDetails();
  memberGuardianDetailsDetailsModel: MemberGuardianDetailsModel = new MemberGuardianDetailsModel();
  memberLandDetailsModel: MemberLandDetailsModel = new MemberLandDetailsModel();
  membershipFamilyDetailsModel: MembershipFamilyDetailsModel = new MembershipFamilyDetailsModel();
  memberCommunicationDetailsModel: MemberCommunicationDeatilsModel = new MemberCommunicationDeatilsModel();
  memberKycDetailsModel: MemberKycDetailsModel = new MemberKycDetailsModel();
  membershipAssetsDetailsModel: MembershipAssetsDetailsModel = new MembershipAssetsDetailsModel();


  memberGroupBasicDetails: MemberGroupBasicDetails = new MemberGroupBasicDetails();
  groupCommunicationModel: GroupCommunicationModel = new GroupCommunicationModel();
  groupKycDeatilsModel: GroupKycDeatilsModel = new GroupKycDeatilsModel();
  promoterDetailsModel: promoterDetailsModel = new promoterDetailsModel();


  institutionBasicDetailsModel: InstitutionBasicDetailsModel = new InstitutionBasicDetailsModel();
  instituteCommunicationModel: InstituteCommunicationModel = new InstituteCommunicationModel();
  institeKycDetailsModel: InstiteKycDetailsModel = new InstiteKycDetailsModel();
  institutePromoterDetails: InstitutePromoterDetails = new InstitutePromoterDetails();



  statusList: any[] = [];

  responseModel!: Responsemodel;
  msgs: any[] = [];

  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  countryList: any[] = [];
  memberLandDetails: any;
  selectedMemberType: any;
  memberPromoterDetails: any[] = [];
  groupPromoterList: any[] = [];
  memberLandDetailsList: any[] = [];
  memberFamilyDetails: any[] = [];
  membershipFamilyDetailsList: any[] = [];
  membershipAssetsDetailsList: any[] = [];
  memberAssetDetails: any
  institutePromoterList: any;
  editbtn: Boolean = true;
  addressOne: any;
  addressTwo: any;
  kycGridList: any[]=[];
  groupKycGridList: any[]=[];
  institutionKycList:any[]=[];
  guardainEnableFlag: boolean = false;
  photoCopyFlag: boolean = true;
  signatureCopyFlag: boolean = true;
  memberPhotoCopyZoom: boolean = false;
  membreIndividualFlag: boolean = false;
  memberGroupBasicDetailsFlag:boolean =false;
  memberInstitutionBasicDetailsFlag:boolean =false;
  promoterFlag:boolean =false;
  showForm: boolean = false;

  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder, private membershipBasicDetailsService: MembershipBasicDetailsService,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService, private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService,private fileUploadService :FileUploadService,
    private memberShipGroupDetailsService: MembershipGroupDetailsService,
    private memInistitutionsService: MemInstitutionService,private translate:TranslateService,private commonFunctionService:CommonFunctionsService) {

  }

  ngOnInit() {
    this.memberLandDetails = [
      { field: 'passbookNumber', header: 'ERP.PASSBOOK_NUMBER' },
      { field: 'surveyNumber', header: 'ERP.SURVEY_NO' },
      { field: 'landInUnits', header: 'ERP.LAND_IN_UNITS' },
      { field: 'landInSubUnits', header: 'ERP.LAND_IN_SUB_UNITS' },
      { field: 'soilTypeName', header: 'ERP.LAND_TYPE' },
      { field: 'waterSourceName', header: 'ERP.WATER_SOURCE_TYPES' },
      { field: 'uploadFilePath', header: 'ERP.UPLOAD_DOCUMENTS' }
      
    ];

    this.memberFamilyDetails = [
      { field: 'relationTypeName', header: 'ERP.RELATION_TYPE' },
      { field: 'surname', header: 'ERP.SURNAME' },
      { field: 'name', header: 'ERP.NAME' },
      { field: 'dob', header: 'ERP.DATE_OF_BIRTH' },
      { field: 'age', header: 'ERP.AGE' },
      { field: 'qualificationName', header: 'ERP.QUALIFICATION' },
      { field: 'aadharNumber', header: 'ERP.AADHAR_NUMBER' },
      { field: 'mobileNumber', header: 'ERP.MOBILE_NUMBER' },
      { field: 'docFilePath', header: 'ERP.UPLOAD_DOCUMENT' }
    ];


    this.memberPromoterDetails = [
      { field: 'name', header: 'ERP.NAME' },
      { field: 'operatorTypeName', header: 'ERP.TYPE_OF_OPERATOR' },
       { field: 'authorizedSignatoryName', header: 'MEMBERSHIP_TRANSACTION.AUTHORIZED_SIGNATORY' },
      { field: 'dob', header: 'ERP.DATE_OF_BIRTH' },
      { field: 'age', header: 'ERP.AGE' },
      { field: 'genderTypeName', header: 'ERP.GENDER' },
      { field: 'maritalStatusName', header: 'ERP.MARITAL_STATUS' },
      { field: 'mobileNumber', header: 'ERP.MOBILE_NUMBER' },
      { field: 'emailId', header: 'ERP.EMAIL' },
      { field: 'aadharNumber', header: 'ERP.AADHAR_NUMBER' },
      { field: 'startDate', header: 'ERP.START_DATE' },
      { field: 'uploadImage', header: 'ERP.UPLOAD_IMAGE' },
      { field: 'uploadSignature', header: 'ERP.UPLOAD_SIGNATURE' }

    ];


    this.memberAssetDetails = [
      { field: 'assetTypeName', header: 'ERP.ASSET_TYPES' },
      { field: 'assetName', header: 'ERP.ASSET_NAME' },
      { field: 'registeredNumber', header: 'ERP.REGISTERED_NUMBER' },
      { field: 'registeredDate', header: 'ERP.REGISTERED_DATE' },
      { field: 'initialValue', header: 'ERP.INITIAL_VALUE' },
      { field: 'currentValue', header: 'ERP.CURRENT_VALUE' },
      { field: 'depreciationPercentage', header: 'MEMBERSHIPCONFIG.DEPRECIATION_PERCENTAGE' },
      { field: 'assetFilePath', header: 'ERP.UPLOAD_DOCUMENT' },

    ];

    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use(this.commonFunctionService.getStorageValue('language'));
      }
    });
    
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        if(params['type'] != undefined){
          let type = this.encryptService.decrypt(params['type']);
          this.selectedMemberType = type;
          if (this.selectedMemberType === "Individual")
            this.getMembershipDetails(id);
          else if (this.selectedMemberType === "Group") {
            this.getGroupDetails(id);
          }
          else if (this.selectedMemberType === "Institution") {
            this.getInstitutionDetails(id);
          }
        }
        if(params['editbtn'] != undefined){
          let idEdit = this.encryptService.decrypt(params['editbtn']);

          if (idEdit == "1")
            this.editbtn = true
          else
            this.editbtn = false;
        }
        this.isEdit = true;
      } 
      if (params['isGridPage'] != undefined && params['isGridPage'] != null) {
        let isGrid = this.encryptService.decrypt(params['isGridPage']);
        if (isGrid === "0") {
          this.isShowSubmit = applicationConstants.FALSE;
        } else {
          this.isShowSubmit = applicationConstants.TRUE;
        }
      }else {
        this.isEdit = false;
      }
    });
  }

  getMembershipDetails(id: any) {
    
    this.membershipBasicDetailsService.getMembershipBasicDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();

      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data && this.responseModel.data.length > 0) {
        this.memberBasicDetailsModel = this.responseModel.data[0];

        if (this.memberBasicDetailsModel.photoCopyPath != null && this.memberBasicDetailsModel.photoCopyPath != undefined) {
          this.memberBasicDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.memberBasicDetailsModel.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberBasicDetailsModel.photoCopyPath  );
        }
        if (this.memberBasicDetailsModel.signatureCopyPath != null && this.memberBasicDetailsModel.signatureCopyPath != undefined) {
          this.memberBasicDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.memberBasicDetailsModel.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberBasicDetailsModel.signatureCopyPath  );
        }
        if (this.memberBasicDetailsModel.mcrDocumentCopy != null && this.memberBasicDetailsModel.mcrDocumentCopy != undefined) {
          this.memberBasicDetailsModel.multipartFileListForMCRCopyPath = this.fileUploadService.getFile(this.memberBasicDetailsModel.mcrDocumentCopy ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberBasicDetailsModel.mcrDocumentCopy  );
        }

        if (this.memberBasicDetailsModel.admissionDateVal != undefined && this.memberBasicDetailsModel.admissionDateVal != null) {
          this.memberBasicDetailsModel.admissionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.memberBasicDetailsModel.admissionDateVal));
        }

        if (this.memberBasicDetailsModel.admissionDate != null) {
          this.memberBasicDetailsModel.admissionDateVal = this.datePipe.transform(this.memberBasicDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
        }

        if (this.memberBasicDetailsModel.dob != null) {
          this.memberBasicDetailsModel.memDobVal = this.datePipe.transform(this.memberBasicDetailsModel.dob, this.orgnizationSetting.datePipe);
        }

        if (this.memberBasicDetailsModel.memberShipNomineeDetailsDTOList != null && this.memberBasicDetailsModel.memberShipNomineeDetailsDTOList.length > 0) {
          this.memberNomineeDetailsModel = this.memberBasicDetailsModel.memberShipNomineeDetailsDTOList[0];
          if(this.memberNomineeDetailsModel.nomineeFilePath != null && this.memberNomineeDetailsModel.nomineeFilePath != undefined)
            this.memberNomineeDetailsModel.multipartFileList = this.fileUploadService.getFile(this.memberNomineeDetailsModel.nomineeFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberNomineeDetailsModel.nomineeFilePath);

        }
        if (this.memberBasicDetailsModel.age != null && this.memberBasicDetailsModel.age != undefined && this.memberBasicDetailsModel.age < 18) {
          this.guardainEnableFlag = true;
        }
        if (this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList != null && this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList != undefined && this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList.length > 0 && this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList[0] != null && this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList[0] != undefined) {
          this.memberGuardianDetailsDetailsModel = this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList[0];
        }

        if (this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList != null && this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList.length > 0) {
          this.memberGuardianDetailsDetailsModel = this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList[0];
          if(this.memberGuardianDetailsDetailsModel.uploadFilePath != null && this.memberGuardianDetailsDetailsModel.uploadFilePath != undefined)
            this.memberGuardianDetailsDetailsModel.multipartsFileList = this.fileUploadService.getFile(this.memberGuardianDetailsDetailsModel.uploadFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberGuardianDetailsDetailsModel.uploadFilePath);

        }

        if (this.memberBasicDetailsModel.memberShipLandDetailsDTOList != null && this.memberBasicDetailsModel.memberShipLandDetailsDTOList.length > 0) {
          this.memberLandDetailsList = this.memberBasicDetailsModel.memberShipLandDetailsDTOList;
          this.memberLandDetailsList = this.memberLandDetailsList.map((member:any) =>{
            if(member.uploadFilePath != null && member.uploadFilePath != undefined)
              member.multipleFilesList = this.fileUploadService.getFile(member.uploadFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + member.uploadFilePath);

            return member;
          }
          );
        }

        if (this.memberBasicDetailsModel.memberShipFamilyDetailsDTOList != null && this.memberBasicDetailsModel.memberShipFamilyDetailsDTOList.length > 0) {
          this.membershipFamilyDetailsList = this.memberBasicDetailsModel.memberShipFamilyDetailsDTOList
          this.membershipFamilyDetailsList =    this.membershipFamilyDetailsList.filter((obj:any) => null != obj && obj.dob != null).map((family:any)=>{
            family.dob = this.datePipe.transform(family.dob, this.orgnizationSetting.datePipe);
            if (family.docFilePath != null && family.docFilePath != undefined) {
              family.multipleFilesList = this.fileUploadService.getFile(family.docFilePath, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + family.docFilePath);
            }
            return family;
          });
        }

        if (this.memberBasicDetailsModel.memberShipCommunicationDetailsDTOList != null && this.memberBasicDetailsModel.memberShipCommunicationDetailsDTOList.length > 0) {
          this.memberCommunicationDetailsModel = this.memberBasicDetailsModel.memberShipCommunicationDetailsDTOList[0];
          this.concateAddressDetails(this.memberCommunicationDetailsModel);
        }
      if(this.memberBasicDetailsModel.memberShipKycDetailsDTOList != null &&  this.memberBasicDetailsModel.memberShipKycDetailsDTOList != undefined && this.memberBasicDetailsModel.memberShipKycDetailsDTOList.length > 0){
        this.kycGridList = this.memberBasicDetailsModel.memberShipKycDetailsDTOList;
        this.kycGridList  = this.kycGridList.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE ).map((kyc:any)=>{
          kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
          return kyc;
        });
      }

        if (this.memberBasicDetailsModel.memberShipAssertDetailsDTOList != null && this.memberBasicDetailsModel.memberShipAssertDetailsDTOList.length > 0) {
          this.membershipAssetsDetailsList = this.memberBasicDetailsModel.memberShipAssertDetailsDTOList;
          this.membershipAssetsDetailsList =    this.membershipAssetsDetailsList.filter((obj:any) => null != obj && obj.registeredDate != null).map((asset:any)=>{
            asset.registeredDate = this.datePipe.transform(asset.registeredDate, this.orgnizationSetting.datePipe);
            if(asset.assetFilePath != null && asset.assetFilePath != undefined)
              asset.multipartFileList = this.fileUploadService.getFile(asset.assetFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + asset.assetFilePath);
            return asset;
          });

        }
      }
    });
  }

  getGroupDetails(id: any) {

    this.memberShipGroupDetailsService.getMembershipGroupDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();

      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data && this.responseModel.data.length > 0) {
        this.memberGroupBasicDetails = this.responseModel.data[0];

        if (this.memberGroupBasicDetails.resolutionCopyPath != null && this.memberGroupBasicDetails.resolutionCopyPath != undefined) {
          this.memberGroupBasicDetails.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.memberGroupBasicDetails.resolutionCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberGroupBasicDetails.resolutionCopyPath);
        }

        if (this.memberGroupBasicDetails.admissionDate != null) {
          this.memberGroupBasicDetails.admissionDateVal = this.datePipe.transform(this.memberGroupBasicDetails.admissionDate, this.orgnizationSetting.datePipe);
        }

        if (this.memberGroupBasicDetails.registrationDate != null) {
          this.memberGroupBasicDetails.registrationDateVal = this.datePipe.transform(this.memberGroupBasicDetails.registrationDate, this.orgnizationSetting.datePipe);
        }

        if (this.memberGroupBasicDetails.groupCommunicationList != null && this.memberGroupBasicDetails.groupCommunicationList.length > 0) {
          this.groupCommunicationModel = this.memberGroupBasicDetails.groupCommunicationList[0];
          this.concateAddressDetails(this.groupCommunicationModel);
        }
        if (this.memberGroupBasicDetails.groupPromoterList != null && this.memberGroupBasicDetails.groupPromoterList.length > 0) {
          this.groupPromoterList = this.memberGroupBasicDetails.groupPromoterList;
          this.groupPromoterList =    this.groupPromoterList.filter((obj:any) => null != obj && obj.dob != null).map((promoter:any)=>{
            promoter.dob = this.datePipe.transform(promoter.dob, this.orgnizationSetting.datePipe);
            promoter.startDate = this.datePipe.transform(promoter.startDate, this.orgnizationSetting.datePipe);

            if (promoter.uploadImage != null && promoter.uploadImage != undefined) {
              this.photoCopyFlag =true;
              promoter.multipartFileListForPhotoCopy = this.fileUploadService.getFile(promoter.uploadImage ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + promoter.uploadImage );
            }
            else{
              this.photoCopyFlag = false;
            }
            if (promoter.uploadSignature != null && promoter.uploadSignature != undefined) {
              promoter.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(promoter.uploadSignature ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + promoter.uploadSignature  );
            }
            return promoter;
          });
        }
        if(this.memberGroupBasicDetails.groupKycList != null &&  this.memberGroupBasicDetails.groupKycList != undefined && this.memberGroupBasicDetails.groupKycList.length > 0){
          this.groupKycGridList = this.memberGroupBasicDetails.groupKycList;
          this.groupKycGridList  = this.groupKycGridList.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE).map((kyc:any)=>{
            kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
            return kyc;
          });
        }
      }
    });
  }

  getInstitutionDetails(id: any) {
    if(id != undefined && id != null){
    this.memInistitutionsService.getMemInstitutionById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();

      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data && this.responseModel.data.length > 0) {
        this.institutionBasicDetailsModel = this.responseModel.data[0];

        if (this.institutionBasicDetailsModel.resolutionCopyPath != null && this.institutionBasicDetailsModel.resolutionCopyPath != undefined) {
          this.institutionBasicDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.institutionBasicDetailsModel.resolutionCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.institutionBasicDetailsModel.resolutionCopyPath);
        }

        if (this.institutionBasicDetailsModel.admissionDate != null) {
          this.institutionBasicDetailsModel.admissionDateVal = this.datePipe.transform(this.institutionBasicDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
        }

        if (this.institutionBasicDetailsModel.registrationDate != null) {
          this.institutionBasicDetailsModel.registrationDateVal = this.datePipe.transform(this.institutionBasicDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
        }

        if (this.institutionBasicDetailsModel.institutionCommunicationDTOList != null && this.institutionBasicDetailsModel.institutionCommunicationDTOList.length > 0) {
          this.instituteCommunicationModel = this.institutionBasicDetailsModel.institutionCommunicationDTOList[0];
        }

        if (this.institutionBasicDetailsModel.institutionKycDetailsDTOList != null && this.institutionBasicDetailsModel.institutionKycDetailsDTOList.length > 0) {
          this.institutionKycList = this.institutionBasicDetailsModel.institutionKycDetailsDTOList;
          this.institutionKycList  = this.institutionKycList.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE).map((kyc:any)=>{
            kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
            return kyc;
          });
        }
        if (this.institutionBasicDetailsModel.institutionPromoterList != null && this.institutionBasicDetailsModel.institutionPromoterList.length > 0) {
          this.institutePromoterList = this.institutionBasicDetailsModel.institutionPromoterList;
          this.institutePromoterList =  this.institutePromoterList.filter((obj:any) => null != obj && obj.dob != null).map((promoter:any)=>{
            promoter.dob = this.datePipe.transform(promoter.dob, this.orgnizationSetting.datePipe);
            promoter.startDate = this.datePipe.transform(promoter.startDate, this.orgnizationSetting.datePipe);

            if (promoter.uploadImage != null && promoter.uploadImage != undefined) {
              promoter.multipartFileListForPhotoCopy = this.fileUploadService.getFile(promoter.uploadImage ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + promoter.uploadImage );
            }
            if (promoter.uploadSignature != null && promoter.uploadSignature != undefined) {
              promoter.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(promoter.uploadSignature ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + promoter.uploadSignature  );
            }
            return promoter;
          });
        }
      }
    });
  }
  }
  back() {
      this.router.navigate([Membershiptransactionconstant.MEMBERSHIP_TRANSACTION]);
  }
  submit() {
    this.msgs = [];  
      this.msgs = [{ severity: "success", detail:  applicationConstants.VIEW_MEMBERSHIP }];
    setTimeout(() => {
      this.router.navigate([Membershiptransactionconstant.MEMBERSHIP_TRANSACTION]);
    }, 1500);
  }
  editInstitutionDetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([Membershiptransactionconstant.INSTITUTION_BASIC_DETAILS], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 1:
        this.router.navigate([Membershiptransactionconstant.INSTITUTION_COMMUNICATION], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 2:
        this.router.navigate([Membershiptransactionconstant.INSTITUTION_KYC], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }

  editGroupDetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([Membershiptransactionconstant.GROUP_BASIC_DETAILS], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 1:
        this.router.navigate([Membershiptransactionconstant.GROUP_COMMUNICATION], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 2:
        this.router.navigate([Membershiptransactionconstant.GROUP_KYC], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }

  editMembershipDetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_BASIC_DETAILS], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
     
      case 1:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_KYC], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
        case 2:
          this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_COMMUNICATION], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
          break;
      case 3:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_LAND], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 4:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_NOMINEE], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 5:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_FAMILY_DETAILS], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 6:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_ASSET], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }

  concateAddressDetails(communicationDetailsModel : any){
    // Registered address
    if(communicationDetailsModel.stateName != null && communicationDetailsModel.stateName != undefined){
      this.addressOne = communicationDetailsModel.stateName;
    }
    if(this.addressOne != null && this.addressOne != null && communicationDetailsModel.districtName != null && communicationDetailsModel.districtName != undefined){
      this.addressOne = this.addressOne +","+communicationDetailsModel.districtName;
    }
    if(this.addressOne != null && this.addressOne != null &&  communicationDetailsModel.subDistrictName != null && communicationDetailsModel.subDistrictName != undefined){
      this.addressOne = this.addressOne +","+communicationDetailsModel.subDistrictName;
    }
    if(this.addressOne != null && this.addressOne != null &&  communicationDetailsModel.villageName != null && communicationDetailsModel.villageName != undefined){
      this.addressOne = this.addressOne +","+communicationDetailsModel.villageName;
    }
    if(this.addressOne != null && this.addressOne != null && communicationDetailsModel.pincode != null && communicationDetailsModel.pincode != undefined){
      this.addressOne = this.addressOne +","+communicationDetailsModel.pincode;
    }
    if(this.addressOne != null && this.addressOne != null && communicationDetailsModel.address1 != null && communicationDetailsModel.address1 != undefined){
      this.addressOne = this.addressOne +","+communicationDetailsModel.address1;
    }
    // permenent address
    if(communicationDetailsModel.permenentStateName != null && communicationDetailsModel.permenentStateName != undefined){
      this.addressTwo = communicationDetailsModel.permenentStateName;
    }
    if(this.addressTwo != null && this.addressTwo != null && communicationDetailsModel.permenentDistrictName != null && communicationDetailsModel.permenentDistrictName != undefined){
      this.addressTwo = this.addressTwo +","+communicationDetailsModel.permenentDistrictName;
    }
    if(this.addressTwo != null && this.addressTwo != null && communicationDetailsModel.permenentSubDistrictName != null && communicationDetailsModel.permenentSubDistrictName != undefined){
      
      this.addressTwo = this.addressTwo +","+communicationDetailsModel.permenentSubDistrictName;
    }
    if( this.addressTwo != null && this.addressTwo != null && communicationDetailsModel.permenentVillageName != null && communicationDetailsModel.permenentVillageName != undefined){
     
      this.addressTwo = this.addressTwo +","+communicationDetailsModel.permenentVillageName;
    }
    if(this.addressTwo != null && this.addressTwo != null && communicationDetailsModel.permntAddress1 != null && communicationDetailsModel.permntAddress1 != undefined){
      this.addressTwo = this.addressTwo +","+communicationDetailsModel.permntAddress1;
    }
//group permenent address details
    if(communicationDetailsModel.permntStateName != null && communicationDetailsModel.permntStateName != undefined){
      this.addressTwo = communicationDetailsModel.permntStateName;
    }
    if(this.addressTwo != null && this.addressTwo != null && communicationDetailsModel.permntDistrictName != null && communicationDetailsModel.permntDistrictName != undefined){
      this.addressTwo = this.addressTwo +","+communicationDetailsModel.permntDistrictName;
    }
    if(this.addressTwo != null && this.addressTwo != null && communicationDetailsModel.permntSubDistrictName != null && communicationDetailsModel.permntSubDistrictName != undefined){
      
      this.addressTwo = this.addressTwo +","+communicationDetailsModel.permntSubDistrictName;
    }
    if( this.addressTwo != null && this.addressTwo != null && communicationDetailsModel.permntVillageName != null && communicationDetailsModel.permntVillageName != undefined){
     
      this.addressTwo = this.addressTwo +","+communicationDetailsModel.permntVillageName;
    }
  }

  /**
   * @author k.yamuna
   * @implement onclose popup
   */
  closePhotoCopy() {
    this.memberPhotoCopyZoom = false;
  }

  /**
   * @implement Image Zoom POp up
   * @author k.yamuna
   */
  onClickMemberPhotoCopy(){
    this.memberPhotoCopyZoom = true;
  }

  /**
   * @author k.yamuna
   * @implements close photo dialogue
   */
  closePhoto(){
    this.memberPhotoCopyZoom = false;
  }

  onClickMemberIndividualMoreDetails(){
    this.membreIndividualFlag = true;
    if(this.memberBasicDetailsModel.subProductId == 1){
      this.showForm = true
    }
    else{
      this.showForm = false
    }
  
  }
  //group view more POp up flag
  viewMoreGroupDetails()
  {
    this.memberGroupBasicDetailsFlag= true;
  }
   //group view more POp up flag
   viewMoreInstitutionDetails()
   {
     this.memberInstitutionBasicDetailsFlag= true;
   }

 
  
}

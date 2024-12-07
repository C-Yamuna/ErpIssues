import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MemberGroupDetailsModel, MembershipBasicDetail, MembershipInstitutionDetailsModel, RdAccountNominee, RdKycModel } from '../../../shared/membership-basic-detail.model';
import { RdAccountCommunication, RdAccountGuardian, RdAccountsModel, RdRequiredDocuments } from '../../../shared/term-depost-model.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { RdAccountsService } from '../../../shared/rd-accounts.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { termdeposittransactionconstant } from '../../../term-deposit-transaction-constant';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Component({
  selector: 'app-rd-preview',
  templateUrl: './rd-preview.component.html',
  styleUrls: ['./rd-preview.component.css']
})
export class RdPreviewComponent {

  // responseModel!: Responsemodel;
  // msgs: any[] = [];
  // id: any;
  // rdAccId: any;
  // isView: any;
  // kycGridList: any[] = [];
  // orgnizationSetting: any;
  // veiwFalg: boolean = false;
  // individualFlag: boolean = false;
  // groupFlag: boolean = false;
  // institutionFlag: boolean = false;
  // addressOne: any;
  // addressTwo: any;
  // membershipBasicDetail: MembershipBasicDetail = new MembershipBasicDetail();
  // memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  // membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  // rdAccountCommunicationModel: RdAccountCommunication = new RdAccountCommunication();
  //rdAccountsModel:rdAccountsModel = newrdAccountsModel();
  // requiredDocumentDetails: RdRequiredDocuments = new RdRequiredDocuments();
  // rdKycModel: RdKycModel = new RdKycModel();
  // rdAccountNomineeModel: RdAccountNominee = new RdAccountNominee();
  // rdAccountGuardianModel: RdAccountGuardian = new RdAccountGuardian();
  // jointHoldersFlag: boolean = false;
  // jointHolderDetailsList: any = [];
  // requiredDocumentsList: any [] = [];


  // constructor(private router: Router,
  //   private rdAccountsService: RdAccountsService,
  //   private commonComponent: CommonComponent,
  //   private activateRoute: ActivatedRoute,
  //   private datePipe: DatePipe,
  //   private fileUploadService:FileUploadService,
  //   private encryptDecryptService: EncryptDecryptService) { }

  // ngOnInit() {
  //   this.orgnizationSetting = this.commonComponent.orgnizationSettings()
  //   this.activateRoute.queryParams.subscribe(params => {
  //     if (params['id'] != undefined && params['id'] != null) {
  //       this.id = this.encryptDecryptService.decrypt(params['id']);
  //       if (params['view'] != undefined && params['view'] != null)
  //         this.isView = Boolean(this.encryptDecryptService.decrypt(params['view']));
  //       if (this.isView != null && this.isView != undefined && this.isView == true)
  //         this.veiwFalg = true;
  //       else
  //         this.veiwFalg = false;
  //       if (this.id != null && this.id != undefined)
  //         this.rdAccId = Number(this.id);
  //       this.getRdAccountById(this.rdAccId);
  //     }
  //   });
  // }

  // // get fd non cummulative account preview by id
  // getRdAccountById(id: any) {
  //   this.rdAccountsService.getRdAccounts(id).subscribe((data: any) => {
  //     this.responseModel = data;
  //     if (this.responseModel != null && this.responseModel != undefined) {
  //       if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
  //         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
  //           this.rdAccountsModel = this.responseModel.data[0];
  //           if (this.rdAccountsModel != null && this.rdAccountsModel != undefined) {
  //             if (this.rdAccountsModel.depositDate != null && this.rdAccountsModel.depositDate != undefined)
  //               this.rdAccountsModel.depositDate = this.datePipe.transform(this.rdAccountsModel.depositDate, this.orgnizationSetting.datePipe);
  //             if (this.rdAccountsModel.memberTypeName != null && this.rdAccountsModel.memberTypeName != undefined) {
  //               if (this.rdAccountsModel.memberTypeName == 'Individual') {
  //                 this.individualFlag = true;
  //                 this.groupFlag = false;
  //                 this.institutionFlag = false;
  //               }
  //               else if (this.rdAccountsModel.memberTypeName == 'Group') {
  //                 this.groupFlag = true;
  //                 this.individualFlag = false;
  //                 this.institutionFlag = false;
  //               }
  //               else if (this.rdAccountsModel.memberTypeName == 'Institution') {
  //                 this.institutionFlag = true;
  //                 this.groupFlag = false;
  //                 this.individualFlag = false;
  //               }
  //             }
  //             // Membership Details
  //             if (this.rdAccountsModel.memberShipBasicDetailsDTO != null && this.rdAccountsModel.memberShipBasicDetailsDTO != undefined) {
  //               this.membershipBasicDetail = this.rdAccountsModel.memberShipBasicDetailsDTO;
  //               if (this.membershipBasicDetail.dob != null && this.membershipBasicDetail.dob != undefined) {
  //                 this.membershipBasicDetail.dob = this.datePipe.transform(this.membershipBasicDetail.dob, this.orgnizationSetting.datePipe);
  //               }
  //               if (this.membershipBasicDetail.admissionDate != null && this.membershipBasicDetail.admissionDate != undefined) {
  //                 this.membershipBasicDetail.admissionDate = this.datePipe.transform(this.membershipBasicDetail.admissionDate, this.orgnizationSetting.datePipe);
  //               }
  //             }
  //             // Group Details
  //             if (this.rdAccountsModel.memberShipGroupDetailsDTO != null && this.rdAccountsModel.memberShipGroupDetailsDTO != undefined) {
  //               this.memberGroupDetailsModel = this.rdAccountsModel.memberShipGroupDetailsDTO;
  //               if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
  //                 this.memberGroupDetailsModel.registrationDate = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
  //               }
  //               if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
  //                 this.memberGroupDetailsModel.admissionDate = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
  //               }
  //             }
  //             // Institution Details
  //             if (this.rdAccountsModel.memInstitutionDTO != null && this.rdAccountsModel.memInstitutionDTO != undefined) {
  //               this.membershipInstitutionDetailsModel = this.rdAccountsModel.memInstitutionDTO;
  //               if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
  //                 this.membershipInstitutionDetailsModel.registrationDate = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
  //               }
  //               if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
  //                 this.membershipInstitutionDetailsModel.admissionDate = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
  //               }
  //             }
  //             // Communication Details
  //             if (this.rdAccountsModel.rdAccountCommunicationDTOList[0]!= null && this.rdAccountsModel.rdAccountCommunicationDTOList[0] != undefined)
  //               this.rdAccountCommunicationModel = this.rdAccountsModel.rdAccountCommunicationDTOList[0];
  //             // Kyc Details
  //             if (this.rdAccountsModel.rdAccountKycList != null && this.rdAccountsModel.rdAccountKycList != undefined)
  //               this.kycGridList = this.rdAccountsModel.rdAccountKycList;
  //             // Nominee Details
  //             if (this.rdAccountsModel.termAccountNomineeList != null && this.rdAccountsModel.termAccountNomineeList != undefined &&
  //               this.rdAccountsModel.termAccountNomineeList[0] != null && this.rdAccountsModel.termAccountNomineeList[0] != undefined)
  //               this.rdAccountNomineeModel = this.rdAccountsModel.termAccountNomineeList[0];
  //             // Guardian Details
  //             if (this.rdAccountsModel.termAccountGaurdianList != null && this.rdAccountsModel.termAccountGaurdianList != undefined &&
  //               this.rdAccountsModel.termAccountGaurdianList[0] != null && this.rdAccountsModel.termAccountGaurdianList[0] != undefined)
  //               this.rdAccountGuardianModel = this.rdAccountsModel.termAccountGaurdianList[0];
  //             // Jiont holder Details
  //             if (this.rdAccountsModel.accountType == 2) {
  //               this.jointHoldersFlag = true;
  //               if (this.rdAccountsModel.tdJointAccHolderDetailsDTOList != null && this.rdAccountsModel.tdJointAccHolderDetailsDTOList != undefined) {
  //                 this.jointHolderDetailsList = this.rdAccountsModel.tdJointAccHolderDetailsDTOList;
  //               }
  //             }
  //             //Required Document
  //             if(this.rdAccountsModel.rdRequiredDocumentDetailsDTOList != null && this.rdAccountsModel.rdRequiredDocumentDetailsDTOList != undefined && this.rdAccountsModel.rdRequiredDocumentDetailsDTOList.length > 0 ){
  //               this.requiredDocumentsList = this.rdAccountsModel.rdRequiredDocumentDetailsDTOList;
  //               for (let document of this.requiredDocumentsList) {
  //                 if(document.requiredDocumentFilePath != null && document.requiredDocumentFilePath != undefined){
  //                   document.multipartFileList  = this.fileUploadService.getFile(document.requiredDocumentFilePath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + document.requiredDocumentFilePath);
  //                 }
  //               }
  //             }
  //           }
  //         }
  //         else {
  //           this.commonComponent.stopSpinner();
  //           this.msgs = [];
  //           this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
  //           setTimeout(() => {
  //             this.msgs = [];
  //           }, 2000);
  //         }
  //       }
  //     }
  //   }, (error: any) => {
  //     this.commonComponent.stopSpinner();
  //     this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
  //     setTimeout(() => {
  //       this.msgs = [];
  //     }, 2000);
  //   });
  // }


  // memberEdit() {
  //   this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_NEW_MEMBER], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
  // }
  // kycEdit() {
  //   if (this.rdAccountsModel.isNewMember)
  //     this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
  //   else
  //     this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_MEMBERSHIP_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
  // }
  // communicationEdit() {
  //   this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
  // }
  // applicationEdit() {
  //   this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_PRODUCT], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
  // }
  // jointHolderEdit() {
  //   this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_JOINTHOLDERDETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
  // }
  // nomineeEdit() {
  //   this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
  // }
  // navigateToGrid() {
  //   this.router.navigate([termdeposittransactionconstant.RECCURING_DEPOSITS]);
  // }
  // requiredDocumentsEdit(){
  //   this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
  // }
  // submit() {
  //   this.msgs = [];
  //   this.msgs = [{ severity: "success", detail: applicationConstants.RECURRING_DEPOSIT_PREVIEW }];
  //   setTimeout(() => {
  //     this.router.navigate([termdeposittransactionconstant.RECCURING_DEPOSITS]);
  //   }, 1500);
  // }


  responseModel!: Responsemodel;
  admissionNumber: any;
  msgs: any[] = [];
  id: any;
  rdAccId: any;
  isView: any;
  kycGridList: any[] = [];
  orgnizationSetting: any;
  veiwFalg: boolean = false;
  individualFlag: boolean = false;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  addressOne: any;
  addressTwo: any;
  //rdAccountsModel: FdCumulativeApplication = new FdCumulativeApplication();
  // rdAccountCommunicationModel: FdCumulativeCommunication = new FdCumulativeCommunication();
  // kycDetailsModel: FdCumulativeKyc = new FdCumulativeKyc();
  // rdAccountNomineeModel: FdCumulativeNominee = new FdCumulativeNominee();
  // rdAccountGuardianModel: MemberGuardianDetailsModelDetails = new MemberGuardianDetailsModelDetails();
  // membershipBasicDetail: NewMembershipAdd = new NewMembershipAdd();
  // memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  // membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();

  membershipBasicDetail: MembershipBasicDetail = new MembershipBasicDetail();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  rdAccountCommunicationModel: RdAccountCommunication = new RdAccountCommunication();
  rdAccountsModel: RdAccountsModel = new RdAccountsModel();
  requiredDocumentDetails: RdRequiredDocuments = new RdRequiredDocuments();
  rdKycModel: RdKycModel = new RdKycModel();
  rdAccountNomineeModel: RdAccountNominee = new RdAccountNominee();
  rdAccountGuardianModel: RdAccountGuardian = new RdAccountGuardian();
  kycDetailsColumns: any[] = [];
  serviceTypesColumns: any[] = [];
  serviceTypesGridList: any[] = [];
  nomineeMemberFullName: any;
  editOption: boolean = false;
  memberTypeName: any;
  preveiwFalg: any;
  flag: boolean = false;
  gardianFullName: any;
  promoterDetails: any;
  institutionPromoter: any;
  memberBasicDetailsFalg: boolean = false;
  memberGroupFlag: boolean = false;
  memberIntitutionFlag: boolean = false;
  memberPromoterDetails: any
  groupPromoterList: any[] = [];
  isNewMember: boolean = false;
  institutionPromoterFlag: boolean = false;
  groupPromotersPopUpFlag: boolean = false;
  requiredDocumentsList: any[] = [];
  jointHolderDetailsList: any;
  jointHoldersFlag: boolean = false;

  groupPrmotersList: any[] = [];
  institionPromotersList: any[] = [];
  columns: any[] = [];
  groupPrmoters: any[] = [];
  photoCopyFlag: boolean = true;
  signatureCopyFlag: boolean = true;
  memberPhotoCopyZoom: boolean = false;
  membreIndividualFlag: boolean = false;
  isKycApproved: any;
  guardainFormEnable: boolean = false;
  isShowSubmit: boolean = applicationConstants.FALSE;
  amountblock: any[] = [];
  age: any;
  memberTypeList: any[] = [];
  constructor(private router: Router,
    private rdAccountsService: RdAccountsService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService,
    private translate: TranslateService,
    private commonFunctionsService: CommonFunctionsService,
    private fileUploadService: FileUploadService) {
    this.amountblock = [
      { field: 'Service Type', header: 'SERVICE TYPE' },
      { field: 'Service Charges', header: 'SERVICE CHARGES' },
      { field: 'Requested Date', header: 'REQUESTED DATE' },
    ];
    this.kycDetailsColumns = [
      { field: 'effStartDate', header: 'Approved Date' },
      { field: 'statusName', header: 'Status Name' },
      { field: 'docPath', header: 'Documents' },
    ];
    this.serviceTypesColumns = [
      { field: 'serviceTypeName', header: 'ERP.SERVICE_TYPE' },
      { field: 'isChargeApplicableName', header: 'ERP.IS_CHARGE_APPLICAPABLE' },
      { field: 'chargesCollectionFrequencyName', header: 'ERP.FREQUENCY_TYPE' },
      { field: 'serviceCharges', header: 'ERP.SERVICE_CHARGES' },
      { field: 'requestDocPath', header: 'ERP.REQUESTED_DOC_PATH' },
      { field: 'statusName', header: 'ERP.STATUS' },

    ];
    this.columns = [
      { field: 'surname', header: 'SURNAME' },
      { field: 'name', header: 'NAME' },
      { field: 'operatorTypeName', header: 'operation Type Name' },
      { field: 'memDobVal', header: 'Date Of Birth' },
      { field: 'age', header: 'age' },
      { field: 'genderName', header: 'gender Name' },
      { field: 'maritalStatusName', header: 'marital status' },
      { field: 'mobileNumber', header: 'mobile Number' },
      { field: 'emailId', header: 'email' },
      { field: 'aadharNumber', header: 'aadhar' },
      { field: 'startDate', header: 'start date' },
    ];
    this.groupPrmoters = [
      { field: 'surname', header: 'surname' },
      { field: 'name', header: 'name' },
      { field: 'operatorTypeName', header: 'operation type name' },
      { field: 'memDobVal', header: 'member Date Of Birth' },
      { field: 'age', header: 'age' },
      { field: 'genderName', header: 'gender name' },
      { field: 'maritalStatusName', header: 'marital status' },
      { field: 'mobileNumber', header: 'mobile number' },
      { field: 'emailId', header: 'email' },
      { field: 'aadharNumber', header: 'aadhar' },
      { field: 'startDate', header: 'start date' },
    ];
  }

  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.translate.use(this.commonFunctionsService.getStorageValue('language'));
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined && params['editbutton'] != undefined) {
        let id = this.encryptDecryptService.decrypt(params['id']);
        // let type = this.encryptDecryptService.decrypt(params['memType']);
        let idEdit = this.encryptDecryptService.decrypt(params['editbutton']);
        this.rdAccId = Number(id);

        if (idEdit == "1")
          this.preveiwFalg = true
        else {
          this.preveiwFalg = false;
        }
        if (params['isGridPage'] != undefined && params['isGridPage'] != null) {
          let isGrid = this.encryptDecryptService.decrypt(params['isGridPage']);
          if (isGrid === "0") {
            this.isShowSubmit = applicationConstants.FALSE;
          } else {
            this.isShowSubmit = applicationConstants.TRUE;
          }
        }
        this.getRdAccountById();
      }
    })
  }
  backbutton() {
    this.router.navigate([termdeposittransactionconstant.RECCURING_DEPOSITS]);
  }
  submit() {
    this.msgs = [];
    this.msgs = [{ severity: "success", detail: applicationConstants.RECURRING_DEPOSIT_PREVIEW }];
    setTimeout(() => {
      this.router.navigate([termdeposittransactionconstant.RECCURING_DEPOSITS]);
    }, 1500);
  }
  getRdAccountById() {
    this.rdAccountsService.getRdAccounts(this.rdAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {


        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.rdAccountsModel = this.responseModel.data[0];
          if (this.rdAccountsModel.depositDate != null && this.rdAccountsModel.depositDate != undefined) {
            this.rdAccountsModel.depositDate = this.datePipe.transform(this.rdAccountsModel.depositDate, this.orgnizationSetting.datePipe);
          }
          if (this.rdAccountsModel.memberTypeName != null && this.rdAccountsModel.memberTypeName != undefined) {
            this.memberTypeName = this.rdAccountsModel.memberTypeName;
          }

          if (this.rdAccountsModel != null && this.rdAccountsModel != undefined) {
            if (this.rdAccountsModel.memberShipBasicDetailsDTO != undefined && this.rdAccountsModel.memberShipBasicDetailsDTO != null) {
              this.membershipBasicDetail = this.rdAccountsModel.memberShipBasicDetailsDTO;
              if (this.membershipBasicDetail.isNewMember != null && this.membershipBasicDetail.isNewMember != undefined) {
                this.isNewMember = this.membershipBasicDetail.isNewMember;
              }
              if (this.membershipBasicDetail.dob != null && this.membershipBasicDetail.dob != undefined) {
                this.membershipBasicDetail.dobVal = this.datePipe.transform(this.membershipBasicDetail.dob, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicDetail.admissionDate != null && this.membershipBasicDetail.admissionDate != undefined) {
                this.membershipBasicDetail.admissionDateVal = this.datePipe.transform(this.membershipBasicDetail.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicDetail.photoCopyPath != null && this.membershipBasicDetail.photoCopyPath != undefined) {
                this.membershipBasicDetail.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicDetail.photoCopyPath, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicDetail.photoCopyPath);
              }
              else {
                this.photoCopyFlag = false;
              }
              if (this.membershipBasicDetail.signatureCopyPath != null && this.membershipBasicDetail.signatureCopyPath != undefined) {
                this.membershipBasicDetail.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicDetail.signatureCopyPath, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicDetail.signatureCopyPath);
              }
              else {
                this.signatureCopyFlag = false;
              }
              if (this.membershipBasicDetail.isStaff != null && this.membershipBasicDetail.isStaff != undefined && this.membershipBasicDetail.isStaff) {
                this.membershipBasicDetail.isStaff = applicationConstants.YES;
              }
              else {
                this.membershipBasicDetail.isStaff = applicationConstants.NO;
              }
              if (this.membershipBasicDetail.isKycApproved != null && this.membershipBasicDetail.isKycApproved != undefined && this.membershipBasicDetail.isKycApproved) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
              if (this.responseModel.data[0].memberShipBasicDetailsDTO.age != null && this.responseModel.data[0].memberShipBasicDetailsDTO.age != undefined) {
                this.age = this.responseModel.data[0].memberShipBasicDetailsDTO.age;
                if (this.age < 18) {
                  this.guardainFormEnable = true;
                }
              }
            }
            if (this.rdAccountsModel.memberShipGroupDetailsDTO != undefined && this.rdAccountsModel.memberShipGroupDetailsDTO != null) {
              this.memberGroupDetailsModel = this.rdAccountsModel.memberShipGroupDetailsDTO;
              if (this.memberGroupDetailsModel.isNewMember != null && this.memberGroupDetailsModel.isNewMember != undefined) {
                this.isNewMember = this.membershipBasicDetail.isNewMember;
              }
              if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined && this.memberGroupDetailsModel.groupPromoterList.length > 0) {
                this.groupPrmotersList = this.memberGroupDetailsModel.groupPromoterList;
              }
              if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
                this.memberGroupDetailsModel.registrationDate = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
                this.memberGroupDetailsModel.admissionDate = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
            }
          }
          if (this.rdAccountsModel.memInstitutionDTO != undefined && this.rdAccountsModel.memInstitutionDTO != null) {
            this.membershipInstitutionDetailsModel = this.rdAccountsModel.memInstitutionDTO;
            if (this.membershipInstitutionDetailsModel.isNewMember != null && this.membershipInstitutionDetailsModel.isNewMember != undefined) {
              this.isNewMember = this.membershipBasicDetail.isNewMember;
            }
            if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
              this.membershipInstitutionDetailsModel.registrationDate = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
            }
            if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
              this.membershipInstitutionDetailsModel.admissionDate = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
            }
            if (this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined && this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0) {
              this.institionPromotersList = this.membershipInstitutionDetailsModel.institutionPromoterList;
            }
            if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined) {
              this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
            }
            else {
              this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
            }
          }
          if (this.rdAccountsModel.rdAccountCommunicationDTOList != null && this.rdAccountsModel.rdAccountCommunicationDTOList != undefined &&
            this.rdAccountsModel.rdAccountCommunicationDTOList[0] != null && this.rdAccountsModel.rdAccountCommunicationDTOList[0] != undefined)
            this.rdAccountCommunicationModel = this.rdAccountsModel.rdAccountCommunicationDTOList[0];

          if (this.rdAccountsModel.rdAccountKycList != null && this.rdAccountsModel.rdAccountKycList != undefined) {
            this.kycGridList = this.rdAccountsModel.rdAccountKycList;
            for(let kyc of this.kycGridList){
              kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
              if(kyc.multipartFileList != null && kyc.multipartFileList != undefined){
                kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
              }
            }
          }

          if (this.rdAccountsModel.termAccountNomineeList != null && this.rdAccountsModel.termAccountNomineeList != undefined &&
            this.rdAccountsModel.termAccountNomineeList[0] != null && this.rdAccountsModel.termAccountNomineeList[0] != undefined)
            this.rdAccountNomineeModel = this.rdAccountsModel.termAccountNomineeList[0];
          if (this.rdAccountNomineeModel.nomineeFilePath != null && this.rdAccountNomineeModel.nomineeFilePath != undefined) {
            this.rdAccountNomineeModel.nomineeMultiPartList = this.fileUploadService.getFile(this.rdAccountNomineeModel.nomineeFilePath, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.rdAccountNomineeModel.nomineeFilePath);
          }

          if (this.rdAccountsModel.termAccountGaurdianList != null && this.rdAccountsModel.termAccountGaurdianList != undefined &&
            this.rdAccountsModel.termAccountGaurdianList[0] != null && this.rdAccountsModel.termAccountGaurdianList[0] != undefined)
            this.rdAccountGuardianModel = this.rdAccountsModel.termAccountGaurdianList[0];
          if (this.rdAccountGuardianModel.uploadFilePath != null && this.rdAccountGuardianModel.uploadFilePath != undefined) {
            this.rdAccountGuardianModel.guardainMultipartList = this.fileUploadService.getFile(this.rdAccountGuardianModel.uploadFilePath, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.rdAccountGuardianModel.uploadFilePath);
          }
          if (this.rdAccountsModel.accountTypeName != null && this.rdAccountsModel.accountTypeName != undefined && this.rdAccountsModel.accountTypeName === "Joint") {
            this.jointHoldersFlag = true;
          }
          if (this.rdAccountsModel.tdJointAccHolderDetailsDTOList != null && this.rdAccountsModel.tdJointAccHolderDetailsDTOList != undefined && this.rdAccountsModel.tdJointAccHolderDetailsDTOList.length > 0) {
            this.jointHoldersFlag = true;
            this.jointHolderDetailsList = this.rdAccountsModel.tdJointAccHolderDetailsDTOList;
          }
          if(this.rdAccountsModel.rdRequiredDocumentDetailsDTOList != null && this.rdAccountsModel.rdRequiredDocumentDetailsDTOList != undefined && this.rdAccountsModel.rdRequiredDocumentDetailsDTOList.length > 0 ){
            this.requiredDocumentsList = this.rdAccountsModel.rdRequiredDocumentDetailsDTOList;
            for (let document of this.requiredDocumentsList) {
              if(document.requiredDocumentFilePath != null && document.requiredDocumentFilePath != undefined){
                document.multipartFileList  = this.fileUploadService.getFile(document.requiredDocumentFilePath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + document.requiredDocumentFilePath);
              }
            }
          }
        }
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, (error: any) => {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });

  }

  applicationEdit(rowData: any) {
    if (rowData.accountTypeName == "Joint") {
      this.flag = true;
    }
    else {
      this.flag = false;
    }
    this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_PRODUCT], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  communicationEdit(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }
  kycEdit(rowData: any) {
    if (this.isNewMember) {
      this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
    else {
      this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_MEMBERSHIP_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });

    }
  }

  nomineeEdit(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), preview: this.encryptDecryptService.encrypt(true) } });
  }


  editMembership(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_NEW_MEMBER], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editJointHolder(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_JOINTHOLDERDETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editRequiredDocuments(rowData : any){
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  onClick() {
    this.institutionPromoterFlag = true;

  }
  onClickOfGroupPromotes() {
    this.groupPromotersPopUpFlag = true;
  }

  close() {
    this.institutionPromoterFlag = false;
    this.groupPromotersPopUpFlag = false;
    this.membreIndividualFlag = false;
  }

  /**
   * @author bhargavi
   * @implement onclose popup
   */
  closePhotoCopy() {
    this.memberPhotoCopyZoom = false;
  }

  /**
   * @implement Image Zoom POp up
   * @author bhargavi
   */
  onClickMemberPhotoCopy() {
    this.memberPhotoCopyZoom = true;
  }

  /**
   * @author bhargavi
   * @implements close photo dialogue
   */
  closePhoto() {
    this.memberPhotoCopyZoom = false;
  }

  onClickMemberIndividualMoreDetails() {
    this.membreIndividualFlag = true;
  }
}

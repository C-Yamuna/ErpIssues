import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MemberGroupDetailsModel, MembershipInstitutionDetailsModel, NewMembershipAdd } from '../new-membership-add/shared/new-membership-add.model';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DatePipe } from '@angular/common';
import { termdeposittransactionconstant } from '../../../term-deposit-transaction-constant';
import { FdCumulativeNominee, MemberGuardianDetailsModelDetails } from '../fd-cumulative-nominee/shared/fd-cumulative-nominee.model';
import { FdCumulativeKyc } from '../fd-cumulative-kyc/shared/fd-cumulative-kyc.model';
import { FdCumulativeCommunication } from '../fd-cumulative-communication/shared/fd-cumulative-communication.model';
import { FdCumulativeApplication } from '../fd-cumulative-application/shared/fd-cumulative-application.model';
import { FdCumulativeApplicationService } from '../fd-cumulative-application/shared/fd-cumulative-application.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Component({
  selector: 'app-fd-cumulative-preview',
  templateUrl: './fd-cumulative-preview.component.html',
  styleUrls: ['./fd-cumulative-preview.component.css']
})
export class FdCumulativePreviewComponent {

  responseModel!: Responsemodel;
  admissionNumber: any;
  msgs: any[] = [];
  id: any;
  fdNonCummulativeAccId: any;
  isView: any;
  kycGridList: any[] = [];
  orgnizationSetting: any;
  veiwFalg: boolean = false;
  individualFlag: boolean = false;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  addressOne: any;
  addressTwo: any;
  fdCumulativeApplicationModel: FdCumulativeApplication = new FdCumulativeApplication();
  fdCumulativeCommunicationModel: FdCumulativeCommunication = new FdCumulativeCommunication();
  kycDetailsModel: FdCumulativeKyc = new FdCumulativeKyc();
  nomineeDetailsModel: FdCumulativeNominee = new FdCumulativeNominee();
  memberGuardianDetailsModel: MemberGuardianDetailsModelDetails = new MemberGuardianDetailsModelDetails();
  membershipBasicRequiredDetailsModel: NewMembershipAdd = new NewMembershipAdd();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();

  kycDetailsColumns: any[]= [];
  serviceTypesColumns: any[]= [];
  serviceTypesGridList :any [] = [];
  nomineeMemberFullName: any;
  editOption: boolean = false;
  memberTypeName: any;
  preveiwFalg: any;
  flag: boolean = false;
  gardianFullName: any;
  promoterDetails: any;
  institutionPromoter: any;
  memberBasicDetailsFalg: boolean = false;
  memberGroupFlag:boolean = false;
  memberIntitutionFlag:boolean = false;
  memberPromoterDetails : any
  groupPromoterList : any [] = [];
  isNewMember: boolean = false;
  institutionPromoterFlag: boolean = false;
  groupPromotersPopUpFlag: boolean= false;
  requiredDocumentsList: any [] = [];
  jointHolderDetailsList: any;
  jointHoldersFlag: boolean = false;
  
  groupPrmotersList: any[]=[];
  institutionPrmotersList: any[]=[];
  institutionPrmoters: any[] = [];
  groupPrmoters : any[] = [];
  photoCopyFlag: boolean = true;
  signatureCopyFlag: boolean = true;
  memberPhotoCopyZoom: boolean = false;
  membreIndividualFlag: boolean = false;
  isKycApproved : any;
  guardainFormEnable: boolean = false;
  isShowSubmit: boolean =applicationConstants.FALSE;
  amountblock: any[] = [];
  age: any;
  memberTypeList: any[] = [];
  constructor(private router: Router,
    private fdCumulativeApplicationService: FdCumulativeApplicationService,
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
      this.institutionPrmoters = [
        { field: 'surname', header: 'surname' },
        { field: 'name', header: 'name' },
        { field: 'operatorTypeName', header: 'operation type name' },
        { field: 'memDobVal', header: 'member Date Of Birth' },
        { field: 'age', header: 'age' },
        { field: 'genderTypeName', header: 'gender name' },
        { field: 'maritalStatusName', header: 'marital status' },
        { field: 'mobileNumber', header: 'mobile number' },
        { field: 'emailId', header: 'email' },
        { field: 'aadharNumber', header: 'aadhar' },
        { field: 'startDateVal', header: 'start date' },
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
        { field: 'startDateVal', header: 'start date' },
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
          this.fdNonCummulativeAccId = Number(id);
  
          if (idEdit == "1")
            this.preveiwFalg = true
          else{
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
            this.getFdCummApplicationById();
        } 
      })
    }
    backbutton() {
        this.router.navigate([termdeposittransactionconstant.FD_CUMMULATIVE]);
    }
    submit(){
      this.msgs = [];  
      this.msgs = [{ severity: "success", detail:  applicationConstants.FD_CUMMULATIVE_PREVIEW }];
    setTimeout(() => {
      this.router.navigate([termdeposittransactionconstant.FD_CUMMULATIVE]);
    }, 1500);
    }
    getFdCummApplicationById() {
      this.fdCumulativeApplicationService.getFdCummApplicationById( this.fdNonCummulativeAccId ).subscribe((data: any) => {
        this.responseModel = data;
        if(this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS){

        
        if(this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined){
          this.fdCumulativeApplicationModel = this.responseModel.data[0];
          if (this.fdCumulativeApplicationModel.depositDate != null && this.fdCumulativeApplicationModel.depositDate != undefined) {
            this.fdCumulativeApplicationModel.depositDate = this.datePipe.transform(this.fdCumulativeApplicationModel.depositDate, this.orgnizationSetting.datePipe);
          }
          if(this.fdCumulativeApplicationModel.memberTypeName != null && this.fdCumulativeApplicationModel.memberTypeName != undefined){
            this.memberTypeName = this.fdCumulativeApplicationModel.memberTypeName;
          }
          if(this.fdCumulativeApplicationModel != null && this.fdCumulativeApplicationModel != undefined){
            if(this.fdCumulativeApplicationModel.memberShipBasicDetailsDTO != undefined && this.fdCumulativeApplicationModel.memberShipBasicDetailsDTO != null){
              this.membershipBasicRequiredDetailsModel = this.fdCumulativeApplicationModel.memberShipBasicDetailsDTO;
              if(this.membershipBasicRequiredDetailsModel.isNewMember != null && this.membershipBasicRequiredDetailsModel.isNewMember != undefined){
                this.isNewMember = this.membershipBasicRequiredDetailsModel.isNewMember;
              }
              if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined) {
                this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined) {
                this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicRequiredDetailsModel.photoPath != null && this.membershipBasicRequiredDetailsModel.photoPath != undefined) {
                this.membershipBasicRequiredDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.photoPath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.photoPath  );
              }
              else{
                this.photoCopyFlag = false;
              }
              if (this.membershipBasicRequiredDetailsModel.signaturePath != null && this.membershipBasicRequiredDetailsModel.signaturePath != undefined) {
                  this.membershipBasicRequiredDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.signaturePath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.signaturePath  );
              }
              else{
                this.signatureCopyFlag = false;
              }
              if (this.membershipBasicRequiredDetailsModel.isStaff != null && this.membershipBasicRequiredDetailsModel.isStaff != undefined && this.membershipBasicRequiredDetailsModel.isStaff) {
                this.membershipBasicRequiredDetailsModel.isStaff = applicationConstants.YES;
              }
              else{
                this.membershipBasicRequiredDetailsModel.isStaff = applicationConstants.NO;
              }
              if (this.membershipBasicRequiredDetailsModel.isKycApproved != null && this.membershipBasicRequiredDetailsModel.isKycApproved != undefined && this.membershipBasicRequiredDetailsModel.isKycApproved) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
                if(this.responseModel.data[0].memberShipBasicDetailsDTO.age != null && this.responseModel.data[0].memberShipBasicDetailsDTO.age != undefined){
            this.age = this.responseModel.data[0].memberShipBasicDetailsDTO.age;
            if(this.age < 18){
              this.guardainFormEnable = true;
            }
          }
            }
            if(this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO != undefined && this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO != null){
              this.memberGroupDetailsModel = this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO;
              if(this.memberGroupDetailsModel.isNewMember != null && this.memberGroupDetailsModel.isNewMember != undefined){
                this.isNewMember =  this.memberGroupDetailsModel.isNewMember;
              }
              if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined && this.memberGroupDetailsModel.groupPromoterList.length > 0) {
                this.groupPrmotersList=this.memberGroupDetailsModel.groupPromoterList ;
              }
              if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
                this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
                this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined && this.memberGroupDetailsModel.groupPromoterList.length > 0) {
                this.groupPrmotersList = this.memberGroupDetailsModel.groupPromoterList.map((member: any) => {
                  if(member != null && member != undefined){
                    if(member.dob != null && member.dob != undefined){
                      member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
                      }
                    if(member.startDate != null && member.startDate != undefined){
                      member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);
                      }
                     
                     
                     
                  }
                  return member;
                });
                  if(this.memberGroupDetailsModel.memberTypeName != null && this.memberGroupDetailsModel.memberTypeName != undefined){
                    this.fdCumulativeApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
                  }
                  if(this.memberGroupDetailsModel != null && this.memberGroupDetailsModel != undefined){
                  this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO = this.memberGroupDetailsModel;
                  }
              }
              if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
            }
            }
            if(this.fdCumulativeApplicationModel.memInstitutionDTO != undefined && this.fdCumulativeApplicationModel.memInstitutionDTO != null){
              this.membershipInstitutionDetailsModel = this.fdCumulativeApplicationModel.memInstitutionDTO;
              if(this.membershipInstitutionDetailsModel.isNewMember != null && this.membershipInstitutionDetailsModel.isNewMember != undefined){
                this.isNewMember =  this.membershipInstitutionDetailsModel.isNewMember;
              }
              if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
                this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
                this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined && this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0) {
                this.institutionPrmotersList=this.membershipInstitutionDetailsModel.institutionPromoterList ;
              }
              if (this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined && this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0) {
                this.institutionPrmotersList = this.membershipInstitutionDetailsModel.institutionPromoterList.map((member: any) => {
                  if(member != null && member != undefined){
                    if(member.dob != null && member.dob != undefined){
                      member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
                      }
                    if(member.startDate != null && member.startDate != undefined){
                      member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);
                      }
                  }
                  return member;
                });
                  if(this.memberGroupDetailsModel.memberTypeName != null && this.memberGroupDetailsModel.memberTypeName != undefined){
                    this.fdCumulativeApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
                  }
                  if(this.memberGroupDetailsModel != null && this.memberGroupDetailsModel != undefined){
                  this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO = this.memberGroupDetailsModel;
                  }
              }
              if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
            }
            if (this. fdCumulativeApplicationModel.fdCummulativeAccountCommunicationList != null && this. fdCumulativeApplicationModel. fdCummulativeAccountCommunicationList != undefined && 
              this. fdCumulativeApplicationModel. fdCummulativeAccountCommunicationList[0] != null && this. fdCumulativeApplicationModel. fdCummulativeAccountCommunicationList[0] != undefined)
              this.fdCumulativeCommunicationModel = this. fdCumulativeApplicationModel. fdCummulativeAccountCommunicationList[0];

            if(this.fdCumulativeApplicationModel.fdCummulativeAccountKycList != null && this.fdCumulativeApplicationModel.fdCummulativeAccountKycList != undefined){
                this.kycGridList = this.fdCumulativeApplicationModel.fdCummulativeAccountKycList;
                for(let kyc of this.kycGridList){
                  kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                  if(kyc.multipartFileList != null && kyc.multipartFileList != undefined){
                    kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                  }
                }
            }
           
            if (this. fdCumulativeApplicationModel.fdCummulativeAccountNomineeList != null && this. fdCumulativeApplicationModel.fdCummulativeAccountNomineeList != undefined &&
              this. fdCumulativeApplicationModel.fdCummulativeAccountNomineeList[0] != null && this. fdCumulativeApplicationModel.fdCummulativeAccountNomineeList[0] != undefined)
              this.nomineeDetailsModel = this. fdCumulativeApplicationModel.fdCummulativeAccountNomineeList[0];
              if(this.nomineeDetailsModel.signedCopyPath != null && this.nomineeDetailsModel.signedCopyPath != undefined){
                this.nomineeDetailsModel.nomineeSighnedFormMultiPartList =  this.fileUploadService.getFile(this.nomineeDetailsModel.signedCopyPath , ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.nomineeDetailsModel.signedCopyPath);
              }
           
              if (this. fdCumulativeApplicationModel.fdCummulativeAccountGaurdianList != null && this. fdCumulativeApplicationModel.fdCummulativeAccountGaurdianList != undefined &&
                this. fdCumulativeApplicationModel.fdCummulativeAccountGaurdianList[0] != null && this. fdCumulativeApplicationModel.fdCummulativeAccountGaurdianList[0] != undefined)
                this.memberGuardianDetailsModel = this. fdCumulativeApplicationModel.fdCummulativeAccountGaurdianList[0];
                if(this.memberGuardianDetailsModel.signedCopyPath != null && this.memberGuardianDetailsModel.signedCopyPath != undefined){
                  this.memberGuardianDetailsModel.guardainSighnedMultipartFiles =  this.fileUploadService.getFile(this.memberGuardianDetailsModel.signedCopyPath , ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberGuardianDetailsModel.signedCopyPath);
                }
            if (this.fdCumulativeApplicationModel.accountTypeName != null && this.fdCumulativeApplicationModel.accountTypeName != undefined && this.fdCumulativeApplicationModel.accountTypeName === "Joint" ) {
              this.jointHoldersFlag = true;
            }
            if(this.fdCumulativeApplicationModel.fdCummulativeJointAccHolderDetailsDTOList != null   && this.fdCumulativeApplicationModel.fdCummulativeJointAccHolderDetailsDTOList != undefined && this.fdCumulativeApplicationModel.fdCummulativeJointAccHolderDetailsDTOList.length > 0 ){
              this.jointHoldersFlag = true;
              this.jointHolderDetailsList = this.fdCumulativeApplicationModel.fdCummulativeJointAccHolderDetailsDTOList;
            }
          }
        }else{
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },(error: any)=>{
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  
    }
  
    applicationEdit(rowData: any) {
      if(rowData.accountTypeName == "Joint"){
      this.flag = true;
    }
    else {
      this.flag = false;
    }
      this.router.navigate([termdeposittransactionconstant.FD_CUMM_APPLICATION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id)} });
    }
  
    communicationEdit(rowData: any) {
      this.router.navigate([termdeposittransactionconstant.FD_CUMM_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
    kycEdit(rowData: any) {
      if(this.isNewMember){
      this.router.navigate([termdeposittransactionconstant.FD_CUMM_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
      }
      else{
        this.router.navigate([termdeposittransactionconstant.MEMBERSHIP_DETAIL], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  
      }
    }
  
    nomineeEdit(rowData: any) {
      this.router.navigate([termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) , preview: this.encryptDecryptService.encrypt(true) } });
    }
    
   
    editMembership(rowData : any){
      this.router.navigate([termdeposittransactionconstant.NEW_MEMBERSHIPS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
    
    editJointHolder(rowData : any){
      this.router.navigate([termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_JOINTHOLDERDETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
  
    onClick(){
      this.institutionPromoterFlag = true;
      
    }
    onClickOfGroupPromotes(){
      this.groupPromotersPopUpFlag = true;
    }
  
    close(){
      this.institutionPromoterFlag = false;
      this.groupPromotersPopUpFlag = false;
      this.membreIndividualFlag = false;
    }
  
    /**
     * @implement onclose popup
     */
    closePhotoCopy() {
      this.memberPhotoCopyZoom = false;
    }
  
    /**
     * @implement Image Zoom POp up
     */
    onClickMemberPhotoCopy(){
      this.memberPhotoCopyZoom = true;
    }
  
    /**
     * @implements close photo dialogue
     */
    closePhoto(){
      this.memberPhotoCopyZoom = false;
    }
  
    onClickMemberIndividualMoreDetails(){
      this.membreIndividualFlag = true;
    }
}

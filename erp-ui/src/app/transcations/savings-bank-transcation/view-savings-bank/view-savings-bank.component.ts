import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { savingsbanktransactionconstant } from '../savingsbank-transaction-constant';
import { SavingsAccountService } from '../shared/savings-account.service';
import { CommunicationDetailsModel, KycDetailsModel, NomineeDetailsModel, ViewSavingBankModel } from './shared/view-saving-bank-model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel } from '../savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { MemberGuardianDetailsModelDetaila } from '../savings-bank-account-creation-stepper/savings-bank-nominee/shared/savings-bank-nominee-model';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-savings-bank',
  templateUrl: './view-savings-bank.component.html',
  styleUrls: ['./view-savings-bank.component.css']
})
export class ViewSavingsBankComponent {
  amountblock: any[] = [];
  admissionNumber: any;
  id: any;
  viewSavingBankModel : ViewSavingBankModel = new ViewSavingBankModel();
  communicationDetailsModel : CommunicationDetailsModel = new CommunicationDetailsModel();
  kycDetailsModel : KycDetailsModel = new KycDetailsModel();
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGuardianDetailsModelDetails: MemberGuardianDetailsModelDetaila = new MemberGuardianDetailsModelDetaila();

  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  admissionDetails: FormGroup ; 
  kycDetailsColumns: any[]= [];
  kycGridList : any [] = []
  serviceTypesColumns: any[]= [];
  serviceTypesGridList :any [] = [];
  nomineeDetailsModel : NomineeDetailsModel = new NomineeDetailsModel();
  nomineeMemberFullName: any;
  editOption: boolean = false;
  memberTypeName: any;
  preveiwFalg: any;
  flag: boolean = false;
  addressOne: any;
  addressTwo: any;
  gardianFullName: any;
  orgnizationSetting: any;
  promoterDetails: any;
  institutionPromoter: any;
  memberBasicDetailsFalg: boolean = false;
  memberGroupFlag:boolean = false;
  memberIntitutionFlag:boolean = false;
  memberPromoterDetails : any
  groupPromoterList : any [] = [];
  sbAccId: any;
  isNewMember: boolean = false;
  institutionPromoterFlag: boolean = false;
  groupPromotersPopUpFlag: boolean= false;
  requiredDocumentsList: any [] = [];
  jointHolderDetailsList: any;
  jointHoldersFlag: boolean = false;
  
  groupPrmotersList: any[]=[];
  institionPromotersList: any[]=[];
  columns: any[] = [];
  groupPrmoters : any[] = [];
  photoCopyFlag: boolean = true;
  signatureCopyFlag: boolean = true;
  memberPhotoCopyZoom: boolean = false;
  membreIndividualFlag: boolean = false;
  isKycApproved : any;
  guardainFormEnable: boolean = false;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private router: Router, private formBuilder:FormBuilder , private savingsAccountService: SavingsAccountService ,private commonComponent : CommonComponent  ,private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService , private commonFunctionsService :CommonFunctionsService ,private datePipe: DatePipe ,private fileUploadService :FileUploadService , private translate: TranslateService) { 
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
      { field: 'serviceCharges', header: 'ERP.SERVICE_CHARGES'},
      { field: 'requestDocPath', header: 'ERP.FILE' },
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
    this.admissionDetails = this.formBuilder.group({
      admissionNumber: ['', [Validators.required, Validators.minLength(3)]],
      templatepath: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required, Validators.minLength(18)]],
      statusName: ['', [Validators.required, Validators.min(18)]]
    });
  }

  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.translate.use(this.commonFunctionsService.getStorageValue('language'));
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined && params['editOpt'] != undefined) {
         let id = this.encryptDecryptService.decrypt(params['id']);
        // let type = this.encryptDecryptService.decrypt(params['memType']);
        let idEdit = this.encryptDecryptService.decrypt(params['editOpt']);
        this.sbAccId = Number(id);

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
          this.getSavingBankPreviewDetails();
      } 
    })
  }
  backbutton() {
      this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
  }
  submit(){
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.VIEW_SB_APPLICATION }];
  setTimeout(() => {
    this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
  }, 1500);
  }
  getSavingBankPreviewDetails() {
    this.savingsAccountService.getSavingsAccountDetailsById( this.sbAccId ).subscribe((data: any) => {
      this.responseModel = data;
      if(this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS){
      if(this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined){
        this.viewSavingBankModel = this.responseModel.data[0];
        if (this.viewSavingBankModel.accountOpenDate != null && this.viewSavingBankModel.accountOpenDate != undefined) {
          this.viewSavingBankModel.accountOpenDateVal = this.datePipe.transform(this.viewSavingBankModel.accountOpenDate, this.orgnizationSetting.datePipe);
        }
        if(this.viewSavingBankModel.memberTypeName != null && this.viewSavingBankModel.memberTypeName != undefined){
          this.memberTypeName = this.viewSavingBankModel.memberTypeName;
        }
        if(this.viewSavingBankModel.age != null && this.viewSavingBankModel.age != undefined && this.viewSavingBankModel.age < 18){
          this.guardainFormEnable = true;
        }
        if(this.viewSavingBankModel != null && this.viewSavingBankModel != undefined){
          if(this.viewSavingBankModel.memberShipBasicDetailsDTO != undefined && this.viewSavingBankModel.memberShipBasicDetailsDTO != null){
            this.membershipBasicRequiredDetails = this.viewSavingBankModel.memberShipBasicDetailsDTO;
            if(this.membershipBasicRequiredDetails.isNewMember != null && this.membershipBasicRequiredDetails.isNewMember != undefined){
              this.isNewMember = this.membershipBasicRequiredDetails.isNewMember;
            }
            if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
              this.membershipBasicRequiredDetails.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
            }
            if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
              this.membershipBasicRequiredDetails.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
            }
            if (this.membershipBasicRequiredDetails.photoCopyPath != null && this.membershipBasicRequiredDetails.photoCopyPath != undefined) {
              this.membershipBasicRequiredDetails.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.photoCopyPath  );
            }
            else{
              this.photoCopyFlag = false;
            }
            if (this.membershipBasicRequiredDetails.signatureCopyPath != null && this.membershipBasicRequiredDetails.signatureCopyPath != undefined) {
                this.membershipBasicRequiredDetails.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.signatureCopyPath  );
            }
            else{
              this.signatureCopyFlag = false;
            }
            if (this.membershipBasicRequiredDetails.isStaff != null && this.membershipBasicRequiredDetails.isStaff != undefined && this.membershipBasicRequiredDetails.isStaff) {
              this.membershipBasicRequiredDetails.isStaff = applicationConstants.YES;
            }
            else{
              this.membershipBasicRequiredDetails.isStaff = applicationConstants.NO;
            }
            if (this.membershipBasicRequiredDetails.isKycApproved != null && this.membershipBasicRequiredDetails.isKycApproved != undefined && this.membershipBasicRequiredDetails.isKycApproved) {
              this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
            }
            else {
              this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
            }
          }
          if(this.viewSavingBankModel.groupDetailsDTO != undefined && this.viewSavingBankModel.groupDetailsDTO != null){
            this.memberGroupDetailsModel = this.viewSavingBankModel.groupDetailsDTO;
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
            if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined) {
              this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
            }
            else {
              this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
            }
        }
          }
          if(this.viewSavingBankModel.institutionDTO != undefined && this.viewSavingBankModel.institutionDTO != null){
            this.membershipInstitutionDetailsModel = this.viewSavingBankModel.institutionDTO;
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
              this.institionPromotersList=this.membershipInstitutionDetailsModel.institutionPromoterList ;
            }
            if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined) {
              this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
            }
            else {
              this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
            }
          }
          if(this.viewSavingBankModel.sbCommunicationDTO != null && this.viewSavingBankModel.sbCommunicationDTO != undefined){
              this.communicationDetailsModel= this.viewSavingBankModel.sbCommunicationDTO;
          }
          if(this.viewSavingBankModel.requiredDocumentDetailsDTOList != null && this.viewSavingBankModel.requiredDocumentDetailsDTOList != undefined && this.viewSavingBankModel.requiredDocumentDetailsDTOList.length > 0 ){
            this.requiredDocumentsList = this.viewSavingBankModel.requiredDocumentDetailsDTOList;
            for (let document of this.requiredDocumentsList) {
              if(document.requiredDocumentFilePath != null && document.requiredDocumentFilePath != undefined){
                document.multipartFileList  = this.fileUploadService.getFile(document.requiredDocumentFilePath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + document.requiredDocumentFilePath);
              }
            }
          }
          if(this.viewSavingBankModel.kycList != null && this.viewSavingBankModel.kycList != undefined){
              this.kycGridList = this.viewSavingBankModel.kycList;
              for (let kyc of this.kycGridList) {
                if(kyc.kycFilePath != null && kyc.kycFilePath != undefined){
                  if(kyc.kycFilePath != null && kyc.kycFilePath != undefined){
                    kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);

                  }
                }  
              }
          }
          if(this.viewSavingBankModel.sbAccountServicesOptedDTOList != null && this.viewSavingBankModel.sbAccountServicesOptedDTOList != undefined)
              this.serviceTypesGridList = this.viewSavingBankModel.sbAccountServicesOptedDTOList;
          if(this.viewSavingBankModel.sbNomineeDTO != null && this.viewSavingBankModel.sbNomineeDTO != undefined)
              this.nomineeDetailsModel = this.viewSavingBankModel.sbNomineeDTO;
          if(this.nomineeDetailsModel.name != null && this.nomineeDetailsModel.name != undefined && this.nomineeDetailsModel.surname != null && this.nomineeDetailsModel.surname != undefined )
              this.nomineeMemberFullName = this.nomineeDetailsModel.name + this.nomineeDetailsModel.surname ; 
            if(this.nomineeDetailsModel.signedNomineeForm != null && this.nomineeDetailsModel.signedNomineeForm != undefined){
              this.nomineeDetailsModel.nomineeSighnedFormMultiPartList =  this.fileUploadService.getFile(this.nomineeDetailsModel.signedNomineeForm , ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.nomineeDetailsModel.signedNomineeForm);
            }
          if (this.viewSavingBankModel.sbGuardianDetailsDTO != null && this.viewSavingBankModel.sbGuardianDetailsDTO != undefined){
            
            this.memberGuardianDetailsModelDetails = this.viewSavingBankModel.sbGuardianDetailsDTO;
          }
          if (this.memberGuardianDetailsModelDetails != null && this.memberGuardianDetailsModelDetails != undefined) {
            this.gardianFullName = this.memberGuardianDetailsModelDetails.name + this.memberGuardianDetailsModelDetails.surName;
          }
          if(this.memberGuardianDetailsModelDetails.gaurdianSignedCopyPath != null && this.memberGuardianDetailsModelDetails.gaurdianSignedCopyPath != undefined){
            this.memberGuardianDetailsModelDetails.guardainSighnedMultipartFiles =  this.fileUploadService.getFile(this.memberGuardianDetailsModelDetails.gaurdianSignedCopyPath , ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberGuardianDetailsModelDetails.gaurdianSignedCopyPath);
          }
          if (this.viewSavingBankModel.accountTypeName != null && this.viewSavingBankModel.accountTypeName != undefined && this.viewSavingBankModel.accountTypeName === "Joint" ) {
            this.jointHoldersFlag = true;
          }
          if(this.viewSavingBankModel.sbJointAccHolderDetailsDTOList != null   && this.viewSavingBankModel.sbJointAccHolderDetailsDTOList != undefined && this.viewSavingBankModel.sbJointAccHolderDetailsDTOList.length > 0 ){
            this.jointHoldersFlag = true;
            this.jointHolderDetailsList = this.viewSavingBankModel.sbJointAccHolderDetailsDTOList;
            this.jointHolderDetailsList.map((joint:any) => {
              joint.admissionDateVal = this.datePipe.transform(joint.admissionDate, this.orgnizationSetting.datePipe);
            });
          }
          if(this.viewSavingBankModel.sbAccountServicesOptedDTOList != null && this.viewSavingBankModel.sbAccountServicesOptedDTOList != undefined && this.viewSavingBankModel.sbAccountServicesOptedDTOList.length >0){
            this.viewSavingBankModel.sbAccountServicesOptedDTOList = this.viewSavingBankModel.sbAccountServicesOptedDTOList.map((serviceCharges: any) => {
              serviceCharges.requestDocPathMultipartFileList =  this.fileUploadService.getFile(serviceCharges.requestDocPath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + serviceCharges.requestDocPath);

            });
          }
          this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
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
    this.router.navigate([savingsbanktransactionconstant.SB_APPLICATION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id)} });
  }

  communicationEdit(rowData: any) {
    this.router.navigate([savingsbanktransactionconstant.SB_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }
  kycEdit(rowData: any) {
    if(this.isNewMember){
    this.router.navigate([savingsbanktransactionconstant.SB_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
    else{
      this.router.navigate([savingsbanktransactionconstant.MEMBERSHIP_BASIC_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });

    }
  }

  nomineeEdit(rowData: any) {
    this.router.navigate([savingsbanktransactionconstant.SB_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) , preview: this.encryptDecryptService.encrypt(true) } });
  }
  serviceEdit(rowData: any) {
    this.router.navigate([savingsbanktransactionconstant.SB_SERVICES], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }
  editRequiredDocuments(rowData : any){
    this.router.navigate([savingsbanktransactionconstant.SB_REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editMembership(rowData : any){
    this.router.navigate([savingsbanktransactionconstant.NEW_MEMBERSHIP], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }
  
  editJointHolder(rowData : any){
    this.router.navigate([savingsbanktransactionconstant.SB_JOINTACCOUNT], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
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
   * @author jyothi.naidana
   * @implement onclose popup
   */
  closePhotoCopy() {
    this.memberPhotoCopyZoom = false;
  }

  /**
   * @implement Image Zoom POp up
   * @author jyothi.naidana
   */
  onClickMemberPhotoCopy(){
    this.memberPhotoCopyZoom = true;
  }

  /**
   * @author jyothi.naidana
   * @implements close photo dialogue
   */
  closePhoto(){
    this.memberPhotoCopyZoom = false;
  }

  onClickMemberIndividualMoreDetails(){
    this.membreIndividualFlag = true;
  }
}

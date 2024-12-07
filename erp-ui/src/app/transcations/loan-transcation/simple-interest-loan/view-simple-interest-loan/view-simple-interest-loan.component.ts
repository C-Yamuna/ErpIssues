import { SiLoanGuardian } from './../../shared/si-loans/si-loan-guardian.model';
import { SiLoanGenealogyTree } from './../../shared/si-loans/si-loan-genealogy-tree.model';
import { SiLoanDocuments } from './../../shared/si-loans/si-loan-documents.model';
import { SiLoanGuarantor } from './../../shared/si-loans/si-loan-guarantor.model';
import { SiLoanCommunication } from './../../shared/si-loans/si-loan-communication.model';
import { SiLoanApplication } from './../../shared/si-loans/si-loan-application.model';
import { SiLoanApplicationService } from './../../shared/si-loans/si-loan-application.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { MemberGuardianDetailsModelDetaila, SiLoanNominee } from '../../shared/si-loans/si-loan-nominee.model';
import { Loantransactionconstant } from '../../loan-transaction-constant';
import { DatePipe } from '@angular/common';
import { SiProductDefinitionService } from '../../shared/si-loans/si-product-definition.service';
import { SiLoanInterestPolicy, SiLoanProductDefinition } from '../../shared/si-loans/si-loan-product-definition.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { SiLoanKycService } from '../../shared/si-loans/si-loan-kyc.service';

@Component({
  selector: 'app-view-simple-interest-loan',
  templateUrl: './view-simple-interest-loan.component.html',
  styleUrls: ['./view-simple-interest-loan.component.css']
})
export class ViewSimpleInterestLoanComponent {
  amountblock: any[] = [];
  admissionNumber: any;
  id: any;

  membershipBasicRequiredDetailsModel: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();

  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();
  siLoanCommunicationModel: SiLoanCommunication = new SiLoanCommunication();
  siLoanNomineeModel: SiLoanNominee = new SiLoanNominee();
  siLoanGuardianModel: SiLoanGuardian = new SiLoanGuardian();
  siLoanGuarantorModel: SiLoanGuarantor = new SiLoanGuarantor();
  siLoanDocumentsModel: SiLoanDocuments = new SiLoanDocuments();
  siLoanGenealogyTreeModel: SiLoanGenealogyTree = new SiLoanGenealogyTree();

  siLoanProductDefinitionModel: SiLoanProductDefinition = new SiLoanProductDefinition();
  siLoanInterestPolicyModel: SiLoanInterestPolicy = new SiLoanInterestPolicy();

  responseModel!: Responsemodel;
  msgs: any[] = [];
  admissionDetails: FormGroup;
  kycDetailsColumns: any[] = [];
  kycGridList: any[] = []
  siLoanGuarantorDetailsList: any[] = [];
  goldLoanMortgageColumns: any[] = [];
  siLoanDocumentsDetailsList: any[] = [];
  siLoanGenealogyTreeList: any[] = [];
  siGoldLoanMortgageDetailsList: any[] = [];

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
  memberGroupFlag: boolean = false;
  memberIntitutionFlag: boolean = false;
  memberPromoterDetails: any
  groupPromoterList: any[] = []
  registeredAddress: any;
  permanentAddress: any;

  documentDetails: any[] = [];
  genealogyTreeDetails: any[] = [];
  guarantorColumns: any = [];
  jointHolderColumns: any[] = [];

  idEdit: any;
  jointHoldersFlag: boolean = false;
  jointHolderDetailsList: any[] = [];

  isNewMember: boolean = false;
  membreIndividualFlag: boolean = false;
  isKycApproved: any;
  memberPhotoCopyZoom: boolean = false;
  photoCopyFlag: boolean = false;
  groupPrmoters: any[] = [];
  columns: any[] = [];
  groupPrmotersList: any[] = [];
  institionPromotersList: any[] = [];
  institutionPromoterFlag: boolean = false;
  groupPromotersPopUpFlag: boolean= false;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private siLoanApplicationService: SiLoanApplicationService, private datePipe: DatePipe, private siProductDefinitionService: SiProductDefinitionService,
    private fileUploadService: FileUploadService, private commonFunctionsService: CommonFunctionsService,
    private translate: TranslateService, private siLoanKycService: SiLoanKycService) {
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
    this.guarantorColumns = [
      { field: 'memberTypeName', header: 'MEMBER TYPE' },
      { field: 'admissionNumber', header: 'ADMISSION NO' },
      { field: 'admissionDateVal', header: 'ADMISSION DATE' },
      { field: 'name', header: 'NAME' },
      { field: 'aadharNumber', header: 'AADHAR NUMBER' },
      { field: 'mobileNumber', header: 'MOBILE NUMBER' },
      { field: 'emailId', header: 'EMAIL' },
    ];
    this.jointHolderColumns = [
      { field: 'memberTypeName', header: 'MEMBER TYPE' },
      { field: 'admissionNumber', header: 'ADMISSION NO' },
      { field: 'admissionDateVal', header: 'ADMISSION DATE' },
      { field: 'name', header: 'NAME' },
      { field: 'aadharNumber', header: 'AADHAR NUMBER' },
      { field: 'mobileNumber', header: 'MOBILE NUMBER' },
      { field: 'emailId', header: 'EMAIL' },
    ];
    this.goldLoanMortgageColumns = [
      { field: 'itemName', header: 'ITEM NAME' },
      { field: 'netWeight', header: 'NET WEIGHT IN GRAMS' },
      { field: 'grossWeight', header: 'GROSS WEIGHT IN GRAMS' },
      { field: 'value', header: 'VALUE' },
      // { field: 'remarks', header: 'REMARKS' },
      // { field: 'Action', header: 'ACTION' },
    ];
    this.documentDetails = [
      { field: 'documentTypeName', header: 'DOCUMENT TYPE' },
      { field: 'documentNo', header: 'DOCUMENT NUMBER' },
      { field: 'filePath', header: 'Document FILE PATH' },
      // { field: 'remarks', header: 'REMARKS' },
      // { field: 'Action', header: 'ACTION' },
    ];
    this.genealogyTreeDetails = [
      { field: 'relationWithApplicantName', header: 'RELATION WITH MEMBER' },
      { field: 'name', header: 'RELATION NAME' },
      // { field: 'remarks', header: 'REMARKS' },
      // { field: 'Action', header: 'ACTION' },
    ];
    this.admissionDetails = this.formBuilder.group({
      admissionNumber: ['', [Validators.required, Validators.minLength(3)]],
      templatepath: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required, Validators.minLength(18)]],
      statusName: ['', [Validators.required, Validators.min(18)]]
    });

    this.columns = [
      { field: 'surname', header: 'SURNAME' },
      { field: 'name', header: 'NAME' },
      { field: 'operatorTypeName', header: 'TRANSACTION_DATE' },
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

    this.translate.use(this.commonFunctionsService.getStorageValue('language'));
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['editOpt'] != undefined) {
        let id = this.encryptDecryptService.decrypt(params['id']);
        if (params['editOpt'] != undefined)
          this.idEdit = this.encryptDecryptService.decrypt(params['editOpt']);

        if (this.idEdit == "1")
          this.preveiwFalg = true
        else
          this.preveiwFalg = false;
      
          if (params['isGridPage'] != undefined && params['isGridPage'] != null) {
            let isGrid = this.encryptDecryptService.decrypt(params['isGridPage']);
            if (isGrid === "0") {
              this.isShowSubmit = applicationConstants.FALSE;
            } else {
              this.isShowSubmit = applicationConstants.TRUE;
            }
          }
        this.siLoanApplicationService.getSILoanApplicationById(id).subscribe(res => {
          this.responseModel = res;
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data[0].admissionNo != null && this.responseModel.data[0].admissionNo != undefined) {
              this.admissionNumber = this.responseModel.data[0].admissionNo;
              this.id = this.responseModel.data[0].id;
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
              this.getSILoanPreviewDetails();
            }
          }
          else {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];

            }, 2000);
          }
        });
      }
    }),
      (error: any) => {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
  }

  backbutton() {
    this.siLoanApplicationService.resetCurrentStep();
    this.siLoanKycService.resetCurrentStep();
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_TRANSACTION]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.SI_LOAN_APPLICATION }];
    setTimeout(() => {
      this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_TRANSACTION]);
    }, 1500);
  }

  getSILoanPreviewDetails() {
    this.siLoanApplicationService.getSILoanPreviewDetails(this.id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siLoanApplicationModel = this.responseModel.data[0];

        if (this.siLoanApplicationModel != null && this.siLoanApplicationModel != undefined) {
          if (this.siLoanApplicationModel.applicationDate != null && this.siLoanApplicationModel.applicationDate != undefined)
            this.siLoanApplicationModel.applicationDateVal = this.datePipe.transform(this.siLoanApplicationModel.applicationDate, this.orgnizationSetting.datePipe);
          
          if (this.siLoanApplicationModel.sanctionDate != null && this.siLoanApplicationModel.sanctionDate != undefined)
            this.siLoanApplicationModel.sanctionDateVal = this.datePipe.transform(this.siLoanApplicationModel.sanctionDate, this.orgnizationSetting.datePipe);
          
          if (this.siLoanApplicationModel.loanDueDate != null && this.siLoanApplicationModel.loanDueDate != undefined)
            this.siLoanApplicationModel.loanDueDateVal = this.datePipe.transform(this.siLoanApplicationModel.loanDueDate, this.orgnizationSetting.datePipe);
          
          if (this.siLoanApplicationModel.memberTypeName != null && this.siLoanApplicationModel.memberTypeName != undefined)
            this.memberTypeName = this.siLoanApplicationModel.memberTypeName;

          if (this.siLoanApplicationModel.operationTypeName != null && this.siLoanApplicationModel.operationTypeName != undefined && this.siLoanApplicationModel.operationTypeName === "Joint")
            this.jointHoldersFlag = true;
          
          if (this.siLoanApplicationModel.siLoanCoApplicantDetailsDTOList != null && this.siLoanApplicationModel.siLoanCoApplicantDetailsDTOList != undefined && this.siLoanApplicationModel.siLoanCoApplicantDetailsDTOList.length > 0) {
            this.jointHoldersFlag = true;
            this.jointHolderDetailsList = this.siLoanApplicationModel.siLoanCoApplicantDetailsDTOList;
            this.jointHolderDetailsList = this.jointHolderDetailsList.map((model) => {
              if (model.admissionDate != null) {
                model.admissionDateVal = this.datePipe.transform(model.admissionDate, this.orgnizationSetting.datePipe);
              }
              return model;
            });
          }

          if (this.siLoanApplicationModel.individualMemberDetailsDTO != undefined && this.siLoanApplicationModel.individualMemberDetailsDTO != null) {
            this.membershipBasicRequiredDetailsModel = this.siLoanApplicationModel.individualMemberDetailsDTO;

            if (this.membershipBasicRequiredDetailsModel.admissionNumber != undefined && this.membershipBasicRequiredDetailsModel.admissionNumber != null)
              this.admissionNumber = this.membershipBasicRequiredDetailsModel.admissionNumber;

            if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined)
              this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

            if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined)
              this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);

            if (this.membershipBasicRequiredDetailsModel.isNewMember != null && this.membershipBasicRequiredDetailsModel.isNewMember != undefined)
              this.isNewMember = this.membershipBasicRequiredDetailsModel.isNewMember;

            if (this.membershipBasicRequiredDetailsModel.isKycApproved != null && this.membershipBasicRequiredDetailsModel.isKycApproved != undefined && this.membershipBasicRequiredDetailsModel.isKycApproved)
              this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
            else
              this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
          }

          if (this.siLoanApplicationModel.memberGroupDetailsDTO != undefined && this.siLoanApplicationModel.memberGroupDetailsDTO != null) {
            this.memberGroupDetailsModel = this.siLoanApplicationModel.memberGroupDetailsDTO;

            if (this.memberGroupDetailsModel.admissionNumber != undefined && this.memberGroupDetailsModel.admissionNumber != null)
              this.admissionNumber = this.memberGroupDetailsModel.admissionNumber;

            if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined)
              this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

            if (this.memberGroupDetailsModel.isNewMember != null && this.memberGroupDetailsModel.isNewMember != undefined)
              this.isNewMember = this.membershipBasicRequiredDetailsModel.isNewMember;

            if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined && this.memberGroupDetailsModel.groupPromoterList.length > 0)
              this.groupPrmotersList = this.memberGroupDetailsModel.groupPromoterList;

            if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined && this.memberGroupDetailsModel.isKycApproved)
              this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
            else
              this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
          }

          if (this.siLoanApplicationModel.memberInstitutionDTO != undefined && this.siLoanApplicationModel.memberInstitutionDTO != null) {
            this.membershipInstitutionDetailsModel = this.siLoanApplicationModel.memberInstitutionDTO;

            if (this.membershipInstitutionDetailsModel.admissionNumber != undefined && this.membershipInstitutionDetailsModel.admissionNumber != null)
              this.admissionNumber = this.membershipInstitutionDetailsModel.admissionNumber;

            if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined)
              this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

            if (this.membershipInstitutionDetailsModel.isNewMember != null && this.membershipInstitutionDetailsModel.isNewMember != undefined)
              this.isNewMember = this.membershipBasicRequiredDetailsModel.isNewMember;

            if (this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined && this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0)
              this.institionPromotersList = this.membershipInstitutionDetailsModel.institutionPromoterList;

            if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined && this.membershipInstitutionDetailsModel.isKycApproved)
              this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
            else
              this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
          }

          if (this.siLoanApplicationModel.siLoanCommunicationDTO != null && this.siLoanApplicationModel.siLoanCommunicationDTO != undefined)
            this.siLoanCommunicationModel = this.siLoanApplicationModel.siLoanCommunicationDTO;

          if (this.siLoanApplicationModel.siLoanKycDetailsDTOList != null && this.siLoanApplicationModel.siLoanKycDetailsDTOList != undefined) {
            this.kycGridList = this.siLoanApplicationModel.siLoanKycDetailsDTOList;
            for (let kyc of this.kycGridList) {
              if (kyc.kycFilePath != null && kyc.kycFilePath != undefined) {
                kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
              }
            }
          }

          if (this.siLoanApplicationModel.siLoanNomineeDetailsDTO != null && this.siLoanApplicationModel.siLoanNomineeDetailsDTO != undefined)
            this.siLoanNomineeModel = this.siLoanApplicationModel.siLoanNomineeDetailsDTO;

          if (this.siLoanApplicationModel.siMemberGuardianDetailsDTO != null && this.siLoanApplicationModel.siMemberGuardianDetailsDTO != undefined)
            this.siLoanGuardianModel = this.siLoanApplicationModel.siMemberGuardianDetailsDTO;

          if (this.siLoanApplicationModel.siLoanGoldMortgageDetailsDTOList != null && this.siLoanApplicationModel.siLoanGoldMortgageDetailsDTOList != undefined)
            this.siGoldLoanMortgageDetailsList = this.siLoanApplicationModel.siLoanGoldMortgageDetailsDTOList;

          if (this.siLoanApplicationModel.siLoanDocumentsDetailsDTOList != null && this.siLoanApplicationModel.siLoanDocumentsDetailsDTOList != undefined) {
            this.siLoanDocumentsDetailsList = this.siLoanApplicationModel.siLoanDocumentsDetailsDTOList;
            for (let document of this.siLoanDocumentsDetailsList) {
              if (document.filePath != null && document.filePath != undefined) {
                document.multipartFileList = this.fileUploadService.getFile(document.filePath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + document.filePath);
              }
            }
          }

          if (this.siLoanApplicationModel.siLoanGenealogyTreeDTOList != null && this.siLoanApplicationModel.siLoanGenealogyTreeDTOList != undefined)
            this.siLoanGenealogyTreeList = this.siLoanApplicationModel.siLoanGenealogyTreeDTOList;

          if (this.siLoanApplicationModel.siLoanGuarantorDetailsDTOList != null && this.siLoanApplicationModel.siLoanGuarantorDetailsDTOList != undefined) {
            this.siLoanGuarantorDetailsList = this.siLoanApplicationModel.siLoanGuarantorDetailsDTOList;
            this.siLoanGuarantorDetailsList = this.siLoanGuarantorDetailsList.map((model) => {
              if (model.admissionDate != null) {
                model.admissionDateVal = this.datePipe.transform(model.admissionDate, this.orgnizationSetting.datePipe);
              }
              return model;
            });
          }
          this.getProductDefinitionByProductId(this.siLoanApplicationModel.siProductId);
        }
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
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

  getProductDefinitionByProductId(id: any) {
    this.siProductDefinitionService.getSIProductDefinitionPreviewByProductId(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.siLoanProductDefinitionModel = this.responseModel.data[0];
                if (this.siLoanProductDefinitionModel.siInterestPolicyConfigDTOList != undefined && this.siLoanProductDefinitionModel.siInterestPolicyConfigDTOList != null) {
                  this.siLoanInterestPolicyModel = this.siLoanProductDefinitionModel.siInterestPolicyConfigDTOList[0];
                }
              }
            }
          }
        }
      }
    });
  }

  editMembership(rowData: any) {
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_MEMBERSHIP_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editApplicationDetails(rowData: any) {
    if (rowData.operationTypeName == "Joint") {
      this.flag = true;
    }
    else {
      this.flag = false;
    }
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_APPLICATION_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editCommunicationDetails(rowData: any) {

    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editKYCDetails(rowData: any) {
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editJointHolderDetails(rowData: any) {
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_JOINT_ACCOUNT], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editNomineeDetails(rowData: any) {
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editGuarantorDetails(rowData: any) {
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_GUARANTOR], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editMortgageDetails(rowData: any) {

    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_MORTAGAGE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editDocumentDetails(rowData: any) {
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  editGenealogyTreeDetails(rowData: any) {
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_GENEALOGY_TREE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  onClickMemberIndividualMoreDetails() {
    this.membreIndividualFlag = true;
  }

  onClickMemberPhotoCopy() {
    this.memberPhotoCopyZoom = true;
  }

  onClickOfGroupPromotes(){
    this.groupPromotersPopUpFlag = true;
  }

  onClickOfInstitutionPromotes(){
    this.institutionPromoterFlag = true;
  }

  
}

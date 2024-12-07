import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Loantransactionconstant } from '../../loan-transaction-constant';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SaoLoanApplicationService } from '../../shared/sao-loans/sao-loan-application.service';
import { SaoLoanApplication, SaoLoanInsuranceDetailsModel, SaoLoanLandMortageDetailsModel } from '../shared/sao-loan-application.model';
import { IndividualMemberDetailsModel, MemInstitutionModel, MemberShipGroupDetailsModel } from './membership-basic-details/shared/membership-basic-details.model';
import { SaoCommunication } from './sao-communication/shared/sao-communication.model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MembershipBasicDetailsService } from './membership-basic-details/shared/membership-basic-details.service';
import { SaoCommunicationService } from './sao-communication/shared/sao-communication.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { SaoProductDetails } from './sao-product-details/shared/sao-product-details.model';
import { SaoNominee } from './sao-nominee/shared/sao-nominee.model';
import { SaoLoanNomineeDetailsService } from '../../shared/sao-loans/sao-loan-nominee-details.service';
import { SaoLoanGenealogy } from './sao-loan-genealogy-tree/shared/sao-loan-genealogy.model';
import { SaoKyc } from './sao-kyc/shared/sao-kyc.model';
import { DatePipe } from '@angular/common';
import { SaoLoanGuarantor } from './sao-loan-guarantor/shared/sao-loan-guarantor.model';
import { SaoKycService } from './sao-kyc/shared/sao-kyc.service';
import { TranslateService } from '@ngx-translate/core';
import { SaoLoanJointMember } from './sao-loan-joint-member/shared/sao-loan-joint-member.mode';
import { SaoLoanGuarantorDetailsService } from './sao-loan-guarantor/shared/sao-loan-guarantor-details.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { SaoLoanDocument } from './sao-loan-documents/shared/sao-loan-document.model';

@Component({
  selector: 'app-sao-stepper',
  templateUrl: './sao-stepper.component.html',
  styleUrls: ['./sao-stepper.component.css']
})
export class SaoStepperComponent {
  items: MenuItem[] = [];
  activeItem: any;
  activeIndex: number = 0;
  savedId: any;
  loanId: any;
  flagForLabelName: boolean = false;
  flag: Boolean = false;
  isEdit: boolean = false;
  completed: any;
  operationTypeId: any;
  societyId: any;
  branchId: any;
  pacsId: any;
  buttonDisabled: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  flagForNomineeTypeValue: any;
  isApplicationEdit: boolean = false;
  isCommunicationEdit: boolean = false;
  isJointEdit: boolean = false;
  isKycEdit: boolean = false;
  isNomineeEdit: boolean = false;
  rowEdit: boolean = false;
  isLoanGarantorEdit: boolean = false;
  isLoanMortgageEdit: boolean = false;
  isLoanDocumentEdit: boolean = false;
  isLoanGenologyEdit: boolean = false;
  saoProductDetailsModel: SaoProductDetails = new SaoProductDetails();
  saoLoanApplicationModel: SaoLoanApplication = new SaoLoanApplication();
  individualMemberDetailsModel: IndividualMemberDetailsModel = new IndividualMemberDetailsModel();
  memberShipGroupDetailsModel: MemberShipGroupDetailsModel = new MemberShipGroupDetailsModel();
  memInstitutionModel: MemInstitutionModel = new MemInstitutionModel();
  saoCommunicationModel: SaoCommunication = new SaoCommunication;
  saoNomineeModel: SaoNominee = new SaoNominee();
  saoLoanDocumentModel: SaoLoanDocument = new SaoLoanDocument();
  saoLoanGenealogyModel: SaoLoanGenealogy = new SaoLoanGenealogy();
  saoLoanLandMortageDetailsModel: SaoLoanLandMortageDetailsModel = new SaoLoanLandMortageDetailsModel();
  saoLoanInsuranceDetailsModel: SaoLoanInsuranceDetailsModel = new SaoLoanInsuranceDetailsModel();
  saoLoanGuarantorModel: SaoLoanGuarantor = new SaoLoanGuarantor();
  saoLoanJointMemberModel: SaoLoanJointMember = new SaoLoanJointMember();
  saoKycModel: SaoKyc = new SaoKyc();
  memberTypeId: any;
  admissionNumber: any;
  memberTypeName: any;
  individualFlag: boolean = true;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  previouseButtonDisable : boolean = false;
  orgnizationSetting: any;
  allTypesOfmembershipList: any;
  kycList: any[] = [];
  operationTypeName: any;
  menuDisabled: boolean = true;
  gurantorList: any[] = [];
  jointHolderList: any[]=[];
  groupPrmotersList: any[] = [];
  groupPromotersPopUpFlag: boolean = false;
  membreIndividualFlag: boolean = false;
  institutionPromoterFlag: boolean  = false;
  isPerminentAddressIsSameFalg: boolean = false;
  previousStepFlag: boolean = false;
  institionPromotersList: any[] = [];
  isKycApproved :any;
  groupPrmoters : any;
  columns: any[] = [];
  photoCopyFlag: boolean = false;
  memberPhotoCopyZoom: boolean = false;
  memberSignatureCopyZoom: boolean = false;
  admissionNumberDropDownDisable : boolean = false;
  constructor(public messageService: MessageService, private router: Router, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private saoLoanApplicationService: SaoLoanApplicationService, private membershipBasicDetailsService: MembershipBasicDetailsService, private saoCommunicationService: SaoCommunicationService,
    private commonComponent: CommonComponent, private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe, private commonFunctionService: CommonFunctionsService,
    private saoLoanNomineeDetailsService: SaoLoanNomineeDetailsService, private saoKycService: SaoKycService, private translate: TranslateService,
    private saoLoanGuarantorDetailsService: SaoLoanGuarantorDetailsService,private fileUploadService : FileUploadService,
  ) {
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

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  ngOnInit() {
    this.savedId = null;
    this.loanId = null;
    this.pacsId = 1;
    this.branchId = 1;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.translate.use(this.commonFunctionsService.getStorageValue('language'));
    this.getAllTypeOfMembershipDetails(this.pacsId, this.branchId);
    this.activateRoute.queryParams.subscribe(params => {
      if (params['admissionNumber'] != undefined || params['id'] != undefined) {
        if (params['admissionNumber'] != undefined) {
          this.admissionNumber = this.encryptDecryptService.decrypt(params['admissionNumber']);
          // this.getSaoLoanApplicationDetailsByAdmissionNumber(this.admissionNumber);
          this.getMemberModuleDataByAdmissionNumber(this.admissionNumber);
          this.getMemberShipGroupDetailsByAdmissionNumber(this.admissionNumber);
          this.getMemberInstitutionDetailsByAdmissionNumber(this.admissionNumber);
        }
        let id;
        if (params['id'] != undefined) {
          id = this.encryptDecryptService.decrypt(params['id']);
          this.loanId = id;
          
          this.getSaoLoanApplicationById(this.loanId);
        }
        this.menuDisabled = false;
        this.isEditCheck(this.activeIndex);
      } else {
        this.isEdit = false;
        this.flagForLabelName = false;
      }
      this.pageRefresh();
      if (this.isEdit && params['memberTypeId'] != undefined && this.encryptDecryptService.decrypt(params['memberTypeId'])) {
        this.memberTypeName = this.encryptDecryptService.decrypt(params['memberTypeId']);
      }
    });
    this.itemList();
    this.saoLoanApplicationService.currentStep.subscribe((data: any) => {
      if (data != undefined) {
        this.activeIndex = data.stepperIndex;
        this.previouseButtonDisable = false;
        this.changeStepperSelector(this.activeIndex);
        this.buttonDisabled = data.isDisable
        if (data.data != null && data.data != undefined) {
          if (this.activeIndex == 0) {
            this.memberTypeName = data.data.memberTypeName;
            this.memberTypeCheck(this.memberTypeName, data.data);
            this.saoLoanApplicationModel = data.data;
            if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
              this.admissionNumber = data.data.admissionNumber;
            }
          }
          if (this.activeIndex == 1) {
            if (data.data != null && data.data != undefined) {
             
              if (data.data.saoLoanApplicationId != null && data.data.saoLoanApplicationId != undefined) {
                this.loanId = data.data.saoLoanApplicationId;
              }
              if (data.data.admisionNumber != null && data.data.admisionNumber != undefined) {
                this.admissionNumber = data.data.admisionNumber;
              }
              if (data.data.memberTypeName != null && data.data.memberTypeName != undefined) {
                this.memberTypeName = data.data.memberTypeName;
              }
              
              this.saoCommunicationModel = data.data;
              
            }
          }
          // if (this.activeIndex == 1) {
          //   this.saoKycModel = data.data;
          // }
          if (this.activeIndex == 2) {
            if (data.data != null && data.data != undefined) {
              if (data.data.operationTypeId != null && data.data.operationTypeId != undefined) {
                this.operationTypeId = data.data.operationTypeId;
              }
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.admissionNumber = data.data.admissionNumber;
              }
              
              this.saoLoanApplicationModel = data.data;
            }
          }
          if (this.activeIndex == 4) {
            if (data.data != null && data.data != undefined) {
              if (data.data.saoLoanApplicationId != null && data.data.saoLoanApplicationId != undefined) {
                this.loanId = data.data.saoLoanApplicationId;
              }
              this.saoLoanDocumentModel = data.data;
            }
          }
          if (this.activeIndex == 5) {
            if (data.data != null && data.data != undefined) {
              if (data.data.saoLoanApplicationId != null && data.data.saoLoanApplicationId != undefined) {
                this.loanId = data.data.saoLoanApplicationId;
              }
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.admissionNumber = data.data.admissionNumber;
              }
              this.saoNomineeModel = data.data;
            }
          }
          if (this.activeIndex == 6) {
            if (data.data != null && data.data != undefined) {
              if (data.data.saoLoanApplicationId != null && data.data.saoLoanApplicationId != undefined) {
                this.loanId = data.data.saoLoanApplicationId;
              }
              if (data.data.admissionNo != null && data.data.admissionNo != undefined) {
                this.admissionNumber = data.data.admissionNo;
              }
              if(data.data.gurantorList != null && data.data.gurantorList != undefined){
                this.gurantorList = data.data.gurantorList;
              }
              
              this.saoLoanGuarantorModel = data.data;
            }
          }
          if (this.activeIndex == 7) {
           // this.previouseButtonDisable = data.isDisable;
            if (data.data != null && data.data != undefined) {
              if (data.data.saoLoanApplicationId != null && data.data.saoLoanApplicationId != undefined) {
                this.loanId = data.data.saoLoanApplicationId;
              }
              this.saoLoanLandMortageDetailsModel = data.data;
            }
          }
          if (this.activeIndex == 8) {
            if (data.data != null && data.data != undefined) {
              if (data.data.saoLoanApplicationId != null && data.data.saoLoanApplicationId != undefined) {
                this.loanId = data.data.saoLoanApplicationId;
              }
              this.saoLoanGenealogyModel = data.data;
            }
          }
          else if (this.activeIndex == 3) {
            if (data.data != null && data.data != undefined) {
              if (data.data.saoLoanApplicationId != null && data.data.saoLoanApplicationId != undefined) {
                this.loanId = data.data.saoLoanApplicationId;
              }
              if(data.data.jointHolderList.length > 0 && data.data.jointHolderList != null && data.data.jointHolderList != undefined){
                this.jointHolderList = data.data.jointHolderList;
              }
              this.saoLoanJointMemberModel = data.data;
            }
          }

        }
      }
    });
    
  }

  memberTypeCheck(memberType: any, data: any) {
    if (memberType == "Individual") {
      this.individualFlag = true;
      this.groupFlag = false;
      this.institutionFlag = false;
      this.individualMemberDetailsModel = data.individualMemberDetailsDTO;
      if (this.individualMemberDetailsModel.dob != null && this.individualMemberDetailsModel.dob != undefined) {
        this.individualMemberDetailsModel.dobVal = this.datePipe.transform(this.individualMemberDetailsModel.dob, this.orgnizationSetting.datePipe);
      }
      if (this.individualMemberDetailsModel.admissionDate != null && this.individualMemberDetailsModel.admissionDate != undefined) {
        this.individualMemberDetailsModel.admissionDateVal = this.datePipe.transform(this.individualMemberDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
      }
    }
    else if (memberType == "Group") {
      this.groupFlag = true;
      this.institutionFlag = false;
      this.individualFlag = false;
      this.memberShipGroupDetailsModel = data.memberGroupDetailsDTO;
      this.memberShipGroupDetailsModel.groupPromotersDTOList = data.memberGroupDetailsDTO.groupPromoterList;
      if (this.memberShipGroupDetailsModel.registrationDate != null && this.memberShipGroupDetailsModel.registrationDate != undefined) {
        this.memberShipGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberShipGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
      }
      if (this.memberShipGroupDetailsModel.admissionDate != null && this.memberShipGroupDetailsModel.admissionDate != undefined) {
        this.memberShipGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberShipGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
      }
      if (this.memberShipGroupDetailsModel.groupPromotersDTOList!= null && this.memberShipGroupDetailsModel.groupPromotersDTOList != undefined && this.memberShipGroupDetailsModel.groupPromotersDTOList.length > 0) {
        this.groupPrmotersList=this.memberShipGroupDetailsModel.groupPromotersDTOList ;
  }
    }
    else if (memberType == "Institution") {
      this.institutionFlag = true;
      this.groupFlag = false;
      this.individualFlag = false;
      this.memInstitutionModel = data.memberInstitutionDTO;
      if (this.memInstitutionModel.registrationDate != null && this.memInstitutionModel.registrationDate != undefined) {
        this.memInstitutionModel.registrationDateVal = this.datePipe.transform(this.memInstitutionModel.registrationDate, this.orgnizationSetting.datePipe);
      }
      if (this.memInstitutionModel.admissionDate != null && this.memInstitutionModel.admissionDate != undefined) {
        this.memInstitutionModel.admissionDateVal = this.datePipe.transform(this.memInstitutionModel.admissionDate, this.orgnizationSetting.datePipe);
      }
      if (this.memInstitutionModel.institutionPromoterDetailsDTOList != null && this.memInstitutionModel.institutionPromoterDetailsDTOList != undefined && this.memInstitutionModel.institutionPromoterDetailsDTOList.length > 0) {
        this.institionPromotersList = this.memInstitutionModel.institutionPromoterDetailsDTOList ;
      }
    }
  }
  changeStepperSelector(item: any) {
    if (this.menuDisabled) {
      return; // Do nothing if menu is disabled
    }
    this.activeItem = item;
    // this.menuDisabled = !this.menuDisabled;
    // this.menuDisabled = true;
  }
  onTabChange(event: any) {
    this.activeIndex = event.index || 0; // Update activeIndex when tab changes
  }
  onClickMemberPhotoCopy(){
    this.memberPhotoCopyZoom = true;
  }
  //@akhila
  // get all members from membership module data 
  getAllTypeOfMembershipDetails(pacsId: any, branchId: any) {
    this.membershipBasicDetailsService.getAllTypeOfMemberDetailsListFromMemberModule(this.pacsId, this.branchId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.allTypesOfmembershipList = this.responseModel.data;
            this.allTypesOfmembershipList = this.allTypesOfmembershipList.filter((obj: any) => obj != null).map((relationType: { name: any; admissionNumber: any; memberTypeName: any }) => {
              return {
                label: `${relationType.name} - ${relationType.admissionNumber} - ${relationType.memberTypeName}`,
                value: relationType.admissionNumber
              };
            });
          }
          else {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        }
      }
    });
  }
  OnChangeAdmissionNumber(admissionNumber: any) {
    const filteredItem = this.allTypesOfmembershipList.find((item: { value: any; }) => item.value === admissionNumber);
    const parts = filteredItem.label.split(' - ');
    let label = parts[parts.length - 1].trim();
    this.individualMemberDetailsModel.memberTypeName = label;
    const admissionNo = filteredItem.label.split(' - ');
    let admissionNumberLable = parts[parts.length - 2].trim();
    this.individualMemberDetailsModel.admissionNumber = admissionNumberLable;
    this.saoCommunicationModel.admissionNumber = admissionNumberLable;
    if (this.individualMemberDetailsModel.memberTypeName == "Individual") {
      this.individualFlag = true;
      this.groupFlag = false;
      this.institutionFlag = false;
      this.getMemberModuleDataByAdmissionNumber(admissionNumber);
    } else if (this.individualMemberDetailsModel.memberTypeName == "Group") {
      this.groupFlag = true;
      this.institutionFlag = false;
      this.individualFlag = false;
      this.getMemberShipGroupDetailsByAdmissionNumber(admissionNumber);
    } else if (this.individualMemberDetailsModel.memberTypeName == "Institution") {
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
      this.getMemberInstitutionDetailsByAdmissionNumber(admissionNumber);
    }
    this.router.navigate([Loantransactionconstant.MEMBERSHIP_BASIC_DETAILS], { queryParams: { admissionNumber: this.encryptDecryptService.encrypt(admissionNumber), editFlag: this.encryptDecryptService.encrypt(false) } });
  }
  //@akhila
  //get member details from membership module
  getMemberModuleDataByAdmissionNumber(admissionNumber: any) {
    this.membershipBasicDetailsService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.individualMemberDetailsModel = this.responseModel.data[0];
            this.individualMemberDetailsModel.memberShipCommunicationDetailsDTOList = this.responseModel.data[0].memberShipCommunicationDetailsDTOList;
            this.memberTypeName = this.responseModel.data[0].memberTypeName;
            this.individualMemberDetailsModel.memberTypeName = this.memberTypeName;
            if (this.individualMemberDetailsModel.dob != null && this.individualMemberDetailsModel.dob != undefined) {
              this.individualMemberDetailsModel.dobVal = this.datePipe.transform(this.individualMemberDetailsModel.dob, this.orgnizationSetting.datePipe);
            }
            if (this.individualMemberDetailsModel.admissionDate != null && this.individualMemberDetailsModel.admissionDate != undefined) {
              this.individualMemberDetailsModel.admissionDateVal = this.datePipe.transform(this.individualMemberDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
            }
            if (this.individualMemberDetailsModel.memberShipCommunicationDetailsDTOList[0] != null && this.individualMemberDetailsModel.memberShipCommunicationDetailsDTOList[0] != undefined) {
              this.saoCommunicationModel = this.individualMemberDetailsModel.memberShipCommunicationDetailsDTOList[0];
            }
            if (this.individualMemberDetailsModel.photoCopyPath != null && this.individualMemberDetailsModel.photoCopyPath != undefined) {
              this.individualMemberDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.individualMemberDetailsModel.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.individualMemberDetailsModel.photoCopyPath  );
              this.photoCopyFlag = true;
            }
            if (this.individualMemberDetailsModel.signatureCopyPath != null && this.individualMemberDetailsModel.signatureCopyPath != undefined) {
                this.individualMemberDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.individualMemberDetailsModel.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.individualMemberDetailsModel.signatureCopyPath  );
            }
            if (this.individualMemberDetailsModel.isKycApproved != null && this.individualMemberDetailsModel.isKycApproved != undefined && this.individualMemberDetailsModel.isKycApproved) {
              this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
            }
            else {
              this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
            }
            this.admissionNumber = this.individualMemberDetailsModel.admissionNumber;
            this.saoLoanApplicationModel.individualMemberDetailsDTO = this.individualMemberDetailsModel;
        }
      }
      // this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });

  }
  getMemberShipGroupDetailsByAdmissionNumber(admisionNumber: any) {
    this.membershipBasicDetailsService.getMemberShipGroupDetailsByAdmissionNumber(admisionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberShipGroupDetailsModel = this.responseModel.data[0];
          this.memberShipGroupDetailsModel.groupPromotersDTOList = this.responseModel.data[0].groupPromoterList;
          this.saoLoanApplicationModel.memberGroupDetailsDTO = this.memberShipGroupDetailsModel;
          //this.individualMemberDetailsModel.memberShipGroupDetailsModel = this.memberShipGroupDetailsModel;
          //this.individualMemberDetailsModel.memberShipCommunicationDetailsDTOList = this.memberShipGroupDetailsModel.groupCommunicationList;

          this.memberTypeName = this.responseModel.data[0].memberTypeName;
          
          if (this.memberShipGroupDetailsModel.admissionDate != null && this.memberShipGroupDetailsModel.admissionDate != undefined) {
            this.memberShipGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberShipGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.memberShipGroupDetailsModel.registrationDate != null && this.memberShipGroupDetailsModel.registrationDate != undefined) {
            this.memberShipGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberShipGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
          }
          if (this.memberShipGroupDetailsModel.admissionDate != null && this.memberShipGroupDetailsModel.admissionDate != undefined) {
            this.memberShipGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberShipGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
         
          if (this.memberShipGroupDetailsModel.groupPromotersDTOList != null && this.memberShipGroupDetailsModel.groupPromotersDTOList != undefined) {
            this.groupPrmotersList = this.memberShipGroupDetailsModel.groupPromotersDTOList;
          }

          if (this.memberShipGroupDetailsModel.isKycCompleted != null && this.memberShipGroupDetailsModel.isKycCompleted != undefined) {
            this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
          }
          else {
            this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
          }
          this.admissionNumber = this.memberShipGroupDetailsModel.admissionNumber;
          this.saoLoanApplicationModel.memberTypeName = this.memberShipGroupDetailsModel.memberTypeName;
        }
      }
      //  this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });

  }
  onClickOfGroupPromotes() {
    this.groupPromotersPopUpFlag = true;
  }
  //@akhila.
  //get institution details from member module
  getMemberInstitutionDetailsByAdmissionNumber(admisionNumber: any) {
    this.membershipBasicDetailsService.getMemberIstitutionByAdmissionNumber(admisionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memInstitutionModel = this.responseModel.data[0];
          this.memInstitutionModel.institutionPromoterDetailsDTOList = this.responseModel.data[0].institutionPromoterList;
          this.memberTypeName = this.memInstitutionModel.memberTypeName;
          this.saoLoanApplicationModel.memberTypeName = this.memInstitutionModel.memberTypeName;
          this.saoLoanApplicationModel.memberInstitutionDTO = this.memInstitutionModel;

          if (this.memInstitutionModel.institutionCommunicationDTOList[0] != null && this.memInstitutionModel.institutionCommunicationDTOList[0] != undefined) {
            this.saoCommunicationModel = this.memInstitutionModel.institutionCommunicationDTOList[0];
          }
          if (this.memInstitutionModel.registrationDate != null && this.memInstitutionModel.registrationDate != undefined) {
            this.memInstitutionModel.registrationDateVal = this.datePipe.transform(this.memInstitutionModel.registrationDate, this.orgnizationSetting.datePipe);
          }
          if (this.memInstitutionModel.admissionDate != null && this.memInstitutionModel.admissionDate != undefined) {
            this.memInstitutionModel.admissionDateVal = this.datePipe.transform(this.memInstitutionModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.memInstitutionModel.institutionPromoterDetailsDTOList != null && this.memInstitutionModel.institutionPromoterDetailsDTOList != undefined) {
            this.institionPromotersList = this.memInstitutionModel.institutionPromoterDetailsDTOList;
            
          }
          if (this.memberShipGroupDetailsModel.isKycCompleted != null && this.memberShipGroupDetailsModel.isKycCompleted != undefined) {
            this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
          }
          else {
            this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
          }
          this.admissionNumber = this.memInstitutionModel.admissionNumber;
          this.admissionNumber = this.memInstitutionModel.admissionNumber;
        }
      }
      //this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });

  }
  onClick() {
    this.institutionPromoterFlag = true;
  }
  close() {
    this.institutionPromoterFlag = false;
    this.groupPromotersPopUpFlag = false;
    this.membreIndividualFlag = false;
    this.memberSignatureCopyZoom = false;
    this.memberPhotoCopyZoom = false;
  }
  onClickMemberIndividualMoreDetails(){
    this.membreIndividualFlag = true;
  }
    /**
   * @implement Image Zoom POp up
   * @author akhila.m
   */
    onClickMemberSignatureCopy(){
      this.memberSignatureCopyZoom = true;
    }
     /**
   * @author akhila.m
   * @implements close photo dialogue
   */
  closePhoto(){
    this.memberPhotoCopyZoom = false;
  }

    
  //@akhila
  //get memberDetails by loan id
  getSaoLoanApplicationById(id: any) {
    this.saoLoanApplicationService.getSaoLoanApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.saoLoanApplicationModel = this.responseModel.data[0];
              this.admissionNumberDropDownDisable = true;
              this.admissionNumber = this.saoLoanApplicationModel.admissionNo;
              if (this.saoLoanApplicationModel.individualMemberDetailsDTO != null && this.saoLoanApplicationModel.individualMemberDetailsDTO != undefined) {
                this.individualMemberDetailsModel = this.saoLoanApplicationModel.individualMemberDetailsDTO;
                if (this.individualMemberDetailsModel.dob != null && this.individualMemberDetailsModel.dob != undefined) {
                  this.individualMemberDetailsModel.dobVal = this.datePipe.transform(this.individualMemberDetailsModel.dob, this.orgnizationSetting.datePipe);
                }
                if (this.individualMemberDetailsModel.admissionDate != null && this.individualMemberDetailsModel.admissionDate != undefined) {
                  this.individualMemberDetailsModel.admissionDateVal = this.datePipe.transform(this.individualMemberDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
                }
                if (this.individualMemberDetailsModel.photoCopyPath != null && this.individualMemberDetailsModel.photoCopyPath != undefined) {
                  this.individualMemberDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.individualMemberDetailsModel.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.individualMemberDetailsModel.photoCopyPath);
                  this.photoCopyFlag = true;
                }
                if (this.individualMemberDetailsModel.signatureCopyPath != null && this.individualMemberDetailsModel.signatureCopyPath != undefined) {
                  this.individualMemberDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.individualMemberDetailsModel.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.individualMemberDetailsModel.signatureCopyPath);
                  this.photoCopyFlag = true;
                }
                if (this.individualMemberDetailsModel.isKycApproved != null && this.individualMemberDetailsModel.isKycApproved != undefined && this.individualMemberDetailsModel.isKycApproved) {
                  this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
                }
                else {
                  this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
                }
                this.individualFlag = true;
                this.groupFlag = false;
                this.institutionFlag = false;
              }
              if (this.saoLoanApplicationModel.memberGroupDetailsDTO != null && this.saoLoanApplicationModel.memberGroupDetailsDTO != undefined) {
                this.groupFlag = true;
                this.institutionFlag = false;
                this.individualFlag = false;
                this.memberShipGroupDetailsModel = this.saoLoanApplicationModel.memberGroupDetailsDTO;
                if (this.memberShipGroupDetailsModel.registrationDate != null && this.memberShipGroupDetailsModel.registrationDate != undefined) {
                  this.memberShipGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberShipGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
                }
                if (this.memberShipGroupDetailsModel.admissionDate != null && this.memberShipGroupDetailsModel.admissionDate != undefined) {
                  this.memberShipGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberShipGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
                }
                if (this.memberShipGroupDetailsModel.isKycCompleted != null && this.memberShipGroupDetailsModel.isKycCompleted != undefined) {
                  this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
                }
                else {
                  this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
                }
              }
              if (this.saoLoanApplicationModel.memberInstitutionDTO != null && this.saoLoanApplicationModel.memberInstitutionDTO != undefined) {
                this.institutionFlag = true;
                this.individualFlag = false;
                this.groupFlag = false;
                this.memInstitutionModel = this.saoLoanApplicationModel.memberInstitutionDTO;

                if (this.memInstitutionModel.registrationDate != null && this.memInstitutionModel.registrationDate != undefined) {
                  this.memInstitutionModel.registrationDateVal = this.datePipe.transform(this.memInstitutionModel.registrationDate, this.orgnizationSetting.datePipe);
                }
                if (this.memInstitutionModel.admissionDate != null && this.memInstitutionModel.admissionDate != undefined) {
                  this.memInstitutionModel.admissionDateVal = this.datePipe.transform(this.memInstitutionModel.admissionDate, this.orgnizationSetting.datePipe);
                }
                if (this.memInstitutionModel.isKycCompleted != null && this.memInstitutionModel.isKycCompleted.isKycApproved != undefined) {
                  this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
                }
                else {
                  this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
                }
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
  isEditCheck(activeIndex: any) {
    if (activeIndex == 0) {
      this.isApplicationEdit = true;
    }
    else if (activeIndex == 1) {
      this.isCommunicationEdit = true
    }
    // else if (activeIndex == 0) {
    //   this.isKycEdit = true
    // }
    else if (activeIndex == 2) {
      this.isApplicationEdit = true
    }
    else if (activeIndex == 3) {
      this.isJointEdit = true
    }
    else if (activeIndex == 4) {
      this.isLoanDocumentEdit = true
    }
    else if (activeIndex == 5) {
      this.isNomineeEdit = true
    }
    else if (activeIndex == 6) {
      this.isLoanGarantorEdit = true
    }
    else if (activeIndex == 7) {
      this.isLoanMortgageEdit = true
    }
    else if (activeIndex == 8) {
      this.isLoanGenologyEdit = true
    }
  }
  itemList() {
    if (this.saoLoanApplicationModel.operationTypeId != '1') {

      this.items = [

        {
          label: 'KYC', routerLink: Loantransactionconstant.MEMBERSHIP_BASIC_DETAILS,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 0;
          },
          icon: 'fa fa-podcast'
        },
        {
          label: 'Communication', routerLink: Loantransactionconstant.SAO_COMMUNICATION,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 1;
          },
          icon: 'fa fa-map-marker'
        },
        // {
        //   label: 'KYC', routerLink: Loantransactionconstant.SAO_KYC,
        //   command: (event: any) => {
        //     this.activeIndex = 1;
        //   },
        //    icon: 'fa fa-file-o'
        // },
        {
          label: 'Application', routerLink: Loantransactionconstant.SAO_PRODUCT_DETAILS,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 2;
          },
          icon: 'fa fa-clipboard'
        },
        {
          label: 'Loan Document', routerLink: Loantransactionconstant.SAO_LOAN_DOCUMENTS,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 4;
          },
          icon: 'fa fa-files-o'
        },
        {
          label: 'Nominee', routerLink: Loantransactionconstant.SAO_NOMINEE,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 5;
          },
          icon: 'fa fa-user-o'
        },
        {
          label: 'Loan Guarantor', routerLink: Loantransactionconstant.SAO_LOAN_GUARANTOR,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 6;
          },
          icon: 'fa fa-male'
        },
        {
          label: 'Loan Mortgage', routerLink: Loantransactionconstant.SAO_LOAN_MORTAGAGE,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 7;
          },
          icon: 'fa fa-puzzle-piece'
        },
        {
          label: 'Loan Genealogy', routerLink: Loantransactionconstant.SAO_LOAN_GENEALOGY_TREE,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 8;
          },
          icon: 'fa fa-sitemap'
        }
      ];
    }
    else {

      this.items = [
        {
          label: 'KYC',
          routerLink: Loantransactionconstant.MEMBERSHIP_BASIC_DETAILS,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 0;
          },
          icon: 'fa fa-podcast'
        },
        {
          label: 'Communication', routerLink: Loantransactionconstant.SAO_COMMUNICATION,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 1;
          },
          icon: 'fa fa-map-marker'
        },
        // {
        //   label: 'KYC', routerLink: Loantransactionconstant.SAO_KYC,
        //   command: (event: any) => {
        //     this.activeIndex = 1;
        //   },
        //   icon: 'fa fa-address-card' 
        // },
        {
          label: 'Application',
          routerLink: Loantransactionconstant.SAO_PRODUCT_DETAILS,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 2;
          },
          icon: 'fa fa-clipboard'
        },
        {
          label: 'Joint Account', routerLink: Loantransactionconstant.SAO_LOAN_JOINT_MEM_DETAILS,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 3;
          },
          icon: 'fa fa-handshake-o'
        },
        {
          label: 'Loan Document', routerLink: Loantransactionconstant.SAO_LOAN_DOCUMENTS,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 4;
          },
          icon: 'fa fa-files-o'
        },
        {
          label: 'Nominee', routerLink: Loantransactionconstant.SAO_NOMINEE,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 5;
          },
          icon: 'fa fa-user-o'
        },
        {
          label: 'Loan Guarantor', routerLink: Loantransactionconstant.SAO_LOAN_GUARANTOR,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 6;
          },
          icon: 'fa fa-male'
        },
        {
          label: 'Loan Mortgage', routerLink: Loantransactionconstant.SAO_LOAN_MORTAGAGE,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 7;
          },
          icon: 'fa fa-puzzle-piece'
        },
        {
          label: 'Loan Genealogy', routerLink: Loantransactionconstant.SAO_LOAN_GENEALOGY_TREE,
          disabled: this.menuDisabled,
          command: (event: any) => {
            this.activeIndex = 8;
          },
          icon: 'fa fa-sitemap'
        }
      ];
    }
    this.activeItem = this.items[this.activeIndex];
  }

  navigateTo(activeIndex: any, savedId: any) {
    this.itemList();
    switch (activeIndex) {
      case 0:
        if(!this.previousStepFlag){
          this.router.navigate([Loantransactionconstant.MEMBERSHIP_BASIC_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(savedId), admissionNumber: this.encryptDecryptService.encrypt(this.admissionNumber) } });
        }
        else {
          this.router.navigate([Loantransactionconstant.MEMBERSHIP_BASIC_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(savedId) } });
        }
        break;
      case 1:
        if(!this.previousStepFlag ){
          this.router.navigate([Loantransactionconstant.SAO_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(savedId), admissionNumber: this.encryptDecryptService.encrypt(this.admissionNumber) } });
          }
          else {
            this.router.navigate([Loantransactionconstant.SAO_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(savedId) } });
          }
          break;
      // case 1:
      //   this.router.navigate([Loantransactionconstant.SAO_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(savedId),admissionNumber: this.encryptDecryptService.encrypt(this.admissionNumber)} });
      //   break;
      case 2:
        this.router.navigate([Loantransactionconstant.SAO_PRODUCT_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(savedId), flag: this.encryptDecryptService.encrypt(this.flag) } });
        break;
      case 3:
        this.router.navigate([Loantransactionconstant.SAO_LOAN_JOINT_MEM_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(savedId), admissionNumber: this.encryptDecryptService.encrypt(this.admissionNumber) } });
        break;
      case 4:
        this.router.navigate([Loantransactionconstant.SAO_LOAN_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(savedId) } });
        break;
      case 5:
        this.router.navigate([Loantransactionconstant.SAO_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(savedId) } });
        break;
      case 6:
        this.router.navigate([Loantransactionconstant.SAO_LOAN_GUARANTOR], {
          queryParams: {
            id: this.encryptDecryptService.encrypt(savedId),
            admissionNumber: this.encryptDecryptService.encrypt(this.admissionNumber)
          }
        });
        break;
      case 7:
        this.router.navigate([Loantransactionconstant.SAO_LOAN_MORTAGAGE], { queryParams: { id: this.encryptDecryptService.encrypt(savedId) } });
        break;
      case 8:
        this.router.navigate([Loantransactionconstant.SAO_LOAN_GENEALOGY_TREE], { queryParams: { id: this.encryptDecryptService.encrypt(savedId) } });
        break;
    }
  }
  prevStep(activeIndex: number) {
    this.activeIndex = activeIndex - 1;
    this.completed = this.completed - 1;
    if (activeIndex == 0) {
      this.navigateTo(this.activeIndex,  this.loanId);
    }
    else if (activeIndex == 1) {
      this.previousStepFlag = true;
      this.navigateTo(this.activeIndex, this.loanId);
    }
    else if (activeIndex == 2) {
      this.flag = false;
      this.previousStepFlag = true;
      this.navigateTo(this.activeIndex, this.loanId);
    }

    else if (activeIndex == 3) {

      this.navigateTo(this.activeIndex, this.loanId);
    }
    else if (activeIndex == 4) {
      if (this.saoLoanApplicationModel.operationTypeId != 1) {
        this.flag = false;
        this.activeIndex = this.activeIndex - 1;
      }
      this.navigateTo(this.activeIndex, this.loanId);
    }
    else if (activeIndex == 5) {
      this.navigateTo(this.activeIndex, this.loanId);
    }
    else if (activeIndex == 6) {
      this.navigateTo(this.activeIndex, this.loanId);
    }
    else if (activeIndex == 7) {
      this.navigateTo(this.activeIndex, this.loanId);
    }
    else if (activeIndex == 8) {
      this.navigateTo(this.activeIndex, this.loanId);
    }
  }
  nextStep(activeIndex: number) {
    if (activeIndex == 0) {
      this.saoLoanApplicationModel.individualMemberDetailsDTO = this.individualMemberDetailsModel;
      this.saoLoanApplicationModel.memberGroupDetailsDTO = this.memberShipGroupDetailsModel;
      this.saoLoanApplicationModel.memberInstitutionDTO = this.memInstitutionModel;
      this.saoLoanApplicationModel.memberTypeName = this.individualMemberDetailsModel.memberTypeName;
      this.saoLoanApplicationModel.memberTypeId = this.individualMemberDetailsModel.memberType
      this.saveAndUpdateApplicationDetails(activeIndex, "next");

    }
    else if (activeIndex == 1) {
      this.saveOrUpdateCommunicationDetails(activeIndex, "next");
    }
    else if (activeIndex == 2) {
      this.saveAndUpdateApplicationDetails(activeIndex, "next");
    }
    else if (activeIndex == 3) {
      this.saveOrUpdateJointHolder();
    }
    else if (activeIndex == 4) {
      this.flagForNomineeTypeValue = 0;
      this.activeIndex = activeIndex + 1;
      this.navigateTo(this.activeIndex, this.loanId);
    }
    else if (activeIndex == 5) {
      this.saveOrUpdateNomineeDetails(activeIndex, "next");
    }
    else if (activeIndex == 6) {
      this.saveSaoLoanGurantorDetailsList(activeIndex, "next");
    }
    else {
      this.activeIndex = activeIndex + 1;
      this.navigateTo(this.activeIndex, this.loanId);
    }
  }
  submit() {
    this.buttonDisabled = true;
    this.router.navigate([Loantransactionconstant.VIEW_SAO_LOANS], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanId), editOpt: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE)  } });
  }
  save() {
    this.buttonDisabled = true;
    this.router.navigate([Loantransactionconstant.SAO_LOAN]);
    this.activeIndex == 0;
  }
  back(activeIndex: any) {
    this.router.navigate([Loantransactionconstant.SAO_LOAN]);
  }
  cancel(activeIndex: any) {
    this.router.navigate([Loantransactionconstant.SAO_LOAN]);
  }

  //Page Refresh
  pageRefresh(){
    this.saoLoanApplicationService.resetCurrentStep();
    this.individualMemberDetailsModel = new IndividualMemberDetailsModel();
    this.memberShipGroupDetailsModel = new MemberShipGroupDetailsModel();
    this.memInstitutionModel = new MemInstitutionModel();
    this.admissionNumber = null;
  }

  saveAndUpdateApplicationDetails(activeIndex: any, buttonName: any) {
    this.saoLoanApplicationModel.pacsId = 1;
    this.saoLoanApplicationModel.pacsCode = 101;
    this.saoLoanApplicationModel.branchId = 1;

    this.saoLoanApplicationModel.memberTypeName = this.memberTypeName;

    if(this.saoLoanApplicationModel.memberGroupDetailsDTO != null){
      this.saoLoanApplicationModel.memberGroupDetailsDTO.groupPromotersDTOList = this.groupPrmotersList;
    }
    if(this.saoLoanApplicationModel.memberInstitutionDTO != null){
      this.saoLoanApplicationModel.memberInstitutionDTO.institutionPromoterDetailsDTOList = this.institionPromotersList;
    }

    //this.saoLoanApplicationModel.accountStatus = 1;
    //this.saoLoanApplicationModel.operationTypeId=1;
    if (this.saoLoanApplicationModel.applicationDateVal != null && this.saoLoanApplicationModel.applicationDateVal != undefined) {
        this.saoLoanApplicationModel.applicationDate = this.commonFunctionsService.getUTCEpoch(new Date(this.saoLoanApplicationModel.applicationDateVal));
    }
    if (this.saoLoanApplicationModel.loanDueDateVal != null && this.saoLoanApplicationModel.loanDueDateVal != undefined) { 
         this.saoLoanApplicationModel.loanDueDate = this.commonFunctionsService.getUTCEpoch(new Date(this.saoLoanApplicationModel.loanDueDateVal));
    }
    if (this.saoLoanApplicationModel.id == null) {
      this.isApplicationEdit = false;
    }
    if (this.isApplicationEdit) {
      if(this.saoLoanApplicationModel.saoLoanInsuranceDetailsDTO != null && this.saoLoanApplicationModel.saoLoanInsuranceDetailsDTO != undefined){
        this.saoLoanApplicationModel.saoLoanInsuranceDetailsDTO.saoLoanApplicationId = this.loanId;
      }
      this.saoLoanApplicationService.updateSaoLoanApplication(this.saoLoanApplicationModel).subscribe((response: any) => {
        this.responseModel = response;
        this.saoLoanApplicationModel = this.responseModel.data;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if(this.responseModel.data.length > 0 && this.responseModel.data[0] != undefined && this.responseModel.data[0] != null){
            if(this.responseModel.data[0].id != undefined && this.responseModel.data[0].id != null)
              this.loanId = this.responseModel.data[0].id;
            this.memberTypeName = this.responseModel.data[0].memberTypeName;
            this.operationTypeId = this.responseModel.data[0].operationTypeId;
            
            if(this.saoLoanApplicationModel.admissionNo != null ){
              this.admissionNumber = this.saoLoanApplicationModel.admissionNo;
            }
            this.previousStepFlag = true;
            this.admissionNumberDropDownDisable = true;
            this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 1200);
            
            if (this.activeIndex == 2) {
              this.activeIndex = this.operationTypeBasedActiveIndexInscrement(this.operationTypeId);
            }else {
              this.activeIndex = this.activeIndex + 1;
            }
            this.navigateTo(this.activeIndex, this.responseModel.data[0].id)
            console.log("Navigation executed, activeIndex: ", this.activeIndex);
            this.completed = 1;
          }
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      },);
    } else {
      this.loanId = null;
      this.saoLoanApplicationModel.statusName = "Created";
      this.saoLoanApplicationModel.accountStatusName = "Created";
      this.saoLoanApplicationService.addSaoLoanApplication(this.saoLoanApplicationModel).subscribe((response: any) => {
        this.responseModel = response;
        this.saoLoanApplicationModel = this.responseModel.data;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.loanId = this.responseModel.data[0].id;
          this.operationTypeId = this.responseModel.data[0].operationTypeId;
          this.operationTypeName = this.responseModel.data[0].operationTypeName;
          // this.admissionNumber = this.responseModel.data[0].admissionNo;
          if(this.saoLoanApplicationModel.admissionNo != null ){
            this.admissionNumber = this.saoLoanApplicationModel.admissionNo;
          }
          this.admissionNumberDropDownDisable = true;
          this.previousStepFlag = false;
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          
          if (this.activeIndex == 2) {
            this.activeIndex = this.operationTypeBasedActiveIndexInscrement(this.operationTypeId);
          }else {
            this.activeIndex = this.activeIndex + 1;
          }
          this.navigateTo(this.activeIndex, this.responseModel.data[0].id)
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      },);
    }
  }
  operationTypeBasedActiveIndexInscrement(operationTypeId: any) {
    if (operationTypeId == 1) {
      this.activeIndex = this.activeIndex + 1
    } else {
      this.activeIndex = this.activeIndex + 2;
    }
    return this.activeIndex;
  }
  saveOrUpdateCommunicationDetails(activeIndex: any, buttonName: any) {
    this.saoCommunicationModel.saoLoanApplicationId = this.loanId;
    if (this.saoCommunicationModel.isSameAddress == true) {
      this.isPerminentAddressIsSameFalg = true;
    }
    else {
      this.isPerminentAddressIsSameFalg = true;
    }
    if (this.saoCommunicationModel.id == null) {
      this.isCommunicationEdit = false;
    }
    else {
      this.isCommunicationEdit = true;
    }
    if (this.isCommunicationEdit) {
      this.saoCommunicationService.updateSaoLoanCommunication(this.saoCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      });
    }
    else {
      this.saoCommunicationModel.id = null;
      this.saoCommunicationService.addSaoLoanCommunication(this.saoCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      });
    }
  }

  saveOrUpdateNomineeDetails(activeIndex: any, buttonName: any) {
    this.saoNomineeModel.saoLoanApplicationId = this.loanId;
    if (this.saoNomineeModel.id == null) {
      this.isNomineeEdit = false;
    }else {
      this.isNomineeEdit = true;
    }
    if (this.isNomineeEdit) {
      this.saoLoanNomineeDetailsService.updateSaoLoanNomineeDetails(this.saoNomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      });
    }
    else {
      this.saoLoanNomineeDetailsService.addSaoLoanNomineeDetails(this.saoNomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      });
    }
  }

  //akhila
  // save jointholders list
  saveOrUpdateJointHolder() {
   
      this.saoLoanApplicationService.saveJointHoldersList(this.jointHolderList).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
            this.loanId = this.responseModel.data[0].saoLoanApplicationId;
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      }, error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }
  //akhila
  // save list of gurantor details
  saveSaoLoanGurantorDetailsList(activeIndex: any, buttonName: any) {
      this.saoLoanGuarantorDetailsService.saveSaoLoanGuarantorDetailsList(this.gurantorList).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
            this.loanId = this.responseModel.data[0].saoLoanApplicationId;
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      }, error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
    }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingBankApplicationService } from './shared/saving-bank-application.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { ProductDefinitionModel, SavingBankApplicationModel } from './shared/saving-bank-application-model';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel } from '../membership-basic-required-details/shared/membership-basic-required-details';

@Component({
  selector: 'app-savings-bank-application',
  templateUrl: './savings-bank-application.component.html',
  styleUrls: ['./savings-bank-application.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class SavingsBankApplicationComponent implements OnInit {
  checked: boolean = false;
  applicationForm: FormGroup;
  application: any;
  applicationList: any;
  accountList: any;
  showForm: boolean = false;
  admissionNumberList: any[] = [];
  savedId: any;
  // inputDiabled: boolean = false;
  savingBankApplicationModel: SavingBankApplicationModel = new SavingBankApplicationModel();
  productDefinitionModel : ProductDefinitionModel = new ProductDefinitionModel();
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  responseModel!: Responsemodel;
  relationTypesList: any[] = [];

  genderList: any[] = [];
  maritalstatusList: any[] = [];
  isEdit: boolean = false;
  msgs: any[] = [];
  rowEdit: boolean = false;
  societyId: any;
  branchId: any;
  admissionNumber: any;
  productInfoFalg: boolean = false;
  orgnizationSetting: any;

  @ViewChild('confirmPopupRef') confirmPopupRef: any;
  visible: boolean = false;
  isDisabled: boolean = false;
  minmumBalence: any;
  openingDateVal: any;
  currentDate: any ;
  productInforFrom: FormGroup;
  memberTypeName: any;
  institutionPromoter: any[] = [];
  promoterDetails: any[] = [];
  sbAccId: any;
  applicationType : boolean = false;
 

  constructor(private router: Router, private formBuilder: FormBuilder, private savingBankApplicationService: SavingBankApplicationService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService , private commonFunctionsService : CommonFunctionsService , private confirmationService: ConfirmationService, private messageService: MessageService , private datePipe : DatePipe) {
    this.applicationForm = this.formBuilder.group({
      productType: ['', Validators.required],
      accountType:['', Validators.required],
      productInfo: [''],
      accountMember: [''],
      minimumBalenceRequired: [{ value: '', disabled: true }],
      accountOpeningDate:  [{ value: '', disabled: true }],
      accountNumber: [{ value: '', disabled: true }],

    })
    this.productInforFrom = this.formBuilder.group({
      productName: ['', Validators.required],
      accountType:['', Validators.required],
      productInfo: [''],
      accountMember: [''],
      minimumBalenceRequired: [{ value: '', disabled: true }],
      accountOpeningDate:  [{ value: '', disabled: true }],
      accountNumber: [{ value: '', disabled: true }],

    })
  }
  // @jyothi.naidana
  ngOnInit(): void {
    this.isDisabled = true;
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    
    this.genderList = [
      { label: 'Male', value: 1 },
      { label: 'Female', value: 2 }
    ]
    this.maritalstatusList = [
      { label: 'Married', value: 1 },
      { label: 'Un-Married', value: 2 }
    ]
    this.activateRoute.queryParams.subscribe(params => {
      if ( params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        // let memberType = this.encryptDecryptService.decrypt(params['memTypeId']);
        this.sbAccId = Number(id);
        this.isEdit = true;
        this.getSbAccountDetailsBySbAccountId(this.sbAccId);
        this.commonComponent.stopSpinner();
      } else {
        this.isEdit = false;
        this.commonComponent.stopSpinner();
      }
    })
    this.applicationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.applicationForm.valid) {
        this.save();
      }
    });
    this.getAllRelationTypes();
    this.getAllAccountsTypesList();
    this.getAllApplicationTypesList();
  }
  updateData() {
    this.savingBankApplicationService.changeData({
      formValid: !this.applicationForm.valid ? true : false,
      data: this.savingBankApplicationModel,
      isDisable: (!this.applicationForm.valid),
      // isDisable:false,
      stepperIndex: 3,
    });
  }
  //update model data to stepper component
  // @jyothi.naidana
  save() {
    this.updateData();
  }

  onChange() {
    this.checked = !this.checked;
    if (this.checked) {
      this.showForm = true;
    }
    else {
      this.showForm = false;
    }

  }
  //get All relation  types list
  // @jyothi.naidana
  getAllRelationTypes() {
    this.savingBankApplicationService.getAllRelationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.relationTypesList = this.responseModel.data;
        this.relationTypesList = this.relationTypesList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        this.relationTypesList.unshift({ label: 'select', value: 0 });
      }
      let Relationshiptype=  this.relationTypesList.find((data:any) => null != data && data.value ==this.savingBankApplicationModel.relationshipType);
        if(Relationshiptype != null && undefined != Relationshiptype)
           this.savingBankApplicationModel.memberTypeName = Relationshiptype.label;
    });
  }

   //get All account types list
  // @jyothi.naidana
  getAllApplicationTypesList() {
    this.savingBankApplicationService.getAllApplicationTypesList().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.applicationList = this.responseModel.data;
            this.applicationList = this.applicationList.filter((obj: any) => obj != null).map((relationType: { productName: any; id: any; }) => {
              return { label: relationType.productName, value: relationType.id };
            });
          }
        }
      }
    });
  }
   //get All marital  types list
  // @jyothi.naidana
  getAllMaritalList(){
    this.savingBankApplicationService.getAllMaitalList().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.maritalstatusList = this.responseModel.data;
            this.maritalstatusList = this.maritalstatusList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            this.maritalstatusList.unshift({ label: 'select', value: 0 });
          }
        }
        const filteredItem = this.maritalstatusList.find((item: { value: any; }) => item.value === this.savingBankApplicationModel.maritalStatus);
        this.savingBankApplicationModel.maritalStatus = filteredItem.label;
      }
    });
  }
  //get All account Types  types list
  // @jyothi.naidana
  getAllAccountsTypesList() {
    this.savingBankApplicationService.getAllAccountTypesList().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data .length > 0 ) {
            this.accountList = this.responseModel.data;
            this.accountList = this.accountList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            const filteredItem = this.accountList.find((item: { value: any; }) => item.value === this.savingBankApplicationModel.accountTypeId);
            if(filteredItem != null && filteredItem != undefined && filteredItem.label != null && filteredItem.label != undefined){
              this.savingBankApplicationModel.accountTypeName = filteredItem.label;
            }
          }
        }
        
      }
    });
  }
   //get member details by member Id  types list
  // @jyothi.naidana
  getMemberDetailsById(memberId: any) {
    this.savingBankApplicationService.getMemberById(memberId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.admissionNumber = this.responseModel.data[0].tempAdmissionNumber;
      }
    });
  }
  //get account details by admissionNumber list
  // @jyothi.naidana
  getSbAccountDetailsBySbAccountId(id : any) {
    this.commonFunctionsService
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.savingBankApplicationModel = this.responseModel.data[0];
                // if(this.savingBankApplicationModel.accountOpenDate != null && this.savingBankApplicationModel.accountOpenDate != undefined){
                //   this.savingBankApplicationModel.accountOpeningDateVal = this.datePipe.transform(this.savingBankApplicationModel.accountOpenDate, this.orgnizationSetting.datePipe);
                // }
                if(this.savingBankApplicationModel.memberTypeName != null && this.savingBankApplicationModel.memberTypeName != undefined){
                    this.memberTypeName = this.savingBankApplicationModel.memberTypeName;
                }
                if(this.savingBankApplicationModel.accountOpenDate == null || this.savingBankApplicationModel.accountOpenDate == undefined){
                  this.savingBankApplicationModel.accountOpeningDateVal = this.commonFunctionsService.currentDate();
                  // this.savingBankApplicationModel.accountOpeningDateVal = this.datePipe.transform(this.currentDate, this.orgnizationSetting.datePipe);
                  if (this.savingBankApplicationModel.accountOpeningDateVal != null && this.savingBankApplicationModel.accountOpeningDateVal != undefined) {
                    this.savingBankApplicationModel.accountOpenDate = this.commonFunctionsService.getUTCEpochWithTimedateConversionToLong(this.savingBankApplicationModel.accountOpeningDateVal);
                  }
                }
                else if(this.savingBankApplicationModel.accountOpenDate != null && this.savingBankApplicationModel.accountOpenDate != undefined){
                  this.savingBankApplicationModel.accountOpeningDateVal = this.commonFunctionsService.dateConvertionIntoFormate(this.savingBankApplicationModel.accountOpenDate);
                }
                if(this.savingBankApplicationModel.admissionNumber != null && this.savingBankApplicationModel.admissionNumber != undefined){
                    this.admissionNumber = this.savingBankApplicationModel.admissionNumber ;
                }
                if(this.savingBankApplicationModel.productName != null && this.savingBankApplicationModel.productName != undefined){
                  this.productInfoFalg = true;
                }
                if(this.savingBankApplicationModel.productId != null && this.savingBankApplicationModel.productId != undefined){
                  this.getProductDefinitionByProductId(this.savingBankApplicationModel.productId);
                  
                }
                if(this.savingBankApplicationModel.accountTypeName != null && this.savingBankApplicationModel.accountTypeName != undefined){
                 this.applicationType = true;
                }
                this.loadMembershipData();
                this.updateData();
              }
            }
          }
        }
      }
    });
  }
  //On product change get product details by selected product id list
  // @jyothi.naidana
  productOnChange(event : any){
      this.productInfoFalg = true;
      if(event.value != null && event.value != undefined){
        this.getProductDefinitionByProductId(event.value);
      }
      
  }
   //it is writter for product info but implimentation changed,now unused
  // @jyothi.naidana
  showDialog() {
    this.visible = true;
  }
 //get product details 
  // @jyothi.naidana
  getProductDefinitionByProductId(id : any){
     this.productDefinitionModel == null;
    this.savingBankApplicationService.getProduct(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.productDefinitionModel = this.responseModel.data[0];
                this.minmumBalence = this.productDefinitionModel.minimumBalancePenalty ; 
               
              }
              if(this.productDefinitionModel.isInterestPostingAllowed != null && this.productDefinitionModel.isInterestPostingAllowed != undefined && this.productDefinitionModel.isInterestPostingAllowed){
                this.productDefinitionModel.isInterestPostingAllowed = applicationConstants.YES;
              }
              else{
                this.productDefinitionModel.isInterestPostingAllowed = applicationConstants.NO;
              }
              if(this.productDefinitionModel.isCheckBookIssuingAllowed != null && this.productDefinitionModel.isCheckBookIssuingAllowed != undefined && this.productDefinitionModel.isCheckBookIssuingAllowed)
              {
                this.productDefinitionModel.isCheckBookIssuingAllowed = applicationConstants.YES;
              }
              else{
                this.productDefinitionModel.isCheckBookIssuingAllowed = applicationConstants.NO;
              }
              if(this.productDefinitionModel.isDebitCardIssuingAllowed != null && this.productDefinitionModel.isDebitCardIssuingAllowed != undefined && this.productDefinitionModel.isDebitCardIssuingAllowed){
                this.productDefinitionModel.isDebitCardIssuingAllowed = applicationConstants.YES;
              }
              else{
                this.productDefinitionModel.isDebitCardIssuingAllowed = applicationConstants.NO;
              }
              if(this.productDefinitionModel.isChequeBookOperationsAllowed != null && this.productDefinitionModel.isChequeBookOperationsAllowed != undefined && this.productDefinitionModel.isChequeBookOperationsAllowed){
                this.productDefinitionModel.isChequeBookOperationsAllowed = applicationConstants.YES;
              }
              else{
                this.productDefinitionModel.isChequeBookOperationsAllowed = applicationConstants.NO;
              }
            }
          }
        }
      }
    });
  }
//account name mapping
  // @jyothi.naidana
  onChangeAccountTypes(event: any){
    const filteredItem = this.accountList.find((item: { value: any; }) => item.value === event.value);
    this.savingBankApplicationModel.accountTypeName = filteredItem.label;
    this.updateData();
   }
   getMemberDetailsByAdmissionNumber(admisionNumber: any) {
    this.savingBankApplicationService.getMemberByAdmissionNumber(admisionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipBasicRequiredDetails = this.responseModel.data[0];
            if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
              this.membershipBasicRequiredDetails.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
            }
            if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
              this.membershipBasicRequiredDetails.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
            }
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
  //@jyothi.naidana
  getGroupByAdmissionNumber(admissionNumber: any) {
    this.savingBankApplicationService.getGroupByAdmissionNumber(admissionNumber).subscribe((response: any) => {
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
            if (this.memberGroupDetailsModel.groupPromotersDTOList.length > 0) {
              this.promoterDetails = this.memberGroupDetailsModel.groupPromotersDTOList;
              this.promoterDetails = this.memberGroupDetailsModel.groupPromotersDTOList.map((member: any) => {
                member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
                member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);
                return member;
              });
            }
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
  //@jyothi.naidana
  getInstitutionByAdmissionNumber(admissionNumber: any) {
    this.savingBankApplicationService.getInstitutionDetails(admissionNumber).subscribe((response: any) => {
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
            if (this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0)
              this.institutionPromoter = this.membershipInstitutionDetailsModel.institutionPromoterList;
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
  loadMembershipData(){
    if (this.memberTypeName == "Individual") {
      this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
    } else if (this.memberTypeName == "Group") {
      this.getGroupByAdmissionNumber(this.admissionNumber);
    } else if (this.memberTypeName == "Institution") {
      this.getInstitutionByAdmissionNumber(this.admissionNumber);
    }
  }
}

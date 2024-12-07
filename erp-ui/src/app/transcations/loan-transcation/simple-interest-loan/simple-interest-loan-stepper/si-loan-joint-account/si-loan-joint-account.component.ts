import { SiLoanJointHolder } from './../../../shared/si-loans/si-loan-joint-holder.model';
import { SiLoanApplicationService } from './../../../shared/si-loans/si-loan-application.service';
import { SiLoanApplication } from './../../../shared/si-loans/si-loan-application.model';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MembershipServiceService } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-service.service';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel } from '../../../shared/si-loans/si-loan-membership-details.model';
import { SiLoanCoApplicantDetailsService } from '../../../shared/si-loans/si-loan-co-applicant-details.service';

@Component({
  selector: 'app-si-loan-joint-account',
  templateUrl: './si-loan-joint-account.component.html',
  styleUrls: ['./si-loan-joint-account.component.css']
})
export class SiLoanJointAccountComponent {
  jointAccountForm: any;
  jointAccount: any;
  checked: any;
  isMemberCreation: boolean = false;
  loanAccId: any;

  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();
  siLoanJointHolderModel: SiLoanJointHolder = new SiLoanJointHolder();
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();

  rowEdit: any;
  responseModel!: Responsemodel;
  applicationType: any;
  accountType: any;
  minBalence: any;
  accountOpeningDate: any;
  msgs: any[] = [];
  isEdit: boolean = false;
  admissionNumber: any;
  allFruits: any[] = [];
  selectedFruits: any[] = [];
  selectedAdmissionNumberList: string[] = [];
  previousAdmissionNumber: String[] = [];
  duplicateKhataPassbookFlag: boolean = false;
  gridListData: any[] = [];
  accountOpeningDateVal: any;
  orgnizationSetting: any;
  numberOfJointHolders: any;
  jointHolderDetailsList: any[] = [];
  admissionNumberList: any[] = [];
  productName: any;
  memberTypeName: any;
  membershipList: any;
  pacsId: any;
  branchId: any;
  accountNumber: any;
  tempJointHolderDetailsList: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder,
    private siLoanCoApplicantDetailsService: SiLoanCoApplicantDetailsService,
    private siLoanApplicationService: SiLoanApplicationService, private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private datePipe: DatePipe,
    private commonFunctionsService: CommonFunctionsService, private membershipServiceService: MembershipServiceService) {

    this.jointAccountForm = this.formBuilder.group({
      admissionNumber: [''],
      noOfJointHolders: ['']
    });
  }
  ngOnInit(): void {
    this.pacsId = 1;
    this.branchId = 1;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');

    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.loanAccId = Number(id);
        this.isEdit = true;
        this.getSILoanApplicationById(this.loanAccId);
        this.commonComponent.stopSpinner();
      } else {
        this.isEdit = false;
        this.commonComponent.stopSpinner();
      }
    })
    this.updateData();
    this.getAllTypeOfMembershipDetails(this.pacsId, this.branchId);
  }

  updateData() {
    this.siLoanJointHolderModel.jointHolderList = this.jointHolderDetailsList;
    this.siLoanApplicationService.changeData({
      formValid: !this.jointAccountForm.valid ? true : false,
      data: this.siLoanJointHolderModel,
      isDisable: (!this.jointAccountForm.valid),
      stepperIndex: 4,
    });
  }

  save() {
    this.updateData();
  }

  onChange() {
    this.isMemberCreation = !this.isMemberCreation;
  }

  getSILoanAccountJointHolderDetailsBySILoanAccId(id: any) {
    this.siLoanCoApplicantDetailsService.getSILoanCoApplicantByLoanApplicationId(id).subscribe((response: any) => {
      this.responseModel = response;
    });
  }

  getSILoanApplicationById(id: any) {
    this.siLoanApplicationService.getSILoanApplicationById(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != undefined && this.responseModel.data != null && this.responseModel.data.length > 0) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siLoanApplicationModel = this.responseModel.data[0];
            if (this.siLoanApplicationModel.siProductName != null && this.siLoanApplicationModel.siProductName != undefined) {
              this.productName = this.siLoanApplicationModel.siProductName;
            }
            if (this.siLoanApplicationModel.accountTypeName != null && this.siLoanApplicationModel.accountTypeName != undefined) {
              this.accountType = this.siLoanApplicationModel.accountTypeName;
            }
            if (this.siLoanApplicationModel.accountTypeName != null && this.siLoanApplicationModel.accountTypeName != undefined) {
              this.applicationType = this.siLoanApplicationModel.accountTypeName;
            }
            if (this.siLoanApplicationModel.applicationDate != null && this.siLoanApplicationModel.applicationDate != undefined) {
              this.accountOpeningDateVal = this.datePipe.transform(this.siLoanApplicationModel.applicationDate, this.orgnizationSetting.datePipe);
            }
            if (this.siLoanApplicationModel.accountNumber != null && this.siLoanApplicationModel.accountNumber != undefined) {
              this.accountNumber = this.siLoanApplicationModel.accountNumber;
            }
            if (this.siLoanApplicationModel.siLoanCoApplicantDetailsDTOList != null) {
              this.jointHolderDetailsList = this.siLoanApplicationModel.siLoanCoApplicantDetailsDTOList;
              this.jointHolderDetailsList = this.jointHolderDetailsList.map((model) => {
                if (model.admissionDate != null) {
                  model.admissionDateVal = this.datePipe.transform(model.admissionDate, this.orgnizationSetting.datePipe);
                }
                return model;
              });
              this.getJointAccontMemberDetails();
            }
          }
        }
      }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
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

  getJointAccontMemberDetails() {
    if (this.jointHolderDetailsList != null && this.jointHolderDetailsList != undefined && this.jointHolderDetailsList.length > 0) {
      this.numberOfJointHolders = this.jointHolderDetailsList.length;
      this.selectedAdmissionNumberList = this.numberOfJointHolders.filter((obj: any) => obj != null).map((obj: { id: any; name: any; admissionNumber: any }) => {
        return {
          label: obj.admissionNumber
        };
      });
      this.updateData();
    }
    else {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
  }

  onSelectionChange(event: any) {
    this.numberOfJointHolders = 0;
    this.selectedAdmissionNumberList = [];
    if (null != event.value && undefined != event.value && event.value != "") {
      for (let admissionNumber of event.value) {
        let check = this.selectedAdmissionNumberList.push(admissionNumber);
        this.numberOfJointHolders = this.selectedAdmissionNumberList.length;
        this.getMembershipDetails(admissionNumber.label);
      }
    }
  }

  onClear(admissionNumber: any) {
    const index = this.admissionNumberList.indexOf(admissionNumber);
    if (index >= 0) {
      this.admissionNumberList.splice(index, 1);
      this.jointHolderDetailsList.push(this.responseModel.data);
      const existingIndex = this.jointHolderDetailsList.findIndex(
        promoter => promoter.admissionNumber === admissionNumber);
      this.jointHolderDetailsList[existingIndex] = null;
      this.updateData();
    }
  }

  getAllTypeOfMembershipDetails(pacsId: any, branchId: any) {
    this.membershipServiceService.getAllTypeOfMemberDetailsListFromMemberModule(this.pacsId, this.branchId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipList = this.responseModel.data;
            this.admissionNumberList = this.membershipList.filter((obj: any) => obj != null).map((relationType: { id: any; name: any; admissionNumber: any; memberTypeName: any }) => {
              return {
                label: relationType.admissionNumber
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
    }, error => {
      this.msgs = [];
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }

  getMembershipDetails(admisionNumber: any) {
    this.tempJointHolderDetailsList = this.jointHolderDetailsList;
    this.jointHolderDetailsList = [];
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admisionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            if (this.responseModel.data[0].admissionDate != null && this.responseModel.data[0].admissionDate != undefined) {
              this.responseModel.data[0].admissionDateVal = this.datePipe.transform(this.responseModel.data[0].admissionDate, this.orgnizationSetting.datePipe);
            }
            if (this.loanAccId != null && this.loanAccId != undefined) {
              this.responseModel.data[0].siLoanApplicationId = this.loanAccId;
            }
            if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined) {
              this.responseModel.data[0].accountNumber = this.accountNumber;
            }
            this.tempJointHolderDetailsList.push(this.responseModel.data[0]);
            this.jointHolderDetailsList = this.tempJointHolderDetailsList;
            this.updateData();
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

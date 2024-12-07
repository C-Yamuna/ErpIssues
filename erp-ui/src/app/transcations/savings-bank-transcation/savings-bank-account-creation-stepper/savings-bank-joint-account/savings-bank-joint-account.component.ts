import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingsBankStepperModel } from '../shared/savings-bank-stepper-model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SavingsBankJointAccountService } from './shared/savings-bank-joint-account.service';
import { SavingBankApplicationService } from '../savings-bank-application/shared/saving-bank-application.service';
import { SavingBankApplicationModel } from '../savings-bank-application/shared/saving-bank-application-model';
import { SavingAccountJointHolderModel } from './shared/saving-account-joint-holder-model';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel } from '../membership-basic-required-details/shared/membership-basic-required-details';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { MembershipServiceService } from '../membership-basic-required-details/shared/membership-service.service';

@Component({
  selector: 'app-savings-bank-joint-account',
  templateUrl: './savings-bank-joint-account.component.html',
  styleUrls: ['./savings-bank-joint-account.component.css']
})
export class SavingsBankJointAccountComponent implements OnInit {

  jointAccountForm: any;
  jointAccount: any;
  checked: any;
  showForm: boolean = false;
  savedId: any;
  // savingsBankStepperModel: SavingsBankStepperModel = new SavingsBankStepperModel();
  savingBankApplicationModel: SavingBankApplicationModel = new SavingBankApplicationModel();
  savingAccountJointHolderModel: SavingAccountJointHolderModel = new SavingAccountJointHolderModel();
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

  selectedAdmissionNumberList: any[] = [];
  previousAdmissionNumber: String[] = [];
  duplicateKhataPassbookFlag: boolean = false;
  gridListData: any[] = [];
  accountOpeningDateVal: any;
  orgnizationSetting: any;
  numberOfJointHolders: any;
  jointHolderDetailsList: any[] = [];
  tempJointHolderList: any[] = [];
  admissionNumberList: any[] = [];
  productName: any;
  memberTypeName: any;
  membershipList: any;
  pacsId: any;
  branchId: any;
  accountNumber: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private savingsBankJointAccountService: SavingsBankJointAccountService, private savingBankApplicationService: SavingBankApplicationService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private datePipe: DatePipe, private commonFunctionsService: CommonFunctionsService, private membershipServiceService: MembershipServiceService) {

    this.jointAccountForm = this.formBuilder.group({
      admissionNumber: [''],
      noOfJointHolders: ['']
    });
  }
  ngOnInit(): void {
    this.pacsId = 1;
    this.branchId = 1;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    this.getAllTypeOfMembershipDetails(this.pacsId, this.branchId);
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.savedId = Number(id);
        this.isEdit = true;
        this.getSbDetailsById(this.savedId);
        this.commonComponent.stopSpinner();
      } else {
        this.isEdit = false;
        this.commonComponent.stopSpinner();
      }
    })
    this.updateData();
    this.jointAccountForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.jointAccountForm.valid) {
        this.save();
      }
    });
  }
  updateData() {
    this.savingAccountJointHolderModel.jointHolderList = this.jointHolderDetailsList;
    this.savingBankApplicationService.changeData({
      formValid: !this.jointAccountForm.valid ? true : false,
      data: this.savingAccountJointHolderModel,
      isDisable: (!this.jointAccountForm.valid),
      // isDisable:false,
      stepperIndex: 4,
    });
  }
  //update model data to stepper component
  // @jyothi.naidana
  save() {
    this.updateData();
  }

  onChange() {
    this.showForm = !this.showForm;
  }


  getSbAccountJointHolderDetailsBySbId(id: any) {
    this.savingsBankJointAccountService.getAllSbJointAccountDetailsBySbId(id).subscribe((response: any) => {
      this.responseModel = response;
    });
  }

  getSbDetailsById(id: any) {
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((response: any) => {
      this.responseModel = response;
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != undefined && this.responseModel.data != null && this.responseModel.data.length > 0) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.savingBankApplicationModel = this.responseModel.data[0];
            if(this.savingBankApplicationModel.productName != null && this.savingBankApplicationModel.productName != undefined){
              this.productName = this.savingBankApplicationModel.productName;
            }
           if(this.savingBankApplicationModel.accountTypeName != null && this.savingBankApplicationModel.accountTypeName != undefined){
            this.accountType = this.savingBankApplicationModel.accountTypeName;
           }
           if(this.savingBankApplicationModel.accountTypeName != null && this.savingBankApplicationModel.accountTypeName != undefined){
            this.applicationType = this.savingBankApplicationModel.accountTypeName;
           }
           if(this.savingBankApplicationModel.accountOpenDate != null && this.savingBankApplicationModel.accountOpenDate != undefined){
            this.accountOpeningDateVal = this.datePipe.transform(this.savingBankApplicationModel.accountOpenDate, this.orgnizationSetting.datePipe);
           }
          if (this.savingBankApplicationModel.minBalance != null && this.savingBankApplicationModel.minBalance != undefined) {
              this.minBalence = this.savingBankApplicationModel.minBalance;
          }
          if (this.savingBankApplicationModel.accountNumber != null && this.savingBankApplicationModel.accountNumber != undefined) {
              this.accountNumber = this.savingBankApplicationModel.accountNumber;
          }
          this.getJointAccontMemberDetails(this.savingBankApplicationModel.id);
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

  getJointAccontMemberDetails(id: any) {
    this.savingsBankJointAccountService.getAllSbJointAccountDetailsBySbId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
          this.jointHolderDetailsList = this.responseModel.data;
          if (this.jointHolderDetailsList != null && this.jointHolderDetailsList != undefined && this.jointHolderDetailsList.length > 0) {
            this.numberOfJointHolders = this.jointHolderDetailsList.length;
            this.selectedAdmissionNumberList = this.jointHolderDetailsList.filter((obj: any) => obj != null).map((obj: { id: any; name: any; admissionNumber: any }) => {
              return {
                label: obj.admissionNumber
              };
            });
            this.jointHolderDetailsList.map((joint:any) => {
              joint.admissionDateVal = this.datePipe.transform(joint.admissionDate, this.orgnizationSetting.datePipe);
            });
            this.updateData();
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

  onSelectionChange(event: any) {
    this.tempJointHolderList = [];
    this.numberOfJointHolders = 0;
    this.selectedAdmissionNumberList = [];
    if (null != event.value && undefined != event.value && event.value != "") {
      for (let admissionNumber of event.value) {
        let check = this.selectedAdmissionNumberList.push(admissionNumber);
        this.numberOfJointHolders = this.selectedAdmissionNumberList.length;
        this.getMembershipDetails(admissionNumber.label);
      }
    }
    else{
      this.jointHolderDetailsList = [];
    }
  }

  onClear(admissionNumber: any) {
    // const index = this.admissionNumberList.indexOf(admissionNumber);
    // if (index >= 0) {
    //   this.admissionNumberList.splice(index, 1);
    //   this.jointHolderDetailsList.push(this.responseModel.data);
    //   const existingIndex = this.jointHolderDetailsList.findIndex(
    //     promoter => promoter.admissionNumber === admissionNumber);
    //   this.jointHolderDetailsList[existingIndex] = null;
    this.jointHolderDetailsList = [];
      this.updateData();
    // }
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
    
    this.jointHolderDetailsList = [];
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admisionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            // this.savingAccountJointHolderModel = this.responseModel.data[0];
            if(this.savedId != null && this.savedId != undefined){
              this.responseModel.data[0].sbAccId = this.savedId;
            }
            if(this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined){
              this.responseModel.data[0].accountNumber = this.accountNumber;
            }
            this.responseModel.data[0].dateOfBirth = this.responseModel.data[0].dob;
            this.responseModel.data[0].gender = this.responseModel.data[0].genderId;
            this.responseModel.data[0].maritalStatus = this.responseModel.data[0].martialId;
            this.responseModel.data[0].email=this.responseModel.data[0].emailId ;
            this.responseModel.data[0].memberClass = this.responseModel.data[0].subProductName;
            this.responseModel.data[0].admissionDateVal = this.datePipe.transform(this.responseModel.data[0].admissionDate, this.orgnizationSetting.datePipe);
            this.tempJointHolderList.push(this.responseModel.data[0]);
            this.jointHolderDetailsList = this.tempJointHolderList;
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

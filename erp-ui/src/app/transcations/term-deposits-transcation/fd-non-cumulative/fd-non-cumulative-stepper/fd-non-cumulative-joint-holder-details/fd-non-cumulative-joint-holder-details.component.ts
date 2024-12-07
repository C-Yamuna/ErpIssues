import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { NewMembershipAdd } from '../new-membership-add/shared/new-membership-add.model';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FdNonCumulativeApplicationService } from '../fd-non-cumulative-application/shared/fd-non-cumulative-application.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { NewMembershipAddService } from '../new-membership-add/shared/new-membership-add.service';
import { FdNonCumulativeApplication } from '../fd-non-cumulative-application/shared/fd-non-cumulative-application.model';
import { FdNonCumulativeJointHolder } from './shared/fd-non-cumulative-joint-holder.model';
import { FdNonCumulativeJointHolderService } from './shared/fd-non-cumulative-joint-holder.service';

@Component({
  selector: 'app-fd-non-cumulative-joint-holder-details',
  templateUrl: './fd-non-cumulative-joint-holder-details.component.html',
  styleUrls: ['./fd-non-cumulative-joint-holder-details.component.css']
})
export class FdNonCumulativeJointHolderDetailsComponent implements OnInit {

  jointAccountForm: any;
  jointAccount: any;
  checked: any;
  isMemberCreation: boolean = false;
  fdNonCummulativeAccId: any;
  membershipBasicDetail: NewMembershipAdd = new NewMembershipAdd();
  fdNonCumulativeApplicationModel: FdNonCumulativeApplication = new FdNonCumulativeApplication();
  fdNonCumulativeJointHolderModel : FdNonCumulativeJointHolder = new FdNonCumulativeJointHolder();
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

  constructor(
    private formBuilder: FormBuilder,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,
    private membershipServiceService: NewMembershipAddService,
    private fdNonCumulativeApplicationService: FdNonCumulativeApplicationService,private datePipe: DatePipe,
    private commonFunctionsService: CommonFunctionsService, private fdNonCumulativeJointHolderService:FdNonCumulativeJointHolderService) {
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
        this.fdNonCummulativeAccId = Number(id);
        this.isEdit = true;
        this.getFdNonCummApplicationById(this.fdNonCummulativeAccId);
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
    this.fdNonCumulativeJointHolderModel.jointHolderList = this.jointHolderDetailsList;
    this.fdNonCumulativeApplicationService.changeData({
      formValid: !this.jointAccountForm.valid ? true : false,
      data: this.fdNonCumulativeJointHolderModel,
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

  getFdNonCummApplicationById(id: any) {
    this.fdNonCumulativeApplicationService.getFdNonCummApplicationById(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != undefined && this.responseModel.data != null && this.responseModel.data.length > 0) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.fdNonCumulativeApplicationModel = this.responseModel.data[0];
            if (this.fdNonCumulativeApplicationModel.fdNonCummulativeProductName != null && this.fdNonCumulativeApplicationModel.fdNonCummulativeProductName != undefined) {
              this.productName = this.fdNonCumulativeApplicationModel.fdNonCummulativeProductName;
            }
            if (this.fdNonCumulativeApplicationModel.accountTypeName != null && this.fdNonCumulativeApplicationModel.accountTypeName != undefined) {
              this.accountType = this.fdNonCumulativeApplicationModel.accountTypeName;
            }
            if (this.fdNonCumulativeApplicationModel.accountTypeName != null && this.fdNonCumulativeApplicationModel.accountTypeName != undefined) {
              this.applicationType = this.fdNonCumulativeApplicationModel.accountTypeName;
            }
            if (this.fdNonCumulativeApplicationModel.accountNumber != null && this.fdNonCumulativeApplicationModel.accountNumber != undefined) {
              this.accountNumber = this.fdNonCumulativeApplicationModel.accountNumber;
            }
            if (this.fdNonCumulativeApplicationModel.fdNonCummulativeJointAccHolderDetailsDTOList != null) {
              this.jointHolderDetailsList = this.fdNonCumulativeApplicationModel.fdNonCummulativeJointAccHolderDetailsDTOList;
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
            if (this.fdNonCummulativeAccId != null && this.fdNonCummulativeAccId != undefined) {
              this.responseModel.data[0].fdNonCummulativeAccId = this.fdNonCummulativeAccId;
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

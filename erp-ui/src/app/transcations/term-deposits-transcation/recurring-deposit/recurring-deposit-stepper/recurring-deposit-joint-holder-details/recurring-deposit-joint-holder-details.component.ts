import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { RdAccountsService } from '../../../shared/rd-accounts.service';
import { TranslateService } from '@ngx-translate/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MemberGroupDetailsModel, MembershipBasicDetail, MembershipInstitutionDetailsModel } from '../../../shared/membership-basic-detail.model';
import { RdAccountsModel, RdJointHolder } from '../../../shared/term-depost-model.model';
import { MembershipServiceService } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-service.service';

@Component({
  selector: 'app-recurring-deposit-joint-holder-details',
  templateUrl: './recurring-deposit-joint-holder-details.component.html',
  styleUrls: ['./recurring-deposit-joint-holder-details.component.css']
})
export class RecurringDepositJointHolderDetailsComponent implements OnInit{
  
  // rdJointHolderForm:FormGroup;
  // rdJointHolder:any;
  // showForm: boolean = false;
  // responseModel!: Responsemodel;
  // membershipList: any[] = [];
  // msgs:any = [];
  // pacsId:any;
  // branchId:any;
  // orgnizationSetting:any;
  // isEdit:Boolean = false;
  // accountId:any;
  // admissionNumber:any;
  // jointAccountHolderList: any[] = [];
  // tempJointAccountHolderList: any[] = [];
  // rdAccount:RdAccountsModel = new RdAccountsModel();
  // membershipBasicDetail:MembershipBasicDetail = new MembershipBasicDetail();
  // showJointList:Boolean = false;
  // selectedAdmissionNums: any[] = [];
  // noOfJointHolders:any;

  // constructor(private router: Router,private datePipe: DatePipe,private formBuilder: FormBuilder, 
  //   private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, 
  //   private commonFunctionsService: CommonFunctionsService , private ref: ChangeDetectorRef, private rdAccountsService: RdAccountsService,
  //   private commonFunctionService : CommonFunctionsService, private translate: TranslateService,
  // ) {
  //   this.rdJointHolderForm = this.formBuilder.group({ 
  //     rdProduct: ['',''],
  //     accountNumber: ['',''],
  //     roi: ['',''],
  //     minTenure: ['',''],
  //     maxTenure: ['',''],
  //   })
  // }
  // ngOnInit() {
  //   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
  //   this.activateRoute.queryParams.subscribe(params => {
  //     if (params['isEdit'] != undefined || params['id'] != undefined && params['admissionNum'] != undefined) {
  //       let queryParams = this.encryptDecryptService.decrypt(params['isEdit']);
  //       if(String(queryParams).toLowerCase() == "true"){
  //         this.isEdit = true;
  //       }else{
  //         this.isEdit = false;
  //       }

  //       if (params['id'] != undefined ) {
  //         let idParams = this.encryptDecryptService.decrypt(params['id']);
  //         this.accountId = Number(idParams);
  //       }

  //       if (params['admissionNum'] != undefined ) {
  //         let idParams = this.encryptDecryptService.decrypt(params['admissionNum']);
  //         this.admissionNumber = idParams;
  //         this.getMemberDetailsByAdmissionNum(this.admissionNumber);
  //       }
  //     } else {
  //       this.isEdit = false;
  //     }
  //   });
  //   this.getAllMembershipDetails();
  //   this.rdJointHolderForm.valueChanges.subscribe((data: any) => {
  //     this.updateData();
  //   });
  // }


  // updateData() {
  //   this.rdAccountsService.changeData({
  //     formValid: !this.rdJointHolderForm.valid ? true : false,
  //     data: this.jointAccountHolderList,
  //     isDisable: (!this.rdJointHolderForm.valid),
  //     stepperIndex: 4,
  //   });
  // }

  // OnChangeAdmissionNumber(event:any) {
  //   this.selectedAdmissionNums;
  //   let admisionNumber = event.itemValue.value;
  //   if(event.originalEvent.selected){
  //     this.jointAccountHolderList = this.jointAccountHolderList.filter((obj: any) => obj.admissionNumber != admisionNumber).map(obj => {
  //       return obj;
  //     });
  //     this.noOfJointHolders = this.jointAccountHolderList.length;
  //   }else{
  //     this.getMemberDetailsByAdmissionNum(admisionNumber);
  //   }
  // }

  // onRemoveIntem(){

  // }

  // // OnChangeAdmissionNumber(event: any) {
  // //   this.numberOfJointHolders = 0;
  // //   this.selectedAdmissionNumberList = [];
  // //   if (null != event.value && undefined != event.value && event.value != "") {
  // //     for (let admissionNumber of event.value) {
  // //       let check = this.selectedAdmissionNumberList.push(admissionNumber);
  // //       this.numberOfJointHolders = this.selectedAdmissionNumberList.length;
  // //       this.getMembershipDetails(admissionNumber.label);
  // //     }
  // //   }
  // // }

  // getAllMembershipDetails() {
  //   this.pacsId = 1;
  //   this.branchId = 1;
  //   this.rdAccountsService.getAllMembershipDetailsFromMembership(this.pacsId, this.branchId).subscribe((response: any) => {
  //     this.responseModel = response;
  //     if (this.responseModel != null && this.responseModel != undefined) {
  //       if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
  //         if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
  //           this.membershipList = this.responseModel.data;
  //           this.membershipList = this.membershipList.filter((obj: any) => obj != null).map((relationType: { id : any ;name: any; admissionNumber: any; memberTypeName: any }) => {
  //             return {
  //               label: `${relationType.name} - ${relationType.admissionNumber} - ${relationType.memberTypeName}`,
  //               value: relationType.admissionNumber
  //             };
  //           });
  //         }
  //         else {
  //           this.msgs = [];
  //           this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
  //           setTimeout(() => {
  //             this.msgs = [];
  //           }, 2000);
  //         }
  //       }
  //     }
  //   });
  // }

  // getMemberDetailsByAdmissionNum(admisionNumber: any) {
  //   // this.tempJointAccountHolderList = this.jointAccountHolderList;
  //   // this.jointAccountHolderList = [];
  //   this.rdAccountsService.getMembershipBasicDetailsByAdmissionNumber(admisionNumber).subscribe((data: any) => {
  //     this.responseModel = data;
  //     if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
  //       if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
  //         this.membershipBasicDetail = this.responseModel.data[0];         
  //         if (this.membershipBasicDetail.admissionDate != null && this.membershipBasicDetail.admissionDate != undefined) {
  //           this.membershipBasicDetail.admissionDate = this.datePipe.transform(this.membershipBasicDetail.admissionDate, this.orgnizationSetting.datePipe);
  //         }
  //         this.membershipBasicDetail.id = null;
  //         this.showJointList = true;
  //         this.jointAccountHolderList.push(this.membershipBasicDetail);
  //         // this.jointAccountHolderList = this.tempJointAccountHolderList;
  //         this.noOfJointHolders =  this.jointAccountHolderList.length;
  //         this.updateData();
  //       }
  //     }else{
  //       this.msgs = [];
  //       this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
  //       setTimeout(() => {
  //         this.msgs = [];
  //       }, 3000);
  //     }
  //   }, error => {
  //     this.commonComponent.stopSpinner();
  //     this.msgs = [];
  //     this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
  //     setTimeout(() => {
  //       this.msgs = [];
  //     }, 3000);
  //   });
  // }

  jointAccountForm: any;
  jointAccount: any;
  checked: any;
  isMemberCreation: boolean = false;
  rdAccId: any;
  rdAccountModel:RdAccountsModel = new RdAccountsModel();
  membershipBasicDetail:MembershipBasicDetail = new MembershipBasicDetail();
  rdJointHolderModel:RdJointHolder = new RdJointHolder();
  // rdAccountModel: SiLoanApplication = new SiLoanApplication();
  // rdJointHolderModel: SiLoanJointHolder = new SiLoanJointHolder();
  // membershipBasicDetail: membershipBasicDetail = new membershipBasicDetail();
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
    private rdAccountsService:RdAccountsService,private commonComponent: CommonComponent,
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
        this.rdAccId = Number(id);
        this.isEdit = true;
        this.getRDAccountById(this.rdAccId);
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
    this.rdJointHolderModel.jointHolderList = this.jointHolderDetailsList;
    this.rdAccountsService.changeData({
      formValid: !this.jointAccountForm.valid ? true : false,
      data: this.rdJointHolderModel,
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

  // getSILoanAccountJointHolderDetailsBySIrdAccId(id: any) {
  //   this.siLoanCoApplicantDetailsService.getSILoanCoApplicantByLoanApplicationId(id).subscribe((response: any) => {
  //     this.responseModel = response;
  //   });
  // }

  getRDAccountById(id: any) {
    this.rdAccountsService.getRdAccounts(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != undefined && this.responseModel.data != null && this.responseModel.data.length > 0) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.rdAccountModel = this.responseModel.data[0];
            if (this.rdAccountModel.productName != null && this.rdAccountModel.productName != undefined) {
              this.productName = this.rdAccountModel.productName;
            }
            if (this.rdAccountModel.accountTypeName != null && this.rdAccountModel.accountTypeName != undefined) {
              this.accountType = this.rdAccountModel.accountTypeName;
            }
            if (this.rdAccountModel.accountTypeName != null && this.rdAccountModel.accountTypeName != undefined) {
              this.applicationType = this.rdAccountModel.accountTypeName;
            }
            if (this.rdAccountModel.depositDate != null && this.rdAccountModel.depositDate != undefined) {
              this.accountOpeningDateVal = this.datePipe.transform(this.rdAccountModel.depositDate, this.orgnizationSetting.datePipe);
            }
            if (this.rdAccountModel.accountNumber != null && this.rdAccountModel.accountNumber != undefined) {
              this.accountNumber = this.rdAccountModel.accountNumber;
            }
            if (this.rdAccountModel.tdJointAccHolderDetailsDTOList != null) {
              this.jointHolderDetailsList = this.rdAccountModel.tdJointAccHolderDetailsDTOList;
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
            if (this.rdAccId != null && this.rdAccId != undefined) {
              this.responseModel.data[0].rdAccId = this.rdAccId;
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

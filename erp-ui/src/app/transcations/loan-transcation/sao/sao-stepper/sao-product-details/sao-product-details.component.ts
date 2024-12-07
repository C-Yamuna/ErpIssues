import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SaoLoanApplication, SaoLoanInsuranceDetailsModel } from '../../shared/sao-loan-application.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { SaoInterestPolicyConfigModel, SaoProductDetails } from './shared/sao-product-details.model';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { SaoProductDefinitionsService } from '../../sao-product-definition/shared/sao-product-definitions.service';
import { IndividualMemberDetailsModel } from '../membership-basic-details/shared/membership-basic-details.model';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';

@Component({
  selector: 'app-sao-product-details',
  templateUrl: './sao-product-details.component.html',
  styleUrls: ['./sao-product-details.component.css']
})
export class SaoProductDetailsComponent {
  @ViewChild('dt', { static: false })
  private dt!: Table;
  apllicationdetailsform: FormGroup;
  insurencedetailsform: FormGroup;
  gender: any[] = [];
  maritalstatus: any[] | undefined;
  product: any;
  loanpurposeList: any[] = [];
  operationtype: any[] | undefined;
  admissionnumber: any;
  responseModel!: Responsemodel;
  productList: any[] = [];
  cropAndLandDEtailsList: any[] = [];
  coveredVillagesList:any[] = [];
  seasonTypesList: any [] = [];
  cropTypesList: any [] = [];
  soilTypeList: any [] = [];
  operationList: any[] = [];
  pacsId: any;
  isEdit: boolean = false;
  msgs: any[] = [];
  savedId: any;
  societyId: any;
  branchId: any;
  id: any;
  rowEdit: boolean = false;
  addButton: boolean = false;
  orgnizationSetting: any;
  saoLoanApplicatonModel: SaoLoanApplication = new SaoLoanApplication();
  saoProductDetailsModel: SaoProductDetails = new SaoProductDetails();
  individualMemberDetailsModel: IndividualMemberDetailsModel = new IndividualMemberDetailsModel();
  saoLoanInsuranceDetailsModel:SaoLoanInsuranceDetailsModel = new SaoLoanInsuranceDetailsModel();
  saoInterestPolicyConfigModel: SaoInterestPolicyConfigModel = new SaoInterestPolicyConfigModel();
  statusList:any[] = [];
  isDisableFlag:  boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private saoProductDefinitionsService: SaoProductDefinitionsService, private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent, private encryptDecryptService: EncryptDecryptService, private saoLoanApplicationService: SaoLoanApplicationService,
    private commonFunctionsService: CommonFunctionsService,private datePipe : DatePipe,private membershipBasicDetailsService: MembershipBasicDetailsService
  ) {

    this.apllicationdetailsform = this.formBuilder.group({
      saoProductName: ['', [Validators.required]],
      accountNumber: [{ value: '', disabled: true }],
      effectiveRoi: ['', ],
      applicationDate: [{ value: '', disabled: true }],
      minLoanPeriod: [{ value: '', disabled: true }],
      maxLoanPeriod: [{ value: '', disabled: true }],
      penalInterest: [{ value: '', disabled: true }],
      iod: [{ value: '', disabled: true }],
      repaymentFrequency:[{ value: '', disabled: true }],
      purposeName:  ['', [Validators.required, Validators.minLength(3)]],
      operationTypeName: ['', [Validators.required, Validators.minLength(3)]],
      requestedAmount: ['', [Validators.required, Validators.minLength(3)]],
      sanctionAmount: ['', [Validators.required, Validators.minLength(3)]],
      loanPeriod:['', ],
      loanDueDate:['', ],
      plannedDisbursements:['', ],
      // cgstAmount:['', ],
      // sgstAmount: ['', ],
      // igstAmount: ['',],
      // totalCharges: ['', ],
    })
    
    this.insurencedetailsform = this.formBuilder.group({
      policyName:['', ],
      policyNumber:['',],
      premium:['', ],
    })
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.operationList = [
      { label: 'single', value: 0 },
      { label: 'joint', value: 1 },
    ];
    this.statusList = this.commonComponent.status();
    this.gender = this.commonComponent.genderList();
    this.maritalstatus = this.commonComponent.maritalStatusList();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['flag'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        //let flag = this.encryptDecryptService.decrypt(params['flag']);
        this.savedId = id;
        this.isEdit = true;
       // this.getMemberDetailsByApplicationId(this.savedId);
        this.getSaoLoanApplicationDetailsById(this.savedId);
        this.getInsurenceDetailsByApplicationId(this.savedId);

        this.commonComponent.stopSpinner();

      } else {
        this.isEdit = false;
        this.commonComponent.stopSpinner();
      }
    })
    this.apllicationdetailsform.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.apllicationdetailsform.valid) {
        this.save();
      }
    });
    this.insurencedetailsform.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.insurencedetailsform.valid) {
        this.save();
      }
    });
    this.pacsId = 1;
    this.getAllActiveProductsList();
    this.getAllLoanPurposes();
  }
  
  getAllActiveProductsList() {
    this.saoProductDefinitionsService.getActiveProductsBasedOnPacsId(this.pacsId).subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.productList = this.responseModel.data;
        this.productList = this.productList.filter((obj: any) => obj != null).map((product: { name: any; id: any; }) => {
          return { label: product.name, value: product.id };
        });
        //this.productList.unshift({ label: 'select', value: 0 });
      }
    });
  }
  getMemberDetailsByApplicationId(loanId:any){
    this.membershipBasicDetailsService.getMemberDetailsByLoanId(loanId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined) {
            this.saoLoanApplicatonModel = this.responseModel.data[0];
          }
          if (this.saoLoanApplicatonModel.individualMemberDetailsDTO.dob != null && this.saoLoanApplicatonModel.individualMemberDetailsDTO.dob != undefined) {
            this.saoLoanApplicatonModel.individualMemberDetailsDTO.dobVal = this.datePipe.transform(this.saoLoanApplicatonModel.individualMemberDetailsDTO.dob, this.orgnizationSetting.datePipe);
          }
          if (this.saoLoanApplicatonModel.individualMemberDetailsDTO.admissionDate != null && this.saoLoanApplicatonModel.individualMemberDetailsDTO.admissionDate != undefined) {
            this.saoLoanApplicatonModel.individualMemberDetailsDTO.admissionDateVal = this.datePipe.transform(this.saoLoanApplicatonModel.individualMemberDetailsDTO.admissionDate, this.orgnizationSetting.datePipe);
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
  getAllLoanPurposes(){
    this.commonComponent.startSpinner();
    this, this.saoLoanApplicationService.getAllLoanPurposes().subscribe(response => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.loanpurposeList = this.responseModel.data.filter((loanPurpose: { status: number; }) => loanPurpose.status == 1).map((loanPurpose: any) => {
          return { label: loanPurpose.name, value: loanPurpose.id };
        });
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      })
  }
 
  getSaoLoanApplicationDetailsById(id: any) {
    this.commonFunctionsService
    this.saoLoanApplicationService.getSaoLoanApplicationDetailsById(this.savedId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.saoLoanApplicatonModel = this.responseModel.data[0];

                if(this.saoLoanApplicatonModel.applicationDate == null || this.saoLoanApplicatonModel.applicationDate == undefined){
                  this.saoLoanApplicatonModel.applicationDateVal = this.commonFunctionsService.currentDate();

                  if (this.saoLoanApplicatonModel.applicationDateVal != null && this.saoLoanApplicatonModel.applicationDateVal != undefined) {
                    this.saoLoanApplicatonModel.applicationDate = this.commonFunctionsService.getUTCEpochWithTimedateConversionToLong(this.saoLoanApplicatonModel.applicationDateVal);
                  }
                }
                else if(this.saoLoanApplicatonModel.applicationDate != null && this.saoLoanApplicatonModel.applicationDate != undefined){
                  this.saoLoanApplicatonModel.applicationDateVal = this.commonFunctionsService.dateConvertionIntoFormate(this.saoLoanApplicatonModel.applicationDate);
                }
                if(this.saoLoanApplicatonModel.loanDueDate != null && this.saoLoanApplicatonModel.loanDueDate != undefined){
                  this.saoLoanApplicatonModel.loanDueDateVal = this.datePipe.transform(this.saoLoanApplicatonModel.loanDueDate, this.orgnizationSetting.datePipe);
                }
                this.getProductDetailsById(this.saoLoanApplicatonModel.saoProductId);
              }
            }
          }
        }
      }
    });
    
  }
  getInsurenceDetailsByApplicationId(id :any){
    this.saoLoanApplicationService.getInsurenceDetailsByApplicationId(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.saoLoanInsuranceDetailsModel = this.responseModel.data[0];
              }
            }
          }
        }
      }
    });
  }
  updateData() {
    // const isApplicationDetailsFormInvalid = !this.apllicationdetailsform.valid;
    // const isInsuranceDetailsFormInvalid = !this.insurencedetailsform.valid;
  
    // this.isDisableFlag = isApplicationDetailsFormInvalid && isInsuranceDetailsFormInvalid;
  
    // this.saoLoanApplicatonModel.saoLoanInsuranceDetailsDTO = this.saoLoanInsuranceDetailsModel;
  
    // this.saoLoanApplicationService.changeData({
    //   formValid: !isApplicationDetailsFormInvalid && !isInsuranceDetailsFormInvalid,
    //   data: this.saoLoanApplicatonModel,
    //   isDisable: this.isDisableFlag,
    //   stepperIndex: 2,
    // });
    this.saoLoanApplicatonModel.saoLoanInsuranceDetailsDTO = this.saoLoanInsuranceDetailsModel;
    this.saoLoanApplicationService.changeData({
      formValid: !this.apllicationdetailsform.valid ? true : false,
      data: this.saoLoanApplicatonModel,
      isDisable: (!this.apllicationdetailsform.valid),
      stepperIndex: 2,
    });
  }
  save() {
    this.updateData();
  }
  
  
  getProductDetailsById(id: any) {
    this.saoProductDefinitionsService.getPreviewDetailsByProductId(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.saoProductDetailsModel = this.responseModel.data[0];

        if (this.saoProductDetailsModel.minLoanPeriod != undefined && this.saoProductDetailsModel.minLoanPeriod != null)
          this.saoLoanApplicatonModel.minLoanPeriod = this.saoProductDetailsModel.minLoanPeriod;

        if (this.saoProductDetailsModel.maxLoanPeriod != undefined && this.saoProductDetailsModel.maxLoanPeriod != null )
          this.saoLoanApplicatonModel.maxLoanPeriod = this.saoProductDetailsModel.maxLoanPeriod;

        if (this.saoProductDetailsModel.repaymentFrequency != undefined && this.saoProductDetailsModel.repaymentFrequency != null)
          this.saoLoanApplicatonModel.repaymentFrequency = this.saoProductDetailsModel.repaymentFrequency;

        if (this.saoProductDetailsModel.saoInterestPolicyConfigDtoList != null && this.saoProductDetailsModel.saoInterestPolicyConfigDtoList != undefined) {
          if (this.saoProductDetailsModel.saoInterestPolicyConfigDtoList[0].penalInterest != undefined && this.saoProductDetailsModel.saoInterestPolicyConfigDtoList[0].penalInterest != null)
            this.saoLoanApplicatonModel.penalInterest = this.saoProductDetailsModel.saoInterestPolicyConfigDtoList[0].penalInterest;

          if (this.saoProductDetailsModel.saoInterestPolicyConfigDtoList[0].iod != undefined && this.saoProductDetailsModel.saoInterestPolicyConfigDtoList[0].iod != null)
            this.saoLoanApplicatonModel.iod = this.saoProductDetailsModel.saoInterestPolicyConfigDtoList[0].iod;
        }
      }
    });
  }

  
}

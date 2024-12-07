import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CiBorrowingProductDefinition } from '../../shared/ci-borrowing-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CiBorrowingProductDefinitionService } from '../../shared/ci-borrowing-product-definition.service';

@Component({
  selector: 'app-ci-product-config',
  templateUrl: './ci-product-config.component.html',
  styleUrls: ['./ci-product-config.component.css']
})
export class CiProductConfigComponent {
  productionDefinitionForm: FormGroup;
  ciProductDefinitionModel :CiBorrowingProductDefinition = new CiBorrowingProductDefinition();
  orgnizationSetting:any;
  isEdit: any;
  maxDate = new Date();
  minDate = new Date();
  responseModel!: Responsemodel;
  savedID: any;
  msgs: any[] = [];
  isSpecialSchemelist: any[] = [];
  repaymentFrequencyList: any[] = [];
  selectedList: any[]=[];
  id: any;
  collaterals:any;
  statusList: any[] = [];
  borrowingTypeList: any[] = [];
  interestCalculationTypeList: any[] = [];
  linkShareCapitalList: any[] = [];
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private encryptService: EncryptDecryptService,
    private ciBorrowingProductDefinitionService : CiBorrowingProductDefinitionService,
    private changeDetectorRef: ChangeDetectorRef,
  )
  { 
    this.productionDefinitionForm = this.formBuilder.group({
     'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
     'effectiveStartDate': new FormControl('', Validators.required),
     'minAmount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),Validators.required]),
     'maxAmount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),Validators.required]),
     'minBorrowingPeriodInMonths': new FormControl('',Validators.required),
     'maxBorrowingPeriodInMonths': new FormControl('', Validators.required),
     'borrowingType': new FormControl('', Validators.required),
     'borrowingSchemeType': new FormControl('',),
     'demandAlertDays': new FormControl('',),
     'interestCalculationType': new FormControl('', Validators.required),
     'repaymentFrequency': new FormControl('', Validators.required),
     'defaulterAlertDays': new FormControl('', ),
     'maxBorrowingAccountsAllowed': new FormControl('', ),
     'linkSharecapitalApplicable': new FormControl('', Validators.required),
     'institutionName': new FormControl('', ),
     'minDaysForRenewel': new FormControl(''),
     'isNpaExceptional': new FormControl('', Validators.required),
     'interestType': new FormControl(''),
     'interestCalculationFrequency': new FormControl(''),
     'isForeclosureAllowed': new FormControl('', Validators.required),
     'isGestationPeriodRequired': new FormControl('', Validators.required),
    })    
  }
  /**
    @author vinitha
    @implements Ci Borrowings Configuration details 
    @argument ProductId
    @returns Ci Borrowings Configuration details  if already exist
   */
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.isSpecialSchemelist = this.commonComponent.requiredlist();
      this.repaymentFrequencyList = this.commonComponent.rePaymentFrequency();
      this.borrowingTypeList = this.commonComponent.borrowingTypes();
      this.interestCalculationTypeList = this.commonComponent.interestCalculationType();
      this.linkShareCapitalList =this.commonComponent.mandatoryList();
      this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.id = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewByProductId(this.id);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.productionDefinitionForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.productionDefinitionForm.valid) {
        this.save();
      }
    });
  }


  getPreviewByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.ciBorrowingProductDefinitionService.getPreviewByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.ciProductDefinitionModel = this.responseModel.data[0];
        if (this.ciProductDefinitionModel != null && this.ciProductDefinitionModel != undefined) {

          if(null!=this.ciProductDefinitionModel.effectiveStartDate && undefined!=this.ciProductDefinitionModel.effectiveStartDate)
            this.ciProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.ciProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
        

          

      }
      this.updateData();
      }else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      this.commonComponent.stopSpinner();
    });
  }
 
  /**
    @author vinitha
    @implements Integrating Ci Borrowings Configuration details To Main Stepper Component
    @argument ciProductDefinitionModel, productionDefinitionform.valid
   */
  updateData() {
    this.ciProductDefinitionModel.id = this.id
    this.ciBorrowingProductDefinitionService.changeData({
      formValid: this.productionDefinitionForm.valid && this.amountAndTenureFlag,
      data: this.ciProductDefinitionModel,
      stepperIndex: 0,
      
    });
  }
 
  /**
    @author vinitha
    @implements To Call update Data function to integrate data to main stepper
   */
  save() {
    this.updateData();
  }
  checkForAmount(){
    if(null != this.ciProductDefinitionModel && undefined!=this.ciProductDefinitionModel &&
      null != this.ciProductDefinitionModel.minAmount && undefined!=this.ciProductDefinitionModel.minAmount &&
      null != this.ciProductDefinitionModel.maxAmount && undefined!=this.ciProductDefinitionModel.maxAmount &&
      this.ciProductDefinitionModel.minAmount >= this.ciProductDefinitionModel.maxAmount
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_AMOUNT_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 1500);
    }else if(null != this.ciProductDefinitionModel && undefined!=this.ciProductDefinitionModel &&
      null != this.ciProductDefinitionModel.minBorrowingPeriodInMonths && undefined != this.ciProductDefinitionModel.minBorrowingPeriodInMonths &&
      null != this.ciProductDefinitionModel.maxBorrowingPeriodInMonths && undefined != this.ciProductDefinitionModel.maxBorrowingPeriodInMonths &&
      this.ciProductDefinitionModel.minBorrowingPeriodInMonths >= this.ciProductDefinitionModel.maxBorrowingPeriodInMonths
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_LOAN_PERIOD_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 1500);
    }else{
      this.msgs = [];
      this.amountAndTenureFlag = applicationConstants.TRUE;
    }
    this.updateData();
  }


}

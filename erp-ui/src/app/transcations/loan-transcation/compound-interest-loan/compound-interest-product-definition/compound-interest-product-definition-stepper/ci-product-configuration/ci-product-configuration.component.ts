import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CompoundInterestProductDefinition } from '../../shared/compound-interest-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CompoundInterestProductDefinitionService } from '../../shared/compound-interest-product-definition.service';
import { CollateralTypesService } from 'src/app/configurations/loan-config/collateral-types/shared/collateral-types.service';

@Component({
  selector: 'app-ci-product-configuration',
  templateUrl: './ci-product-configuration.component.html',
  styleUrls: ['./ci-product-configuration.component.css']
})
export class CiProductConfigurationComponent {
  productionDefinitionForm: FormGroup;
  compoundInterestProductDefinitionModel :CompoundInterestProductDefinition = new CompoundInterestProductDefinition();
  orgnizationSetting:any;
  isEdit: any;
  maxDate = new Date();
  minDate = new Date();
  responseModel!: Responsemodel;
  savedID: any;
  msgs: any[] = [];
  isSpecialSchemelist: any[] = [];
  interestPostingFrequencyList: any[] = [];
  ciProdCollateralsConfigDTOList: any[] = [];
  selectedList: any[]=[];
  ciProductId: any;
  collaterals:any;
  statusList: any[] = [];

  selectedCollateralIds: number[] = [];
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private encryptService: EncryptDecryptService,
    private compoundInterestProductDefinitionService : CompoundInterestProductDefinitionService, private collateralTypesService : CollateralTypesService,
    private changeDetectorRef: ChangeDetectorRef,
  )
  { 
    this.productionDefinitionForm = this.formBuilder.group({
     'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
     'eligibleMInAmount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),Validators.required]),
     'eligibleMaxAmount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),Validators.required]),
     'minLoanPeriod': new FormControl('',Validators.required),
     'maxLoanPeriod': new FormControl('', Validators.required),
     'effectiveStartDate': new FormControl('', Validators.required),
     'demandAlertDays': new FormControl('',),
     'defaulterAlertDays': new FormControl('', ),
     'maxLoanAccountsAllowed': new FormControl('', ),
     'loanLinkedshareCapitalApplicable': new FormControl('', Validators.required),
     'noOfGuarantorsRequired': new FormControl('', ),
     'isInsuranceAppicable': new FormControl('', Validators.required),
     'minDaysForRenewel': new FormControl('', Validators.required),
     'interestPostingFrequency': new FormControl('', Validators.required),
     'nomineeRequired': new FormControl('', Validators.required),
     'collateraltypes': new FormControl('',),
    })    
  }
  /**
    @author vinitha
    @implements CI Loans Configuration details 
    @argument ProductId
    @returns CI Loans Configuration details  if already exist
   */
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.isSpecialSchemelist = this.commonComponent.requiredlist();
      this.interestPostingFrequencyList = this.commonComponent.rePaymentFrequency();
      this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.ciProductId = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewDetailsByProductId(this.ciProductId);
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
    this.getAllCollaterals();
  }
  getPreviewDetailsByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.ciProdCollateralsConfigDTOList=[]
    this.compoundInterestProductDefinitionService.getPreviewDetailsByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.compoundInterestProductDefinitionModel = this.responseModel.data[0];
        if (this.compoundInterestProductDefinitionModel != null && this.compoundInterestProductDefinitionModel != undefined) {

          if(null!=this.compoundInterestProductDefinitionModel.effectiveStartDate && undefined!=this.compoundInterestProductDefinitionModel.effectiveStartDate)
            this.compoundInterestProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.compoundInterestProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          this.initializeFormWithCollaterals(this.compoundInterestProductDefinitionModel.ciProdCollateralsConfigDTOList);
          this.productionDefinitionForm.patchValue(this.compoundInterestProductDefinitionModel);

          

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
    @implements Integrating CI Loans Configuration details To Main Stepper Component
    @argument compoundInterestProductDefinitionModel, productionDefinitionform.valid
   */
  updateData() {
    this.compoundInterestProductDefinitionModel.ciProductId = this.ciProductId
    this.compoundInterestProductDefinitionService.changeData({
      formValid: this.productionDefinitionForm.valid,
      data: this.compoundInterestProductDefinitionModel,
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
  getAllCollaterals() {
    this.msgs = [];
    this.commonComponent.startSpinner();
    this.collateralTypesService.getAllCollateralTypes().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
        this.ciProdCollateralsConfigDTOList = this.responseModel.data.filter((data: any) => data.status == applicationConstants.ACTIVE).map((collateral: any) => {
          return { label: collateral.name, value: collateral.id }
      });
      this.commonComponent.stopSpinner();
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
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
      this.commonComponent.stopSpinner();
    });
  }
  initializeFormWithCollaterals(collaterals: any[]) {
    this.selectedCollateralIds =collaterals.filter((data: any) => data.status == applicationConstants.ACTIVE).map((collateral: any) => collateral.collateralType);
  
    this.productionDefinitionForm.get('collateraltypes')?.setValue(this.selectedCollateralIds);
  }

  onCollateralChange(event: any) {
    const newlySelectedIds = event.value;
    this.selectedCollateralIds = newlySelectedIds;
    this.productionDefinitionForm.get('collateraltypes')?.setValue(this.selectedCollateralIds);
  
    this.compoundInterestProductDefinitionModel.ciProdCollateralsConfigDTOList = this.selectedCollateralIds.map((id: any) => ({
      ciProductId: this.ciProductId,
      collateralType: id,
      status: this.statusList[0].value, 
      statusName: this.statusList[0].label,
      collateralTypeName: this.ciProdCollateralsConfigDTOList.find(item => item.value === id)?.label
    }));
    this.updateData();
  }
  checkForAmount(){
    if(null != this.compoundInterestProductDefinitionModel && undefined!=this.compoundInterestProductDefinitionModel &&
      null != this.compoundInterestProductDefinitionModel.eligibleMInAmount && undefined!=this.compoundInterestProductDefinitionModel.eligibleMInAmount &&
      null != this.compoundInterestProductDefinitionModel.eligibleMaxAmount && undefined!=this.compoundInterestProductDefinitionModel.eligibleMaxAmount &&
      this.compoundInterestProductDefinitionModel.eligibleMInAmount >= this.compoundInterestProductDefinitionModel.eligibleMaxAmount
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_AMOUNT_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 1500);
    }else if(null != this.compoundInterestProductDefinitionModel && undefined!=this.compoundInterestProductDefinitionModel &&
      null != this.compoundInterestProductDefinitionModel.minLoanPeriod && undefined != this.compoundInterestProductDefinitionModel.minLoanPeriod &&
      null != this.compoundInterestProductDefinitionModel.maxLoanPeriod && undefined != this.compoundInterestProductDefinitionModel.maxLoanPeriod &&
      this.compoundInterestProductDefinitionModel.minLoanPeriod >= this.compoundInterestProductDefinitionModel.maxLoanPeriod
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

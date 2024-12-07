import { Component } from '@angular/core';
import { SimpleInterestProductDefinition } from '../../shared/simple-interest-product-definition.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ActivatedRoute } from '@angular/router';
import { CollateralTypesService } from 'src/app/configurations/loan-config/collateral-types/shared/collateral-types.service';
import { SimpleInterestProductDefinitionService } from '../../shared/simple-interest-product-definition.service';

@Component({
  selector: 'app-simple-interest-product-configuration',
  templateUrl: './simple-interest-product-configuration.component.html',
  styleUrls: ['./simple-interest-product-configuration.component.css']
})
export class SimpleInterestProductConfigurationComponent {
  productionDefinitionForm: FormGroup;
  simpleInterestProductDefinitionModel :SimpleInterestProductDefinition = new SimpleInterestProductDefinition();
  orgnizationSetting:any;
  isEdit: any;
  maxDate = new Date();
  minDate = new Date();
  responseModel!: Responsemodel;
  savedID: any;
  msgs: any[] = [];
  isSpecialSchemelist: any[] = [];
  interestPostingFrequencyList: any[] = [];
  siProdCollateralsConfigDTOList: any[] = [];
  selectedList: any[]=[];
  siProductId: any;
  collaterals:any;
  statusList: any[] = [];

  selectedCollateralIds: number[] = [];
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private encryptService: EncryptDecryptService,
    private simpleInterestProductDefinitionService : SimpleInterestProductDefinitionService, private collateralTypesService : CollateralTypesService,
   
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
    @implements Si Loans Configuration details 
    @argument ProductId
    @returns Si Loans Configuration details  if already exist
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
        this.siProductId = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewDetailsByProductId(this.siProductId);
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
    this.siProdCollateralsConfigDTOList=[]
    this.simpleInterestProductDefinitionService.getPreviewDetailsByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.simpleInterestProductDefinitionModel = this.responseModel.data[0];
        if (this.simpleInterestProductDefinitionModel != null && this.simpleInterestProductDefinitionModel != undefined) {

          if(null!=this.simpleInterestProductDefinitionModel.effectiveStartDate && undefined!=this.simpleInterestProductDefinitionModel.effectiveStartDate)
            this.simpleInterestProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.simpleInterestProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          this.initializeFormWithCollaterals(this.simpleInterestProductDefinitionModel.siProdCollateralsConfigDTOList);
          this.productionDefinitionForm.patchValue(this.simpleInterestProductDefinitionModel);

          

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
    @implements Integrating Si Loans Configuration details To Main Stepper Component
    @argument simpleInterestProductDefinitionModel, productionDefinitionform.valid
   */
  updateData() {
    this.simpleInterestProductDefinitionModel.siProductId = this.siProductId
    this.simpleInterestProductDefinitionService.changeData({
      formValid: this.productionDefinitionForm.valid,
      data: this.simpleInterestProductDefinitionModel,
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
        this.siProdCollateralsConfigDTOList = this.responseModel.data.filter((data: any) => data.status == applicationConstants.ACTIVE).map((collateral: any) => {
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
  
    this.simpleInterestProductDefinitionModel.siProdCollateralsConfigDTOList = this.selectedCollateralIds.map((id: any) => ({    
      siProductId: this.siProductId,
      collateralType: id,
      status: this.statusList[0].value, 
      statusName: this.statusList[0].label,
      collateralTypeName: this.siProdCollateralsConfigDTOList.find(item => item.value === id)?.label
    }));
    this.updateData();
  }
  checkForAmount(){
    if(null != this.simpleInterestProductDefinitionModel && undefined!=this.simpleInterestProductDefinitionModel &&
      null != this.simpleInterestProductDefinitionModel.eligibleMInAmount && undefined!=this.simpleInterestProductDefinitionModel.eligibleMInAmount &&
      null != this.simpleInterestProductDefinitionModel.eligibleMaxAmount && undefined!=this.simpleInterestProductDefinitionModel.eligibleMaxAmount &&
      this.simpleInterestProductDefinitionModel.eligibleMInAmount >= this.simpleInterestProductDefinitionModel.eligibleMaxAmount
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_AMOUNT_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 1500);
    }else if(null != this.simpleInterestProductDefinitionModel && undefined!=this.simpleInterestProductDefinitionModel &&
      null != this.simpleInterestProductDefinitionModel.minLoanPeriod && undefined != this.simpleInterestProductDefinitionModel.minLoanPeriod &&
      null != this.simpleInterestProductDefinitionModel.maxLoanPeriod && undefined != this.simpleInterestProductDefinitionModel.maxLoanPeriod &&
      this.simpleInterestProductDefinitionModel.minLoanPeriod >= this.simpleInterestProductDefinitionModel.maxLoanPeriod
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

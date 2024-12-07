import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DailyDepositsProductDefinition } from '../../shared/daily-deposits-product-definition.model';
import { Table } from 'primeng/table';
import { PenalityConfig } from './shared/penality-config.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DailyDepositsProductDefinitionService } from '../../shared/daily-deposits-product-definition.service';
import { PenalityConfigService } from './shared/penality-config.service';

@Component({
  selector: 'app-penality-config',
  templateUrl: './penality-config.component.html',
  styleUrls: ['./penality-config.component.css']
})
export class PenalityConfigComponent {
  @ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  date: Date | undefined;
  penalityConfigList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  penalityConfigForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  penalityConfigModel :PenalityConfig = new PenalityConfig();
  dailyDepositsProductDefinitionModel:DailyDepositsProductDefinition = new DailyDepositsProductDefinition();
  maxDate = new Date();
  minDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  productId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  amountAndTenureFlag: boolean = applicationConstants.TRUE;

  constructor(private formBuilder: FormBuilder,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private commonFunctionService: CommonFunctionsService,
    private encryptService: EncryptDecryptService,
    private dailyDepositsProductDefinitionService: DailyDepositsProductDefinitionService,
    private  penalityConfigService : PenalityConfigService
  )
  { 
    this.penalityConfigForm = this.formBuilder.group({
      'minAmount': new FormControl('',Validators.required),
      'maxAmount': new FormControl('',Validators.required),
      'penaltyAmount': new FormControl('',Validators.required),
      // 'effectiveStartDate': new FormControl('', Validators.required)
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.productId = Number(this.encryptService.decrypt(encrypted));
          this.getDailyDepositPenalityConfigDetails(this.productId);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.penalityConfigForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.penalityConfigForm.valid) {
        this.save();
      }
    });
  }
  /**
    @author vinitha
    @implements Integrating Recurring Deposit Configuration details To Main Stepper Component
   */
  updateData() {
    this.penalityConfigModel.productId = this.productId
    this.dailyDepositsProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.penalityConfigModel,
      savedId:this.productId,
      stepperIndex: 2,
      isDisable: !this.penalityConfigForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
    });
  }
     /**
    @author vinitha
    @implements To Call update Data function to integrate data to main stepper
   */
  save() {
    this.updateData();
  }
  
  addInlineRow() {
    this.addNewEntry();
    this.editDeleteDisable = applicationConstants.TRUE;
    this.addButton = applicationConstants.TRUE;
    this.dt._first = 0;
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }

  addNewEntry()
  {
    this.newRow = {minAmount: '', maxAmount: '', penaltyAmount: '', effectiveStartDate: ''}
  }
     /**
    @author vinitha
    @implementsRow Row Edit Cancel
   
   */
  onRowEditCancel() {
    this.addButton=applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    this.enableSaveAndNextButton = applicationConstants.TRUE;
    const index = this.dt.value.indexOf(this.newRow);
    if (index > -1) {
      this.dt.value.splice(index, 1);
    }
    this.addNewEntry();
    this.getDailyDepositPenalityConfigDetails(this.productId);
    this.updateData();
  }
  /**
    @author vinitha
    @implements edit inline row
   
   */
  editInlineRow(row:any) {
    this.addButton = applicationConstants.TRUE;
    this.editDeleteDisable = applicationConstants.TRUE; 
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }
   /**
    @author vinitha
    @implements Recurring Deposit Configuration details 
    @argument ProductId
   */
    getDailyDepositPenalityConfigDetails(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.penalityConfigList=[]
    this.dailyDepositsProductDefinitionService.getProductOverviewById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.dailyDepositsProductDefinitionModel = this.responseModel.data[0];
        if (this.dailyDepositsProductDefinitionModel != null && this.dailyDepositsProductDefinitionModel != undefined) {

          if(null!=this.dailyDepositsProductDefinitionModel.effectiveStartDate && undefined!=this.dailyDepositsProductDefinitionModel.effectiveStartDate)
            this.dailyDepositsProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.dailyDepositsProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.dailyDepositsProductDefinitionModel.penaltyConfigList != null && this.dailyDepositsProductDefinitionModel.penaltyConfigList != undefined &&
            this.dailyDepositsProductDefinitionModel.penaltyConfigList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.penalityConfigList = this.dailyDepositsProductDefinitionModel.penaltyConfigList;

        
          // this.penalityConfigList = this.penalityConfigList.filter((data:any) => data !=null &&data.effectiveStartDate !=null).map((object:any) => {
          //   object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
          //   return object;
          // });
        }else{
          this.enableSaveAndNextButton = applicationConstants.FALSE;
        }
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
  @implements It Saves the Recurring Deposit Interest Policy data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
  if(null != this.penalityConfigModel.productId && undefined!=this.penalityConfigModel.productId)
    rowData.productId = this.penalityConfigModel.productId;
  this.addButton = applicationConstants.FALSE;
  this.editDeleteDisable = applicationConstants.FALSE;
  // if(rowData.effectiveStartDate != undefined && rowData.effectiveStartDate != null)
  //   rowData.effectiveStartDate = this.commonFunctionService.getUTCEpoch(new Date(rowData.effectiveStartDate));

   if(rowData.id != null)
    {
        this.penalityConfigService.updateProductPenalityConfig(rowData).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {

              // if(null !=this.penalityConfigModel.effectiveStartDate && undefined != this.penalityConfigModel.effectiveStartDate)
              //   this.penalityConfigModel.effectiveStartDate=this.datePipe.transform(this.penalityConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            if(null != rowData.productId && undefined!=rowData.productId)
             this.getDailyDepositPenalityConfigDetails(rowData.productId);
            this.commonComponent.stopSpinner();
            this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];  
            }, 2000);
          }
          } else {
           this.commonComponent.stopSpinner();
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];  
            }, 2000);
           
          }
        },
          error => {
            this.commonComponent.stopSpinner();
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];  
            }, 2000);
          });
  } else {
     this.penalityConfigService.addProductPenalityConfig(rowData).subscribe((response: any) => {
       this.responseModel = response;
       if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined) {

        // if(null != this.penalityConfigModel.effectiveStartDate && undefined != this.penalityConfigModel.effectiveStartDate)
        //   this.penalityConfigModel.effectiveStartDate=this.datePipe.transform(this.penalityConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
        this.penalityConfigList.unshift(this.responseModel.data[0]);
        this.penalityConfigList.splice(1, 1);
        if(null != rowData.productId && undefined!=rowData.productId)
          this.getDailyDepositPenalityConfigDetails(rowData.productId);
         this.commonComponent.stopSpinner();
         this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
         setTimeout(() => {
           this.msgs = [];  
         }, 2000);
        }
       } else {
        this.getDailyDepositPenalityConfigDetails(this.productId);
         this.commonComponent.stopSpinner();
         this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
         setTimeout(() => {
           this.msgs = [];  
         }, 2000);
       }
     },
       error => {
         this.commonComponent.stopSpinner();
         this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
         setTimeout(() => {
           this.msgs = [];  
         }, 2000);
       });
   }
   }

   checkForAmount(): void {
    const minAmount = this.penalityConfigForm.get('minAmount')?.value;
    const maxAmount = this.penalityConfigForm.get('maxAmount')?.value;
    if (minAmount && maxAmount &&  minAmount >=maxAmount) {
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [{ severity: 'error', detail: applicationConstants.MIN_DEPOSIT_AMOUNT_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 1000);
    } else {
      this.msgs = [];
      this.amountAndTenureFlag = applicationConstants.TRUE;
    }
    this.updateData();
  }
}

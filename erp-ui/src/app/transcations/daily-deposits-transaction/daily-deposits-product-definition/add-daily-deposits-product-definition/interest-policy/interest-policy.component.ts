import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { InterestPolicy } from './shared/interest-policy.model';
import { DailyDepositsProductDefinition } from '../../shared/daily-deposits-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { InterestPolicyService } from './shared/interest-policy.service';
import { DailyDepositsProductDefinitionService } from '../../shared/daily-deposits-product-definition.service';

@Component({
  selector: 'app-interest-policy',
  templateUrl: './interest-policy.component.html',
  styleUrls: ['./interest-policy.component.css']
})
export class InterestPolicyComponent {
  @ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  date: Date | undefined;
  intrestpolicyList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  interestPolicyForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  interestPolicyModel :InterestPolicy = new InterestPolicy();
  dailyDepositsProductDefinitionModel:DailyDepositsProductDefinition = new DailyDepositsProductDefinition();
  minDate = new Date();
  maxDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  msgs: any[]=[];
  productId:any;
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  
  constructor(private formBuilder: FormBuilder,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private commonFunctionService: CommonFunctionsService,
    private encryptService: EncryptDecryptService,
    private interestPolicyService:InterestPolicyService,
    private dailyDepositsProductDefinitionService: DailyDepositsProductDefinitionService,
  )
  { 
    this.interestPolicyForm = this.formBuilder.group({
      'roi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'penaltyRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
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
          this.getInterestpolicyDetails(this.productId);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.interestPolicyForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.interestPolicyForm.valid) {
        this.save();
      }
    });
  }
  /**
    @author Bhargavi
    @implements Integrating investments Configuration details To Main Stepper Component
   */
  updateData() {
    this.interestPolicyModel.productId = this.productId
    this.dailyDepositsProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.interestPolicyModel,
      savedId:this.productId,
      stepperIndex: 1,
      isDisable: !this.interestPolicyForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
    });
  }
     /**
    @author Bhargavi
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
    this.newRow = {roi: '',penaltyRoi: '', effectiveStartDate: ''}
  }
     /**
    @author Bhargavi
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
    this.getInterestpolicyDetails(this.productId);
    this.updateData();
  }
  /**
    @author Bhargavi
    @implements edit inline row
   
   */
  editInlineRow(row:any) {
    this.addButton = applicationConstants.TRUE;
    this.editDeleteDisable = applicationConstants.TRUE; 
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }
   /**
    @author Bhargavi
    @implements investments Configuration details 
    @argument ProductId
   */
  getInterestpolicyDetails(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.intrestpolicyList=[]
    this.dailyDepositsProductDefinitionService.getProductOverviewById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.dailyDepositsProductDefinitionModel = this.responseModel.data[0];
        if (this.dailyDepositsProductDefinitionModel != null && this.dailyDepositsProductDefinitionModel != undefined) {

          if(null!=this.dailyDepositsProductDefinitionModel.effectiveStartDate && undefined!=this.dailyDepositsProductDefinitionModel.effectiveStartDate)
            this.dailyDepositsProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.dailyDepositsProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.dailyDepositsProductDefinitionModel.intestPolicyConfigList != null && this.dailyDepositsProductDefinitionModel.intestPolicyConfigList != undefined &&
            this.dailyDepositsProductDefinitionModel.intestPolicyConfigList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.intrestpolicyList = this.dailyDepositsProductDefinitionModel.intestPolicyConfigList;

        
          // this.intrestpolicyList = this.intrestpolicyList.filter((data:any) => data !=null &&data.effectiveStartDate !=null).map((object:any) => {
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
    @author Bhargavi
  @implements It Saves the Investments Interest Policy data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
  if(null != this.interestPolicyModel.productId && undefined!=this.interestPolicyModel.productId)
    rowData.productId = this.interestPolicyModel.productId;
  this.addButton = applicationConstants.FALSE;
  this.editDeleteDisable = applicationConstants.FALSE;
  // if(rowData.effectiveStartDate != undefined && rowData.effectiveStartDate != null)
  //   rowData.effectiveStartDate = this.commonFunctionService.getUTCEpoch(new Date(rowData.effectiveStartDate));

   if(rowData.id != null)
    {
        this.interestPolicyService.updateInterestPolicy(rowData).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {

              // if(null !=this.interestPolicyModel.effectiveStartDate && undefined != this.interestPolicyModel.effectiveStartDate)
              //   this.interestPolicyModel.effectiveStartDate=this.datePipe.transform(this.interestPolicyModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            if(null != rowData.productId && undefined!=rowData.productId)
             this.getInterestpolicyDetails(rowData.productId);
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
     this.interestPolicyService.addInterestPolicy(rowData).subscribe((response: any) => {
       this.responseModel = response;
       if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined) {

        // if(null != this.interestPolicyModel.effectiveStartDate && undefined != this.interestPolicyModel.effectiveStartDate)
        //   this.interestPolicyModel.effectiveStartDate=this.datePipe.transform(this.interestPolicyModel.effectiveStartDate, this.orgnizationSetting.datePipe);
        this.intrestpolicyList.unshift(this.responseModel.data[0]);
        this.intrestpolicyList.splice(1, 1);
        if(null != rowData.productId && undefined!=rowData.productId)
          this.getInterestpolicyDetails(rowData.productId);
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
         this.getInterestpolicyDetails(rowData.productId);
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

}

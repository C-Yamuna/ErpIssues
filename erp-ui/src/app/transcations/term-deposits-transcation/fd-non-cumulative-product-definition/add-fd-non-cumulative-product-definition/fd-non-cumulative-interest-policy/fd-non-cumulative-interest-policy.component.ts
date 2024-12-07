import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { FdNonCumulativeInterestPolicy } from './shared/fd-non-cumulative-interest-policy.model';
import { FdNonCumulativeProductDefinition } from '../../shared/fd-non-cumulative-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FdNonCumulativeProductDefinitionService } from '../../shared/fd-non-cumulative-product-definition.service';
import { FdNonCumulativeInterestPolicyService } from './shared/fd-non-cumulative-interest-policy.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-fd-non-cumulative-interest-policy',
  templateUrl: './fd-non-cumulative-interest-policy.component.html',
  styleUrls: ['./fd-non-cumulative-interest-policy.component.css']
})
export class FdNonCumulativeInterestPolicyComponent {
  @ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  date: Date | undefined;
  intrestpolicyList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  interestPolicyForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  fdNonCumulativeInterestPolicyModel :FdNonCumulativeInterestPolicy = new FdNonCumulativeInterestPolicy();
  fdNonCumulativeProductDefinitionModel :FdNonCumulativeProductDefinition = new FdNonCumulativeProductDefinition();
  maxDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  fdNonCummProductId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private fdNonCumulativeProductDefinitionService:FdNonCumulativeProductDefinitionService,
    private  fdNonCumulativeInterestPolicyService : FdNonCumulativeInterestPolicyService
  )
  { 
    this.interestPolicyForm = this.formBuilder.group({
      'generalRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'staffRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'seniorcitizenRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'penaltyRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.fdNonCummProductId = Number(this.encryptService.decrypt(encrypted));
          this.getFdNonCumulativeinterestpolicyDetails(this.fdNonCummProductId);
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
    @author vinitha
    @implements Integrating Fd Cummulative Configuration details To Main Stepper Component
   */
  updateData() {
    this.fdNonCumulativeInterestPolicyModel.fdNonCummProductId = this.fdNonCummProductId
    this.fdNonCumulativeProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.fdNonCumulativeInterestPolicyModel,
      savedId:this.fdNonCummProductId,
      stepperIndex: 1,
      isDisable: !this.interestPolicyForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
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
    this.newRow = {generalRoi: '', staffRoi: '', seniorcitizenRoi: '',penaltyRoi: '', }
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
    @implements Fd Cummulative Configuration details 
    @argument ProductId
   */
  getFdNonCumulativeinterestpolicyDetails(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.intrestpolicyList=[]
    this.fdNonCumulativeProductDefinitionService.getFdNonCumulativeProductDefinitionOverviewDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.fdNonCumulativeProductDefinitionModel = this.responseModel.data[0];
        if (this.fdNonCumulativeProductDefinitionModel != null && this.fdNonCumulativeProductDefinitionModel != undefined) {

          if(null!=this.fdNonCumulativeProductDefinitionModel.effectiveStartDate && undefined!=this.fdNonCumulativeProductDefinitionModel.effectiveStartDate)
            this.fdNonCumulativeProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.fdNonCumulativeProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeInterestPolicyConfigList != null && this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeInterestPolicyConfigList != undefined &&
            this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeInterestPolicyConfigList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.intrestpolicyList = this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeInterestPolicyConfigList;

        
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
  @implements It Saves the Fd Non Cummulative Interest Policy data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
  if(null != this.fdNonCumulativeInterestPolicyModel.fdNonCummProductId && undefined!=this.fdNonCumulativeInterestPolicyModel.fdNonCummProductId)
    rowData.fdNonCummProductId = this.fdNonCumulativeInterestPolicyModel.fdNonCummProductId;
  this.addButton = applicationConstants.FALSE;
  this.editDeleteDisable = applicationConstants.FALSE;
   if(rowData.id != null)
    {
        this.fdNonCumulativeInterestPolicyService.updateFdNonCumulativeInterestPolicy(rowData).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {   
            if(null != rowData.fdNonCummProductId && undefined!=rowData.fdNonCummProductId)
             this.getFdNonCumulativeinterestpolicyDetails(rowData.fdNonCummProductId);
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
     this.fdNonCumulativeInterestPolicyService.addFdNonCumulativeInterestPolicy(rowData).subscribe((response: any) => {
       this.responseModel = response;
       if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined) {
        this.intrestpolicyList.unshift(this.responseModel.data[0]);
        this.intrestpolicyList.splice(1, 1);
        if(null != rowData.fdNonCummProductId && undefined!=rowData.fdNonCummProductId)
          this.getFdNonCumulativeinterestpolicyDetails(rowData.fdNonCummProductId);
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
   }
   }


}

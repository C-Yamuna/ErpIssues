import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SaoProductDefinition } from '../../shared/sao-product-definition.model';
import { SaoProdPurpose } from './shared/sao-prod-purpose.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { SaoProductDefinitionsService } from '../../shared/sao-product-definitions.service';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SaoProductPurposeService } from './shared/sao-product-purpose.service';
import { LoanPurposeService } from 'src/app/configurations/loan-config/loan-purpose/shared/loan-purpose.service';

@Component({
  selector: 'app-sao-prod-purpose-config',
  templateUrl: './sao-prod-purpose-config.component.html',
  styleUrls: ['./sao-prod-purpose-config.component.css']
})
export class SaoProdPurposeConfigComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  purposeList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  purposeForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  saoProdPurposeModel :SaoProdPurpose = new SaoProdPurpose();
  saoProductDefinitionModel :SaoProductDefinition = new SaoProductDefinition();
  maxDate = new Date();
  minDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  saoProductId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  purposeTypeList: any[]=[];
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private saoProductDefinitionsService : SaoProductDefinitionsService, private saoProductPurposeService :SaoProductPurposeService,
    private loanPurposeService : LoanPurposeService
  )
  { 
    this.purposeForm = this.formBuilder.group({
      'purposeId': new FormControl('', Validators.required),
      'gestationPeriod': new FormControl('',),
      'maxGesitationPeriod':new FormControl('', Validators.required),
      'remarks':new FormControl('', ),
      
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
       
        this.saoProductId = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewDetailsByProductId(this.saoProductId);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.purposeForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.purposeForm.valid) {
        this.save();
      }
    });
    this.getAllPurposeTypes();
  }
 /**
    @author vinitha
    @implements Integrating SAO Loans Configuration details To Main Stepper Component
   */
  updateData() {
    this.saoProdPurposeModel.saoProductId = this.saoProductId
    this.saoProductDefinitionsService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.saoProdPurposeModel,
      savedId:this.saoProductId,
      stepperIndex: 4,
      isDisable: !this.purposeForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
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
    this.editDeleteDisable = applicationConstants.TRUE;;
    this.addButton = applicationConstants.TRUE;;
    this.dt._first = 0;
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }

  addNewEntry()
  {
    this.newRow = {purposeId: '',gestationPeriod:'',maxGesitationPeriod:'',remarks:''}
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
    @implements SAO Loans Configuration details 
    @argument ProductId
   */
getPreviewDetailsByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.purposeList=[]
    this.saoProductDefinitionsService.getPreviewDetailsByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.saoProductDefinitionModel = this.responseModel.data[0];
        if (this.saoProductDefinitionModel != null && this.saoProductDefinitionModel != undefined) {

          if(null!=this.saoProductDefinitionModel.effectiveStartDate && undefined!=this.saoProductDefinitionModel.effectiveStartDate)
            this.saoProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.saoProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.saoProductDefinitionModel.saoProdPurPoseConfgList != null && this.saoProductDefinitionModel.saoProdPurPoseConfgList != undefined &&
            this.saoProductDefinitionModel.saoProdPurPoseConfgList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.purposeList = this.saoProductDefinitionModel.saoProdPurPoseConfgList;

        
        }
        else{
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
  @implements It Saves the SAO Loans Linked Share Capital data 
    @argument ProductId
   */

  saveInlineRow(rowData: any) {
    if(null != this.saoProdPurposeModel.saoProductId && undefined!=this.saoProdPurposeModel.saoProductId)
      rowData.saoProductId = this.saoProdPurposeModel.saoProductId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    this.purposeTypeList.filter((purposetype: any) => purposetype != null && purposetype.value == this.saoProdPurposeModel.purposeId).map((act: { label: any; }) => {
      this.saoProdPurposeModel.loanPurposeName = act.label;
    });
    if (this.purposetypeDuplicateCheck(this.saoProdPurposeModel.purposeId)) {
      return;
    }
  
     if(rowData.id != null)
      {
          this.saoProductPurposeService.updateSaoProductPurpose(rowData).subscribe((response: any) => {
            this.responseModel = response;
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              if (this.responseModel != null&& this.responseModel.data!= undefined) {        
              if(null != rowData.saoProductId && undefined!=rowData.saoProductId)
               this.getPreviewDetailsByProductId(rowData.saoProductId);
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
              this.getPreviewDetailsByProductId(this.saoProductId);  
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
       this.saoProductPurposeService.addSaoProductPurpose(rowData).subscribe((response: any) => {
         this.responseModel = response;
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) { 
          this.purposeList.unshift(this.responseModel.data[0]);
          this.purposeList.splice(1, 1);
          if(null != rowData.saoProductId && undefined!=rowData.saoProductId)
            this.getPreviewDetailsByProductId(rowData.saoProductId);
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
           this.getPreviewDetailsByProductId(this.saoProductId);  
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
    /* @author vinitha
     @implements get charges types
       @argument ProductId
      */
       getAllPurposeTypes() {
        this.commonComponent.startSpinner();
        this.purposeTypeList =[];
        this.loanPurposeService.getAllLoanPurpose().subscribe((res: any) => {
          this.responseModel = res;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {
              this.commonComponent.stopSpinner();
              this.msgs = [];
              this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
              setTimeout(() => {
                this.msgs = [];
              }, 2000);
            }else{
              this.purposeTypeList = this.responseModel.data.filter((documenttype:any) => documenttype.status == applicationConstants.ACTIVE).map((count:any) => {
                return { label: count.name, value: count.id }
              });
      
              let purposeType=  this.purposeTypeList.find((data:any) => null != data && data.value ==this.saoProdPurposeModel.purposeId);
              if(purposeType != null && undefined != purposeType)
                 this.saoProdPurposeModel.loanPurposeName = purposeType.label;
              this.commonComponent.stopSpinner();
            }
          } else {
            this.commonComponent.stopSpinner();
            this.msgs = [];
            this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
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
      purposetypeDuplicateCheck(selectedpurposeType: any) {
        // Check if there is any row in the list with the same purposetypes as the selected one
        const isDuplicate = this.purposeList.some(row => 
          row.purposeId === selectedpurposeType &&
          row.id !== this.saoProdPurposeModel.id  // Exclude the current row being edited (if applicable)
        );
      
        if (isDuplicate) {
          this.purposeForm.get('chargesTypeName')?.reset();
          this.msgs = [{ severity: 'error',  summary: applicationConstants.STATUS_ERROR,detail: applicationConstants.PURPOSE_TYPE_ALREADY_EXIST }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
          return applicationConstants.TRUE;
        }
      
        // Otherwise, proceed with the new purposetypes
        return  applicationConstants.FALSE;
      }
      checkForGestationPeriod(){
        const gesitationPeriod = this.purposeForm.get('gesitationPeriod')?.value;
        const maxGesitationPeriod = this.purposeForm.get('maxGesitationPeriod')?.value;
    
        if (gesitationPeriod && maxGesitationPeriod &&  gesitationPeriod >=maxGesitationPeriod) {
          this.amountAndTenureFlag = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', detail: applicationConstants.MIN_CHARGES_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 1500);
        } else {
          this.msgs = [];
          this.amountAndTenureFlag = applicationConstants.TRUE;
        }
    
       
        this.updateData();
      }
}

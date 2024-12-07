import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CompoundInterestProductDefinition } from '../../shared/compound-interest-product-definition.model';
import { CiLinkedShareCapital } from './shared/ci-linked-share-capital.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CompoundInterestProductDefinitionService } from '../../shared/compound-interest-product-definition.service';
import { CiLinkedShareCapitalService } from './shared/ci-linked-share-capital.service';

@Component({
  selector: 'app-ci-linked-share-capital',
  templateUrl: './ci-linked-share-capital.component.html',
  styleUrls: ['./ci-linked-share-capital.component.css']
})
export class CiLinkedShareCapitalComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  linkedShareCapitalList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  linkedShareCapitalForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  compoundInterestProductDefinitionModel :CompoundInterestProductDefinition = new CompoundInterestProductDefinition();
  ciLinkedShareCapitalModel :CiLinkedShareCapital = new CiLinkedShareCapital();
  maxDate = new Date();
  minDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  ciProductId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;

  gstApplicableList: any[]=[];
  collectionTypeList: any[]=[];
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private compoundInterestProductDefinitionService : CompoundInterestProductDefinitionService, private ciLinkedShareCapitalService :CiLinkedShareCapitalService
  )
  { 
    this.linkedShareCapitalForm = this.formBuilder.group({
      'collectionType': new FormControl('', Validators.required),
      'collectionValue': new FormControl('',),
      'cgstPercentage': new FormControl('', ),
      'sgstPercentage': new FormControl('',),
      'igstPercentage': new FormControl('',),
      'minSlabAmount':new FormControl('', Validators.required),
      'gstApplicable': new FormControl('', Validators.required),
      'maxSlabAmount':new FormControl('', ),
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.gstApplicableList = this.commonComponent.requiredlist();
    this.collectionTypeList = this.commonComponent.collectiontypeList();
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
  
    this.linkedShareCapitalForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.linkedShareCapitalForm.valid) {
        this.save();
      }
    });
  }
 /**
    @author vinitha
    @implements Integrating CI Loans Configuration details To Main Stepper Component
   */
  updateData() {
    this.ciLinkedShareCapitalModel.ciProductId = this.ciProductId
    this.compoundInterestProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.ciLinkedShareCapitalModel,
      savedId:this.ciProductId,
      stepperIndex: 2,
      isDisable: !this.linkedShareCapitalForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
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
    this.newRow = {collectionType: '',collectionValue:'',minSlabAmount:'',maxSlabAmount:'',gstApplicable:'', cgstPercentage: '',sgstPercentage: '',igstPercentage:''}
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
    @implements CI Loans Configuration details 
    @argument ProductId
   */
getPreviewDetailsByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.linkedShareCapitalList=[]
    this.compoundInterestProductDefinitionService.getPreviewDetailsByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.compoundInterestProductDefinitionModel = this.responseModel.data[0];
        if (this.compoundInterestProductDefinitionModel != null && this.compoundInterestProductDefinitionModel != undefined) {

          if(null!=this.compoundInterestProductDefinitionModel.effectiveStartDate && undefined!=this.compoundInterestProductDefinitionModel.effectiveStartDate)
            this.compoundInterestProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.compoundInterestProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.compoundInterestProductDefinitionModel.ciLoanLinkedShareCapitalConfigDTOList != null && this.compoundInterestProductDefinitionModel.ciLoanLinkedShareCapitalConfigDTOList != undefined &&
            this.compoundInterestProductDefinitionModel.ciLoanLinkedShareCapitalConfigDTOList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.linkedShareCapitalList = this.compoundInterestProductDefinitionModel.ciLoanLinkedShareCapitalConfigDTOList;

        
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
  @implements It Saves the CI Loans Linked Share Capital data 
    @argument ProductId
   */

  saveInlineRow(rowData: any) {
    if(null != this.ciLinkedShareCapitalModel.ciProductId && undefined!=this.ciLinkedShareCapitalModel.ciProductId)
      rowData.ciProductId = this.ciLinkedShareCapitalModel.ciProductId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
  
     if(rowData.id != null)
      {
          this.ciLinkedShareCapitalService.updateCiLinkedShareCapital(rowData).subscribe((response: any) => {
            this.responseModel = response;
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
              if(null != rowData.ciProductId && undefined!=rowData.ciProductId)
               this.getPreviewDetailsByProductId(rowData.ciProductId);
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
              this.getPreviewDetailsByProductId(this.ciProductId);
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
       this.ciLinkedShareCapitalService.addCiLinkedShareCapital(rowData).subscribe((response: any) => {
         this.responseModel = response;
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
          this.linkedShareCapitalList.unshift(this.responseModel.data[0]);
          this.linkedShareCapitalList.splice(1, 1);
          if(null != rowData.ciProductId && undefined!=rowData.ciProductId)
            this.getPreviewDetailsByProductId(rowData.ciProductId);
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
           this.getPreviewDetailsByProductId(this.ciProductId);
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
     collectiontypeDuplicateCheck(selectedcollectionType: any) {
      // Check if there is any row in the list with the same serviceTypeId as the selected one
      const isDuplicate = this.linkedShareCapitalList.some(row => 
        row.collectionType === selectedcollectionType &&
        row.id !== this.ciLinkedShareCapitalModel.id 
      );
    
      if (isDuplicate) {
        this.linkedShareCapitalForm.get('collectionType')?.reset();
        this.msgs = [{ severity: 'error',  detail:applicationConstants.COLLECTION_TYPE_ALREADY_EXIST}];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        return applicationConstants.TRUE;
      }
    
  
      return applicationConstants.FALSE;
    }
     checkForAmount(): void {
      const minSlabAmount = this.linkedShareCapitalForm.get('minSlabAmount')?.value;
      const maxSlabAmount = this.linkedShareCapitalForm.get('maxSlabAmount')?.value;
  
      if (minSlabAmount && maxSlabAmount &&  minSlabAmount >=maxSlabAmount) {
        this.amountAndTenureFlag = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', detail: applicationConstants.MIN_SLAB_AMOUNT_ERROR }];
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

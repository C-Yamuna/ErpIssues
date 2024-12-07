import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { TermBorrowingProductDefinition } from '../../shared/term-borrowing-product-definition.model';
import { TermCollectionApportionOrder, TermInterestPolicy } from './shared/term-interest-policy.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TermInterestPolicyService } from './shared/term-interest-policy.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ActivatedRoute } from '@angular/router';
import { TermBorrowingProductDefinitionService } from '../../shared/term-borrowing-product-definition.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-term-interest-policy',
  templateUrl: './term-interest-policy.component.html',
  styleUrls: ['./term-interest-policy.component.css']
})
export class TermInterestPolicyComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;
  intrestPolicyList: any[] = [];
  apportionOrderList: any[]=[];
  displayDialog: boolean =  applicationConstants.FALSE;
  interestPolicyForm: FormGroup;
  collectionApportionOrderForm: FormGroup;
  newRow :any =null;
  newRowForApportion:any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  editDeleteDisableForApportion:boolean = applicationConstants.FALSE;
  addButton:boolean =  applicationConstants.FALSE;
  addButtonForApportion:boolean =  applicationConstants.FALSE;
  termProductDefinitionModel :TermBorrowingProductDefinition = new TermBorrowingProductDefinition();
  termInterestPolicyConfigModel :TermInterestPolicy = new TermInterestPolicy();
  termCollectionApportionOrderModel:TermCollectionApportionOrder = new TermCollectionApportionOrder();
  maxDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  productId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean =  applicationConstants.FALSE;
  enableSaveAndNextButtonForApportion: boolean =  applicationConstants.FALSE;
  collectionApportionList: any[]=[];
  tenureTypeList: any[]=[];
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private termBorrowingProductDefinitionService : TermBorrowingProductDefinitionService, private termInterestPolicyService :TermInterestPolicyService
  )
  { 
    this.interestPolicyForm = this.formBuilder.group({
      'tenureType':new FormControl('', Validators.required),
      'minSlabAmount':new FormControl('', Validators.required),
      'maxSlabAmount':new FormControl('', Validators.required),
      'roi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'penalInterest': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'employeeConcession': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'seniorCitizenConcession': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
     
    });

    this.collectionApportionOrderForm = this.formBuilder.group({
      'collectionCompenentId': new FormControl('', Validators.required),
      'order': new FormControl('', Validators.required),
     
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.tenureTypeList = this.commonComponent.tenureType();
    this.collectionApportionList = this.commonComponent.collectionApportionType();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
       
        this.productId = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewByProductId(this.productId);
      } else {
        this.isEdit =  applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.interestPolicyForm && this.collectionApportionOrderForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.interestPolicyForm && this.collectionApportionOrderForm.valid) {
        this.save();
      }
    });
   
  }
 /**
    @author vinitha
    @implements Integrating Term Borrowings Configuration details To Main Stepper Component
   */
  updateData() {
    this.termInterestPolicyConfigModel.productId = this.productId,
    this.termCollectionApportionOrderModel.productId = this.productId,
    this.termBorrowingProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton && this.enableSaveAndNextButtonForApportion ,
      data: this.termInterestPolicyConfigModel && this.termCollectionApportionOrderModel ,
      savedId:this.productId,
      stepperIndex: 1,
      isDisable: !this.interestPolicyForm && !this.collectionApportionOrderForm.valid? applicationConstants.TRUE: applicationConstants.FALSE,
      
      
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
    this.enableSaveAndNextButton =  applicationConstants.FALSE;  
    this.updateData();
  }


  addInlineRowApportionOrder() {
    this.addNewEntryForApportionOrder();
    this.editDeleteDisableForApportion = applicationConstants.TRUE;
    this.addButtonForApportion = applicationConstants.TRUE;
    this.cv._first = 0;
    this.cv.value.unshift(this.newRowForApportion);
    this.cv.initRowEdit(this.cv.value[0]);
    this.enableSaveAndNextButtonForApportion =  applicationConstants.FALSE;  
    this.updateData();
  }
  addNewEntry()
  {
    this.newRow = {tenureType:'',minSlabAmount:'',maxSlabAmount:'',roi: '',employeeConcession:'',seniorCitizenConcession:'',penalInterest:''}
  }

  addNewEntryForApportionOrder()
  {
    this.newRowForApportion = {collectionCompenentId: '',order:''}
  }
     /**
    @author vinitha
    @implementsRow Row Edit Cancel
   
   */
  onRowEditCancel() {
    this.addButton= applicationConstants.FALSE;
    this.editDeleteDisable =  applicationConstants.FALSE;
    this.enableSaveAndNextButton = applicationConstants.FALSE;
    const index = this.dt.value.indexOf(this.newRow);
    if (index > -1) {
      this.dt.value.splice(index, 1);
    }
    this.addNewEntry();
    this.updateData();
  }

  onRowEditCancelForApportionOrder(){
    this.addButtonForApportion= applicationConstants.FALSE;
    this.editDeleteDisableForApportion =  applicationConstants.FALSE;
    this.enableSaveAndNextButtonForApportion = applicationConstants.FALSE;
    const index = this.cv.value.indexOf(this.newRowForApportion);
    if (index > -1) {
      this.cv.value.splice(index, 1);
    }

    this.updateData();
  }

/**
    @author vinitha
    @implements edit inline row
   
   */
  editInlineRow(row:any) {
    this.addButton =  applicationConstants.TRUE;
    this.editDeleteDisable = applicationConstants.TRUE; 
    this.enableSaveAndNextButton =  applicationConstants.FALSE;  
    this.updateData();
  }

  editInlineRowForApportionOrder(row:any){
    this.addButtonForApportion =  applicationConstants.TRUE;
    this.editDeleteDisableForApportion = applicationConstants.TRUE; 
    this.enableSaveAndNextButtonForApportion =  applicationConstants.FALSE;  
    this.updateData();
  }

 
 /**
    @author vinitha
    @implements Term Borrowings Configuration details 
    @argument ProductId
   */
    getPreviewByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.intrestPolicyList=[]
    this.apportionOrderList=[]
    this.termBorrowingProductDefinitionService.getPreviewByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.termProductDefinitionModel = this.responseModel.data[0];
        if (this.termProductDefinitionModel != null && this.termProductDefinitionModel != undefined) {

          if(null!=this.termProductDefinitionModel.effectiveStartDate && undefined!=this.termProductDefinitionModel.effectiveStartDate)
            this.termProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.termProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.termProductDefinitionModel.termInterestPolicyConfigDTO != null && this.termProductDefinitionModel.termInterestPolicyConfigDTO != undefined &&
            this.termProductDefinitionModel.termInterestPolicyConfigDTO.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.intrestPolicyList = this.termProductDefinitionModel.termInterestPolicyConfigDTO;

        
         
        }
        else{
          this.enableSaveAndNextButton = applicationConstants.FALSE;
        }

        if (this.termProductDefinitionModel.termProductApportionConfigDTO != null && this.termProductDefinitionModel.termProductApportionConfigDTO != undefined &&
          this.termProductDefinitionModel.termProductApportionConfigDTO.length > 0) {

            this.enableSaveAndNextButtonForApportion = applicationConstants.TRUE;

        this.apportionOrderList = this.termProductDefinitionModel.termProductApportionConfigDTO;

       
      }
      else{
        this.enableSaveAndNextButtonForApportion = applicationConstants.FALSE;
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
  @implements It Saves the Term Borrowings Interest Policy data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
    if(null != this.termInterestPolicyConfigModel.productId && undefined!=this.termInterestPolicyConfigModel.productId)
      rowData.productId = this.termInterestPolicyConfigModel.productId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
   
  
     if(rowData.id != null)
      {
          this.termInterestPolicyService.updateTermInterestPolicy(rowData).subscribe((response: any) => {
            this.responseModel = response;
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
               
              if(null != rowData.productId && undefined!=rowData.productId)
               this.getPreviewByProductId(rowData.productId);
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
              this.getPreviewByProductId(this.productId);
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
       this.termInterestPolicyService.addTermInterestPolicy(rowData).subscribe((response: any) => {
         this.responseModel = response;
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
         
          this.intrestPolicyList.unshift(this.responseModel.data[0]);
          this.intrestPolicyList.splice(1, 1);
          if(null != rowData.productId && undefined!=rowData.productId)
            this.getPreviewByProductId(rowData.productId);
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
           this.getPreviewByProductId(this.productId);
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
     saveInlineRowForApportionOrder(rowData: any){
      if(null != this.termCollectionApportionOrderModel.productId && undefined!=this.termCollectionApportionOrderModel.productId)
        rowData.productId = this.termCollectionApportionOrderModel.productId;
      this.addButtonForApportion = applicationConstants.FALSE;
      this.editDeleteDisableForApportion = applicationConstants.FALSE;
      
    
       if(rowData.id != null)
        {
            this.termInterestPolicyService.updateTermApportionOrder(rowData).subscribe((response: any) => {
              this.responseModel = response;
              if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
                if (this.responseModel != null&& this.responseModel.data!= undefined) {
                 
                if(null != rowData.productId && undefined!=rowData.productId)
                 this.getPreviewByProductId(rowData.productId);
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
         this.termInterestPolicyService.addTermApportionOrder(rowData).subscribe((response: any) => {
           this.responseModel = response;
           if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {
              this.apportionOrderList.unshift(this.responseModel.data[0]);
              this.apportionOrderList.splice(1, 1);
              
           
            if(null != rowData.productId && undefined!=rowData.productId)
              this.getPreviewByProductId(rowData.productId);
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
    tenuretypeDuplicateCheck(selectedTenureType: any) {
      // Check if there is any row in the list with the same serviceTypeId as the selected one
      const isDuplicate = this.intrestPolicyList.some(row => 
        row.tenureType === selectedTenureType &&
        row.id !== this.termInterestPolicyConfigModel.id 
      );
    
      if (isDuplicate) {
        this.collectionApportionOrderForm.get('tenureType')?.reset();
        this.msgs = [{ severity: 'error',  detail:applicationConstants.TENURE_TYPE_ALREADY_EXIST}];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        return applicationConstants.TRUE;
      }
    
    
      return applicationConstants.FALSE;
    }
    CollectiontypeDuplicateCheck(selectedcollectionType: any) {
      // Check if there is any row in the list with the same serviceTypeId as the selected one
      const isDuplicate = this.apportionOrderList.some(row => 
        row.collectionCompenentId === selectedcollectionType &&
        row.id !== this.termCollectionApportionOrderModel.id 
      );
    
      if (isDuplicate) {
        this.collectionApportionOrderForm.get('collectionCompenentId')?.reset();
        this.msgs = [{ severity: 'error',  detail:applicationConstants.COLLECTION_TYPE_ALREADY_EXIST}];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        return applicationConstants.TRUE;
      }
    
    
      return applicationConstants.FALSE;
    }
     checkForAmount(): void {
      const minSlabAmount = this.interestPolicyForm.get('minSlabAmount')?.value;
      const maxSlabAmount = this.interestPolicyForm.get('maxSlabAmount')?.value;
  
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

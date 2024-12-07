import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { TermLoanProductDefinition } from '../../shared/term-loan-product-definition.model';
import { TermLoanCollectionApportionOrder, TermLoanInterestPolicy } from './shared/term-loan-interest-policy.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TermLoanProductDefinitionService } from '../../shared/term-loan-product-definition.service';
import { TermLoanInterestPolicyService } from './shared/term-loan-interest-policy.service';
import { ApportionTypesService } from 'src/app/configurations/loan-config/apportion-types/shared/apportion-types.service';

@Component({
  selector: 'app-term-loan-interest-policy',
  templateUrl: './term-loan-interest-policy.component.html',
  styleUrls: ['./term-loan-interest-policy.component.css']
})
export class TermLoanInterestPolicyComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;
  intrestPolicyList: any[] = [];
  displayDialog: boolean =  applicationConstants.FALSE;
  interestPolicyForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean =  applicationConstants.FALSE;
  termLoanProductDefinitionModel :TermLoanProductDefinition = new TermLoanProductDefinition();
  termLoanInterestPolicyModel :TermLoanInterestPolicy = new TermLoanInterestPolicy();
  termCollectionApportionOrderModel :TermLoanCollectionApportionOrder = new TermLoanCollectionApportionOrder();
  collectionApportionOrderForm: FormGroup;
  maxDate = new Date();
  minDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  termProductId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean =  applicationConstants.FALSE;
  enableSaveAndNextButtonForApportion: boolean =  applicationConstants.FALSE;
  addButtonForApportion:boolean =  applicationConstants.FALSE;
  editDeleteDisableForApportion:boolean = applicationConstants.FALSE;
  newRowForApportion:any =null;
  iodApplicableList: any[]=[];
  collectionApportionList: any[]=[];
  apportionOrderList: any[]=[];
  isIodEnabled: boolean = applicationConstants.FALSE;
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private termLoanProductDefinitionService : TermLoanProductDefinitionService, private termLoanInterestPolicyService :TermLoanInterestPolicyService,
    private apportionTypesService : ApportionTypesService
  )
  { 
    this.interestPolicyForm = this.formBuilder.group({
      'minSlabAmount':new FormControl('', Validators.required),
      'maxSlabAmount':new FormControl('', Validators.required),
      'roi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'womenConcession': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'employeeConcession': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'seniorCitizenConcession': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'penalInterest':new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'iodApplicable': new FormControl('', Validators.required),
      'iod': new FormControl({ value: '', disabled: !this.isIodEnabled }, [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS)])
    });
    this.collectionApportionOrderForm = this.formBuilder.group({
      'collectionComponentId': new FormControl('', Validators.required),
      'apportionOrder': new FormControl('', Validators.required),
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.iodApplicableList = this.commonComponent.requiredlist();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
       
        this.termProductId = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewDetailsByProductId(this.termProductId);  
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
    this.interestPolicyForm.get('iodApplicable')?.valueChanges.subscribe(value => {
      this.onIodApplicableChange(value);
    });
    this.getAllcollectionTypes();
  }
  onIodApplicableChange(value: boolean) {
    const iodControl = this.interestPolicyForm.get('iod');
    this.isIodEnabled = value;
    if (value) {
      iodControl?.enable();
    } else {
      iodControl?.disable();
    }
    iodControl?.updateValueAndValidity(); // Ensure form control's validity is updated
  }
 /**
    @author vinitha
    @implements Integrating Term Loans Configuration details To Main Stepper Component
   */
  updateData() {
    this.termLoanInterestPolicyModel.termProductId = this.termProductId,
    this.termCollectionApportionOrderModel.termProductId = this.termProductId,
    this.termLoanProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton && this.enableSaveAndNextButtonForApportion ,
      data: this.termLoanInterestPolicyModel && this.termCollectionApportionOrderModel ,
      savedId:this.termProductId,
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
    this.newRow = {minSlabAmount:'',maxSlabAmount:'',roi: '',penalInterest:'',iodApplicable:'',iod:'',womenConcession:'', employeeConcession: '',seniorCitizenConcession: ''}
  }
  addNewEntryForApportionOrder()
  {
    this.newRowForApportion = {collectionComponentId: '',apportionOrder:''}
  }
     /**
    @author vinitha
    @implementsRow Row Edit Cancel
   
   */
  onRowEditCancel() {
    this.addButton= applicationConstants.FALSE;
    this.editDeleteDisable =  applicationConstants.FALSE;
    this.enableSaveAndNextButton = applicationConstants.TRUE;
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
    this.enableSaveAndNextButtonForApportion = applicationConstants.TRUE;
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
    @implements Term Loans Configuration details 
    @argument ProductId
   */
    getPreviewDetailsByProductId(id: any) {
      this.isEdit = applicationConstants.TRUE;
      this.intrestPolicyList=[]
      this.apportionOrderList=[]
      this.termLoanProductDefinitionService.getPreviewDetailsByProductId(id).subscribe(res => {
        this.responseModel = res;
        this.commonComponent.stopSpinner();
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
          this.termLoanProductDefinitionModel = this.responseModel.data[0];
          if (this.termLoanProductDefinitionModel != null && this.termLoanProductDefinitionModel != undefined) {
  
            if(null!=this.termLoanProductDefinitionModel.effectiveStartDate && undefined!=this.termLoanProductDefinitionModel.effectiveStartDate)
              this.termLoanProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.termLoanProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            
          if (this.termLoanProductDefinitionModel.termInterestPolicyConfigDTOList != null && this.termLoanProductDefinitionModel.termInterestPolicyConfigDTOList != undefined &&
              this.termLoanProductDefinitionModel.termInterestPolicyConfigDTOList.length > 0) {
  
                this.enableSaveAndNextButton = applicationConstants.TRUE;
  
            this.intrestPolicyList = this.termLoanProductDefinitionModel.termInterestPolicyConfigDTOList;
  
          
          }
          else{
            this.enableSaveAndNextButton = applicationConstants.FALSE;
          }
  
          if (this.termLoanProductDefinitionModel.termApportionConfigDTOList != null && this.termLoanProductDefinitionModel.termApportionConfigDTOList != undefined &&
            this.termLoanProductDefinitionModel.termApportionConfigDTOList.length > 0) {
  
              this.enableSaveAndNextButtonForApportion = applicationConstants.TRUE;
  
          this.apportionOrderList = this.termLoanProductDefinitionModel.termApportionConfigDTOList;
  
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
  @implements It Saves the Term Loans Interest Policy data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
    if(null != this.termLoanInterestPolicyModel.termProductId && undefined!=this.termLoanInterestPolicyModel.termProductId)
      rowData.termProductId = this.termLoanInterestPolicyModel.termProductId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    this.collectionApportionList.filter((collectiontype: any) => collectiontype != null && collectiontype.value == this.termCollectionApportionOrderModel.collectionComponentId).map((act: { label: any; }) => {
      this.termCollectionApportionOrderModel.collectionComponentName = act.label;
    });
    if (this.collectiontypeDuplicateCheck(this.termCollectionApportionOrderModel.collectionComponentId)) {
      return;
    }
  
     if(rowData.id != null)
      {
          this.termLoanInterestPolicyService.updateTermLoanInterestPolicy(rowData).subscribe((response: any) => {
            this.responseModel = response;
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
              if(null != rowData.termProductId && undefined!=rowData.termProductId)
               this.getPreviewDetailsByProductId(rowData.termProductId);
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
              this.getPreviewDetailsByProductId(this.termProductId);  
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
       this.termLoanInterestPolicyService.addTermLoanInterestPolicy(rowData).subscribe((response: any) => {
         this.responseModel = response;
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
          this.intrestPolicyList.unshift(this.responseModel.data[0]);
          this.intrestPolicyList.splice(1, 1);
          if(null != rowData.termProductId && undefined!=rowData.termProductId)
            this.getPreviewDetailsByProductId(rowData.termProductId);
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
           this.getPreviewDetailsByProductId(this.termProductId);  
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
      if(null != this.termCollectionApportionOrderModel.termProductId && undefined!=this.termCollectionApportionOrderModel.termProductId)
        rowData.termProductId = this.termCollectionApportionOrderModel.termProductId;
      this.addButtonForApportion = applicationConstants.FALSE;
      this.editDeleteDisableForApportion = applicationConstants.FALSE;
    
    
       if(rowData.id != null)
        {
            this.termLoanInterestPolicyService.updateTermLoanInterestPolicy(rowData).subscribe((response: any) => {
              this.responseModel = response;
              if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
                if (this.responseModel != null&& this.responseModel.data!= undefined) {
                if(null != rowData.termProductId && undefined!=rowData.termProductId)
                 this.getPreviewDetailsByProductId(rowData.termProductId);
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
         this.termLoanInterestPolicyService.addTermApportionOrder(rowData).subscribe((response: any) => {
           this.responseModel = response;
           if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {
              this.apportionOrderList.unshift(this.responseModel.data[0]);
              this.apportionOrderList.splice(1, 1);
           
            if(null != rowData.termProductId && undefined!=rowData.termProductId)
              this.getPreviewDetailsByProductId(rowData.termProductId);
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
     getAllcollectionTypes() {
      this.commonComponent.startSpinner();
      this.collectionApportionList =[];
      this.apportionTypesService.getAllApportionTypes().subscribe((res: any) => {
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
            this.collectionApportionList = this.responseModel.data.filter((documenttype:any) => documenttype.status == applicationConstants.ACTIVE).map((count:any) => {
              return { label: count.name, value: count.id }
            });
    
            let collectionType=  this.collectionApportionList.find((data:any) => null != data && data.value ==this.termCollectionApportionOrderModel.collectionComponentId);
            if(collectionType != null && undefined != collectionType)
               this.termCollectionApportionOrderModel.collectionComponentName = collectionType.label;
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
    collectiontypeDuplicateCheck(selectedcollectionType: any) {
      // Check if there is any row in the list with the same serviceTypeId as the selected one
      const isDuplicate = this.apportionOrderList.some(row => 
        row.collectionComponentId === selectedcollectionType &&
        row.id !== this.termCollectionApportionOrderModel.id 
      );
    
      if (isDuplicate) {
        this.collectionApportionOrderForm.get('collectionComponentId')?.reset();
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

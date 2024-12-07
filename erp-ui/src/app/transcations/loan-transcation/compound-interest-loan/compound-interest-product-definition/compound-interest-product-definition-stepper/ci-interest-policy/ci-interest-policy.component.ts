import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CompoundInterestProductDefinition } from '../../shared/compound-interest-product-definition.model';
import { CiCollectionApportionOrder, CiInterestPolicy } from './shared/ci-interest-policy.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ActivatedRoute } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CompoundInterestProductDefinitionService } from '../../shared/compound-interest-product-definition.service';
import { CiInterestPolicyService } from './shared/ci-interest-policy.service';
import { DatePipe } from '@angular/common';
import { ApportionTypesService } from 'src/app/configurations/loan-config/apportion-types/shared/apportion-types.service';

@Component({
  selector: 'app-ci-interest-policy',
  templateUrl: './ci-interest-policy.component.html',
  styleUrls: ['./ci-interest-policy.component.css']
})
export class CiInterestPolicyComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;
  intrestPolicyList: any[] = [];
  displayDialog: boolean =  applicationConstants.FALSE;
  interestPolicyForm: FormGroup;
  collectionApportionOrderForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean =  applicationConstants.FALSE;
  compoundInterestProductDefinitionModel :CompoundInterestProductDefinition = new CompoundInterestProductDefinition();
  ciInterestPolicyModel :CiInterestPolicy = new CiInterestPolicy();
  ciCollectionApportionOrderModel :CiCollectionApportionOrder = new CiCollectionApportionOrder();
  maxDate = new Date();
  minDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  ciProductId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean =  applicationConstants.FALSE;
  iodApplicableList: any[]=[];
  enableSaveAndNextButtonForApportion: boolean =  applicationConstants.FALSE;
  addButtonForApportion:boolean =  applicationConstants.FALSE;
  editDeleteDisableForApportion:boolean = applicationConstants.FALSE;
  newRowForApportion:any =null;

  collectionApportionList: any[]=[];
  apportionOrderList: any[]=[];
  isIodEnabled: boolean = applicationConstants.FALSE;
  amountAndTenureFlag: boolean = applicationConstants.TRUE;

  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private compoundInterestProductDefinitionService : CompoundInterestProductDefinitionService, private ciInterestPolicyService :CiInterestPolicyService,
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
       
        this.ciProductId = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewDetailsByProductId(this.ciProductId);
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
    @implements Integrating CI Loans Configuration details To Main Stepper Component
   */
  updateData() {
    this.ciInterestPolicyModel.ciProductId = this.ciProductId,
    this.ciCollectionApportionOrderModel.ciProductId = this.ciProductId,
    this.compoundInterestProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton && this.enableSaveAndNextButtonForApportion ,
      data: this.ciInterestPolicyModel && this.ciCollectionApportionOrderModel ,
      savedId:this.ciProductId,
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
    this.newRow = {roi: '',penalInterest:'',iodApplicable:'',iod:'',womenConcession:'', employeeConcession: '',seniorCitizenConcession: ''}
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
    @implements CI Loans Configuration details 
    @argument ProductId
   */
    getPreviewDetailsByProductId(id: any) {
      this.isEdit = applicationConstants.TRUE;
      this.intrestPolicyList=[]
      this.apportionOrderList=[]
      this.compoundInterestProductDefinitionService.getPreviewDetailsByProductId(id).subscribe(res => {
        this.responseModel = res;
        this.commonComponent.stopSpinner();
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
          this.compoundInterestProductDefinitionModel = this.responseModel.data[0];
          if (this.compoundInterestProductDefinitionModel != null && this.compoundInterestProductDefinitionModel != undefined) {
  
            if(null!=this.compoundInterestProductDefinitionModel.effectiveStartDate && undefined!=this.compoundInterestProductDefinitionModel.effectiveStartDate)
              this.compoundInterestProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.compoundInterestProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            
          if (this.compoundInterestProductDefinitionModel.ciInterestPolicyConfigDTOList != null && this.compoundInterestProductDefinitionModel.ciInterestPolicyConfigDTOList != undefined &&
              this.compoundInterestProductDefinitionModel.ciInterestPolicyConfigDTOList.length > 0) {
  
                this.enableSaveAndNextButton = applicationConstants.TRUE;
  
            this.intrestPolicyList = this.compoundInterestProductDefinitionModel.ciInterestPolicyConfigDTOList;
  
          
          }
          else{
            this.enableSaveAndNextButton = applicationConstants.FALSE;
          }
  
          if (this.compoundInterestProductDefinitionModel.ciApportionConfigDTOList != null && this.compoundInterestProductDefinitionModel.ciApportionConfigDTOList != undefined &&
            this.compoundInterestProductDefinitionModel.ciApportionConfigDTOList.length > 0) {
  
              this.enableSaveAndNextButtonForApportion = applicationConstants.TRUE;
  
          this.apportionOrderList = this.compoundInterestProductDefinitionModel.ciApportionConfigDTOList;
  
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
  @implements It Saves the CI Loans Interest Policy data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
    if(null != this.ciInterestPolicyModel.ciProductId && undefined!=this.ciInterestPolicyModel.ciProductId)
      rowData.ciProductId = this.ciInterestPolicyModel.ciProductId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
  
     if(rowData.id != null)
      {
          this.ciInterestPolicyService.updateCiInterestPolicy(rowData).subscribe((response: any) => {
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
       this.ciInterestPolicyService.addCiInterestPolicy(rowData).subscribe((response: any) => {
         this.responseModel = response;
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
       
          this.intrestPolicyList.unshift(this.responseModel.data[0]);
          this.intrestPolicyList.splice(1, 1);
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
     saveInlineRowForApportionOrder(rowData: any){
      if(null != this.ciCollectionApportionOrderModel.ciProductId && undefined!=this.ciCollectionApportionOrderModel.ciProductId)
        rowData.ciProductId = this.ciCollectionApportionOrderModel.ciProductId;
      this.addButtonForApportion = applicationConstants.FALSE;
      this.editDeleteDisableForApportion = applicationConstants.FALSE;

    
    
       if(rowData.id != null)
        {
            this.ciInterestPolicyService.updateCiApportionOrder(rowData).subscribe((response: any) => {
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
         this.ciInterestPolicyService.addCiApportionOrder(rowData).subscribe((response: any) => {
           this.responseModel = response;
           if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {
              this.apportionOrderList.unshift(this.responseModel.data[0]);
              this.apportionOrderList.splice(1, 1);
            
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
    
            let collectionType=  this.collectionApportionList.find((data:any) => null != data && data.value ==this.ciCollectionApportionOrderModel.collectionComponentId);
            if(collectionType != null && undefined != collectionType)
               this.ciCollectionApportionOrderModel.collectionComponentName = collectionType.label;
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
        row.id !== this.ciCollectionApportionOrderModel.id 
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

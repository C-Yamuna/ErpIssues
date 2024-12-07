import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { TermBorrowingProductDefinition } from '../../shared/term-borrowing-product-definition.model';
import { TermLinkedShareCapital } from './shared/term-linked-share-capital.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TermBorrowingProductDefinitionService } from '../../shared/term-borrowing-product-definition.service';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { TermLinkedShareCapitalService } from './shared/term-linked-share-capital.service';

@Component({
  selector: 'app-term-linked-share-capital',
  templateUrl: './term-linked-share-capital.component.html',
  styleUrls: ['./term-linked-share-capital.component.css']
})
export class TermLinkedShareCapitalComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  linkedShareCapitalList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  linkedShareCapitalForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  termProductDefinitionModel :TermBorrowingProductDefinition = new TermBorrowingProductDefinition();
  termLinkedShareCapitalModel :TermLinkedShareCapital = new TermLinkedShareCapital();
  minDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  productId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;

  gstApplicableList: any[]=[];
  collectionTypeList: any[]=[];
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private termBorrowingProductDefinitionService : TermBorrowingProductDefinitionService, private termLinkedShareCapitalService :TermLinkedShareCapitalService
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
       
        this.productId = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewByProductId(this.productId);
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
    @implements Integrating Term Borrowings Configuration details To Main Stepper Component
   */
  updateData() {
    this.termLinkedShareCapitalModel.productId = this.productId
    this.termBorrowingProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.termLinkedShareCapitalModel,
      savedId:this.productId,
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
    @implements Term Borrowings Configuration details 
    @argument ProductId
   */
    getPreviewByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.linkedShareCapitalList=[]
    this.termBorrowingProductDefinitionService.getPreviewByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.termProductDefinitionModel = this.responseModel.data[0];
        if (this.termProductDefinitionModel != null && this.termProductDefinitionModel != undefined) {

          if(null!=this.termProductDefinitionModel.effectiveStartDate && undefined!=this.termProductDefinitionModel.effectiveStartDate)
            this.termProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.termProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.termProductDefinitionModel.termBorrowingLinkedSharecapitalConfigDTO != null && this.termProductDefinitionModel.termBorrowingLinkedSharecapitalConfigDTO != undefined &&
            this.termProductDefinitionModel.termBorrowingLinkedSharecapitalConfigDTO.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.linkedShareCapitalList = this.termProductDefinitionModel.termBorrowingLinkedSharecapitalConfigDTO;

        
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
  @implements It Saves the Term Borrowings Linked Share Capital data 
    @argument ProductId
   */

  saveInlineRow(rowData: any) {
    if(null != this.termLinkedShareCapitalModel.productId && undefined!=this.termLinkedShareCapitalModel.productId)
      rowData.productId = this.termLinkedShareCapitalModel.productId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
     if(rowData.id != null)
      {
          this.termLinkedShareCapitalService.updateTermLinkedShareCapital(rowData).subscribe((response: any) => {
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
       this.termLinkedShareCapitalService.addTermLinkedShareCapital(rowData).subscribe((response: any) => {
         this.responseModel = response;
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
          this.linkedShareCapitalList.unshift(this.responseModel.data[0]);
          this.linkedShareCapitalList.splice(1, 1);
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
     collectiontypeDuplicateCheck(selectedcollectionType: any) {
      // Check if there is any row in the list with the same serviceTypeId as the selected one
      const isDuplicate = this.linkedShareCapitalList.some(row => 
        row.collectionType === selectedcollectionType &&
        row.id !== this.termLinkedShareCapitalModel.id 
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

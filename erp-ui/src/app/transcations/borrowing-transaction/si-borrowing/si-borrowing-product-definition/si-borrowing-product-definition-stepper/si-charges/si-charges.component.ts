import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SiCharges } from './shared/si-charges.model';
import { SiBorrowingProductDefinition } from '../../shared/si-borrowing-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { SiBorrowingProductDefinitionService } from '../../shared/si-borrowing-product-definition.service';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SiChargesService } from './shared/si-charges.service';

@Component({
  selector: 'app-si-charges',
  templateUrl: './si-charges.component.html',
  styleUrls: ['./si-charges.component.css']
})
export class SiChargesComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  chargesList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  chargesForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  siProductChargesModel : SiCharges = new SiCharges();
  siProductDefinitionModel :SiBorrowingProductDefinition = new SiBorrowingProductDefinition();
  maxDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  productId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  chargesTypeList: any[]=[];
  collectionFrequencyList: any[]=[];
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private siBorrowingProductDefinitionService : SiBorrowingProductDefinitionService, private siChargesService :SiChargesService,
  )
  { 
    this.chargesForm = this.formBuilder.group({
      'chargesType': new FormControl('', ),
      'charges': new FormControl('',),
      'cgst': new FormControl('', ),
      'sgst': new FormControl('',),
      'igst': new FormControl('',),
      'minSlabAmount':new FormControl('', Validators.required),
      'collectionFrequency': new FormControl('', Validators.required),
      'maxSlabAmount':new FormControl('', Validators.required),
      'minCharges':new FormControl('',Validators.required),
      'maxChrges':new FormControl('',Validators.required),
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.collectionFrequencyList= this.commonComponent.chargesCollectionFrequency();
    this.chargesTypeList= this.commonComponent.chargesType();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
       
        this.productId = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewDetailsByProductId(this.productId);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.chargesForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.chargesForm.valid) {
        this.save();
      }
    });
  }
 /**
    @author vinitha
    @implements Integrating SI Borrowings Configuration details To Main Stepper Component
   */
  updateData() {
    this.siProductChargesModel.productId = this.productId
    this.siBorrowingProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.siProductChargesModel,
      savedId:this.productId,
      stepperIndex: 3,
      isDisable: !this.chargesForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
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
    this.newRow = {chargesType: '',charges:'',minSlabAmount:'',maxSlabAmount:'',collectionFrequency:'', minCharges:'', maxChrges:'',cgst: '',sgst: '',igst:''}
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
    @implements SI Borrowings Configuration details 
    @argument ProductId
   */
getPreviewDetailsByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.chargesList=[]
    this.siBorrowingProductDefinitionService.getPreviewByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.siProductDefinitionModel = this.responseModel.data[0];
        if (this.siProductDefinitionModel != null && this.siProductDefinitionModel != undefined) {

        
          
        if (this.siProductDefinitionModel.siProductChargesConfigDTO != null && this.siProductDefinitionModel.siProductChargesConfigDTO != undefined &&
            this.siProductDefinitionModel.siProductChargesConfigDTO.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.chargesList = this.siProductDefinitionModel.siProductChargesConfigDTO;

        
        
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
  @implements It Saves the SI Borrowings Linked Share Capital data 
    @argument ProductId
   */

  saveInlineRow(rowData: any) {
    if(null != this.siProductChargesModel.productId && undefined!=this.siProductChargesModel.productId)
      rowData.productId = this.siProductChargesModel.productId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
  
    this.chargesTypeList.filter((chargestype: any) => chargestype != null && chargestype.value == this.siProductChargesModel.chargesType).map((act: { label: any; }) => {
      this.siProductChargesModel.chargesTypeName = act.label;
    });
   
  
     if(rowData.id != null)
      {
          this.siChargesService.updateSiCharges(rowData).subscribe((response: any) => {
            this.responseModel = response;
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
               
              if(null != rowData.productId && undefined!=rowData.productId)
               this.getPreviewDetailsByProductId(rowData.productId);
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
              this.getPreviewDetailsByProductId(this.productId);
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
       this.siChargesService.addSiCharges(rowData).subscribe((response: any) => {
         this.responseModel = response;
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
        
          this.chargesList.unshift(this.responseModel.data[0]);
          this.chargesList.splice(1, 1);
          if(null != rowData.productId && undefined!=rowData.productId)
            this.getPreviewDetailsByProductId(rowData.productId);
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
           this.getPreviewDetailsByProductId(this.productId);
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
     checkForSlabAmount(): void {
      const minSlabAmount = this.chargesForm.get('minSlabAmount')?.value;
      const maxSlabAmount = this.chargesForm.get('maxSlabAmount')?.value;
  
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
    checkForCharges(){
      const minCharges = this.chargesForm.get('minCharges')?.value;
      const maxChrges = this.chargesForm.get('maxChrges')?.value;
  
      if (minCharges && maxChrges &&  minCharges >=maxChrges) {
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

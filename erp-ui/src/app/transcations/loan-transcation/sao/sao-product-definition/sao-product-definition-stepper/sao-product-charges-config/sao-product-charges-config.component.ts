import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SaoProductCharges } from './shared/sao-product-charges.model';
import { SaoProductDefinition } from '../../shared/sao-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { SaoProductDefinitionsService } from '../../shared/sao-product-definitions.service';
import { ChargesTypesService } from 'src/app/configurations/loan-config/charges-types/shared/charges-types.service';
import { SaoLoanProductChargesService } from './shared/sao-loan-product-charges.service';

@Component({
  selector: 'app-sao-product-charges-config',
  templateUrl: './sao-product-charges-config.component.html',
  styleUrls: ['./sao-product-charges-config.component.css']
})
export class SaoProductChargesConfigComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  chargesList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  chargesForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  saoProductChargesModel :SaoProductCharges = new SaoProductCharges();
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
  chargesTypeList: any[]=[];
  collectionFrequencyList: any[]=[];
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private saoProductDefinitionsService : SaoProductDefinitionsService, private saoLoanProductChargesService :SaoLoanProductChargesService,
    private chargesTypesService : ChargesTypesService
  )
  { 
    this.chargesForm = this.formBuilder.group({
      'chargesType': new FormControl('', Validators.required),
      'charges': new FormControl('',),
      'cgst': new FormControl('', ),
      'sgst': new FormControl('',),
      'igst': new FormControl('',),
      'minSlabAmount':new FormControl('', Validators.required),
      'collectionFrequency': new FormControl('', Validators.required),
      'maxSlabAmount':new FormControl('', ),
      'minCharges':new FormControl('',Validators.required),
      'maxChrges':new FormControl('',Validators.required),
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.collectionFrequencyList= this.commonComponent.chargesCollectionFrequency();
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
  
    this.chargesForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.chargesForm.valid) {
        this.save();
      }
    });
    this.getAllChargesTypes();
  }
 /**
    @author vinitha
    @implements Integrating SAO Loans Configuration details To Main Stepper Component
   */
  updateData() {
    this.saoProductChargesModel.saoProductId = this.saoProductId
    this.saoProductDefinitionsService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.saoProductChargesModel,
      savedId:this.saoProductId,
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
    @implements SAO Loans Configuration details 
    @argument ProductId
   */
getPreviewDetailsByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.chargesList=[]
    this.saoProductDefinitionsService.getPreviewDetailsByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.saoProductDefinitionModel = this.responseModel.data[0];
        if (this.saoProductDefinitionModel != null && this.saoProductDefinitionModel != undefined) {

          if(null!=this.saoProductDefinitionModel.effectiveStartDate && undefined!=this.saoProductDefinitionModel.effectiveStartDate)
            this.saoProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.saoProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.saoProductDefinitionModel.saoProductChargesConfigDTOList != null && this.saoProductDefinitionModel.saoProductChargesConfigDTOList != undefined &&
            this.saoProductDefinitionModel.saoProductChargesConfigDTOList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.chargesList = this.saoProductDefinitionModel.saoProductChargesConfigDTOList;

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
    if(null != this.saoProductChargesModel.saoProductId && undefined!=this.saoProductChargesModel.saoProductId)
      rowData.saoProductId = this.saoProductChargesModel.saoProductId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    this.chargesTypeList.filter((chargestype: any) => chargestype != null && chargestype.value == this.saoProductChargesModel.chargesType).map((act: { label: any; }) => {
      this.saoProductChargesModel.chargesTypeName = act.label;
    });
    if (this.chargestypeDuplicateCheck(this.saoProductChargesModel.chargesType)) {
      return;
    }
  
     if(rowData.id != null)
      {
          this.saoLoanProductChargesService.updateSaoProductCharges(rowData).subscribe((response: any) => {
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
       this.saoLoanProductChargesService.addSaoProductCharges(rowData).subscribe((response: any) => {
         this.responseModel = response;
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
          this.chargesList.unshift(this.responseModel.data[0]);
          this.chargesList.splice(1, 1);
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
       getAllChargesTypes() {
        this.commonComponent.startSpinner();
        this.chargesTypeList =[];
        this.chargesTypesService.getAllChargesTypes().subscribe((res: any) => {
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
              this.chargesTypeList = this.responseModel.data.filter((documenttype:any) => documenttype.status == applicationConstants.ACTIVE).map((count:any) => {
                return { label: count.name, value: count.id }
              });
      
              let chargesType=  this.chargesTypeList.find((data:any) => null != data && data.value ==this.saoProductChargesModel.chargesType);
              if(chargesType != null && undefined != chargesType)
                 this.saoProductChargesModel.chargesTypeName = chargesType.label;
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
      chargestypeDuplicateCheck(selectedchargesType: any) {
        // Check if there is any row in the list with the same chargesType as the selected one
        const isDuplicate = this.chargesList.some(row => 
          row.chargesType === selectedchargesType &&
          row.id !== this.saoProductChargesModel.id  // Exclude the current row being edited (if applicable)
        );
      
        if (isDuplicate) {
          this.chargesForm.get('chargesTypeName')?.reset();
          this.msgs = [{ severity: 'error',  summary: applicationConstants.STATUS_ERROR,detail: applicationConstants.CHARGES_TYPE_ALREADY_EXIST }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
          return applicationConstants.TRUE;
        }
      
        // Otherwise, proceed with the new charges type
        return  applicationConstants.FALSE;
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

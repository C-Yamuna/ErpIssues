import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { AssociatedBankDetails } from './shared/associated-bank-details.model';
import { InvestmentsProductDefinition } from '../../shared/investments-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { InvestmentsProductDefinitionService } from '../../shared/investments-product-definition.service';
import { AssociatedBankDetailsService } from './shared/associated-bank-details.service';
import { InvestedBankDetailsService } from 'src/app/configurations/investments-config/invested-bank-details/shared/invested-bank-details.service';
import { InvestedBankDetails } from 'src/app/configurations/investments-config/invested-bank-details/shared/invested-bank-details.model';

@Component({
  selector: 'app-associated-bank-details',
  templateUrl: './associated-bank-details.component.html',
  styleUrls: ['./associated-bank-details.component.css']
})
export class AssociatedBankDetailsComponent implements OnInit{
@ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  date: Date | undefined;
  displayDialog: boolean = applicationConstants.FALSE;
  associatedBankDetailsForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  associatedBankDetailsModel :AssociatedBankDetails = new AssociatedBankDetails();
  investmentsProductDefinitionModel :InvestmentsProductDefinition = new InvestmentsProductDefinition();
  investedBankDetailsModel:InvestedBankDetails= new InvestedBankDetails();
  maxDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  productId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  associatedInvestedBankList: any[] =[];
  investmentBankList : any[] = [];
  investmentBankDetailsList: any[]=[];
  tempInvestmentBankList: any[]=[];
  selectedBankDetails:any;
  id:any;
  bankDetailsList: any[]=[];
  data:any;

  constructor(private formBuilder: FormBuilder,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private commonFunctionService: CommonFunctionsService,
    private encryptService: EncryptDecryptService,
    private investmentsProductDefinitionService : InvestmentsProductDefinitionService,
    private investedBankDetailsService:InvestedBankDetailsService,
    private associatedBankDetailsService : AssociatedBankDetailsService){

    this.associatedBankDetailsForm = this.formBuilder.group({
      bankName: ['', Validators.required],
      branchName: [{ value: '', disabled: true }],
      bankIfscCode: [{ value: '', disabled: true }],
      bankAddress: [{ value: '', disabled: true }],
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.productId = Number(this.encryptService.decrypt(encrypted));
          this.getProductDetailsByProductId(this.productId);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.associatedBankDetailsForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.associatedBankDetailsForm.valid) {
        this.save();
      }
    });
    this.getInvestedBankDetails();
  }
  /**
    @author Bhargavi
    @implements Integrating Investments Configuration details To Main Stepper Component
   */
  updateData() {
    this.associatedBankDetailsModel.productId = this.productId;
    this.investmentsProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.associatedBankDetailsModel,
      savedId:this.productId,
      stepperIndex: 1,
      isDisable: !this.associatedBankDetailsForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
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
    this.newRow = {investedBankDetailsId: '',branchName: '',bankIfscCode: '',bankAddress: ''}
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
    this.updateData();
  }
  /**
    @author Bhargavi
    @implements edit inline row
   
   */
  editInlineRow(rowData:any) {
    this.addButton = applicationConstants.TRUE;
    this.editDeleteDisable = applicationConstants.TRUE; 
    this.enableSaveAndNextButton = applicationConstants.FALSE;
    this.updateData();
  }
   /**
    @author Bhargavi
    @implements get product details by productId
    @argument ProductId
   */

  getProductDetailsByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.associatedInvestedBankList=[]
    this.investmentsProductDefinitionService.getPreviewByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.investmentsProductDefinitionModel = this.responseModel.data[0];
        if (this.investmentsProductDefinitionModel != null && this.investmentsProductDefinitionModel != undefined) {

          if(null!=this.investmentsProductDefinitionModel.effectiveStartDate && undefined!=this.investmentsProductDefinitionModel.effectiveStartDate)
            this.investmentsProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.investmentsProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.investmentsProductDefinitionModel.productAssociatedBankDetailsDTOList != null && this.investmentsProductDefinitionModel.productAssociatedBankDetailsDTOList != undefined ) {
              this.enableSaveAndNextButton = applicationConstants.TRUE;
          this.associatedInvestedBankList = this.investmentsProductDefinitionModel.productAssociatedBankDetailsDTOList;
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
    @implements get invested bank details from master table
   */
  getInvestedBankDetails() {
    this.investedBankDetailsService.getAllInvestedBankDetails().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.tempInvestmentBankList = this.responseModel.data;
            this.investmentBankList = this.tempInvestmentBankList.filter((obj: any) => obj != null).map((bank: { bankName: any; id: any; }) => {
              return { label: bank.bankName, value: bank.id };
            });
          } else {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        }
      }
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      this.commonComponent.stopSpinner();
    });
  }

 
     /**
    @author Bhargavi
    @implements to get bank details on onchange of above filter invested bank detils dropdown 
   */
  onBankChange(event: any,rowData: any) {
    const selectedBankId = event.value;
    const selectedBank = this.tempInvestmentBankList.find(bank => bank.id === selectedBankId);
    if (selectedBank) {
      this.associatedBankDetailsForm.patchValue({
        branchName: selectedBank.branchName,
        bankIfscCode: selectedBank.bankIfscCode,
        bankAddress: selectedBank.bankAddress
      });
    }
    rowData.branchName = selectedBank.branchName;
    rowData.bankIfscCode = selectedBank.bankIfscCode;
    rowData.bankAddress = selectedBank.bankAddress;
  }

   /**
    @author Bhargavi
  @implements It Saves the Investments Associated Bank Details data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
  this.associatedBankDetailsModel.productId = this.productId;
  if(null != this.associatedBankDetailsModel.productId && undefined!=this.associatedBankDetailsModel.productId)
    rowData.productId = this.associatedBankDetailsModel.productId;
  this.addButton = applicationConstants.FALSE;
  this.editDeleteDisable = applicationConstants.FALSE;
   if(rowData.id != null)
    {
        this.associatedBankDetailsService.updateAssociatedBankDetails(rowData).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {
            if(null != rowData.productId && undefined!=rowData.productId)
              this.getProductDetailsByProductId(rowData.productId);
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
     this.associatedBankDetailsService.addAssociatedBankDetails(rowData).subscribe((response: any) => {
       this.responseModel = response;
       if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined) {
        this.associatedInvestedBankList.unshift(this.responseModel.data[0]);
        this.associatedInvestedBankList.splice(1, 1);
        if(null != rowData.productId && undefined!=rowData.productId)
          this.getProductDetailsByProductId(rowData.productId);
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
          this.getProductDetailsByProductId(this.productId);
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

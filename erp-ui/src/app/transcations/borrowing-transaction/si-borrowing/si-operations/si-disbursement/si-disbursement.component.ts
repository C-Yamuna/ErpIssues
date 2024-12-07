import { Component } from '@angular/core';
import { SiDisbursement } from './shared/si-disbursement.model';
import { BorrowingTransactionConstant } from '../../../borrowing-transaction-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { SiBorrowingAccountDetails } from '../../si-borrowing-stepper/shared/siborrowing.model';
import { SiBorrowingStepperService } from '../../si-borrowing-stepper/shared/si-borrowing-stepper.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SiDisbursementService } from './shared/si-disbursement.service';

@Component({
  selector: 'app-si-disbursement',
  templateUrl: './si-disbursement.component.html',
  styleUrls: ['./si-disbursement.component.css']
})
export class SiDisbursementComponent {
  siDisbursementModel :SiDisbursement = new SiDisbursement();
  siborrowingAccountDetailsModel :SiBorrowingAccountDetails = new SiBorrowingAccountDetails();
  statusList: any[]=[];
  isEdit: any;
  msgs: any[] = [];
  responseModel!: Responsemodel;
  orgnizationSetting: any;
  disbursementform:FormGroup;
  maxDate = new Date();
  minDate = new Date();
  disbursementColumns: any[] = [];
  rowEdit: boolean = applicationConstants.FALSE;
  branchId: any;
  tempGridListData: any[] = [];
  gridListLenght: Number | undefined;
  showForm: boolean = false;
  borrowingAccountId:any

  disbursementDataList: any[] = [];
  constructor(private router: Router,private translate: TranslateService, private siDisbursementService:SiDisbursementService,
     private encryptDecryptService: EncryptDecryptService,private datePipe: DatePipe, private activateRoute: ActivatedRoute,
     private encryptService: EncryptDecryptService,private formBuilder:FormBuilder, private commonFunctionService: CommonFunctionsService,
    private commonComponent: CommonComponent,   private siBorrowingStepperService : SiBorrowingStepperService,)
  {
    this.disbursementform = this.formBuilder.group({
      'dccbbranchname': new FormControl('',),
      'borrowingaccountNumber':new FormControl('',),
      'pacsname': new FormControl(''),
      'pacsbranchname': new FormControl(''),
      'hundinumber':new FormControl(''),
      'disbursedAmount':new FormControl(''),
      'roi': new FormControl(''),
      'disbursedDate': new FormControl(''),
      'transactionmode': new FormControl('')
      
     
    })
    this.disbursementColumns = [
     
      { field: '', header: 'BORROWINGSTRANSACTIONS.HUNDI_NUMBER' },
      { field: 'borrowingAccountNumber', header: 'BORROWINGSTRANSACTIONS.PACS_BORROWING_ACCOUNT_NUMBER' },
      { field: 'disbursedAmount', header: 'BORROWINGSTRANSACTIONS.DISBURSEMENT_AMOUNT' },
      { field: '', header: 'BORROWINGSTRANSACTIONS.ROI' },
      { field: 'disbursedDate', header: 'BORROWINGSTRANSACTIONS.DISBURESEMENT_DATE' },
      { field: 'statusName', header: 'BORROWINGSTRANSACTIONS.STATUS' },
    ];
  }


  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let id = this.encryptDecryptService.decrypt(params['id']);
        
        this.siBorrowingStepperService.getSiBorrowingStepperById(id).subscribe(res => {
          
          this.responseModel = res;
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          
            this.siborrowingAccountDetailsModel = this.responseModel.data[0];
           
          }
          }
          else{
            this.msgs = [];
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
              
            }, 2000);
          }
        });
      } 
    }),
      (error: any) => {
      this.msgs = [];
      this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
    this.getAllDisbursement();
  }
  backbutton(){
    this.router.navigate([BorrowingTransactionConstant.SI_BORROWINGS]);
  }
  addOrUpdateDisbursement() {
    if(!this.rowEdit)
      {;
        this.siDisbursementModel.id = null;
      }
    //this.commonComponent.startSpinner();
    if(this.siDisbursementModel.disbursedDate != undefined && this.siDisbursementModel.disbursedDate != null)
      this.siDisbursementModel.disbursedDate = this.commonFunctionService.getUTCEpoch(new Date(this.siDisbursementModel.disbursedDate));
    if (this.siDisbursementModel.id != undefined || this.siDisbursementModel.id != null) {
      this.siDisbursementService.updateSiDisbursement(this.siDisbursementModel).subscribe((response: any) => {
        this.responseModel = response;
        
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.siDisbursementModel = response.data[0];
  
          if(null != this.siDisbursementModel.disbursedDate)
          this.siDisbursementModel.disbursedDate=this.datePipe.transform(this.siDisbursementModel.disbursedDate, this.orgnizationSetting.datePipe);
        
          //this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
          
          }, 1000);
          this.resetFormDataDisbrusment();
          this.getAllDisbursement();
        } else {
         // this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
          }, 1000);
        }
      },
        error => {
          //this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
          }, 1000);
        });
    } else {
      this.siDisbursementService.addSiDisbursement(this.siDisbursementModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.siDisbursementModel = response.data[0];
       
          if(this.siDisbursementModel.disbursedDate != null && this.siDisbursementModel.disbursedDate != undefined ){
              this.siDisbursementModel.disbursedDate=this.datePipe.transform(this.siDisbursementModel.disbursedDate, this.orgnizationSetting.datePipe);
            }
          // this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
           
          }, 1000);
          this.resetFormDataDisbrusment();
          this.getAllDisbursement();
        } else {
          //this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
          }, 1000);
        }
      },
        error => {
          // this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
          }, 1000);
        });
    }
    this.rowEdit = applicationConstants.FALSE;
  }

  submitdisbursement(){

      // this.rowEdit = false;
      // this.siDisbursementModel.pacsId = this.branchId;
     
      this.siDisbursementModel.borrowingAccountId = this.borrowingAccountId;
      this.addOrUpdateDisbursement();
      
    
  }
  resetFormDataDisbrusment() {
    this.siDisbursementModel = new SiDisbursement();
    this.disbursementform.reset();
   }
  editRow(rowData:any) {
  
    this.siDisbursementModel.borrowingAccountNumber = rowData.borrowingAccountNumber;
    this.siDisbursementModel.disbursedAmount = rowData.disbursedAmount;
    this.siDisbursementModel.disbursedDate = rowData.disbursedDate;
    this.siDisbursementModel.id = rowData.id;
    this.rowEdit = true;
  }
  getAllDisbursement() {
    this.siDisbursementService.getAllSiDisbursement().subscribe((data: any) => {
      this.responseModel = data;
      this.disbursementDataList = this.responseModel.data;
      this.gridListLenght = this.disbursementDataList.length;
      this.disbursementDataList = this.disbursementDataList.map(borrowing => {
        borrowing.disbursedDate = this.datePipe.transform(borrowing.disbursedDate, this.orgnizationSetting.datePipe)||'';
       
        return borrowing
      });
      
      this.tempGridListData = this.disbursementDataList;
      //  this.commonComponent.stopSpinner();
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      // this.commonComponent.stopSpinner();
    });
  }
  isBasicDetails: boolean = false;
  position: string = 'center';
  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
  }
  onClickMemberIndividualMoreDetails(){
    this.showForm = true
  }
}

import { Component, ViewChild } from '@angular/core';
import { SiBorrowingAccountDetails } from '../shared/siborrowing.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SiBorrowingStepperService } from '../shared/si-borrowing-stepper.service';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { InterestPostingFrequencyService } from 'src/app/configurations/common-config/interest-posting-frequency/shared/interest-posting-frequency.service';
import { SiBorrowingAccountMapping } from '../si-borrowing-account-mapping/shared/si-borrowing-account-mapping.model';
import { DatePipe } from '@angular/common';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';

@Component({
  selector: 'app-si-account-details',
  templateUrl: './si-account-details.component.html',
  styleUrls: ['./si-account-details.component.css']
})
export class SiAccountDetailsComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('dd', { static: false }) private dd!: Table;
  @ViewChild('dl', { static: false }) private dl!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;
  @ViewChild('cc', { static: false }) private cc!: Table;
  @ViewChild('bd', { static: false }) private bd!: Table;
 
  accountdetailsform:FormGroup;

  date: any;
  addButton: boolean = false;
  id: any;
  groupBasic: any;
  statusList: any[]=[];
  maxDate = new Date();
  minDate = new Date();
  orgnizationSetting:any;
  siborrowingAccountDetailsModel :SiBorrowingAccountDetails = new SiBorrowingAccountDetails();
  SiBorrowingAccountMappingModel:SiBorrowingAccountMapping = new SiBorrowingAccountMapping();
  EditDeleteDisable:boolean = false;
  activeIndex: number = 0;
  buttonDisabled: boolean=false;
  completed = 0;
  branchId: any;
  pacsId: any;
  saveAndContinueFlag: boolean = true;
  isEdit: any;
  responseModel!: Responsemodel;
  savedID: any;
  msgs: any[] = [];
  communication: any;
  kyc: any;
  land: any;
  nominee: any;
  familydetails: any;
  asset: any;
  basicDetails: any;
  buttonDisbled: boolean =true;
  isSaveContinueEnable: boolean = false;
  nextDisable: boolean = false;
  serviceUrl: any;
  financiarbanktypeList: any[] = [];
  productList: any[] = [];
  purposeList:any []=[];
  repaymentlist:any[]=[];
  // productId=2;
  fileName: any;
  isFileUploaded: boolean = false;
  multipartFileList: any[] = [];
  uploadFileData: any;
  filesDTOList: any[] = [];
  commonFunctionsService: any;
  constructor(private commonComponent: CommonComponent,private router:Router, private formBuilder:FormBuilder,
    private siBorrowingStepperService : SiBorrowingStepperService,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,
    private interestpostingfrequencyService: InterestPostingFrequencyService,private fileUploadService : FileUploadService,
    private datePipe: DatePipe
  ){
    this.accountdetailsform = this.formBuilder.group({
      'financiarBank': new FormControl('', Validators.required),
      'product':new FormControl('',Validators.required),
      'accountNumber': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.ACCOUNT_NUMBER_PATTERN)]),
      'applicationDate': new FormControl('',Validators.required),
      'roi': [{ value: '', disabled: true}],
      'penalRoi':[{ value: '', disabled: true}],
      'iodRate':new FormControl('', [ Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
      'requestedDate':new FormControl('', Validators.required),
      'repaymentFrequency':new FormControl(''),
      'borrowingPeriodInMonths':new FormControl('', [ Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY)]),
      'requestedAmount': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_AMOUNT_PATTERN)]),
      'sanctionedAmount':new FormControl('', [ Validators.pattern(applicationConstants.NEW_AMOUNT_PATTERN)]),
      'sanctionedDate': new FormControl('',Validators.required),
      'borrowingDueDate': new FormControl(''),
      'installmentAmount': new FormControl('', [ Validators.pattern(applicationConstants.NEW_AMOUNT_PATTERN)]),
      'cgstAmount': new FormControl('', [ Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
      'totalInterest': new FormControl('', [ Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
      'totalPayout': new FormControl('', [ Validators.pattern(applicationConstants.NEW_AMOUNT_PATTERN)]),
      'remarks':new FormControl(''),
      'processingFee':new FormControl('', [ Validators.pattern(applicationConstants.NEW_AMOUNT_PATTERN)]),
      'fileUpload': new FormControl(''),
      
     
    })
   

  }
 /**
   * @author vinitha
   * @implements get account details data by borrowing accountId 
   */
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.statusList = this.commonComponent.status();
    this.financiarbanktypeList=this.commonComponent.financialBankType();
    this.repaymentlist = this.commonComponent.rePaymentFrequency();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let queryParams = params['id'].split('#');
        let id = this.encryptService.decrypt(params['id']);

        if (id != "" && id != null && id != undefined) {
          this.isEdit = true;
          this.siBorrowingStepperService.getPreviewDataBySiBorrowingAccountId(id).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              this.siborrowingAccountDetailsModel = this.responseModel.data[0];
              if (this.siborrowingAccountDetailsModel != null && this.siborrowingAccountDetailsModel != undefined) {
                if(this.siborrowingAccountDetailsModel.sanctionedDate != null && this.siborrowingAccountDetailsModel.sanctionedDate != undefined &&this.siborrowingAccountDetailsModel.sanctionedDate!=null&&this.siborrowingAccountDetailsModel.sanctionedDate!= undefined){
                  this.siborrowingAccountDetailsModel.sanctionedDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.sanctionedDate, this.orgnizationSetting.datePipe);
                 
                }
                if(this.siborrowingAccountDetailsModel.applicationDate != null && this.siborrowingAccountDetailsModel.applicationDate != undefined &&this.siborrowingAccountDetailsModel.applicationDate!=null&&this.siborrowingAccountDetailsModel.applicationDate!= undefined){
                  this.siborrowingAccountDetailsModel.applicationDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.applicationDate, this.orgnizationSetting.datePipe);
                 
                }
  
                if(this.siborrowingAccountDetailsModel.requestedDate != null && this.siborrowingAccountDetailsModel.requestedDate != undefined &&this.siborrowingAccountDetailsModel.requestedDate!=null&&this.siborrowingAccountDetailsModel.requestedDate!= undefined){
                  this.siborrowingAccountDetailsModel.requestedDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.requestedDate, this.orgnizationSetting.datePipe);
                 
                }
                if(this.siborrowingAccountDetailsModel.borrowingDueDate != null && this.siborrowingAccountDetailsModel.borrowingDueDate != undefined &&this.siborrowingAccountDetailsModel.borrowingDueDate!=null&&this.siborrowingAccountDetailsModel.borrowingDueDate!= undefined){
                  this.siborrowingAccountDetailsModel.borrowingDueDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.borrowingDueDate, this.orgnizationSetting.datePipe);
                 
                }
                if(this.siborrowingAccountDetailsModel.signedCopyPath != null && this.siborrowingAccountDetailsModel.signedCopyPath != undefined)
                  this.siborrowingAccountDetailsModel.multipartFileList = this.fileUploadService.getFile(this.siborrowingAccountDetailsModel.signedCopyPath ,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.siborrowingAccountDetailsModel.signedCopyPath);
                this.onChangeProduct();
              }
            this.commonComponent.stopSpinner();
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
      } 
    })
    this.accountdetailsform.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.accountdetailsform.valid) {
        this.save();
      }
    });
    this.pacsId =1;
   
    this.getAllproducts();
    
  }
  updateData() {
    this.siBorrowingStepperService.changeData({
      formValid: this.accountdetailsform.valid ,
      data: this.siborrowingAccountDetailsModel,
      stepperIndex: 0,
      
    });
  }
  save() {
    this.updateData();
  }
  

  onRowEditInit() {
    this.addButton=true; 
  }

  /**
   * @author vinitha
   * @implements get active products based in pacsId 
   */
  getAllproducts() {
    this.commonComponent.startSpinner();
    this.siBorrowingStepperService.getAllActiveProductsBasedOnPacsId(this.pacsId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined && this.responseModel.data.length>0)
        this.productList = this.responseModel.data;
        this.productList = this.productList.filter((activity: any) => activity != null).map((act: { name: any; id: any; }) => {
          return { label: act.name, value: act.id };
        });
       
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1000);
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }
  onChangeProduct(){
    this.siBorrowingStepperService.getProductById(this.siborrowingAccountDetailsModel.productId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siborrowingAccountDetailsModel.roi = this.responseModel.data[0].roi;
        this.siborrowingAccountDetailsModel.penalRoi = this.responseModel.data[0].penalInterest;
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1000);
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
    }
  }
//upload documnet 
fileUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.siborrowingAccountDetailsModel.multipartFileList = [];
    this.multipartFileList = [];
    this.siborrowingAccountDetailsModel.filesDTO = null; // Initialize as a single object
    this.siborrowingAccountDetailsModel.signedCopyPath = null;
    let file = event.files[0]; // Only one file
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let filesDTO = new FileUploadModel();
      this.uploadFileData = e.target as FileReader;
      filesDTO.fileName = "SI_BORROWINGS" + this.id + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      // this.filesDTOList = [filesDTO]

      this.siborrowingAccountDetailsModel.filesDTO = filesDTO;
      this.siborrowingAccountDetailsModel.signedCopyPath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      fileUpload.clear();
    };

    reader.readAsDataURL(file);
  }
  //remove documnet 
  fileRemoveEvent() {
  this.siborrowingAccountDetailsModel.multipartFileList = [];
  if (this.siborrowingAccountDetailsModel.filesDTO != null && this.siborrowingAccountDetailsModel.filesDTO != undefined) {
    this.siborrowingAccountDetailsModel.signedCopyPath = null;
    this.siborrowingAccountDetailsModel.filesDTO = null;
  }
}
}

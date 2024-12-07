import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { InvestmentApplicationDetailsService } from './shared/investment-application-details.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InvestmentApplicationDetails } from './shared/investment-application-details.model';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-investments-application-details',
  templateUrl: './investments-application-details.component.html',
  styleUrls: ['./investments-application-details.component.css']
})
export class InvestmentsApplicationDetailsComponent implements OnInit{
  
  applicationDetailsForm:FormGroup;
  orgnizationSetting:any;
  isEdit:boolean = false;
  responseModel!: Responsemodel;
  investmentApplicationDetailsModel:InvestmentApplicationDetails =  new InvestmentApplicationDetails();
  msgs: any[] = [];
  buttonDisabled: boolean = false;
  checked: Boolean = false ;
  showForm: Boolean = false ;
  depositTypeList: any[] = [];
  interestPaymentFrequencyList: any[] = [];
  productListData: any[]=[];
  pacsId=1;
  bankName: any;
  isFileUploaded: boolean = false;
  multipartFileList: any[] = [];
  filesDTOList: any[] = [];
  id: any;
  uploadFileData: any;
  autoRenewalTypeList:any []=[];

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private encryptDecryptService :EncryptDecryptService,
    private commonComponent: CommonComponent,
    private datePipe: DatePipe,
    private investmentApplicationDetailsService:InvestmentApplicationDetailsService,
    private activateRoute:ActivatedRoute, private fileUploadService : FileUploadService){
    this.applicationDetailsForm = this.formBuilder.group({
      productName: ['', Validators.required],
      bankName: [{ value: '', disabled: true }],
      accountNumber: ['', [Validators.required]],
      depositAmount: ['', Validators.required],
      roi: [{ value: '', disabled: true}],
      depositDate: ['', Validators.required],
      depositName: ['', Validators.required],
      tenureInYears: [''],
      tenureInMonths: [''],
      tenureInDays: [''],
      maturityDate: ['', Validators.required],
      maturityInterest: ['', Validators.required],
      maturityAmount: ['', Validators.required],
      interestOrInstallmentFrequencyName: ['', Validators.required],
      isAutoRenewal: [false],
      autoRenewalType: [{ value: '', disabled: true }]
    })
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.depositTypeList = this.commonComponent.depositTypeList();
    this.autoRenewalTypeList = this.commonComponent.autoRenewalType();
    this.interestPaymentFrequencyList = this.commonComponent.interestPaymentFrequency();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.id = id;
        this.isEdit = true;
        this.investmentApplicationDetailsService.getInvestmentApplicationDetailsById(id).subscribe(res => {
          this.responseModel = res;
          // this.investmentApplicationDetailsModel = this.responseModel.data[0];         
          
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.investmentApplicationDetailsModel = this.responseModel.data[0];
            if (this.investmentApplicationDetailsModel.depositDate != null) {
              this.investmentApplicationDetailsModel.depositDate = this.datePipe.transform(this.investmentApplicationDetailsModel.depositDate, this.orgnizationSetting.datePipe);
              this.investmentApplicationDetailsModel.depositDate = new Date(this.investmentApplicationDetailsModel.depositDate);
            }
            if (this.investmentApplicationDetailsModel.maturityDate != null) {
              this.investmentApplicationDetailsModel.maturityDate = this.datePipe.transform(this.investmentApplicationDetailsModel.maturityDate, this.orgnizationSetting.datePipe);
              this.investmentApplicationDetailsModel.maturityDate = new Date(this.investmentApplicationDetailsModel.maturityDate);
            }
            if(this.investmentApplicationDetailsModel.signedCopyPath != null && this.investmentApplicationDetailsModel.signedCopyPath != undefined){
              let multipartFileList = this.fileUploadService.getFile(this.investmentApplicationDetailsModel.signedCopyPath ,
              ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.investmentApplicationDetailsModel.signedCopyPath);
              this.investmentApplicationDetailsModel.multipartFileList = multipartFileList;
            }

              // this.files = this.investmentApplicationDetailsModel.multipartFileList.map(x => Object.assign({}, x));
            this.onChangeProduct();
            this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = []; 
            }, 2000);
          } else {
            this.commonComponent.stopSpinner();
            this.buttonDisabled = applicationConstants.FALSE;
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
      }
    }) 
    this.applicationDetailsForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.applicationDetailsForm.valid) {
        this.save();
      }
    });
    this.getAllProductsBasedOnPacsId(this.pacsId);
    this.onAutoRenewalChange();
  }

  updateData() {
    this.investmentApplicationDetailsService.changeData({
      formValid: !this.applicationDetailsForm.valid ? true : false,
      data: this.investmentApplicationDetailsModel,
      isDisable:  (!this.applicationDetailsForm.valid) ,
      stepperIndex: 0,
    });
  }
  save() {
    this.updateData();
  }

  //get all active products based on pacs id  @bhargavi
  getAllProductsBasedOnPacsId(pacsId:any) {
    // this.commonComponent.startSpinner();
    this.investmentApplicationDetailsModel.pacsId = this.pacsId;
    this.investmentApplicationDetailsService.getAllActiveProductsBasedOnPacsId(this.investmentApplicationDetailsModel.pacsId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.productListData = this.responseModel.data;
        this.productListData = this.productListData.filter((productData: any) => productData != null).map((product: { name: any; id: any; }) => {
          return { label: product.name, value: product.id };
        });
        //this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1000);
      } else {
        // this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      //this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

 //update the bankName on onchange by product details based on productId @bhargavi
  onChangeProduct(){
    this.investmentApplicationDetailsService.getProductById(this.investmentApplicationDetailsModel.productId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.investmentApplicationDetailsModel.bankName = this.responseModel.data[0].bankName;
        this.investmentApplicationDetailsModel.roi = this.responseModel.data[0].roi;
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

  // imageUploader(event: any, fileUpload: FileUpload) {
  //   this.isFileUploaded = applicationConstants.FALSE;
  //   this.investmentApplicationDetailsModel.multipartFileList = [];
  //   this.multipleFilesList = [];
  //   this.investmentApplicationDetailsModel.filesDTOList = null;
  //   this.investmentApplicationDetailsModel.signedCopyPath = null;
  //   let file = event.files[0]; // Only one file
  //   let reader = new FileReader();
  //   reader.onloadend = (e) => {
  //     let filesDTO = new FileUploadModel();
  //     this.uploadFileData = e.target as FileReader;
  //     filesDTO.fileName = "INVESTMENT_APPLICATION_DETAILS_" + this.id + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
  //     filesDTO.fileType = file.type.split('/')[1];
  //     filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
  //     filesDTO.imageValue = this.uploadFileData.result as string;
  //     this.investmentApplicationDetailsModel.filesDTOList = this.filesDTOList;
  //     this.investmentApplicationDetailsModel.signedCopyPath = filesDTO.fileName;
  //     let index1 = event.files.indexOf(file);
  //     if (index1 > -1) {
  //       fileUpload.remove(event, index1);
  //     }
  //     fileUpload.clear();
  //   };

  //   reader.readAsDataURL(file);
  // }

  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.investmentApplicationDetailsModel.multipartFileList = [];
    this.multipartFileList = [];
    this.investmentApplicationDetailsModel.filesDTOList = null;
    this.investmentApplicationDetailsModel.signedCopyPath = null;
  
    if (event.files && event.files.length > 0) {
      let file = event.files[0]; // Only one file for now
      let reader = new FileReader();
  
      reader.onloadend = (e) => {
        let filesDTO = new FileUploadModel();
        this.uploadFileData = e.target as FileReader;
        filesDTO.fileName = `INVESTMENT_${this.id}_${this.commonComponent.getTimeStamp()}_${file.name}`;
        filesDTO.fileType = file.type.split('/')[1]; // Get file extension
        filesDTO.value = (this.uploadFileData.result as string).split(',')[1]; // Base64 content
        filesDTO.imageValue = this.uploadFileData.result as string; // Full Base64 string
        this.filesDTOList = [filesDTO]; // Assuming one file, adjust as needed
        this.investmentApplicationDetailsModel.filesDTOList = this.filesDTOList;
        this.investmentApplicationDetailsModel.signedCopyPath = filesDTO.fileName;
  
        // Remove the file from the UI component
        // let index = event.files.indexOf(file);
        // if (index > -1) {
        //   fileUpload.remove(event, index);
        // }
        // fileUpload.clear(); // Clear all files after upload
      };
  
      reader.readAsDataURL(file);
    } else {
      console.warn("No file uploaded.");
    }
  }
  

  //remove documnet for nominee
  fileRemoveEvent() {
    this.investmentApplicationDetailsModel.multipartFileList = [];
    if (this.investmentApplicationDetailsModel.filesDTOList != null && this.investmentApplicationDetailsModel.filesDTOList != undefined) {
      this.investmentApplicationDetailsModel.signedCopyPath = null;
      this.investmentApplicationDetailsModel.filesDTOList = null;
    }
  }

  //method for enable or disable of autoRenewalType based on its value.
  //@bhargavi
  onAutoRenewalChange(): void {
    const autoRenewalControl = this.applicationDetailsForm.get('isAutoRenewal');
    const autoRenewalTypeControl = this.applicationDetailsForm.get('autoRenewalType');
    if (autoRenewalControl && autoRenewalTypeControl) {
      autoRenewalControl.valueChanges.subscribe((isAutoRenewal: boolean) => {
        if (isAutoRenewal) {
          autoRenewalTypeControl.enable();
        } else {
          autoRenewalTypeControl.disable();
        }
      });
    }
  }
}

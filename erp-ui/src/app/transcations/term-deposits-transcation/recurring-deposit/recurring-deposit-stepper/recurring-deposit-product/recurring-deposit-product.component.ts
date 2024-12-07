import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { RdAccountsService } from '../../../shared/rd-accounts.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { RdAccountsModel, RdProductDefinition } from '../../../shared/term-depost-model.model';
import { MembershipBasicDetail } from '../../../shared/membership-basic-detail.model';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-recurring-deposit-product',
  templateUrl: './recurring-deposit-product.component.html',
  styleUrls: ['./recurring-deposit-product.component.css']
})
export class RecurringDepositProductComponent implements OnInit {
  
  @ViewChild('fileUpload') fileUpload: any;
  rdApplicationForm:FormGroup;
  prodcutForm:FormGroup;
  rdProduct:any;
  rdProductList:any;
  showForm: boolean = false;
  operationTypeList: any;
  checked: any;
  showField: boolean = false;
  orgnizationSetting:any;
  isEdit:Boolean = false;
  rdAccId:any;
  admissionNumber:any;
  responseModel!: Responsemodel;
  productsList:any[] = [];
  msgs:any[] = [];
  rdProductDefinition:RdProductDefinition = new RdProductDefinition();
  rdAccount:RdAccountsModel = new RdAccountsModel();
  membershipBasicDetail:MembershipBasicDetail = new MembershipBasicDetail();
  installmentFrequencyList:any[] = [];
  interestPaymentFrequencyList:any[] = [];
  docFilesList:any[] = [];
  uploadFileData: any;
  accountType : boolean = false;
  isFileUploaded: boolean = false;
  multipartFileList: any[] = [];



  
  constructor(private router: Router,private datePipe: DatePipe, private formBuilder: FormBuilder, 
    private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, 
    private commonFunctionsService: CommonFunctionsService , private ref: ChangeDetectorRef, private rdAccountsService: RdAccountsService,
    private translate: TranslateService,private fileUploadService :FileUploadService
  ) {
    this.rdApplicationForm = this.formBuilder.group({
      accountType: ['',Validators.required],
      depositAmount: ['',''],
      installmentFrequency: ['',''],
      tenureInYears: ['',''],
      tenureInMonths: ['',''],
      tenureInDays: ['',''],
      maturityDate: [{value: '', disabled: true}],
      maturityInterest: [{value: '', disabled: true}],
      maturityAmount: [{value: '', disabled: true}],
      isAutoRenewal: [{value: '', disabled: true},''],
      noOfInstallments: [{value: '', disabled: true}],
      rdProduct: ['',Validators.required],
      roi: [{value: '', disabled: true}],
      minTenure: [{value: '', disabled: true}],
      maxTenure: [{value: '', disabled: true}],
      maxDepositAmount: [{value: '', disabled: true}],
      minDepositAmount: [{value: '', disabled: true}],
      document: ['',''],
      depositDate: ['',Validators.required],
    }),

    this.prodcutForm = this.formBuilder.group({ 
      rdProduct: ['',''],
      accountNumber: ['',''],
      roi: ['',''],
      minTenure: ['',''],
      maxTenure: ['',''],
    })
  }
  // ngOnInit(): void {
  //   this.rdProductList=[
  //     { label:'Product-1-Recurring Details', value: 1 },
  //     { label:'Product-2-Recurring Details', value: 2 },
  //   ];
  //   this.operationTypeList=[
  //     { label:'Single', value: 1 },
  //     { label:'Joint', value: 2 },
  //   ]
  // }

  ngOnInit(){
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.installmentFrequencyList = this.commonComponent.commissionPaymentFrequency();
    this.interestPaymentFrequencyList = this.commonComponent.interestPaymentFrequency();
    this.operationTypeList = this.commonComponent.operationTypes();
    this.activateRoute.queryParams.subscribe(params => {
      if (params != undefined ) {

        if (params['id'] != undefined ) {
          let idParams = this.encryptDecryptService.decrypt(params['id']);
          this.rdAccId = Number(idParams);
          this.getRdAccountById();
        }

        if (params['admissionNum'] != undefined ) {
          let idParams = this.encryptDecryptService.decrypt(params['admissionNum']);
          this.admissionNumber = idParams;
        }
      } 
    });
    this.getAllProducts();
    // this.getProductById();
    this.rdApplicationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
    });
  }

  updateData() {
    this.rdAccount.rdAccId = this.rdAccId;
    this.rdAccountsService.changeData({
      formValid: !this.rdApplicationForm.valid ? true : false,
      data: this.rdAccount,
      isDisable: (!this.rdApplicationForm.valid),
      stepperIndex: 3,
    });
  }

  getAllProducts() {
    this.rdAccountsService.getApprovedRdProducts().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            // this.productsList = this.responseModel.data;
            this.productsList = this.responseModel.data.filter((obj: any) => obj != null).map((productType: { name: any; id: any; }) => {
              return { label: productType.name, value: productType.id };
            });
          }
        }else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
    error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  getProductById() {
    this.rdAccountsService.getProductById(this.rdAccount.rdProductId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.rdProductDefinition = this.responseModel.data[0];
            this.rdAccount.minDepositAmount = this.rdProductDefinition.minDepositAmount;
            this.rdAccount.maxDepositAmount = this.rdProductDefinition.maxDepositAmount;
            this.rdAccount.minTenure = this.rdProductDefinition.minTenure;
            this.rdAccount.maxTenure = this.rdProductDefinition.maxTenure;
            this.rdAccount.isRenewal = this.rdProductDefinition.isAutoRenewal;
            if(this.rdAccount.memberTypeName != undefined && this.rdAccount.memberTypeName === 'Individual'){
              if(this.membershipBasicDetail.isStaff != null && this.membershipBasicDetail.isStaff){
                this.rdAccount.roi = this.rdProductDefinition.intestPolicyConfigList[0].staffRoi;
              }else if(this.membershipBasicDetail.genderName != null && this.membershipBasicDetail.genderName === 'Female'){
                this.rdAccount.roi = this.rdProductDefinition.intestPolicyConfigList[0].womenSpecificRoi;
              }else if(this.membershipBasicDetail.age != null && this.membershipBasicDetail.age > 60){
                this.rdAccount.roi = this.rdProductDefinition.intestPolicyConfigList[0].seniorCitizenRoi;
              }else{
                this.rdAccount.roi = this.rdProductDefinition.intestPolicyConfigList[0].roi;
              }   
            }else{
              this.rdAccount.roi = this.rdProductDefinition.intestPolicyConfigList[0].roi;
            }

          }
        }else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
    error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  getRdAccountById() {
    this.rdAccount.rdAccId = this.rdAccId;
    this.rdAccountsService.getRdAccounts(this.rdAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.rdAccount = this.responseModel.data[0];
                // if(this.rdAccount.rdProductId != null && this.rdAccount.rdProductId != undefined)
                //   this.isProductDisable = applicationConstants.TRUE;

                this. rdAccount.depositDate = this.datePipe.transform(this. rdAccount.depositDate, this.orgnizationSetting.datePipe);
              
                // if(this.rdAccount.rdProductName != null && this.rdAccount.rdProductName != undefined){
                //   this.productInfoFalg = true;
                // }
                if(this.rdAccount.rdProductId != null && this.rdAccount.rdProductId != undefined){
                  this.getProductById();
                  
                }
                if(this.rdAccount.accountTypeName != null && this.rdAccount.accountTypeName != undefined){
                 this.accountType = true;
                }
                if (this.rdAccount.signedCopyPath != null && this.rdAccount.signedCopyPath != undefined) {
                  this.rdAccount.multipartFileList = this.fileUploadService.getFile(this.rdAccount.signedCopyPath, 
                    ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.rdAccount.signedCopyPath);
                }
                this.updateData();
              }
            }
          }
        }
      }
    });
  }

  uploadFile(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipartFileList = [];
    this.rdAccount.filesDTOList = [];
    this.rdAccount.signedCopyPath = null;
    let files: FileUploadModel = new FileUploadModel();
    for (let file of event.files) {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        let files = new FileUploadModel();
        this.uploadFileData = e.currentTarget;
        files.fileName = file.name;
        files.fileType = file.type.split('/')[1];
        files.value = this.uploadFileData.result.split(',')[1];
        files.imageValue = this.uploadFileData.result;
        let index = this.multipartFileList.findIndex(x => x.fileName == files.fileName);
        if (index === -1) {
          this.multipartFileList.push(files);
          this.rdAccount.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.rdAccount.filesDTOList[0].fileName = "RD_ACCOUNTS_" + this.rdAccId + "_" +timeStamp+ "_"+ file.name ;
        this.rdAccount.signedCopyPath = "RD_ACCOUNTS_" + this.rdAccId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
        let index1 = event.files.findIndex((x: any) => x === file);
        fileUpload.remove(event, index1);
        fileUpload.clear();
      }
      reader.readAsDataURL(file);
    }
  }


  removeDoc(){
    this.docFilesList = [];
    this.rdAccount.filesDTOList = [];
    this.rdAccount.signedCopyPath = null;
  }
  
  onClick(){
    this.showField = !this.showField;
  }

  calculateDepositDetails(event:any){
    if(this.rdAccount.tempDepositDate != undefined && this.rdAccount.tempDepositDate != null 
      && this.rdAccount.installmentAmount != undefined && this.rdAccount.installmentAmount != null
      && this.rdAccount.tenureInMonths != undefined && this.rdAccount.tenureInMonths != null
      && this.rdAccount.installmentFrequency != undefined && this.rdAccount.installmentFrequency != null){
        let isInvalidData = false;
        if(this.rdAccount.minDepositAmount != undefined && this.rdAccount.minDepositAmount != null
          && this.rdAccount.maxDepositAmount != undefined && this.rdAccount.maxDepositAmount != null){
            if(this.rdAccount.installmentAmount > this.rdAccount.maxDepositAmount){
              isInvalidData = true;
              this.msgs = [];
              this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.INTALLMENT_AMOUNT_SHOULD_BE_LESS_THAN_EQUAL + this.rdAccount.maxDepositAmount}];
              setTimeout(() => {
                this.msgs = [];
              }, 2000);
            }else if (this.rdAccount.installmentAmount < this.rdAccount.minDepositAmount){
              isInvalidData = true;
              this.msgs = [];
              this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.INTALLMENT_AMOUNT_SHOULD_BE_GREATHER_THAN_EQUAL + this.rdAccount.maxDepositAmount}];
              setTimeout(() => {
                this.msgs = [];
              }, 2000);
            }
        }
        
        if(isInvalidData){
          this.resetDepositMeturityDetails();
        }else{
          this.installmentFrequencyCheck();
        }
    }
  }

  installmentFrequencyCheck(){
    // let date = new Date(this.rdAccount.depositDate);
    // this.rdAccount.maturityDate = new Date(date.setMonth(date.getMonth() + this.rdAccount.tenureInMonths));
    if(this.rdAccount.installmentFrequency === 1){
      this.rdAccount.noOfInstallments = this.rdAccount.tenureInMonths * 30;
    }else if(this.rdAccount.installmentFrequency === 2){
      this.rdAccount.noOfInstallments = this.rdAccount.tenureInMonths * 2;
    }else if(this.rdAccount.installmentFrequency === 3){
      this.rdAccount.noOfInstallments = this.rdAccount.tenureInMonths;
    }else if(this.rdAccount.installmentFrequency === 4){
      if(this.rdAccount.tenureInMonths % 3 === 0){
        this.rdAccount.noOfInstallments = (this.rdAccount.tenureInMonths / 3);
      }else{
        this.resetDepositMeturityDetails();
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.INVALID_TENURE}];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }else if(this.rdAccount.installmentFrequency === 5){
      if(this.rdAccount.tenureInMonths % 6 === 0){
        this.rdAccount.noOfInstallments = (this.rdAccount.tenureInMonths / 6);
      }else{
        this.resetDepositMeturityDetails();
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.INVALID_TENURE}];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }else if(this.rdAccount.installmentFrequency === 6){
      if(this.rdAccount.tenureInMonths % 12 === 0){
        this.rdAccount.noOfInstallments = (this.rdAccount.tenureInMonths / 12);
      }else{
        this.resetDepositMeturityDetails();
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.INVALID_TENURE}];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }
    this.getMaturityDetails();
    
  }

 


  resetDepositMeturityDetails(){
    this.rdApplicationForm.get('maturityDate')?.reset;
    this.rdApplicationForm.get('maturityInterest')?.reset;
    this.rdApplicationForm.get('maturityAmount')?.reset;
    this.rdApplicationForm.get('noOfInstallments')?.reset;
  }

  getMaturityDetails(){
    if(this.rdAccount.rdProductId != undefined && this.rdAccount.rdProductId != null){  
      
      if(this.rdAccount.tempDepositDate != undefined && this.rdAccount.tempDepositDate != null){
        this.rdAccount.depositDate = this.commonFunctionsService.getUTCEpoch(new Date(this.rdAccount.tempDepositDate));
      }
      
      this.rdAccountsService.getMaturityDetails(this.rdAccount).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              let rdAccount = this.responseModel.data[0];
            }
          }else {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        }
      },
      error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
  }

  onChangeAccountType(event: any){
    const filteredItem = this.operationTypeList.find((item: { value: any; }) => item.value === event.value);
    this.rdAccount.accountTypeName = filteredItem.label;
    this.updateData();
  }
  
  fileRemoveEvent() {
    this.rdAccount.multipartFileList = [];
    if (this.rdAccount.filesDTOList != null && this.rdAccount.filesDTOList != undefined) {
      this.rdAccount.signedCopyPath = null;
      this.rdAccount.filesDTOList = null;
    }
  }

}

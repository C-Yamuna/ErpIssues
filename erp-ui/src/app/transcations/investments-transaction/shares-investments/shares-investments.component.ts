import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SharesInvestments } from './shared/shares-investments.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { SharesInvestmentsService } from './shared/shares-investments.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { InvestmentsTransactionConstant } from '../investments-transaction-constants';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';


@Component({
  selector: 'app-shares-investments',
  templateUrl: './shares-investments.component.html',
  styleUrls: ['./shares-investments.component.css']
})
export class SharesInvestmentsComponent implements OnInit{
  sharesInvestmentsForm:FormGroup;
  orgnizationSetting:any;
  isEdit:boolean = false;
  responseModel!: Responsemodel;
  sharesInvestmentsModel:SharesInvestments =  new SharesInvestments();
  msgs: any[] = [];
  buttonDisabled: boolean = false;
  checked: Boolean = false ;
  showForm: Boolean = false ;
  sharesInvestmentsList:any []=[];
  pacsId = 1;
  branchId = 1;
  productListData:any[]=[];

  isFileUploaded: boolean = false;
  multipleFilesList: any[] = [];
  filesDTOList: any[] = [];
  id: any;
  uploadFileData: any;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private encryptDecryptService :EncryptDecryptService,
    private commonComponent: CommonComponent,
    private commonFunctionsService: CommonFunctionsService,
    private datePipe: DatePipe,
    private sharesInvestmentsService:SharesInvestmentsService,
    private activateRoute:ActivatedRoute,private fileUploadService : FileUploadService){
    this.sharesInvestmentsForm = this.formBuilder.group({
      'productName': ['', Validators.required],
      'bankName': [{ value: '', disabled: true }],
      'branchName':[{ value: '', disabled: true }],
      'sharesPurchasedDate':['', Validators.required],
      'shareCertificateNumber': ['', Validators.required],
      'noOfSharesPurchased':['', Validators.required],
      'eachShareAmount':['', Validators.required],
      'shareCertificateCopyPath': ['']
    })
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.isEdit = true;
        this.sharesInvestmentsService.getSharesInvestmentsById(id).subscribe(res => {
          this.responseModel = res;
          this.sharesInvestmentsModel = this.responseModel.data[0];
          this.onChangeProduct();
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.sharesInvestmentsModel = this.responseModel.data[0];
            if (this.sharesInvestmentsModel.sharesPurchasedDate != null) {
              this.sharesInvestmentsModel.sharesPurchasedDate = this.datePipe.transform(this.sharesInvestmentsModel.sharesPurchasedDate, this.orgnizationSetting.datePipe);
              this.sharesInvestmentsModel.sharesPurchasedDate = new Date(this.sharesInvestmentsModel.sharesPurchasedDate);
            }
            if(this.sharesInvestmentsModel.shareCertificateCopyPath != null && this.sharesInvestmentsModel.shareCertificateCopyPath != undefined){
              this.sharesInvestmentsModel.multipartFileList = this.fileUploadService.getFile(this.sharesInvestmentsModel.shareCertificateCopyPath ,
              ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.sharesInvestmentsModel.shareCertificateCopyPath);
            }
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
    this.getAllProductsBasedOnPacsId(this.pacsId);
  }

  //add and update of share investment details
  addOrUpdate() {
    this.commonComponent.startSpinner();
    this.sharesInvestmentsModel.pacsId = this.pacsId;
    this.sharesInvestmentsModel.branchId = this.branchId;

    if (this.sharesInvestmentsModel.sharesPurchasedDate != null) {
      this.sharesInvestmentsModel.sharesPurchasedDate = this.commonFunctionsService.getUTCEpoch(new Date(this.sharesInvestmentsModel.sharesPurchasedDate));
    }

    if (this.sharesInvestmentsModel.id != undefined) {
      this.sharesInvestmentsService.updateSharesInvestments(this.sharesInvestmentsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.buttonDisabled = applicationConstants.FALSE;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
    } else {
      this.sharesInvestmentsModel.statusName = "CREATED";
      this.sharesInvestmentsService.addSharesInvestments(this.sharesInvestmentsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.commonComponent.stopSpinner();
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        this.buttonDisabled = applicationConstants.FALSE;
      });
    }
  }

  navigateToBack(){
    this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_TRANSACTION]);
  }

  //get all active products based on pacs id  @bhargavi
  getAllProductsBasedOnPacsId(pacsId:any) {
    // this.commonComponent.startSpinner();
    this.sharesInvestmentsModel.pacsId = this.pacsId;
    this.sharesInvestmentsService.getAllActiveProductsBasedOnPacsId(this.sharesInvestmentsModel.pacsId).subscribe((data: any) => {
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
  
  //update the bankName and branchName on onchange by product details based on productId @bhargavi
  onChangeProduct(){
    this.sharesInvestmentsService.getProductById(this.sharesInvestmentsModel.productId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.sharesInvestmentsModel.bankName = this.responseModel.data[0].bankName;
        this.sharesInvestmentsModel.branchName = this.responseModel.data[0].branchName;
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

  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.sharesInvestmentsModel.multipartFileList = [];
    this.multipleFilesList = [];
    this.sharesInvestmentsModel.filesDTOList = null;
    this.sharesInvestmentsModel.shareCertificateCopyPath = null;
    let file = event.files[0]; // Only one file
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let filesDTO = new FileUploadModel();
      this.uploadFileData = e.target as FileReader;
      filesDTO.fileName = "SHARES_INVESTMENT_" + this.id + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      this.sharesInvestmentsModel.filesDTOList = this.filesDTOList;
      this.sharesInvestmentsModel.shareCertificateCopyPath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      fileUpload.clear();
    };

    reader.readAsDataURL(file);
  }

  //remove documnet for nominee
  fileRemoveEvent() {
    this.sharesInvestmentsModel.multipartFileList = [];
    if (this.sharesInvestmentsModel.filesDTOList != null && this.sharesInvestmentsModel.filesDTOList != undefined) {
      this.sharesInvestmentsModel.shareCertificateCopyPath = null;
      this.sharesInvestmentsModel.filesDTOList = null;
    }
  }
}

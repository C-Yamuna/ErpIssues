import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { LoanConfigConstants } from 'src/app/configurations/loan-config/loan-config-constants';
import { SaoLoanLandMortageDetailsService } from '../../../shared/sao-loans/sao-loan-land-mortage-details.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Table } from 'primeng/table';
import { SaoLoanLandMortageDetailsModel } from './shared/sao-loan-mortgage.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { SaoLoanApplication } from '../../shared/sao-loan-application.model';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';
import { DatePipe } from '@angular/common';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-sao-loan-mortagage',
  templateUrl: './sao-loan-mortagage.component.html',
  styleUrls: ['./sao-loan-mortagage.component.css']
})
export class SaoLoanMortagageComponent {

  @ViewChild('dt', { static: false })
  private dt!: Table;
  Collateralform: FormGroup;
  selectcollateraltype: any;
  showgoldform: boolean = false;
  showlandform: boolean = false;
  showbondform:boolean = false;
  showstorageform:boolean = false;
  showothersform:boolean = false;
  buttonDisabled: boolean = false;
  carrats: any[] | undefined;
  admissionnumber:any;
  landTypeList: any[] = [];
  gridList: any[] = [];
  msgs: any[] = [];
  addButton: boolean = false;
  editDeleteDisable: boolean = false;
  saveAndNextDisable: boolean = false;
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  loanId: any;
  isEdit:boolean = false;
  orgnizationSetting: any;
  multipleFilesList: any[] = [];
  uploadFileData: any;
  saoLoanApplicatonModel: SaoLoanApplication = new SaoLoanApplication();
  saoLoanLandMortageDetailsModel : SaoLoanLandMortageDetailsModel = new SaoLoanLandMortageDetailsModel();
  statusList: any[] = [];
  deleteId: any;
  constructor(private router: Router, private formBuilder: FormBuilder,private saoLoanLandMortageDetailsService: SaoLoanLandMortageDetailsService,
    private commonComponent: CommonComponent,private saoLoanApplicationService : SaoLoanApplicationService,private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,private membershipBasicDetailsService: MembershipBasicDetailsService,private datePipe: DatePipe,
    private fileUploadService :FileUploadService
  )
  { 
    this.Collateralform = this.formBuilder.group({
     'passbookNumber': ['', Validators.required],
      'surveyNo': new FormControl(''),
      'landTypeName': ['', Validators.required],
      'declaredLandUnits': ['', Validators.required],
      'declaredLandSubUnits': ['', Validators.required],
      'value': new FormControl(''),
      'documentPath': new FormControl(''),
      'remarks': new FormControl(''),
      'statusName': ['', Validators.required] 
    })
   
   
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.statusList = this.commonComponent.status();
    this.landTypeList = [
        //{ status: 'Select', code: 'Select' },
        { label: 'Dry Land', value: 1 },
        { label: 'Wet Land', value: 2 },
    ];
   
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        this.loanId = Number(this.encryptDecryptService.decrypt(params['id']));
        this.isEdit = true;
        this.getSaoLoanLandDetailsByApplicationId(this.loanId);
      } else {
        this.isEdit = false;
      }
    }) 
    this.updateData();
   this.getSaoLoanApplicationDetailsById(this.loanId);
}

updateData() {
  this.saveAndNextDisable = !this.Collateralform.valid;
  if(this.editDeleteDisable != null){
    this.saveAndNextDisable = this.editDeleteDisable;
  }
  this.saoLoanApplicationService.changeData({
    formValid: !this.Collateralform.valid ? true : false,
    data: this.saoLoanLandMortageDetailsModel,
    isDisable: this.saveAndNextDisable,
    // isDisable: (!this.Collateralform.valid),
    stepperIndex: 7,
  });
}
save() {
  this.updateData();
}
getSaoLoanApplicationDetailsById(id: any) {
  this.saoLoanApplicationService.getSaoLoanApplicationDetailsById(id).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.saoLoanApplicatonModel = this.responseModel.data[0];
    }
    else {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
  });
}
getSaoLoanLandDetailsByApplicationId(loanId: any){
  this.saoLoanLandMortageDetailsService.getLandDetailsBySaoLoanApplicationId(loanId).subscribe(res => {
    this.responseModel = res;
    this.commonComponent.stopSpinner();
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
      this.gridList = this.responseModel.data;
      this.gridList = this.responseModel.data.map((land: any) => {
        if (land != null && land != undefined && land.documentPath != null && land.documentPath != undefined) {
          land.requestedDocPathMultipartFileList = this.fileUploadService.getFile(land.documentPath , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + land.documentPath);
        }
        return land
      });
      this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    } else {
      this.commonComponent.stopSpinner();
      this.buttonDisabled = applicationConstants.FALSE;
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
    this.updateData();
  });
}

  addOrUpdateLandDetails(rowData:any) {
    this.addButton = false;
    this.editDeleteDisable = false;
    rowData.saoLoanApplicationId = this.loanId;
    rowData.filesDTOList = this.saoLoanLandMortageDetailsModel.filesDTOList;
    rowData.documentPath = this.saoLoanLandMortageDetailsModel.documentPath;
    this.saoLoanLandMortageDetailsModel = rowData;
    if (rowData.id != undefined) {
      
      this.saoLoanLandMortageDetailsService.updateSaoLoanLandMortageDetails(this.saoLoanLandMortageDetailsModel).subscribe((res: any) => {
        this.responseModel = res;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.getSaoLoanLandDetailsByApplicationId(this.loanId);
          this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        } else {
         this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
         setTimeout(() => {
          this.msgs = [];
        }, 2000);
        }
      }, error => {
        this.msgs = [{ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      })
    } else {
     
      this.saoLoanLandMortageDetailsService.addSaoLoanLandMortageDetails(this.saoLoanLandMortageDetailsModel).subscribe((res: any) => {
        this.responseModel = res;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.getSaoLoanLandDetailsByApplicationId(this.loanId);
          this.gridList.unshift(this.responseModel.data[0]);
          this.gridList.splice(1, 1);
          this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        } else {
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.msgs =[({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST })];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      })
    }
  }
  addData() {
    this.addButton = true;
    this.editDeleteDisable = true;
    this.updateData();
    this.dt._first = 0;
    this.dt.value.unshift({ securityType: ''});
    this.dt.initRowEdit(this.dt.value[0]);
  }
  getLandDetailsBySaoLoanApplicationId(loanId:any) {
   
    this.saoLoanLandMortageDetailsService.getLandDetailsBySaoLoanApplicationId(loanId).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.gridList = this.responseModel.data;
        this.gridList = this.responseModel.data.map((land: any) => {
          if (land != null && land != undefined && land.documentPath != null && land.documentPath != undefined) {
            land.requestedDocPathMultipartFileList = this.fileUploadService.getFile(land.documentPath , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + land.documentPath);
          }
          return land
        });
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      } else {
        this.commonComponent.stopSpinner();
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }
  editLandDetailsRow(row:any){
    this.addButton = true;
    this.editDeleteDisable = true;
    this.saoLoanLandMortageDetailsModel = row;
    this.saoLoanLandMortageDetailsModel.saoLoanApplicationId = this.loanId;
    this.saoLoanLandMortageDetailsService.getSaoLoanLandMortageDetailsById(this.saoLoanLandMortageDetailsModel.id).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        this.saoLoanLandMortageDetailsModel = this.responseModel.data.map((land: any) => {
          if (land != null && land != undefined && land.documentPath != null && land.documentPath != undefined) {
            land.requestedDocPathMultipartFileList = this.fileUploadService.getFile(land.documentPath , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + land.documentPath);
          }
          return land
        });
        
      }
      this.getLandDetailsBySaoLoanApplicationId(this.loanId);
  });
  this.updateData();
}
  cancelLandDetails() {
    this.addButton = false;
    this.editDeleteDisable = false;
    this.getLandDetailsBySaoLoanApplicationId(this.loanId);
    this.updateData();      
  }
  deletDilogBox(rowData:any){
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  submitDelete(){
    this.delete(this.deleteId);
    this.displayDialog = false;
  }
  cancelForDialogBox() {
    this.displayDialog = false;
  }
 
  delete(rowId : any){
    this.saoLoanLandMortageDetailsService.deleteSaoLoanLandMortageDetails(rowId).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        if(this.loanId != null && this.loanId != undefined){
          this.getLandDetailsBySaoLoanApplicationId(this.loanId);
        }  
       
      }
        else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
 
   /**
   * @implements file upload service
   * @param event
   * @param fileUpload
   * @author akhila.m
   */
   fileUploader(event:any ,fileUpload: FileUpload ){
    this.multipleFilesList = [];
    this.saoLoanLandMortageDetailsModel.filesDTOList = [];
    this.saoLoanLandMortageDetailsModel.documentPath = null;
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
        let index = this.multipleFilesList.findIndex(x => x.fileName == files.fileName);
        if (index === -1) {
          this.multipleFilesList.push(files);
          this.saoLoanLandMortageDetailsModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.saoLoanLandMortageDetailsModel.filesDTOList[0].fileName = "LAND_MORTGAGE" + this.loanId + "_" +timeStamp+ "_"+ file.name ;
        this.saoLoanLandMortageDetailsModel.documentPath = "LAND_MORTGAGE" + this.loanId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
      }
      reader.readAsDataURL(file);
    }
  }

  /**
   * @implements onFileremove from file value
   * @author akhila.m
   */
  fileRemoeEvent() {
    if (this.saoLoanLandMortageDetailsModel.filesDTOList != null && this.saoLoanLandMortageDetailsModel.filesDTOList != undefined && this.saoLoanLandMortageDetailsModel.filesDTOList.length > 0) {
      let removeFileIndex = this.saoLoanLandMortageDetailsModel.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.saoLoanLandMortageDetailsModel.documentPath);
      this.saoLoanLandMortageDetailsModel.filesDTOList[removeFileIndex] = null;
      this.saoLoanLandMortageDetailsModel.documentPath = null;
    }
  }
 
}

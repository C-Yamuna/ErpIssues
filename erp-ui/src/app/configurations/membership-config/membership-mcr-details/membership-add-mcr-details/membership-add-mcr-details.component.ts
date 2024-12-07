import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipConfigConstants } from '../../membership-config-constants';
import { McrDetailsService } from '../shared/mcr-details.service';
import { McrDetails } from '../shared/mcr-details.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';

@Component({
  selector: 'app-membership-add-mcr-details',
  templateUrl: './membership-add-mcr-details.component.html',
  styleUrls: ['./membership-add-mcr-details.component.css']
})
export class MembershipAddMcrDetailsComponent implements OnInit {
  statusList: any[] = [];
  msgs: any[] = [];
  mcrDetailsform: FormGroup;
  mcrDetailsModel: McrDetails = new McrDetails();
  responseModel!: Responsemodel;
  buttonDisabled: any;
  isEdit: any;
  orgnizationSetting: any;
  minDate =  new Date();
  isFileUploaded: boolean = false;
  multipleFilesList: any[] = [];
  uploadFileData: any;
  mcrNumber: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private mcrDetailsService: McrDetailsService,
    private datePipe: DatePipe,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private commonFunctionsService: CommonFunctionsService,
    private encryptService: EncryptDecryptService,) {
    this.mcrDetailsform = this.formBuilder.group({
      'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'mcrNumber': new FormControl('', [Validators.required]),
      'mcrFilePath': new FormControl(''),
      'date': new FormControl('', [Validators.required]),
      'statusName': new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.mcrDetailsService.getMcrDetailsById(id).subscribe(res => {
          this.responseModel = res;
          this.mcrDetailsModel = this.responseModel.data[0];
          // this.mcrDetailsModel.date = this.datePipe.transform(this.mcrDetailsModel.date, 'dd/MM/yyyy');
          if (this.mcrDetailsModel.date) {
            this.mcrDetailsModel.date = this.datePipe.transform(this.mcrDetailsModel.date, this.orgnizationSetting.datePipe);
          }
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.mcrDetailsModel = this.responseModel.data[0];
          } else {
            this.commonComponent.stopSpinner();
            this.buttonDisabled = applicationConstants.FALSE;
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.mcrDetailsModel.status = this.statusList[0].value;
      }
    })
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    this.mcrDetailsModel.name =  this.mcrDetailsModel.name.trim(); 
    if (this.mcrDetailsModel.date) {
      this.mcrDetailsModel.date = this.commonFunctionsService.getUTCEpoch(new Date(this.mcrDetailsModel.date));
    }
    if (this.isEdit) {
      this.mcrDetailsService.updateMcrDetails(this.mcrDetailsModel).subscribe((response: any) => {
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
      this.mcrDetailsService.addMcrDetails(this.mcrDetailsModel).subscribe((response: any) => {
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
  
  // imageUploader(event: any, fileUpload: FileUpload) {
  //   this.isFileUploaded = applicationConstants.FALSE;
  //   this.multipleFilesList = [];
  //   this.mcrDetailsModel.filesDTO = [];
  //   this.mcrDetailsModel.mcrFilePath = null;
  //   let files: FileUploadModel = new FileUploadModel();
  //   for (let file of event.files) {
  //     let reader = new FileReader();
  //     reader.onloadend = (e) => {
  //       let files = new FileUploadModel();
  //       this.uploadFileData = e.currentTarget;
  //       files.fileName = file.name;
  //       files.fileType = file.type.split('/')[1];
  //       files.value = this.uploadFileData.result.split(',')[1];
  //       files.imageValue = this.uploadFileData.result;

  //       let index = this.multipleFilesList.findIndex(x => x.fileName == files.fileName);
  //       if (index === -1) {
  //         this.multipleFilesList.push(files);
  //         this.mcrDetailsModel.filesDTO.push(files); // Add to filesDTO array
  //       }
  //       let timeStamp = this.commonComponent.getTimeStamp();
  //       this.mcrDetailsModel.filesDTO[0].fileName = "MCR_DETAILS" + this.mcrNumber + "_" +timeStamp+ "_"+ file.name ;
  //       this.mcrDetailsModel.mcrFilePath = "MCR_DETAILS" + this.mcrNumber + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
  //       let index1 = event.files.findIndex((x: any) => x === file);
  //       fileUpload.remove(event, index1);
  //       fileUpload.clear();
  //     }
  //     reader.readAsDataURL(file);
  //   }
  // }
  
  navigateToBack() {
    this.router.navigate([MembershipConfigConstants.MCR_DETAILS]);
  }
}

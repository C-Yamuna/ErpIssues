import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { SaoNominee } from './shared/sao-nominee.model';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SaoLoanNomineeDetailsService } from '../../../shared/sao-loans/sao-loan-nominee-details.service';
import { SaoLoanApplication } from '../../shared/sao-loan-application.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { IndividualMemberDetailsModel } from '../membership-basic-details/shared/membership-basic-details.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-sao-nominee',
  templateUrl: './sao-nominee.component.html',
  styleUrls: ['./sao-nominee.component.css']
})
export class SaoNomineeComponent {
  selectetypeofnominee: any;
  admissionnumber:any;
  loanId:any;
  shownewnomineeform: boolean = false;
  showmembernominee: boolean = false;
  shownonomineeform:boolean = false;
  relationTypesList: any[] = [];
  multipleFilesList: any;
  newNominee: boolean = false;
  sameAsMembershipNominee: boolean = false;
  noNominee: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: boolean = false;
  age: any;
  nominee: any;
  guarntorDetailsFalg: boolean = false;
  saoNomineeModel: SaoNominee = new SaoNominee();
  saoLoanApplicatonModel: SaoLoanApplication = new SaoLoanApplication();
  individualMemberDetailsModel: IndividualMemberDetailsModel = new IndividualMemberDetailsModel();
  nomineeForm: any;
  guarantorDetailsForm: any;
  nomineeList: any[] = [];
  admissionNumber: any;
  isFileUploaded: any;
  orgnizationSetting: any;
  nomineeTypeDisable: boolean = false;
  flag: boolean = false;
  uploadFileData: any;
  constructor(private router: Router, private formBuilder: FormBuilder,private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService
    ,private saoLoanApplicationService: SaoLoanApplicationService, private saoLoanNomineeDetailsService:SaoLoanNomineeDetailsService,private commonComponent: CommonComponent,
    private membershipBasicDetailsService: MembershipBasicDetailsService,private datePipe: DatePipe,private fileUploadService :FileUploadService
  )
  { 
    this.nomineeForm = this.formBuilder.group({
      relationTypeName: ['', Validators.required],
      nomineeName: ['', Validators.required],
      // nomineeAge: ['', Validators.required],
      nomineeAadharNumber: ['', Validators.required],
      nomineeMobileNumber: ['', Validators.required],
      nomineeEmailId: new FormControl(['', ],),
      nomineeDob: new FormControl(['', ],),
      remarks: new FormControl('', ),
      nomineeTypeName: ['', Validators.required],
      nomineeFilePath:new FormControl('', )
    });
    

  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.nomineeList = [
      { label: 'New Nominee', value: 1 },
      { label: 'Membership Nominee', value: 2 },
      { label: 'No Nominee', value: 3 },
    ]
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['preview'] != undefined ) {
        if(params['preview'] != undefined && params['preview'] != null){
          let edit = this.encryptDecryptService.decrypt(params['preview']);
          //this.historyFLag = true;
        }
        if (params['id'] != undefined) {
          let queryParams = this.encryptDecryptService.decrypt(params['id']);
          this.loanId = Number(queryParams);
         //this.getSaoLoanNomineeDetailsByApplicationId(this.loanId);
          this.getSaoLoanApplicationDetailsById(this.loanId);
        } 
       
      } else {
        this.isEdit = false;
      }
    });
    this.getSaoLoanApplicationDetailsById(this.loanId);
    this.nomineeForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.nomineeForm.valid) {
        this.save();
      }
    });
    this.getAllRelationTypes();
  }
  
  updateData() {
    this.saoNomineeModel.saoLoanApplicationId = this.loanId;
    this.saoNomineeModel.admissionNumber = this.admissionNumber;
    this.saoLoanApplicationService.changeData({
      formValid: !this.nomineeForm.valid ? true : false,
      data: this.saoNomineeModel,
      isDisable: (!this.nomineeForm.valid),
      // isDisable:false,
      stepperIndex: 5,
    });
  }
  save() {
    this.updateData();
  }
 
  onChange(event: any,flag: any) {
  if (event == 1) {
    this.newNominee = true;
    this.noNominee = false;
   // this.sameAsMembershipNominee = false;
  if(flag){
   
   let nomineeId = null;
   if(this.saoNomineeModel != null && this.saoNomineeModel != undefined && this.saoNomineeModel.id  != null && this.saoNomineeModel.id  != undefined){
     nomineeId = this.saoNomineeModel.id ;
   }
    this.saoNomineeModel = new SaoNominee();
   if(nomineeId != null && nomineeId != undefined){
     this.saoNomineeModel.id = nomineeId;
   }
  
  }
    
    this.saoNomineeModel.nomineeType = 1;
    this.nomineeValidatorsRequired();
  }
  else if (event == 2) {
   // this.sameAsMembershipNominee = true;
    this.newNominee = true;
    this.noNominee = false;
    if(flag){
    let nomineeId = null;
      if(this.saoNomineeModel != null && this.saoNomineeModel != undefined && this.saoNomineeModel.id  != null && this.saoNomineeModel.id  != undefined){
        nomineeId = this.saoNomineeModel.id ;
      }
    this.saoNomineeModel = new SaoNominee();
    if(nomineeId != null && nomineeId != undefined){
      this.saoNomineeModel.id = nomineeId;
    }
    this.saoNomineeModel.nomineeType = 2;
    if(this.admissionNumber != null && this.admissionNumber != undefined){
      this.getNomineeFromMemberModule(this.admissionNumber);
    }
  }
    this.nomineeFormValidation();
  }
  else if (event == 3) {
    this.noNominee = true;
    this.sameAsMembershipNominee = false;
    this.newNominee = false;
    this.saoNomineeModel.nomineeType = 3;
    this.nomineeValidatorsFormNotRequired();
  } 
}
nomineeValidatorsRequired(){
  this.nomineeForm.get('relationTypeName')?.enable();
  this.nomineeForm.get('nomineeName')?.enable();
  this.nomineeForm.get('nomineeAadharNumber')?.enable();
  this.nomineeForm.get('nomineeMobileNumber')?.enable();
  this.nomineeForm.get('nomineeEmailId')?.enable();
 // this.nomineeForm.get('fileUpload')?.disable();
  const controlName = this.nomineeForm.get('relationTypeName');
  if (controlName) {
    controlName.setValidators(Validators.required); // Set the required validator
    controlName.updateValueAndValidity();
  }

  const controlTow = this.nomineeForm.get('nomineeName');
  if (controlTow) {
    controlTow.setValidators(Validators.required); // Set the required validator
    controlTow.updateValueAndValidity();
  }
  const controlFour = this.nomineeForm.get('nomineeAadharNumber');
  if (controlFour) {
    controlFour.setValidators(Validators.required); // Set the required validator
    controlFour.updateValueAndValidity();
  }
  const controlFive = this.nomineeForm.get('nomineeMobileNumber');
  if (controlFive) {
    controlFive.setValidators(Validators.required); // Set the required validator
    controlFive.updateValueAndValidity();
  }
  this.updateData();
}
nomineeFormValidation() {
  this.nomineeForm.get('relationTypeName')?.disable();
  this.nomineeForm.get('nomineeName')?.disable();
  this.nomineeForm.get('nomineeAadharNumber')?.disable();
  this.nomineeForm.get('nomineeMobileNumber')?.disable();
  this.nomineeForm.get('nomineeEmailId')?.disable();
 // this.nomineeForm.get('fileUpload')?.disable();
  this.updateData();
}
nomineeValidatorsFormNotRequired(){
  const controlName = this.nomineeForm.get('relationTypeName');
  if (controlName) {
    controlName.setValidators(null); // Set the required validator null
    controlName.updateValueAndValidity();
  }

  const controlTow = this.nomineeForm.get('nomineeName');
  if (controlTow) {
    controlTow.setValidators(null); // Set the required validator null
    controlTow.updateValueAndValidity();
  }
  const controlFour = this.nomineeForm.get('nomineeAadharNumber');
  if (controlFour) {
    controlFour.setValidators(null); // Set the required validator null
    controlFour.updateValueAndValidity();
  }
  const controlFive = this.nomineeForm.get('nomineeMobileNumber');
  if (controlFive) {
    controlFive.setValidators(null); // Set the required validator null
    controlFive.updateValueAndValidity();
  }
  this.updateData();
}

getSaoLoanNomineeDetailsByApplicationId(loanId: any) {
  this.saoLoanNomineeDetailsService.getSaoLoanNomineeDetailsByApplicationId(loanId).subscribe((response: any) => {
    this.responseModel = response;
    
    if(this.responseModel != null && this.responseModel != undefined){
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if(this.responseModel.data[0] != null && this.responseModel.data[0] != undefined){
          this.saoNomineeModel = this.responseModel.data[0];
          this.admissionNumber = this.responseModel.data[0].admissionNumber;
          if(this.saoNomineeModel.nomineeType != null && this.saoNomineeModel.nomineeType != undefined){
            this.onChange(this.saoNomineeModel.nomineeType,this.flag);
            this.nomineeTypeDisable = true;
            
            if(this.saoNomineeModel.nomineeType == 1 || this.saoNomineeModel.nomineeType == 2){
                this.newNominee = true;
                this.noNominee = false;
                this.sameAsMembershipNominee = false;
            }
            else if(this.saoNomineeModel.nomineeType == 3){
              this.newNominee = false;
              this.noNominee = true;
              this.sameAsMembershipNominee = false;
            }
          }
          if(this.saoNomineeModel != null && this.saoNomineeModel != undefined){
            if(this.saoNomineeModel.nomineeFilePath != null && this.saoNomineeModel.nomineeFilePath != undefined){
              this.saoNomineeModel.nomineeFilePathList =  this.fileUploadService.getFile(this.saoNomineeModel.nomineeFilePath , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.saoNomineeModel.nomineeFilePath);
            }
          }
          this.getAllRelationTypes();
        }
      }else {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
  }
  })
}
getNomineeFromMemberModule(admissionNumber : any){
  this.saoLoanNomineeDetailsService.getNomineeFromMemberModuleByAdmissionNumber(this.admissionNumber).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel != null && this.responseModel != undefined) {
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.saoNomineeModel = this.responseModel.data[0];
          if (this.saoNomineeModel.nomineeDob != null && this.saoNomineeModel.nomineeDob != undefined) {
            this.saoNomineeModel.nomineeDobVal = this.datePipe.transform(this.saoNomineeModel.nomineeDobVal, this.orgnizationSetting.datePipe);
          }
          if(this.responseModel.data[0].relationTypeId != null && this.responseModel.data[0].relationTypeId != undefined){
            this.saoNomineeModel.relationTypeId = this.responseModel.data[0].relationTypeId;
            this.getAllRelationTypes();
          }
          if(this.responseModel.data[0].relationTypeName != null && this.responseModel.data[0].relationTypeName != undefined){
            this.saoNomineeModel.relationTypeName = this.responseModel.data[0].relationTypeName;
          }
        }
        this.saoNomineeModel.nomineeType = 2;
        this.saoNomineeModel.id = null;
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
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

getAllRelationTypes(){
  this.saoLoanNomineeDetailsService.getAllRelationTypes().subscribe((res: any) => {
    this.responseModel = res;
    if (this.responseModel != null && this.responseModel != undefined) {
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined ) {
          this.relationTypesList = this.responseModel.data
          this.relationTypesList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
            return { label: count.name, value: count.id }
          });
          let  nominee= this.relationTypesList.find((data: any) => null != data && this.saoNomineeModel.relationTypeId  != null && data.value == this.saoNomineeModel.relationTypeId);
          if (nominee != null && undefined != nominee && nominee.label != null && nominee.label != undefined){
                this.saoNomineeModel.relationTypeName = nominee.label;
            }
        }
      }
    }
  });
  }
  getSaoLoanApplicationDetailsById(id: any) {
    this.saoLoanApplicationService.getSaoLoanApplicationDetailsById(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.saoLoanApplicatonModel = this.responseModel.data[0];
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if(this.responseModel.data[0].admissionNo != null && this.responseModel.data[0].admissionNo != undefined){
            this.admissionNumber = this.responseModel.data[0].admissionNo;
          }
          if(this.responseModel.data[0].saoLoanNomineeDetailsDTO != null && this.responseModel.data[0].saoLoanNomineeDetailsDTO != undefined){
            this.saoNomineeModel = this.responseModel.data[0].saoLoanNomineeDetailsDTO;
            if(this.saoNomineeModel.nomineeFilePath != null && this.saoNomineeModel.nomineeFilePath != undefined){
              this.saoNomineeModel.nomineeFilePathList =  this.fileUploadService.getFile(this.saoNomineeModel.nomineeFilePath , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.saoNomineeModel.nomineeFilePath);
            }
          }
         
          if(this.saoNomineeModel.nomineeType != null && this.saoNomineeModel.nomineeType != undefined){
            this.onChange(this.saoNomineeModel.nomineeType,this.flag);
            this.nomineeTypeDisable = true;
            if(this.saoNomineeModel.nomineeType == 1 || this.saoNomineeModel.nomineeType == 2){
                this.newNominee = true;
                this.noNominee = false;
                this.sameAsMembershipNominee = false;
            }
            else if(this.saoNomineeModel.nomineeType == 3){
              this.newNominee = false;
              this.noNominee = true;
              this.sameAsMembershipNominee = false;
            }
          }
          if(this.saoNomineeModel != null && this.saoNomineeModel != undefined){
            if(this.saoNomineeModel.nomineeFilePath != null && this.saoNomineeModel.nomineeFilePath != undefined){
              this.saoNomineeModel.nomineeFilePathList =  this.fileUploadService.getFile(this.saoNomineeModel.nomineeFilePath , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.saoNomineeModel.nomineeFilePath);
            }
          }
         
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
  //akhila.m
  // image upload
  fileUploader(event: any, fileUpload: FileUpload , filePathName:any) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    if(this.saoNomineeModel != null && this.saoNomineeModel != undefined && this.isEdit && this.saoNomineeModel.filesDTOList == null || this.saoNomineeModel.filesDTOList == undefined){
      this.saoNomineeModel.filesDTOList = [];
    }
    
    this.saoNomineeModel.nomineeFilePath = null;
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
        
          this.multipleFilesList.push(files);
          // Add to filesDTOList array
        let timeStamp = this.commonComponent.getTimeStamp();
        if (filePathName === "Nominee") {
          this.saoNomineeModel.filesDTOList.push(files); 
          this.saoNomineeModel.nomineeFilePath = null;
          this.saoNomineeModel.filesDTOList[this.saoNomineeModel.filesDTOList.length-1].fileName = "SAO_NOMINEE" + this.loanId + "_" + timeStamp + "_" + file.name;
          this.saoNomineeModel.nomineeFilePath = "SAO_NOMINEE" + this.loanId + "_" +timeStamp+"_"+ file.name; 
        }
        
        //fileUpload.clear();
        this.updateData();
      }
      reader.readAsDataURL(file);
    }
  }
  fileRemoeEvent(fileName :any){
    if(fileName == "Nominee"){
      if(this.saoNomineeModel.filesDTOList != null && this.saoNomineeModel.filesDTOList != undefined && this.saoNomineeModel.filesDTOList.length > 0){
        let removeFileIndex = this.saoNomineeModel.filesDTOList.findIndex((obj:any) => obj && obj.fileName === this.saoNomineeModel.nomineeFilePath);
        this.saoNomineeModel.filesDTOList[removeFileIndex] = null;
        this.saoNomineeModel.nomineeFilePath = null;
      }
    }
   
  }
  
  onChangeNomineeRelationType(relationTypeId: any) {
    let relationType = this.relationTypesList.find((data: any) => null != data && relationTypeId != null && data.value == this.saoNomineeModel.relationTypeId);
      if (relationType != null && undefined != relationType)
        this.saoNomineeModel.relationTypeName = relationType.label;
  }
}

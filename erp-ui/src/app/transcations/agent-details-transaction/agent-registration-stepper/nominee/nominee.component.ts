import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Nominee } from './shared/nominee.model';
import { NomineeService } from './shared/nominee.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { StatesService } from 'src/app/configurations/common-config/state/shared/states.service';
import { DistrictService } from 'src/app/configurations/common-config/district/shared/district.service';
import { SubDistrictService } from 'src/app/configurations/common-config/sub-district/shared/sub-district.service';
import { VillagesService } from 'src/app/configurations/common-config/villages/shared/villages.service';
import { AgentDetailsTransactionService } from '../../shared/agent-details-transaction.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { AgentDetails } from '../basic-details/shared/basic-details.model';
import { RelationshipTypeService } from 'src/app/configurations/common-config/relationship-type/shared/relationship-type.service';
import { FileUpload } from 'primeng/fileupload';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';
import { MembershipBasicDetails } from '../membership-basic-details/shared/membership-basic-details';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-nominee',
  templateUrl: './nominee.component.html',
  styleUrls: ['./nominee.component.css']
})
export class NomineeComponent implements OnInit {
  nomineeForm: FormGroup;
  nomineeTypeList: any[] = [];
  checked: any;
  newNominee: boolean = false;
  sameAsMembershipNominee: boolean = false;
  noNominee: boolean = false;
  orgnizationSetting: any;
  responseModel!: Responsemodel;
  isEdit: boolean = false;
  msgs: any[] = [];
  nomineeModel: Nominee = new Nominee();
  agentDetailsModel:AgentDetails = new AgentDetails();
  membershipBasicDetailsModel: MembershipBasicDetails = new MembershipBasicDetails();
  buttonDisabled: boolean = false;
  stateListData: any[] = [];
  districtListData: any[] = [];
  subDistrictListData: any[] = [];
  villageListData: any[] = [];
  statusList: any[]=[];
  relationTypeList: any[] = [];
  id:any;
  docFilesList: any[] = [];
  uploadFileData: any;
  genderList: any[] = [];
  maritalStatusList: any[] = [];
  nomineeList: any[] = [];
  agentId: any;
  admissionNumber:any;
  agentNominee: boolean = false;
  agentList: any[] = [];
  isFileUploaded: boolean = false;
  multipleFilesList: any[] = [];


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent,
    private datePipe: DatePipe,
    private agentDetailsService:AgentDetailsTransactionService,
    private nomineeService: NomineeService,
    private membershipBasicDetailsService: MembershipBasicDetailsService,
    private relationshiptypeService:RelationshipTypeService,
    private stateService: StatesService,
    private districtService: DistrictService,
    private subdistrictService: SubDistrictService,
    private villageService: VillagesService,
    private fileUploadService : FileUploadService,
    private activateRoute: ActivatedRoute) {
    this.nomineeForm = this.formBuilder.group({
      'nomineeType': new FormControl(''),
      'relationTypeName': new FormControl('',[Validators.required]),
      'nomineeName': new FormControl('',[Validators.required,Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      'nomineeDob': new FormControl(''),
      'nomineeAge': new FormControl(''),
      'nomineeAadharNumber': new FormControl('',[Validators.required]),
      'nomineeMobileNumber': new FormControl('',[Validators.required, Validators.pattern(applicationConstants.MOBILE_PATTERN)]),
      'nomineeEmailId': new FormControl('',[Validators.required, Validators.pattern(applicationConstants.EMAIL_PATTERN)]),
      'nomineeFilePath': new FormControl('')
    });
  }

  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.statusList = this.commonComponent.status();
    this.genderList = this.commonComponent.genderList();
    this.maritalStatusList = this.commonComponent.maritalStatusList();
    this.nomineeTypeList = this.commonComponent.nomineeList();
    // this.agentList = this.commonComponent.agentType();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let queryParams = this.encryptDecryptService.decrypt(params['id']);
        this.agentId = Number(queryParams);
        if(this.agentId != null && this.agentId != undefined)
          this.getAgentDetailsById(this.agentId);
      } else {
        this.isEdit = false;
      }
    })
    this.nomineeForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.nomineeForm.valid) {
        this.save();
      }
    });
    this.getAllReltionshipType();
    // this.getAgentDetailsById(this.agentId ) ;
  }

  updateData() {
    this.nomineeModel.agentId = this.agentId;
    this.agentDetailsService.changeData({
      formValid: this.nomineeForm.valid ? true : false,
      data: this.nomineeModel,
      // isDisable:  (!this.nomineeForm.valid),
      stepperIndex: 3,
    });
  }

  save() {
    this.updateData();
  }


  onChange(nomineeType: any) {
    if (nomineeType== 1) {
      this.newNominee = true;
      this.sameAsMembershipNominee = false;
      this.noNominee = false;
      if(!this.agentNominee)
        this.nomineeModel = new Nominee();
      this.nomineeModel.nomineeType = 1;
    }
    else if (nomineeType == 2) {
      this.sameAsMembershipNominee = true;
      this.newNominee = false;
      this.noNominee = false;
      this.getMemberNomineeDetailsByAdmissionNumber(this.admissionNumber);
    }
    else if (nomineeType == 3) {
      this.noNominee = true;
      this.newNominee = false;
      this.sameAsMembershipNominee = false;
      if(!this.agentNominee)
        this.nomineeModel = new Nominee();
      this.nomineeModel.nomineeType = 3;
    }
    this.updateData();
  }

  getAgentDetailsById(agentId :any) {
    this.agentDetailsService.getAgentDetailsById(agentId).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined)
              this.admissionNumber = this.responseModel.data[0].admissionNumber;
            this.agentDetailsModel = this.responseModel.data[0];
            if (this.agentDetailsModel != null && this.agentDetailsModel != undefined) {
              if (this.agentDetailsModel.agentNomineeList != null && this.agentDetailsModel.agentNomineeList != undefined &&
                this.agentDetailsModel.agentNomineeList[0] != null && this.agentDetailsModel.agentNomineeList[0] != undefined)
                this.nomineeModel = this.agentDetailsModel.agentNomineeList[0];
              if(this.nomineeModel != null && this.nomineeModel != undefined){
                if(this.nomineeModel.nomineeType != null && this.nomineeModel.nomineeType != undefined){
                  this.agentNominee = true;
                  this.onChange(this.nomineeModel.nomineeType);
                }
                if(this.nomineeModel.nomineeFilePath != null && this.nomineeModel.nomineeFilePath != undefined)
                  this.nomineeModel.multipartFileList = this.fileUploadService.getFile(this.nomineeModel.nomineeFilePath ,ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.nomineeModel.nomineeFilePath);
              }
            }
            this.updateData();
          }
        }
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }

  getAllReltionshipType() {
    this.relationshiptypeService.getAllRelationshipType().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.relationTypeList = this.responseModel.data;
        this.relationTypeList = this.relationTypeList.filter((relationship: any) => relationship != null).map((relationtype: { name: any; id: any; }) => {
          return { label: relationtype.name, value: relationtype.id };
        });
        let  nominee= this.relationTypeList.find((data: any) => null != data && this.nomineeModel.relationTypeId  != null && data.value == this.nomineeModel.relationTypeId);
        if (nominee != null && undefined != nominee && nominee.label != null && nominee.label != undefined){
          this.nomineeModel.relationTypeName = nominee.label;
        }
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

  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.nomineeModel.multipartFileList = [];
    this.multipleFilesList = [];
    this.nomineeModel.filesDTO = null; // Initialize as a single object
    this.nomineeModel.nomineeFilePath = null;
    let file = event.files[0]; // Only one file
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let filesDTO = new FileUploadModel();
      this.uploadFileData = e.target as FileReader;
      filesDTO.fileName = "AGENT_DETAILS_" + this.agentId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      this.nomineeModel.filesDTO = filesDTO;
      this.nomineeModel.nomineeFilePath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      fileUpload.clear();
    };

    reader.readAsDataURL(file);
  }

  //remove documnet for nominee
  fileRemoveEventForNominee() {
    this.nomineeModel.multipartFileList = [];
    if (this.nomineeModel.filesDTO != null && this.nomineeModel.filesDTO != undefined) {
      this.nomineeModel.nomineeFilePath = null;
      this.nomineeModel.filesDTO = null;
    }
  }



  getMemberNomineeDetailsByAdmissionNumber(admissionNumber : any){
    this.nomineeService.getMemberNomineeDetailsByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.nomineeModel = this.responseModel.data[0];

            if (this.nomineeModel.nomineeDob != null && this.nomineeModel.nomineeDob != undefined) {
              this.nomineeModel.nomineeDob = this.datePipe.transform(this.nomineeModel.nomineeDob, this.orgnizationSetting.datePipe);
            }
            this.nomineeModel.nomineeType = 2;
            this.updateData();
          }
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
}

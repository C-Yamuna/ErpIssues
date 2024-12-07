import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { AgentDetailsTransactionService } from '../../shared/agent-details-transaction.service';
import { AgentDetails } from './shared/basic-details.model';
import { RelationshipTypeService } from 'src/app/configurations/common-config/relationship-type/shared/relationship-type.service';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';
import { MembershipBasicDetails } from '../membership-basic-details/shared/membership-basic-details';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit{
 
  membershipBasicDetailsModel: MembershipBasicDetails = new MembershipBasicDetails();
  agentDetailsForm:FormGroup;
  orgnizationSetting:any;
  isEdit:boolean = false;
  responseModel!: Responsemodel;
  agentDetailsModel:AgentDetails =  new AgentDetails();
  msgs: any[] = [];
  buttonDisabled: boolean = false;
  checked: Boolean = false ;
  showForm: Boolean = false ;
  agentDetailsSwitch: boolean = false;
  agentList:any []=[];
  taskList:any []=[];
  collectionList:any []=[];
  maritalStatusList:any []=[];
  genderList:any []=[];
  relationTypeList: any[]=[];
  agentId: any;
  admissionNumber:any;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private encryptDecryptService :EncryptDecryptService,
    private commonComponent: CommonComponent,
    private datePipe: DatePipe,
    private membershipBasicDetailsService: MembershipBasicDetailsService,
    private agentDetailsService:AgentDetailsTransactionService,
    private activateRoute:ActivatedRoute,
    private relationshiptypeService:RelationshipTypeService){
    this.agentDetailsForm = this.formBuilder.group({
      'agentType': new FormControl('', [Validators.required]),
      'taskType': new FormControl('', [Validators.required]),
      'surName': new FormControl(''),
      'name': new FormControl(''),
      'age': new FormControl(''),
      'gender': new FormControl(''),
      'marritalStatus': new FormControl(''),
      'relationType': new FormControl(''),
      'relativeName': new FormControl(''),
      'incomePerAnnum': new FormControl(''),
      'qualification': new FormControl(''),
      'occupation': new FormControl(''),
      'caste': new FormControl(''),
      'community': new FormControl(''),
      'aadharNumber':new FormControl(''),
      
    })
  }
  ngOnInit() {
    this.agentList = this.commonComponent.agentType();
    this.taskList = this.commonComponent.taskType();
    this.collectionList = this.commonComponent.collectionType();
    this.genderList = this.commonComponent.genderList();
    this.maritalStatusList = this.commonComponent.maritalStatusList();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        this.agentId = this.encryptDecryptService.decrypt(params['id']);
        this.isEdit = true;
        this.getAgentDetailsById(this.agentId);
      } else {
        this.isEdit = false;
      }
    }) 
    this.agentDetailsForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.agentDetailsForm.valid) {
        this.save();
      }
    });
    // this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
    this.getAllReltionshipType();
  }

  updateData() {
    this.agentDetailsModel.agentId = this.agentId;
    this.agentDetailsService.changeData({
      formValid: !this.agentDetailsForm.valid ? true : false,
      data: this.agentDetailsModel,
      isDisable:  (!this.agentDetailsForm.valid),
      stepperIndex: 2,
    });
  }
  save() {
    this.updateData();
  }

  agentDetailsOnChange(){
    this.agentDetailsSwitch = !this.agentDetailsSwitch;
  }

  getAgentDetailsById(id: any) {
    this.agentDetailsService.getAgentDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.agentDetailsModel = this.responseModel.data[0];
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
      this.updateData();
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
}

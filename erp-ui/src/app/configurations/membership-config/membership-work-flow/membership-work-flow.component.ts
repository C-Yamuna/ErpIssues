import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipConfigConstants } from '../membership-config-constants';
import { WorkFlowService } from './shared/work-flow.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-membership-work-flow',
  templateUrl: './membership-work-flow.component.html',
  styleUrls: ['./membership-work-flow.component.css']
})
export class MembershipWorkFlowComponent implements OnInit{

  workFloStepsList: any;
  columns: any[] = [];
  responseModel: any;
  subColumns: any[] = [];
  msgs:any[]=[];
  displayDialog:boolean=applicationConstants.FALSE;
  orgnizationSetting:any;
  deleteId: any;
  constructor(private encryptDecryptService: EncryptDecryptService,private router:Router,  private commonComponent: CommonComponent,
    private workFlowService:WorkFlowService,private datePipe:DatePipe) { 
      this.workFloStepsList = [];
      this.columns = [
        { field: 'name', header: 'MEMBERSHIPCONFIG.WORK_FLOW_NAME' },
        { field: 'code', header: 'MEMBERSHIPCONFIG.CODE' },
        { field: 'categoryName', header: 'MEMBERSHIPCONFIG.COMMON_CATEGORYS' },
        { field: 'noOfSteps', header: 'MEMBERSHIPCONFIG.NO_OF_STEPS' },
        { field: 'isExceptionalName', header: 'MEMBERSHIPCONFIG.IS_EXCEPTIONAL' },
        { field: 'effStartDate', header: 'MEMBERSHIPCONFIG.EFFECTIVE_START_DATE' },
        { field: 'effEndDate', header: 'MEMBERSHIPCONFIG.EFFECTIVE_END_DATE' },
        // { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' },
  
      ]
      this.subColumns = [
        { field: 'commonStatusName', header: 'MEMBERSHIPCONFIG.WORK_FLOW_NAME' },
        { field: 'levelName', header: 'MEMBERSHIPCONFIG.ACTOR' },
        { field: 'prevStepName', header: 'MEMBERSHIPCONFIG.PREV_STEP' },
        { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' }    
        ];
    }

  ngOnInit() {

  this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.getAllWorkFlow();
  }

  getAllWorkFlow() {
    this.commonComponent.startSpinner();
    this.workFlowService.getAllWorkFlow().subscribe((data: any) => {
      this.responseModel = data;
      this.workFloStepsList = this.responseModel.data.map((obj: { effStartDate: string | number | Date | null; effEndDate: string | number | Date | null; }) => {
        obj.effStartDate=this.datePipe.transform(obj.effStartDate, this.orgnizationSetting.datePipe);
        obj.effEndDate=this.datePipe.transform(obj.effEndDate, this.orgnizationSetting.datePipe);
        return obj;
      })
      this.commonComponent.stopSpinner();
    });
  }
  
  addData(){
    this.router.navigate([MembershipConfigConstants.ADD_WORK_FLOW]);
  }
  editWorkflowStep(data:any) {
  
    this.router.navigate([MembershipConfigConstants.ADD_WORK_FLOW], { queryParams: { id: this.encryptDecryptService.encrypt(data.id) } })
  }
  submit(){
    this.commonComponent.startSpinner();
    this.workFlowService.deleteWorkFlow(this.deleteId).subscribe(response => {
      this.responseModel = response;
      this.msgs = [];
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined) {
        this.commonComponent.stopSpinner();
        this.displayDialog = applicationConstants.FALSE;
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getAllWorkFlow();
        }, 2000);
      }
      } else {
        this.displayDialog = applicationConstants.FALSE;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  deleteData(rowData: any) {
    this.displayDialog = applicationConstants.TRUE;
    this.deleteId = rowData.id;
  }
  cancel() {
    this.displayDialog = applicationConstants.FALSE;
  }
}

import { Component, OnInit } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { WorkFlowService } from './shared/work-flow.service';
import { InvestmentsConfigConstants } from '../investments-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.css']
})
export class WorkFlowComponent implements OnInit{
  workFloStepsList: any;
  columns: any[] = [];
  responseModel: any;
  subColumns: any[] = [];
  msgs:any[]=[];
  displayDialog:boolean=false;
  orgnizationSetting:any;
  id: any;
  constructor(private encryptDecryptService: EncryptDecryptService,private router:Router,  private commonComponent: CommonComponent,
    private workFlowService:WorkFlowService,private datePipe:DatePipe) { 
      this.workFloStepsList = [];
      this.columns = [
        { field: 'name', header: 'INVESTMENTSCONFIG.WORK_FLOW_NAME' },
        { field: 'code', header: 'INVESTMENTSCONFIG.CODE' },
        { field: 'categoryName', header: 'INVESTMENTSCONFIG.COMMON_CATEGORYS' },
        { field: 'noOfSteps', header: 'INVESTMENTSCONFIG.NO_OF_STEPS' },
        { field: 'isExceptionalName', header: 'INVESTMENTSCONFIG.IS_EXCEPTIONAL' },
        { field: 'effStartDate', header: 'INVESTMENTSCONFIG.EFFECTIVE_START_DATE' },
        { field: 'effEndDate', header: 'INVESTMENTSCONFIG.EFFECTIVE_END_DATE' },
        // { field: 'statusName', header: 'INVESTMENTSCONFIG.STATUS' },
  
      ]
      this.subColumns = [
        { field: 'commonStatusName', header: 'INVESTMENTSCONFIG.WORK_FLOW_NAME' },
        { field: 'levelName', header: 'INVESTMENTSCONFIG.ACTOR' },
        { field: 'prevStepName', header: 'INVESTMENTSCONFIG.PREV_STEP' },
        { field: 'statusName', header: 'INVESTMENTSCONFIG.STATUS' }    
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
    this.router.navigate([InvestmentsConfigConstants.ADD_WORK_FLOW]);
  }
  editWorkflowStep(data:any) {
  
    this.router.navigate([InvestmentsConfigConstants.ADD_WORK_FLOW], { queryParams: { id: this.encryptDecryptService.encrypt(data.id) } })
  }
  deleteData(row:any) {
    this.displayDialog = true;
    this.id = row.id;
  }

  delete(){
    this.commonComponent.startSpinner();
    this.workFlowService.deleteWorkFlow(this.id).subscribe(response=>{
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
        this.displayDialog = false;
        this.getAllWorkFlow();
      }else{
        this.displayDialog = false;
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }

    },error=>{
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    })

  }

  cancel() {
    this.displayDialog = false;
  }
}

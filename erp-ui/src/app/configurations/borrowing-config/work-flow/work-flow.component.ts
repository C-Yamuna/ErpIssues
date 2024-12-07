import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { BorrowingConfigComponent } from '../borrowing-config.component';
import { BorrowingConfigConstants } from '../borrowing-config-constants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { WorkFlowService } from './shared/work-flow.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.css']
})
export class WorkFlowComponent {
  workFloStepsList: any;
  columns: any[] = [];
  responseModel: any;
  subColumns: any[] = [];
  msgs:any[]=[];
  displayDialog:boolean=applicationConstants.FALSE;
  orgnizationSetting:any;
  deleteId: any;
  levelList: any[] = [];
  constructor(private encryptDecryptService: EncryptDecryptService,private router:Router,  private commonComponent: CommonComponent,
    private workFlowService:WorkFlowService,private datePipe:DatePipe) { 
      this.workFloStepsList = [];
      this.columns = [
        { field: 'name', header: 'BORROWINGSCONFIG.WORK_FLOW_NAME' },
        { field: 'code', header: 'BORROWINGSCONFIG.CODE' },
        { field: 'categoryName', header: 'BORROWINGSCONFIG.COMMON_CATEGORYS' },
        { field: 'noOfSteps', header: 'BORROWINGSCONFIG.NO_OF_STEPS' },
        { field: 'isExceptionalName', header: 'BORROWINGSCONFIG.IS_EXCEPTIONAL' },
        { field: 'effStartDate', header: 'BORROWINGSCONFIG.EFFECTIVE_START_DATE' },
        { field: 'effEndDate', header: 'BORROWINGSCONFIG.EFFECTIVE_END_DATE' },
        // { field: 'statusName', header: 'BORROWINGSCONFIG.STATUS' },
  
      ]
      this.subColumns = [
        { field: 'commonStatusName', header: 'BORROWINGSCONFIG.WORK_FLOW_NAME' },
        { field: 'levelName', header: 'BORROWINGSCONFIG.ACTOR' },
        { field: 'prevStepName', header: 'BORROWINGSCONFIG.PREV_STEP' },
        { field: 'statusName', header: 'BORROWINGSCONFIG.STATUS' }    
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
    this.router.navigate([BorrowingConfigConstants.ADD_WORK_FLOW]);
  }
  editWorkflowStep(data:any) {
  
    this.router.navigate([BorrowingConfigConstants.ADD_WORK_FLOW], { queryParams: { id: this.encryptDecryptService.encrypt(data.id) } })
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

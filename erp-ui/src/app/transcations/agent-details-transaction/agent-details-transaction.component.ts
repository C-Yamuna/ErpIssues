import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { AgentDetailsTransactionConstant } from './agent-details-transaction-constants';
import { AgentDetailsTransactionService } from './shared/agent-details-transaction.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-agent-details-transaction',
  templateUrl: './agent-details-transaction.component.html',
  styleUrls: ['./agent-details-transaction.component.css']
})
export class AgentDetailsTransactionComponent implements OnInit {
  columns: any[] = [];
  statuses!: SelectItem[];
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  responseModel!: Responsemodel;
  gridListData: any[] = [];
  value: number = 0;
  msgs: any[] = [];
  tempGridListData: any[] = [];
  gridListLenght: Number | undefined;

  pacsId: any;
  branchId: any;
  gridListLength: Number | undefined;
  orgnizationSetting: any;
  activeStatusCount: number = 0;
  inactiveStatusCount: number = 0;
  operations: any;
  agentOperationsList: any;
  showForm: boolean = false;
  editViewButton:boolean = applicationConstants.FALSE;
  constructor(private router: Router,
    private translate: TranslateService,
    private commonFunctionsService: CommonFunctionsService,
    private agentDetailsTransactionService: AgentDetailsTransactionService,
    private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) {

    this.columns = [
      // { field: 'account number', header: 'AGENT_DETAILS_TRANSACTION.ACCOUNT_NUMBER' },
      { field: 'admissionNumber', header: 'AGENT_DETAILS_TRANSACTION.ADMISSION_NUMBER' },
      { field: 'name', header: 'AGENT_DETAILS_TRANSACTION.AGENT_NAME' },
      { field: 'mobileNumber', header: 'AGENT_DETAILS_TRANSACTION.CONTACT' },
      { field: 'collectiontype', header: 'AGENT_DETAILS_TRANSACTION.COLLECTION_TYPE' },
      { field: 'assigned no of products', header: 'AGENT_DETAILS_TRANSACTION.ASSIGNED_NO_OF_PRODUCTS' },
      { field: 'assigned no of accounts', header: 'AGENT_DETAILS_TRANSACTION.ASSIGNED_NO_OF_ACCOUNTS' },
      { field: 'status', header: 'AGENT_DETAILS_TRANSACTION.STATUS' },
    ];

    this.agentOperationsList = [
      { label: "Product Mapping", value: 1 },
      { label: "Device Mapping", value: 2 },
      { label: "Collection", value: 3 },
      { label: "Commission Caluculation", value: 4 },
      { label: "Closure ", value: 5 } 
    ]
  }
  ngOnInit() {
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
    let tabLabels = [
      'Total Agents',
      'Active Agents',
      'Inactive Agents',
      'Agent Commission',
      'Assigned Accounts',
      'Collection Amount',
    ];
    this.items = tabLabels.map((label, index) => ({ label: label, value: `${index + 1}` }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
    this.pacsId = 5;
    this.branchId = 12;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.getAll();
  }

  navigateToInfoDetails(event: any,rowData:any) {

    if (event.value === 1)
      this.router.navigate([AgentDetailsTransactionConstant.AGENT_DETAILS_PRODUCT_MAPPING], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });

    else if (event.value === 2)
      this.router.navigate([AgentDetailsTransactionConstant.AGENT_DETAILS_DEVICE_MAPPING], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });

    else if (event.value === 3)
      this.router.navigate([AgentDetailsTransactionConstant.AGENT_DETAILS_COLLECTION],{ queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
 
    else if (event.value === 4)
      this.router.navigate([AgentDetailsTransactionConstant.AGENT_DETAILS_COMMISSION_CALCULATION],{ queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });

    else if (event.value === 5)
      this.router.navigate([AgentDetailsTransactionConstant.AGENT_DETAILS_CLOSURE],{ queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });

  }

  addAgentDetails() {
    this.router.navigate([AgentDetailsTransactionConstant.MEMBERSHIP_BASIC_DETAILS]);
  }
  viewAgentDetails(rowData: any) {
    this.router.navigate([AgentDetailsTransactionConstant.VIEW_AGENT_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), editbutton: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE),isGridPage: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) } });
  }

  editAgentDetails(rowData: any) {
    this.router.navigate([AgentDetailsTransactionConstant.VIEW_AGENT_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id),editbutton: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE), isGridPage: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) } });
  }
  getAll() {
    this.commonComponent.startSpinner();
    this.agentDetailsTransactionService.getAllAgentDetails().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

  onChange(){
    this.showForm = !this.showForm;
  }
}

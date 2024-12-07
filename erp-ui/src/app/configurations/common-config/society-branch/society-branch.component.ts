import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SocietyBranch } from './shared/society-branch.model';
import { SocietyBranchService } from './shared/society-branch.service';
import { CommonConfigConstants } from '../common-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-society-branch',
  templateUrl: './society-branch.component.html',
  styleUrls: ['./society-branch.component.css']
})
export class SocietyBranchComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  societyBranchModel: SocietyBranch = new SocietyBranch();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  orgnizationSetting: any;
  deleteId:any;
  constructor(private router: Router, private societyBranchService: SocietyBranchService,
    private encryptDecryptService: EncryptDecryptService, private datePipe:DatePipe,
    private commonComponent: CommonComponent,
  ) {
    this.columns = [
      { field: 'branchName', header: 'ERP.NAME' },
      { field: 'pacsName', header: 'ERP.PACS' },
      { field: 'villageName', header: 'ERP.VILLAGES' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];
  }
    ngOnInit(): void {
      this.orgnizationSetting = this.commonComponent.orgnizationSettings()
      this.getAll();
    }
    addsocietybranch() {
      this.router.navigate([CommonConfigConstants.ADD_SOCIETY_BRANCH]);
    }
    getAll() {
      this.societyBranchService.getAllSocietyBranch().subscribe((data: any) => {
        this.responseModel = data;
        this.gridListData = this.responseModel.data.map((obj: { regDate: string | number | Date | null;  }) => {
          obj.regDate=this.datePipe.transform(obj.regDate, this.orgnizationSetting.datePipe);
        
          return obj;
        })
        this.commonComponent.stopSpinner();
      });
    }
  
  
    editsocietybranch(rowData: any) {
      this.router.navigate([CommonConfigConstants.ADD_SOCIETY_BRANCH], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
  
    deleteData(rowData: any) {
      this.displayDialog = true;
      this.deleteId = rowData.id;
    }
    
    submit() {
      this.commonComponent.startSpinner();
      this.societyBranchService.deleteSocietyBranch(this.deleteId).subscribe(response => {
        this.responseModel = response;
        this.msgs = [];
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.displayDialog = false;
          this.msgs = [];
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.getAll();
          }, 2000);
        } else {
          this.displayDialog = false;
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
    cancel() {
      this.displayDialog = false;
    }
}
